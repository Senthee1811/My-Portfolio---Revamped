import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const TARGET_DIR = process.argv[2] || "public/images/projects/quick-blog";

async function optimizeDir(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory does not exist: ${dir}`);
    return;
  }
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.toLowerCase().endsWith(".png")) {
      const fullPath = path.join(dir, file);
      const webpPath = fullPath.replace(/\.png$/i, ".webp");
      console.log(`Optimizing ${file} -> WebP...`);
      try {
        await sharp(fullPath)
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(webpPath);
        console.log(`  Done: ${webpPath}`);
      } catch (err) {
        console.error(`  Failed to convert ${file}:`, err);
      }
    }
  }
}

optimizeDir(TARGET_DIR).catch(console.error);
