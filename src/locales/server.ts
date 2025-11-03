import { createI18nServer } from "next-international/server";

// Build a mapping of locale -> dynamic import using the locales defined in config.json
const localeImports = {
  ar: () => import("./ar"),
  en: () => import("./en"),
  fr: () => import("./fr"),
};

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer(localeImports);
