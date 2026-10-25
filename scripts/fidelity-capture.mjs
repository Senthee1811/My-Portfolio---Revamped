import { chromium, devices } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:3000";

async function main() {
  console.log("Launching Chromium for Fidelity Loop screenshots...");
  const browser = await chromium.launch();
  fs.mkdirSync("reference", { recursive: true });

  for (const scheme of ["dark", "light"]) {
    console.log(`Capturing mine-home-${scheme}-1440.png...`);
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: scheme,
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    // Skip splash
    const skipBtn = page.locator("button:has-text('Skip')");
    if (await skipBtn.count()) {
      await skipBtn.click();
    }
    await page.waitForTimeout(1000);
    // Skip tour if present
    const skipTour = page.locator("button:has-text('Skip tour')");
    if (await skipTour.count()) {
      await skipTour.click();
    }
    await page.waitForTimeout(800);

    // Toggle theme if scheme is light
    if (scheme === "light") {
      const toggle = page.locator("#theme-toggle-btn");
      if (await toggle.count()) {
        await toggle.click();
        await page.waitForTimeout(700);
      }
    }

    await page.screenshot({ path: `reference/mine-home-${scheme}-1440.png` });
    console.log(`Saved reference/mine-home-${scheme}-1440.png`);

    // Mobile
    console.log(`Capturing mine-home-${scheme}-390.png...`);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `reference/mine-home-${scheme}-390.png`, fullPage: true });
    console.log(`Saved reference/mine-home-${scheme}-390.png`);

    await ctx.close();
  }

  // Project page
  console.log("Capturing mine-project-desktop-1440.png...");
  const pCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pPage = await pCtx.newPage();
  await pPage.goto(`${BASE}/projects/quick-blog`, { waitUntil: "networkidle" });
  await pPage.waitForTimeout(1000);
  await pPage.screenshot({ path: `reference/mine-project-desktop-1440.png` });
  console.log("Saved reference/mine-project-desktop-1440.png");
  await pCtx.close();

  await browser.close();
  console.log("Fidelity screenshots complete!");
}

main().catch(console.error);
