/**
 * Removes the white studio background from the clear plastic cup photo.
 * Uses progressive flood-fill from edges so cup walls block background removal.
 * Run: node scripts/remove-cup-background.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath =
  process.argv[2] ??
  'C:/Users/baber/.cursor/projects/f-Websites-Code-RoyalPack-Website/assets/c__Users_baber_AppData_Roaming_Cursor_User_workspaceStorage_90ca747fdb595305a1e0c7ebb830e1af_images_image-34e0b65e-0cb5-4d96-a952-cd53c8227811.png';
const outputPath = path.join(__dirname, '..', 'public', 'images', 'demo', 'cups', 'plastic', 'clear-cup-base.png');

const THRESHOLDS = [252, 248, 244, 240, 236, 232, 228];

function minChannel(r, g, b) {
  return Math.min(r, g, b);
}

function isBackgroundPixel(data, idx, channels, threshold) {
  if (data[idx + 3] === 0) return false;
  return minChannel(data[idx], data[idx + 1], data[idx + 2]) >= threshold;
}

function hasTransparentNeighbor(data, width, height, channels, idx) {
  const x = idx % width;
  const y = (idx - x) / width;
  const offsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (const [dx, dy] of offsets) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
    const nIdx = (ny * width + nx) * channels;
    if (data[nIdx + 3] === 0) return true;
  }
  return false;
}

function floodBackground(data, width, height, channels, threshold) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const tryPush = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    const offset = idx * channels;
    if (!isBackgroundPixel(data, offset, channels, threshold)) return;
    const onBorder = x === 0 || y === 0 || x === width - 1 || y === height - 1;
    if (!onBorder && !hasTransparentNeighbor(data, width, height, channels, idx)) return;
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < width; x++) {
    tryPush(x, 0);
    tryPush(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    tryPush(0, y);
    tryPush(width - 1, y);
  }

  while (queue.length > 0) {
    const idx = queue.pop();
    const x = idx % width;
    const y = (idx - x) / width;
    data[idx * channels + 3] = 0;
    tryPush(x - 1, y);
    tryPush(x + 1, y);
    tryPush(x, y - 1);
    tryPush(x, y + 1);
  }
}

async function main() {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = new Uint8Array(data);

  for (const threshold of THRESHOLDS) {
    floodBackground(pixels, width, height, channels, threshold);
  }

  await sharp(pixels, { raw: { width, height, channels } }).png().toFile(outputPath);
  console.log(`Wrote transparent cup image: ${outputPath} (${width}x${height})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
