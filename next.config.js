const { act } = require("react");
const config = require("./src/config/config.json");
const languages = require("./src/config/language.json");
const disableLanguages = config.settings.disable_languages;
const activeLanguages = languages.filter(
  (lang) => !disableLanguages.includes(lang.languageCode),
);

const defaultLanguage =
  activeLanguages.length === 1
    ? activeLanguages[0].languageCode
    : config.settings.default_language;
const activeLanguagesCodes = activeLanguages
  .map((lang) => lang.languageCode)
  .filter((lang) => lang !== defaultLanguage);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: "standalone",
  async rewrites() {
    return activeLanguages.length !== 1
      ? [
          {
            source: `/:lang(!${defaultLanguage}|${activeLanguagesCodes.join("|")})/:path*`,
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
