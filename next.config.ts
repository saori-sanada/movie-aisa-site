import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubPages ? "/movie-aisa-site" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  typescript: isGitHubPages
    ? {
        tsconfigPath: "tsconfig.pages.json",
      }
    : undefined,
};

export default nextConfig;
