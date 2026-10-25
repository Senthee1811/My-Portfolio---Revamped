# TASK: Capture real Quick Blog screenshots for the portfolio showcase

> For an AI coding agent (Claude Code, Cursor, etc.). Execute the steps in order. Do not ask questions; use the defaults and report issues at the end.

## Goal
Capture real screenshots of the live **Quick Blog** app (a MERN + Gemini AI blog CMS) and save them into the portfolio project, ready for the project page gallery.

- Live site: `https://quick-blog-server-theta.vercel.app` (listed as the repo's website on GitHub; its name says "server", so verify it serves the UI)
- Repo: `https://github.com/Senthee1811/QuickBlog` (folders: `client/`, `server/`)
- Output folder: `public/images/projects/quick-blog/` (relative to the portfolio project root)

## Rules
- Run from the portfolio project root.
- Never hard-code or commit credentials. Admin login is optional and comes only from env vars `QB_EMAIL` / `QB_PASSWORD`.
- Never fabricate screenshots. If a page can't be captured, report it.
- Do not modify files outside `scripts/` and `public/images/projects/quick-blog/` except `package.json` (dev dependency) and `.gitignore`.

## Step 1. Install Playwright
```bash
npm i -D playwright
npx playwright install chromium
```
If browser install fails due to missing system libraries on Linux: `npx playwright install --with-deps chromium`.

## Step 2. Create the script
Create `scripts/capture-quickblog.mjs` with exactly this content:

```js
// capture-quickblog.mjs
// Takes real screenshots of the Quick Blog live site for the portfolio showcase.
//
// Run:  node scripts/capture-quickblog.mjs
// Optional env vars:
//   QB_URL         live site URL            (default: https://quick-blog-server-theta.vercel.app)
//   QB_OUT         output folder            (default: public/images/projects/quick-blog)
//   QB_EMAIL       admin email    \ set both to also capture the admin screens
//   QB_PASSWORD    admin password /  (never commit these)
//   QB_ADMIN_PATH  admin route              (default: /admin)
//   QB_HEADED=1    show the browser window (debugging)

import { chromium, devices } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = (process.env.QB_URL ?? "https://quick-blog-server-theta.vercel.app").replace(/\/$/, "");
const OUT = process.env.QB_OUT ?? "public/images/projects/quick-blog";
const ADMIN = process.env.QB_ADMIN_PATH ?? "/admin";
const EMAIL = process.env.QB_EMAIL;
const PASSWORD = process.env.QB_PASSWORD;

fs.mkdirSync(OUT, { recursive: true });
const saved = [];
const failed = [];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function settle(page, extra = 1000) {
  await page.waitForLoadState("networkidle", { timeout: 60000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await sleep(extra);
}

// Scroll down and back up so lazy images and scroll animations render before the shot.
async function warmUp(page) {
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
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

// Find the first blog post link on the home page (tries common patterns).
async function openFirstPost(page) {
  const candidates = [
    "a[href*='/blog/']",
    "a[href*='/post']",
    "article a",
    "[class*='card'] a",
    "a:has(img)",
  ];
  for (const sel of candidates) {
    const link = page.locator(sel).first();
    if (await link.count()) {
      const href = await link.getAttribute("href");
      if (href && href !== "/" && !href.startsWith("http")) {
        await link.click();
      } else if (href && href.startsWith(BASE) && href !== BASE + "/") {
        await link.click();
      } else {
        continue;
      }
      await settle(page, 1200);
      if (page.url().replace(/\/$/, "") !== BASE) return true;
    }
  }
  return false;
}

async function run() {
  const browser = await chromium.launch({ headless: !process.env.QB_HEADED });

  // ---------- Desktop (1440x900 @2x) ----------
  console.log("Desktop...");
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const dp = await desktop.newPage();
  await dp.goto(BASE, { waitUntil: "domcontentloaded", timeout: 90000 }); // 1st hit can be a Vercel cold start
  await settle(dp, 1500);
  await warmUp(dp);
  await shot(dp, "01-home-desktop.png");
  await shot(dp, "02-home-full-desktop.png", { fullPage: true });

  if (await openFirstPost(dp)) {
    await warmUp(dp);
    await shot(dp, "03-post-desktop.png");
  } else {
    failed.push("03-post-desktop.png: no post link found, adjust the selectors in openFirstPost()");
  }

  // ---------- Admin (optional) ----------
  if (EMAIL && PASSWORD) {
    console.log("Admin...");
    try {
      await dp.goto(BASE + ADMIN, { waitUntil: "domcontentloaded", timeout: 60000 });
      await settle(dp, 800);
      await dp.locator("input[type='email'], input[name='email']").first().fill(EMAIL);
      await dp.locator("input[type='password'], input[name='password']").first().fill(PASSWORD);
      await dp.locator("button[type='submit']").first().click();
      await settle(dp, 1800);
      await shot(dp, "04-admin-dashboard-desktop.png");

      for (const [route, name] of [
        [`${ADMIN}/addBlog`, "05-admin-add-blog-desktop.png"],
        [`${ADMIN}/listBlog`, "06-admin-list-blog-desktop.png"],
        [`${ADMIN}/comments`, "07-admin-comments-desktop.png"],
      ]) {
        await dp.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
        await settle(dp, 1200);
        await shot(dp, name);
      }
    } catch (err) {
      failed.push("admin screens: " + err.message);
    }
  } else {
    console.log("Skipping admin screens (set QB_EMAIL and QB_PASSWORD to include them).");
  }
  await desktop.close();

  // ---------- Mobile (iPhone 14 @3x) ----------
  console.log("Mobile...");
  const mobile = await browser.newContext({ ...devices["iPhone 14"], deviceScaleFactor: 3 });
  const mp = await mobile.newPage();
  await mp.goto(BASE, { waitUntil: "domcontentloaded", timeout: 90000 });
  await settle(mp, 1500);
  await warmUp(mp);
  await shot(mp, "08-home-mobile.png");
  if (await openFirstPost(mp)) {
    await warmUp(mp);
    await shot(mp, "09-post-mobile.png");
  }
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
```

## Step 3. Run it
```bash
node scripts/capture-quickblog.mjs
```
- If the user supplied admin credentials, run: `QB_EMAIL=... QB_PASSWORD=... node scripts/capture-quickblog.mjs` (never write them to disk or commit them).
- If the home page is not the blog UI (e.g. it returns JSON or a server message), find the real front-end URL (check the repo's `client/` README or Vercel config), then re-run with `QB_URL=<frontend-url>`.
- First request may be slow (Vercel cold start); the script allows 90 s.

## Step 4. Verify (required)
1. `ls -la public/images/projects/quick-blog/` and confirm each expected file exists and is larger than ~20 KB.
2. Open/inspect the images. Confirm they show the real app (blog list, post), not an error page, blank page, 404, or cookie/login wall. If any shot is wrong, fix selectors or routes in `openFirstPost()` / the admin route list and re-run.
3. Expected files: `01-home-desktop.png`, `02-home-full-desktop.png`, `03-post-desktop.png`, `08-home-mobile.png`, `09-post-mobile.png` (+ `04`–`07` admin screens only if credentials were provided).

## Step 5. Optimize
```bash
npm i -D sharp
```
Create `scripts/optimize-images.mjs` that, for every PNG in the output folder, writes a WebP copy (quality 82, max width 1920 px, keep aspect ratio) next to the PNG with the same base name. Run it. Keep the original PNGs.

## Step 6. Wire into the portfolio data
In `src/data/projects.ts`, set the Quick Blog entry's screenshots, in this order, using only files that exist:
```ts
screenshots: [
  "/images/projects/quick-blog/01-home-desktop.png",
  "/images/projects/quick-blog/03-post-desktop.png",
  "/images/projects/quick-blog/08-home-mobile.png",
  "/images/projects/quick-blog/09-post-mobile.png",
],
showcase: "screenshots",
```
Desktop shots go in a browser-frame mockup; mobile shots go in a phone-frame mockup (use the existing `BrowserFrame` / `PhoneFrame` components if present).

## Step 7. Report
Reply with: list of files created (with sizes), anything that failed and why, the final URL used, and any follow-up the user must do (e.g. provide admin credentials or the real front-end URL). Do not claim success for any screenshot you did not verify visually.
