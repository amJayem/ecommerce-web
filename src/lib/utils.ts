import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Returns a safe image src. Falls back to placeholder for invalid or non-image URLs
export function getSafeImageSrc(src?: string) {
  const placeholder = "/img/placeholder_image.png";
  if (!src || typeof src !== "string") return placeholder;

  // Allow static public assets and data URLs
  if (src.startsWith("/")) return src;
  if (src.startsWith("data:image/")) return src;

  try {
    const parsed = new URL(src);

    // Disallow obvious non-image app routes (e.g., dashboard pages)
    if (parsed.pathname.includes("/dashboard")) return placeholder;

    // Accept only common image extensions
    const isImagePath = /\.(png|jpe?g|webp|gif|svg)$/i.test(parsed.pathname);
    if (!isImagePath) return placeholder;

    return src;
  } catch {
    // Not a valid URL
    return placeholder;
  }
}
