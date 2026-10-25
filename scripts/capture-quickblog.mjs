// capture-quickblog.mjs
// Takes real screenshots of the Quick Blog live site for the portfolio showcase.

import { chromium, devices } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QB_URL ?? "https://quick-blog-flame.vercel.app").replace(/\/$/, "");
const OUT = process.env.QB_OUT ?? "public/images/projects/quick-blog";
const ADMIN = process.env.QB_ADMIN_PATH ?? "/admin";
const EMAIL = process.env.QB_EMAIL;
const PASSWORD = process.env.QB_PASSWORD;

fs.mkdirSync(OUT, { recursive: true });
const saved = [];
const failed = [];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function settle(page, extra = 1200) {
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await sleep(extra);
}

// Scroll down and back up so lazy images and scroll animations render before the shot.
async function warmUp(page) {
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await sleep(500);
}

async function shot(page, name, opts = {}) {
  const file = path.join(OUT, name);
  try {
    await page.screenshot({ path: file, ...opts });
    saved.push(file);
    console.log("  saved", file);
  } catch (err) {
    failed.push(`${name}: ${err.message}`);
    console.warn("  FAILED", name, err.message);
  }
}

async function openFirstPost(page) {
  const candidates = [
    "a[href*='/blog/']",
    "a[href*='/blogs/']",
    "a[href*='/post/']",
    "a[href*='/posts/']",
    "article a",
    "[class*='card'] a",
    "a:has(img)",
    "h2 a",
    "h3 a",
    "button:has-text('Read')",
    "a:has-text('Read More')",
    "a:has-text('Read')",
  ];
  for (const sel of candidates) {
    const link = page.locator(sel).first();
    if (await link.count()) {
      try {
        await link.click({ timeout: 5000 });
        await settle(page, 1500);
        return true;
      } catch (e) {
        continue;
      }
    }
  }
  return false;
}

async function run() {
  console.log(`Starting capture from ${BASE}...`);
  const browser = await chromium.launch({ headless: !process.env.QB_HEADED });

  // ---------- Desktop (1440x900 @2x) ----------
  console.log("Desktop context (1440x900 @2x)...");
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const dp = await desktop.newPage();
  try {
    await dp.goto(BASE, { waitUntil: "domcontentloaded", timeout: 45000 });
    await settle(dp, 2000);
    await warmUp(dp);
    await shot(dp, "01-home-desktop.png");
    await shot(dp, "02-home-full-desktop.png", { fullPage: true });

    console.log("Attempting to open blog post...");
    const opened = await openFirstPost(dp);
    if (opened) {
      await warmUp(dp);
      await shot(dp, "03-post-desktop.png");
    } else {
      console.log("No specific post link found; taking focused view screenshot...");
      await shot(dp, "03-post-desktop.png");
    }
  } catch (err) {
    failed.push("desktop home: " + err.message);
  }

  // ---------- Mobile (iPhone 14 @3x) ----------
  console.log("Mobile context (iPhone 14 @3x)...");
  const mobile = await browser.newContext({ ...devices["iPhone 14"], deviceScaleFactor: 3 });
  const mp = await mobile.newPage();
  try {
    await mp.goto(BASE, { waitUntil: "domcontentloaded", timeout: 45000 });
    await settle(mp, 2000);
    await warmUp(mp);
    await shot(mp, "08-home-mobile.png");
    const mOpened = await openFirstPost(mp);
    if (mOpened) {
      await warmUp(mp);
      await shot(mp, "09-post-mobile.png");
    } else {
      await shot(mp, "09-post-mobile.png");
    }
  } catch (err) {
    failed.push("mobile: " + err.message);
  }

  await desktop.close();
  await mobile.close();
  await browser.close();

  console.log(`\nDone. ${saved.length} screenshot(s) in ${OUT}`);
  if (failed.length) {
    console.log("Issues:\n - " + failed.join("\n - "));
  }
}

run().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
