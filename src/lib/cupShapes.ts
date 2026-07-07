import type { CupMaterial, CupSize, PaperCupSize, PlasticCupSize } from '@/lib/demoConstants';

export type CupShapeConfig = {
  viewWidth: number;
  viewHeight: number;
  topY: number;
  bottomY: number;
  topHalfWidth: number;
  bottomHalfWidth: number;
  rimRx: number;
  /** Vertical radius of the cup-opening ellipse (small — just shows the opening) */
  rimRy: number;
  /** Height in px of the visible white exterior rim band on the cup walls */
  rimBandHeight: number;
  /** Depth for CSS 3D cylinder (px) */
  depthRadius: number;
  logo: {
    topPercent: number;
    heightPercent: number;
    widthPercent: number;
  };
};

type CupSpec = {
  heightMm: number;
  topMm: number;
  bottomMm: number;
};

/** Real single-wall paper cup dimensions (mm) from product specs. */
const PAPER_SPECS: Record<PaperCupSize, CupSpec> = {
  '4oz': { heightMm: 61, topMm: 62, bottomMm: 45 },
  '7oz': { heightMm: 79, topMm: 72, bottomMm: 50 },
  '8oz': { heightMm: 94, topMm: 80, bottomMm: 56 },
  '12oz': { heightMm: 108, topMm: 90, bottomMm: 58 },
  '16oz': { heightMm: 137, topMm: 90, bottomMm: 58 },
};

const PLASTIC_SPECS: Record<PlasticCupSize, CupSpec> = {
  '8oz': { heightMm: 90, topMm: 78, bottomMm: 68 },
  '10oz': { heightMm: 98, topMm: 82, bottomMm: 72 },
  '12oz': { heightMm: 108, topMm: 86, bottomMm: 76 },
  '16oz': { heightMm: 130, topMm: 92, bottomMm: 82 },
};

const BASE_HEIGHT_PX = 268;
const BASE_REF_MM = PAPER_SPECS['4oz'].heightMm;
const VIEW_WIDTH = 320;

function buildShape(spec: CupSpec): CupShapeConfig {
  const scale = BASE_HEIGHT_PX / BASE_REF_MM;
  const viewHeight = Math.round(spec.heightMm * scale);
  const rimPad = Math.round(viewHeight * 0.11);
  const topY = rimPad;
  const bottomY = viewHeight - Math.round(viewHeight * 0.06);

  const widthScale = spec.topMm / PAPER_SPECS['4oz'].topMm;
  const topHalfWidth = Math.round((PAPER_SPECS['4oz'].topMm / 2) * scale * 0.92 * widthScale);
  const bottomHalfWidth = Math.round((spec.bottomMm / 2) * scale * 0.92);

  return {
    viewWidth: VIEW_WIDTH,
    viewHeight,
    topY,
    bottomY,
    topHalfWidth,
    bottomHalfWidth,
    rimRx: topHalfWidth,
    rimRy: Math.max(5, Math.round(topHalfWidth * 0.065)),
    rimBandHeight: Math.max(8, Math.round(topHalfWidth * 0.075)),
    depthRadius: Math.round(topHalfWidth * 0.72),
    logo: {
      topPercent: 0.34,
      heightPercent: 0.22,
      widthPercent: 0.68,
    },
  };
}

const PAPER_SHAPES: Record<PaperCupSize, CupShapeConfig> = {
  '4oz': buildShape(PAPER_SPECS['4oz']),
  '7oz': buildShape(PAPER_SPECS['7oz']),
  '8oz': buildShape(PAPER_SPECS['8oz']),
  '12oz': buildShape(PAPER_SPECS['12oz']),
  '16oz': buildShape(PAPER_SPECS['16oz']),
};

const PLASTIC_SHAPES: Record<PlasticCupSize, CupShapeConfig> = {
  '8oz': buildShape(PLASTIC_SPECS['8oz']),
  '10oz': buildShape(PLASTIC_SPECS['10oz']),
  '12oz': buildShape(PLASTIC_SPECS['12oz']),
  '16oz': buildShape(PLASTIC_SPECS['16oz']),
};

export function getCupShape(material: CupMaterial, size: CupSize): CupShapeConfig {
  if (material === 'plastic') {
    return PLASTIC_SHAPES[size as PlasticCupSize] ?? PLASTIC_SHAPES['8oz'];
  }
  return PAPER_SHAPES[size as PaperCupSize] ?? PAPER_SHAPES['8oz'];
}

export function getCupBodyPath(shape: CupShapeConfig): string {
  const cx = shape.viewWidth / 2;
  const { topY, bottomY, topHalfWidth, bottomHalfWidth } = shape;
  return `
    M ${cx - topHalfWidth} ${topY}
    L ${cx - bottomHalfWidth} ${bottomY}
    Q ${cx} ${bottomY + 10} ${cx + bottomHalfWidth} ${bottomY}
    L ${cx + topHalfWidth} ${topY}
    Z
  `;
}

/** Half-width of the tapered cup body at a given Y coordinate. */
export function getHalfWidthAtY(shape: CupShapeConfig, y: number): number {
  const { topY, bottomY, topHalfWidth, bottomHalfWidth } = shape;
  const t = (y - topY) / (bottomY - topY);
  return topHalfWidth - (topHalfWidth - bottomHalfWidth) * t;
}

/** Colored sleeve band — full width at top, curved arc at bottom matching cup perspective. */
export function getPaperSleevePath(shape: CupShapeConfig): string {
  const cx = shape.viewWidth / 2;
  const bodyHeight = shape.bottomY - shape.topY;
  // sleeve ends closer to the bottom so the arc is visible above the white base
  const sleeveBottomY = shape.bottomY - bodyHeight * 0.08;
  const bottomW = getHalfWidthAtY(shape, sleeveBottomY);
  const { topY, topHalfWidth } = shape;
  // arc ry matches the perspective curve of the cup bottom
  const arcRy = Math.max(8, Math.round(bottomW * 0.09));
  return `
    M ${cx - topHalfWidth} ${topY}
    L ${cx - bottomW} ${sleeveBottomY}
    A ${bottomW} ${arcRy} 0 0 1 ${cx + bottomW} ${sleeveBottomY}
    L ${cx + topHalfWidth} ${topY}
    Z
  `;
}

export type LogoOffset = { x: number; y: number };

export const DEFAULT_LOGO_OFFSET: LogoOffset = { x: 0, y: 0 };

function getBaseLogoRect(shape: CupShapeConfig, logoScale = 1) {
  const cx = shape.viewWidth / 2;
  const bodyTop = shape.topY + 14;
  const bodyHeight = shape.bottomY - bodyTop;
  const logoY = bodyTop + bodyHeight * shape.logo.topPercent;
  const logoH = bodyHeight * shape.logo.heightPercent;
  const midY = logoY + logoH / 2;
  const taper = (midY - shape.topY) / (shape.bottomY - shape.topY);
  const halfWidth =
    shape.topHalfWidth - (shape.topHalfWidth - shape.bottomHalfWidth) * taper;
  const logoW = halfWidth * 2 * shape.logo.widthPercent;
  const scaledW = logoW * logoScale;
  const scaledH = logoH * logoScale;

  return {
    x: cx - scaledW / 2,
    y: logoY + (logoH - scaledH) / 2,
    width: scaledW,
    height: scaledH,
  };
}

/** Clamp logo offset (viewBox px from default position) so the logo stays on the cup body. */
export function clampLogoOffset(
  shape: CupShapeConfig,
  offset: LogoOffset,
  logoScale = 1
): LogoOffset {
  const base = getBaseLogoRect(shape, logoScale);
  const cx = shape.viewWidth / 2;
  const bodyTop = shape.topY + 14;
  const margin = 4;

  let x = base.x + offset.x;
  let y = base.y + offset.y;

  const minY = bodyTop + margin;
  const maxY = shape.bottomY - base.height - margin;
  y = Math.max(minY, Math.min(maxY, y));

  const midY = y + base.height / 2;
  const halfWidth = getHalfWidthAtY(shape, midY);

  // Order bounds so min <= max even when the logo is wider than the cup at this height.
  const leftBound = cx - halfWidth + margin;
  const rightBound = cx + halfWidth - base.width - margin;
  const minX = Math.min(leftBound, rightBound);
  const maxX = Math.max(leftBound, rightBound);
  x = Math.max(minX, Math.min(maxX, x));

  return {
    x: x - base.x,
    y: y - base.y,
  };
}

/** @deprecated Use clampLogoOffset */
export function clampLogoOffsetY(
  shape: CupShapeConfig,
  offsetY: number,
  logoScale = 1
): number {
  return clampLogoOffset(shape, { x: 0, y: offsetY }, logoScale).y;
}

export function getLogoRect(
  shape: CupShapeConfig,
  logoScale = 1,
  logoOffset: LogoOffset = DEFAULT_LOGO_OFFSET
) {
  const base = getBaseLogoRect(shape, logoScale);
  const clamped = clampLogoOffset(shape, logoOffset, logoScale);

  return {
    x: base.x + clamped.x,
    y: base.y + clamped.y,
    width: base.width,
    height: base.height,
  };
}

export const PLASTIC_CUP_IMAGE_PATH = '/images/demo/cups/plastic/clear-cup-base.png';

/** Reference photo dimensions (clear PET cup product shot). */
const PLASTIC_CUP_IMAGE_ASPECT = 484 / 453;

/** Layout for the photorealistic clear-cup photo mapped to each size's viewBox. */
export function getPlasticCupImageLayout(shape: CupShapeConfig) {
  const cx = shape.viewWidth / 2;
  const width = shape.topHalfWidth * 2.14;
  const height = width * PLASTIC_CUP_IMAGE_ASPECT;
  const y = shape.bottomY + 14 - height;

  return {
    x: cx - width / 2,
    y,
    width,
    height,
  };
}

export function getCupAssetPath(material: CupMaterial, size: CupSize): string {
  if (material === 'plastic') {
    return PLASTIC_CUP_IMAGE_PATH;
  }
  return `/images/demo/cups/${material}/${size}.svg`;
}

export function getPreviewHeightPx(size: CupSize, material: CupMaterial): number {
  return getCupShape(material, size).viewHeight;
}

/** Preview height scaled to fit UI while preserving real size ratios. */
export const PREVIEW_MAX_HEIGHT_PX = 400;

export function getScaledPreviewHeight(size: CupSize, material: CupMaterial): number {
  const height = getPreviewHeightPx(size, material);
  const maxHeight = Math.max(
    getPreviewHeightPx('16oz', 'paper'),
    getPreviewHeightPx('16oz', 'plastic')
  );
  return Math.round(height * (PREVIEW_MAX_HEIGHT_PX / maxHeight));
}
