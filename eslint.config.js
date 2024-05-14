// eslint.config.js
export default [
  {
    extends: ["next/core-web-vitals"],
    rules: {
      "@next/next/no-img-element": "off",
    },
    ignorePatterns: ["node_modules", "dist/*", ".cache", "public", "*.esm.js"],
  },
];
