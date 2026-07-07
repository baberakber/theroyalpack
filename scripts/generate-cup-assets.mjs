/**
 * Generates photorealistic white paper / clear plastic cup SVG assets.
 * Run: node scripts/generate-cup-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'public', 'images', 'demo', 'cups');

const PAPER_SPECS = {
  '4oz': { heightMm: 61, topMm: 62, bottomMm: 45 },
  '7oz': { heightMm: 79, topMm: 72, bottomMm: 50 },
  '8oz': { heightMm: 94, topMm: 80, bottomMm: 56 },
  '12oz': { heightMm: 108, topMm: 90, bottomMm: 58 },
  '16oz': { heightMm: 137, topMm: 90, bottomMm: 58 },
};

const PLASTIC_SPECS = {
  '8oz': { heightMm: 90, topMm: 78, bottomMm: 68 },
  '10oz': { heightMm: 98, topMm: 82, bottomMm: 72 },
  '12oz': { heightMm: 108, topMm: 86, bottomMm: 76 },
  '16oz': { heightMm: 130, topMm: 92, bottomMm: 82 },
};

const BASE_HEIGHT = 268;
const BASE_REF = 61;
const VIEW_W = 320;

function dims(spec) {
  const scale = BASE_HEIGHT / BASE_REF;
  const viewHeight = Math.round(spec.heightMm * scale);
  const topY = Math.round(viewHeight * 0.11);
  const bottomY = viewHeight - Math.round(viewHeight * 0.06);
  const widthScale = spec.topMm / 62;
  const topHalfWidth = Math.round(31 * scale * 0.92 * widthScale);
  const bottomHalfWidth = Math.round((spec.bottomMm / 2) * scale * 0.92);
  return { viewHeight, topY, bottomY, topHalfWidth, bottomHalfWidth, rimRx: topHalfWidth };
}

function buildCupSvg(material, dims) {
  const viewWidth = VIEW_W;
  const viewHeight = dims.viewHeight;
  const cx = viewWidth / 2;
  const { topY, bottomY, topHalfWidth, bottomHalfWidth, rimRx } = dims;
  const isPlastic = material === 'plastic';
  const rimRy = isPlastic ? 9 : 11;

  const bodyPath = `M ${cx - topHalfWidth} ${topY} L ${cx - bottomHalfWidth} ${bottomY} Q ${cx} ${bottomY + 10} ${cx + bottomHalfWidth} ${bottomY} L ${cx + topHalfWidth} ${topY} Z`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewWidth} ${viewHeight}" width="${viewWidth}" height="${viewHeight}">
  <defs>
    <clipPath id="body-clip"><path d="${bodyPath}"/></clipPath>
    <linearGradient id="body-light" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="${isPlastic ? '0.5' : '0.95'}"/>
      <stop offset="38%" stop-color="${isPlastic ? '#E8F4FC' : '#F8F8F6'}" stop-opacity="${isPlastic ? '0.35' : '1'}"/>
      <stop offset="100%" stop-color="${isPlastic ? '#A0C8DC' : '#D8D8D4'}" stop-opacity="${isPlastic ? '0.4' : '0.9'}"/>
    </linearGradient>
    <filter id="shadow" x="-30%" y="-10%" width="160%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-opacity="0.12"/>
    </filter>
  </defs>
  <ellipse cx="${cx}" cy="${bottomY + 24}" rx="${topHalfWidth * 0.9}" ry="10" fill="#000" opacity="0.06"/>
  <g filter="url(#shadow)">
    <path id="cup-body" d="${bodyPath}" fill="url(#body-light)" stroke="${isPlastic ? '#8BB8D0' : '#D4D4D0'}" stroke-width="1.2"/>
    <ellipse cx="${cx}" cy="${bottomY + 2}" rx="${bottomHalfWidth}" ry="7" fill="${isPlastic ? '#B8D8E8' : '#ECECEA'}" stroke="${isPlastic ? '#8BB8D0' : '#D4D4D0'}"/>
    <ellipse cx="${cx}" cy="${topY}" rx="${rimRx}" ry="${rimRy}" fill="${isPlastic ? '#D0E8F4' : '#FFFFFF'}" stroke="${isPlastic ? '#7EB0C8' : '#E0E0DC'}" stroke-width="1.5"/>
  </g>
</svg>`;
}

function writeAssets(material, specs) {
  const dir = path.join(root, material);
  fs.mkdirSync(dir, { recursive: true });
  for (const [size, spec] of Object.entries(specs)) {
    const d = dims(spec);
    fs.writeFileSync(path.join(dir, `${size}.svg`), buildCupSvg(material, d), 'utf8');
    console.log(`  wrote ${material}/${size}.svg (${d.viewHeight}px)`);
  }
}

console.log('Generating cup assets from real mm specs...');
writeAssets('paper', PAPER_SPECS);
writeAssets('plastic', PLASTIC_SPECS);
console.log('Done.');
