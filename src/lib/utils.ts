import { clsx, type ClassValue } from 'clsx';

/**
 * Combines class names using clsx
 * Utility function for conditional class name merging
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
