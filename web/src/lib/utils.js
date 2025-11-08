import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class name utility function
 * Merges class names using tailwind-merge to handle conflicts
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}