import config from "./src/config/config.json" with { type: "json" };

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
};

export default nextConfig;
