import { chromium } from 'playwright';
import sharp from 'sharp';
import path from 'path';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const outDir = path.resolve('public/images/projects/quick-blog');

  // 1. Desktop
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('https://quick-blog-flame.vercel.app/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  // Remove the toast
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach((el) => {
      const cls = el.className;
      if (typeof cls === 'string' && cls.includes('go')) {
        el.remove();
      }
      if (el.textContent && el.textContent.includes('buffering timed out')) {
        el.remove();
      }
    });
  });
  await page.waitForTimeout(500);

  const p1 = path.join(outDir, '01-home-desktop.png');
  const p2 = path.join(outDir, '02-home-full-desktop.png');
  const p3 = path.join(outDir, '03-post-desktop.png');

  await page.screenshot({ path: p1, timeout: 5000 });
  await page.screenshot({ path: p2, timeout: 5000 });
  await page.screenshot({ path: p3, timeout: 5000 });
  await page.close();

  // 2. Mobile
  const mPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mPage.goto('https://quick-blog-flame.vercel.app/', { waitUntil: 'domcontentloaded' });
  await mPage.waitForTimeout(2500);

  await mPage.evaluate(() => {
    document.querySelectorAll('*').forEach((el) => {
      const cls = el.className;
      if (typeof cls === 'string' && cls.includes('go')) {
        el.remove();
      }
      if (el.textContent && el.textContent.includes('buffering timed out')) {
        el.remove();
      }
    });
  });
  await mPage.waitForTimeout(500);

  const m1 = path.join(outDir, '08-home-mobile.png');
  const m2 = path.join(outDir, '09-post-mobile.png');

  await mPage.screenshot({ path: m1, timeout: 5000 });
  await mPage.screenshot({ path: m2, timeout: 5000 });
  await mPage.close();

  await browser.close();

  // Convert to WebP
  const pairs = [
    [p1, path.join(outDir, '01-home-desktop.webp')],
    [p2, path.join(outDir, '02-home-full-desktop.webp')],
    [p3, path.join(outDir, '03-post-desktop.webp')],
    [m1, path.join(outDir, '08-home-mobile.webp')],
    [m2, path.join(outDir, '09-post-mobile.webp')],
  ];

  for (const [pngPath, webpPath] of pairs) {
    await sharp(pngPath).webp({ quality: 90 }).toFile(webpPath);
  }

  console.log('Successfully captured clean QuickBlog images without error toast and converted to WebP!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
