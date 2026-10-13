
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Extend Tailwind Merge with our custom
 * design-system radius and shadow tokens.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ["control", "surface", "overlay"],
      shadow: ["surface", "overlay"],
    },
  },
});

/**
 * Combines conditional class names and resolves
 * recognized conflicting Tailwind utilities.
 *
 * Later conflicting utilities take precedence.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
