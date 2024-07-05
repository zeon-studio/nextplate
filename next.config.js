const config = require("./src/config/config.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  // output: "standalone",
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
  },

  // Aid in debugging and understanding what's in the cache, revalidated...
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
