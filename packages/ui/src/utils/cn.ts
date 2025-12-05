import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function to merge class names using clsx
 * Combines multiple class values with proper handling of conditionals
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
