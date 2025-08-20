import type { NextConfig } from "next";

const imageDomains =
  process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",").map((domain) =>
    domain.trim()
  ) || [];

console.log("imageDomains", imageDomains);

const nextConfig: NextConfig = {
  images: {
    domains: [...imageDomains, "localhost", "127.0.0.1"],
  },
};

export default nextConfig;
