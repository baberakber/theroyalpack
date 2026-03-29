import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);

function isImageFile(fileName: string): boolean {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function numericAwareCompare(a: string, b: string): number {
  // Keep simple and stable, but handle "8.png" < "12.png"
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

/**
 * List image URLs from a directory inside `public/`.
 *
 * @example
 * listPublicImages('images/products/Single Wall Cups')
 * // => ['/images/products/Single%20Wall%20Cups/8.png', ...]
 */
export function listPublicImages(relativeDir: string): string[] {
  const safeRelative = relativeDir.replace(/^[/\\]+/, '');
  const absDir = path.join(process.cwd(), 'public', safeRelative);

  let entries: string[] = [];
  try {
    entries = fs.readdirSync(absDir);
  } catch {
    return [];
  }

  const urls = entries
    .filter(isImageFile)
    .sort(numericAwareCompare)
    .map((fileName) => {
      const urlPath = `/${safeRelative.replace(/\\/g, '/')}/${fileName}`;
      return encodeURI(urlPath);
    });

  return urls;
}

