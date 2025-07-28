import type { NextConfig } from "next";

const imageDomains =
  process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",").map((domain) =>
    domain.trim()
  ) || [];

const nextConfig: NextConfig = {
  images: {
    domains: imageDomains,
  },
};

export default nextConfig;
