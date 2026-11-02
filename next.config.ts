import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  outputFileTracingIncludes: {
    "/api/try-on": ["./public/catalog/**"],
    "/api/try-on/follow-up": ["./public/catalog/**"],
  },
  outputFileTracingExcludes: {
    "*": [
      "./public/behr/**",
      "./public/blindsgalore/**",
      "./public/chemimpex/**",
      "./public/demo-assets/**",
      "./public/demo/**",
      "./public/dreamland-baby/**",
      "./public/frontdoor/**",
      "./public/gap/**",
      "./public/jr/**",
      "./public/million-dollar-baby/**",
      "./public/mobikasa-geturns/**",
      "./public/nix-united/**",
      "./public/*.jpg",
      "./public/*.jpeg",
      "./public/*.png",
      "./public/*.webp",
      "./public/*.svg",
    ],
  },
};

export default nextConfig;
