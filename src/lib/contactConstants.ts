/** Digits only — use with https://wa.me/{digits} */
export const WHATSAPP_NUMBER_DIGITS = '966556240690';

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER_DIGITS}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
