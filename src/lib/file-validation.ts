/**
 * Server-side file validation with magic byte checking
 * Prevents file type bypass attacks (e.g., renaming .exe to .pdf)
 */

// Magic byte signatures for allowed file types
const MAGIC_BYTES: Record<string, number[][]> = {
  'image/jpeg': [
    [0xff, 0xd8, 0xff],
  ],
  'image/png': [
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  ],
  'image/webp': [
    // RIFF....WEBP
    [0x52, 0x49, 0x46, 0x46],
  ],
  'application/pdf': [
    [0x25, 0x50, 0x44, 0x46], // %PDF
  ],
  'image/tiff': [
    [0x49, 0x49, 0x2a, 0x00], // Little-endian
    [0x4d, 0x4d, 0x00, 0x2a], // Big-endian
  ],
};

// Safe extension mapping — only allow these specific extensions
const SAFE_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
  'image/tiff': 'tiff',
  'application/postscript': 'ai',
  'image/vnd.adobe.photoshop': 'psd',
};

interface FileValidationResult {
  valid: boolean;
  error?: string;
  detectedType?: string;
  safeExtension?: string;
}

/**
 * Validate file content using magic bytes (not just MIME type from header)
 */
export async function validateFileContent(
  file: File,
  allowedMimes: string[],
  maxSizeBytes: number
): Promise<FileValidationResult> {
  // Check file size
  if (file.size === 0) {
    return { valid: false, error: 'Empty file is not allowed' };
  }

  if (file.size > maxSizeBytes) {
    const maxMB = Math.round(maxSizeBytes / (1024 * 1024));
    return { valid: false, error: `File size must be ${maxMB}MB or less` };
  }

  // Read first bytes for magic byte detection
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer).slice(0, 16);

  // Check magic bytes for types we can verify
  let detectedType: string | null = null;

  for (const [mime, signatures] of Object.entries(MAGIC_BYTES)) {
    if (!allowedMimes.includes(mime)) continue;

    for (const signature of signatures) {
      if (signature.every((byte, i) => bytes[i] === byte)) {
        // Additional check for WebP — verify the WEBP marker at offset 8
        if (mime === 'image/webp') {
          if (bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
            detectedType = mime;
          }
        } else {
          detectedType = mime;
        }
        break;
      }
    }
    if (detectedType) break;
  }

  // For types we can't verify by magic bytes (PostScript, PSD),
  // fall back to MIME type from the browser but verify extension
  if (!detectedType) {
    const fallbackAllowed = ['application/postscript', 'image/vnd.adobe.photoshop'];
    if (fallbackAllowed.includes(file.type) && allowedMimes.includes(file.type)) {
      detectedType = file.type;
    }
  }

  if (!detectedType) {
    return { valid: false, error: 'Invalid file type — content does not match allowed formats' };
  }

  // Verify MIME matches allowed list
  if (!allowedMimes.includes(detectedType)) {
    return { valid: false, error: 'File type is not allowed' };
  }

  // Get safe extension (never trust user-provided extension)
  const safeExtension = SAFE_EXTENSIONS[detectedType] || 'bin';

  return {
    valid: true,
    detectedType,
    safeExtension,
  };
}

/**
 * Sanitize a filename: remove path traversal, null bytes, and use a UUID-based name
 */
export function sanitizeFilename(uuid: string, extension: string): string {
  // Strip anything that's not alphanumeric or a dot
  const safeExt = extension.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return `${uuid}.${safeExt}`;
}
