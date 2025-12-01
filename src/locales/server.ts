import { createI18nServer } from "next-international/server";

// Build a mapping of locale -> dynamic import using the locales defined in config.json
const localeImports = {
  ar: () => import("../i18n/ar.json"),
  en: () => import("../i18n/en.json"),
  fr: () => import("../i18n/fr.json"),
};

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer(localeImports);
