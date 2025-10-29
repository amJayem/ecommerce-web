import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Returns a safe image src. Falls back to placeholder for clearly invalid URLs
export function getSafeImageSrc(src?: string) {
  const placeholder =
    "https://cdn.shopify.com/s/files/1/0850/9797/2012/files/placeholder_image.webp?v=1757652031";
  if (!src || typeof src !== "string") return placeholder;

  // Allow static public assets and data URLs
  if (src.startsWith("/")) return src;
  if (src.startsWith("data:image/")) return src;

  try {
    const parsed = new URL(src);
    // Only allow http(s) protocols
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return placeholder;
    }

    // If it is a valid http(s) URL, trust it (file extensions may be missing on many CDNs/APIs)
    return parsed.toString();
  } catch {
    // Not a valid URL
    return placeholder;
  }
}
