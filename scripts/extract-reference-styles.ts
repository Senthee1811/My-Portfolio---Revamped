import { chromium } from "playwright";
import fs from "node:fs";

const URL = "https://www.jmancheta.cloud/";

async function main() {
  console.log("Launching Chromium for reference style extraction...");
  const browser = await chromium.launch();
  const out: Record<string, unknown> = {};

  fs.mkdirSync("reference", { recursive: true });

  for (const scheme of ["light", "dark"] as const) {
    console.log(`Extracting ${scheme} mode tokens and screenshots...`);
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    try {
      await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(4000);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(1000);

      const evaluateCode = `(() => {
        function pick(el) {
          if (!el) return null;
          var s = window.getComputedStyle(el);
          var r = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            cls: el.className ? el.className.toString().slice(0, 140) : '',
            rect: { x: r.x, y: r.y, w: r.width, h: r.height },
            color: s.color,
            bg: s.backgroundColor,
            border: s.border,
            radius: s.borderRadius,
            font: s.fontFamily,
            size: s.fontSize,
            weight: s.fontWeight,
            lh: s.lineHeight,
            ls: s.letterSpacing,
            pad: s.padding,
            gap: s.gap,
            shadow: s.boxShadow,
          };
        }
        function q(sel) { return pick(document.querySelector(sel)); }
        
        var allScrollers = Array.from(document.querySelectorAll("*"))
          .filter(function(e) {
            var s = window.getComputedStyle(e);
            return /(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight;
          })
          .map(pick);

        var cssVars = {};
        try {
          Array.from(document.styleSheets).forEach(function(sh) {
            try {
              Array.from(sh.cssRules || []).forEach(function(r) {
                if (r.selectorText === ':root' || r.selectorText === '.dark' || r.selectorText === '[data-theme="dark"]') {
                  Array.from(r.style).forEach(function(p) {
                    if (p.startsWith('--')) {
                      cssVars[p] = r.style.getPropertyValue(p).trim();
                    }
                  });
                }
              });
            } catch (err) {}
          });
        } catch (e) {}

        return {
          body: q("body"),
          h1: q("h1"),
          h2: q("h2"),
          h3: q("h3"),
          p: q("p"),
          button: q("a[href*='github.com'], button"),
          img: q("img"),
          section: q("section"),
          scrollers: allScrollers,
          cssVars: cssVars
        };
      })()`;

      out[scheme] = await page.evaluate(evaluateCode);

      await page.screenshot({ path: `reference/home-${scheme}-1440.png` });
      console.log(`Saved reference/home-${scheme}-1440.png`);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForTimeout(500);
      await page.screenshot({ path: `reference/home-${scheme}-390.png`, fullPage: true });
      console.log(`Saved reference/home-${scheme}-390.png`);
    } catch (e) {
      console.error(`Error during ${scheme} extraction:`, e);
    } finally {
      await ctx.close();
    }
  }

  // Also capture a project detail page screenshot if available
  try {
    console.log("Capturing reference project page screenshot...");
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(3000);
    await page.keyboard.press("Escape");
    const projLink = page.locator("a[href*='/projects/']").first();
    if (await projLink.count()) {
      await projLink.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: "reference/project-desktop-1440.png" });
      console.log("Saved reference/project-desktop-1440.png");
    }
    await ctx.close();
  } catch (err) {
    console.warn("Could not capture project page:", err);
  }

  fs.writeFileSync("reference/tokens.json", JSON.stringify(out, null, 2));
  console.log("Written reference/tokens.json");
  await browser.close();
}

main().catch(console.error);
