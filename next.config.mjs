import config from "./src/config/config.json" with { type: "json" };
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
};

export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
