import type { NextConfig } from "next";

const imageDomains =
  process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",")
    .map((domain) => domain.trim())
    .filter(Boolean) || [];

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Extract hostname from API base URL if it's a valid URL
let apiHostname: string | null = null;
if (apiBaseUrl) {
  try {
    const url = new URL(apiBaseUrl);
    apiHostname = url.hostname;
  } catch {
    // Invalid URL, ignore
    console.error("Invalid API base URL", apiBaseUrl);
  }
}

console.log("imageDomains", imageDomains);
console.log("apiBaseUrl", [apiBaseUrl]);
console.log("apiHostname", [apiHostname]);

// Build remotePatterns from domains for Next.js 13+ compatibility
const remotePatterns: Array<{ protocol: "http" | "https"; hostname: string }> =
  [];

// Add domains from NEXT_PUBLIC_IMAGE_DOMAINS
imageDomains.forEach((domain) => {
  remotePatterns.push(
    { protocol: "https" as const, hostname: domain },
    { protocol: "http" as const, hostname: domain }
  );
});

// Add API hostname if it exists and isn't already in the list
if (apiHostname && !imageDomains.includes(apiHostname)) {
  remotePatterns.push(
    { protocol: "https" as const, hostname: apiHostname },
    { protocol: "http" as const, hostname: apiHostname }
  );
}

// Add default domains
const defaultDomains = [
  { protocol: "https" as const, hostname: "cdn.shopify.com" },
  { protocol: "http" as const, hostname: "localhost" },
  { protocol: "http" as const, hostname: "127.0.0.1" },
];

defaultDomains.forEach((domain) => {
  if (!remotePatterns.some((p) => p.hostname === domain.hostname)) {
    remotePatterns.push(domain);
  }
});

const allDomains = [
  ...imageDomains,
  ...(apiHostname && !imageDomains.includes(apiHostname) ? [apiHostname] : []),
  "localhost",
  "127.0.0.1",
  "cdn.shopify.com",
].filter(Boolean);

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns,
    // Keep domains for backward compatibility, but remotePatterns takes precedence in Next.js 13+
    domains: allDomains,
    unoptimized: false,
  },
};

export default nextConfig;
