"use client";
import { createI18nClient } from "next-international/client";

// Build a static mapping of locale -> import function.
const clientLocales = {
  ar: () => import("../i18n/ar.json"),
  en: () => import("../i18n/en.json"),
  fr: () => import("../i18n/fr.json"),
};

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useCurrentLocale,
  useChangeLocale,
} = createI18nClient(clientLocales);
