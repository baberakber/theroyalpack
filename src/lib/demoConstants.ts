export type CupMaterial = 'paper' | 'plastic';

export type PaperCupSize = '4oz' | '7oz' | '8oz' | '12oz' | '16oz';
export type PlasticCupSize = '8oz' | '10oz' | '12oz' | '16oz';
export type CupSize = PaperCupSize | PlasticCupSize;

export const PAPER_CUP_SIZES: PaperCupSize[] = ['4oz', '7oz', '8oz', '12oz', '16oz'];
export const PLASTIC_CUP_SIZES: PlasticCupSize[] = ['8oz', '10oz', '12oz', '16oz'];

export const SIZE_HEIGHT_RATIO: Record<CupSize, number> = {
  '4oz': 1.0,
  '7oz': 1.25,
  '8oz': 1.35,
  '10oz': 1.45,
  '12oz': 1.6,
  '16oz': 1.85,
};

export type ColorSwatchKey =
  | 'white'
  | 'kraft'
  | 'black'
  | 'coral'
  | 'green'
  | 'navy'
  | 'teal'
  | 'amber';

export const PAPER_COLOR_SWATCHES: { key: ColorSwatchKey; hex: string }[] = [
  { key: 'white', hex: '#FFFFFF' },
  { key: 'kraft', hex: '#C4935A' },
  { key: 'black', hex: '#1F2937' },
  { key: 'coral', hex: '#EF4444' },
  { key: 'green', hex: '#059669' },
  { key: 'navy', hex: '#1E40AF' },
  { key: 'teal', hex: '#0D9488' },
  { key: 'amber', hex: '#F59E0B' },
];

export const PLASTIC_CLEAR_COLOR = 'clear';
export const MAX_LOGO_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_LOGO_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
export const LOGO_SCALE_MIN = 0.35;
export const LOGO_SCALE_MAX = 2;
export const LOGO_SCALE_DEFAULT = 1;

export function getSizesForMaterial(material: CupMaterial): CupSize[] {
  return material === 'paper' ? PAPER_CUP_SIZES : PLASTIC_CUP_SIZES;
}

export function getValidSize(material: CupMaterial, size: CupSize): CupSize {
  const sizes = getSizesForMaterial(material);
  if ((sizes as readonly CupSize[]).includes(size)) {
    return size;
  }
  return sizes[0];
}
