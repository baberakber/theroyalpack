import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const sourceName =
  'c__Users_baber_AppData_Roaming_Cursor_User_workspaceStorage_90ca747fdb595305a1e0c7ebb830e1af_images_Royal_Pack_Logo-8d9c42f3-ff80-47de-8e43-e26365182a66.png';

const candidates = [
  path.join(root, 'assets', 'royal-pack-logo-source.png'),
  path.join(root, 'assets', sourceName),
  `C:/Users/baber/.cursor/projects/f-Websites-Code-RoyalPack-Website/assets/${sourceName}`,
];

const input = candidates.find((candidate) => fs.existsSync(candidate));
if (!input) {
  console.error('Logo source not found. Checked:', candidates);
  process.exit(1);
}

const imagesDir = path.join(root, 'public/images');
const appDir = path.join(root, 'src/app');

const meta = await sharp(input).metadata();
const { width, height } = meta;
console.log('Source:', input, `${width}x${height}`);

function removeBlackBackground(buffer) {
  return sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        // Remove near-black background while preserving gold logo tones.
        if (max < 42 && min < 24) {
          data[i + 3] = 0;
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
        }
      }

      return sharp(data, {
        raw: { width: info.width, height: info.height, channels: 4 },
      })
        .trim({ threshold: 1 })
        .png({ compressionLevel: 6, adaptiveFiltering: true })
        .toBuffer();
    });
}

const transparentLogo = await removeBlackBackground(input);
const trimmedMeta = await sharp(transparentLogo).metadata();
const trimmedWidth = trimmedMeta.width ?? width;
const trimmedHeight = trimmedMeta.height ?? height;

// Full-resolution logo assets (transparent PNG + high-quality WebP)
await sharp(transparentLogo).toFile(path.join(imagesDir, 'Logo-RoyalPack.png'));

await sharp(transparentLogo)
  .webp({ quality: 98, effort: 6, smartSubsample: false, lossless: false })
  .toFile(path.join(imagesDir, 'Logo-RoyalPack.webp'));

// Favicon: crop crown + RP monogram (top ~58% of trimmed logo, centered square)
const cropHeight = Math.round(trimmedHeight * 0.58);
const cropSize = Math.min(trimmedWidth, cropHeight);
const left = Math.round((trimmedWidth - cropSize) / 2);
const top = 0;

const iconBase = await sharp(transparentLogo)
  .extract({ left, top, width: cropSize, height: cropSize })
  .resize(512, 512, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

await sharp(iconBase).toFile(path.join(appDir, 'icon.png'));
await sharp(iconBase).resize(180, 180).toFile(path.join(appDir, 'apple-icon.png'));

const faviconSizes = [16, 32, 48];
const faviconBuffers = await Promise.all(
  faviconSizes.map((size) => sharp(iconBase).resize(size, size).png().toBuffer())
);
const ico = await toIco(faviconBuffers);
fs.writeFileSync(path.join(appDir, 'favicon.ico'), ico);

// PWA manifest icons
await sharp(iconBase).resize(192, 192).webp({ quality: 95 }).toFile(path.join(imagesDir, 'icon-192.webp'));
await sharp(iconBase).resize(512, 512).webp({ quality: 95 }).toFile(path.join(imagesDir, 'icon-512.webp'));

console.log('Generated logo and favicon assets successfully.');
