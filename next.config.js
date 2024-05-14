const config = require("./src/config/config.json");
const languages = require("./src/config/language.json");
const disableLanguages = config.settings.disable_languages;
const activeLanguages = languages.filter(
  (lang) => !disableLanguages.includes(lang.languageCode),
);

const defaultLanguage = config.settings.default_language;

const otherLanguages = activeLanguages
  .map((lang) => lang.languageCode)
  .filter((lang) => lang !== defaultLanguage);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: "standalone",
  async rewrites() {
    if (config.settings.default_language_in_subdir) {
      return [];
    }

    return activeLanguages.length !== 1
      ? [
          {
            source: `/:lang(!${defaultLanguage}|${otherLanguages.join("|")})/:path*`,
            destination: `/:lang/:path*`,
          },
          {
            source: `/:path*`,
            destination: `/${defaultLanguage}/:path*`,
          },
        ]
      : [
          {
            source: `/${defaultLanguage}/:path*`,
            destination: `/${defaultLanguage}/:path*`,
          },
          {
            source: "/:path*",
            destination: `/${defaultLanguage}/:path*`,
          },
        ];
  },
};

module.exports = nextConfig;
