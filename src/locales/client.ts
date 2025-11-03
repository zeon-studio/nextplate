"use client";
import { createI18nClient } from "next-international/client";

// Build a static mapping of locale -> import function.
const clientLocales = {
  ar: () => import("./ar"),
  en: () => import("./en"),
  fr: () => import("./fr"),
};

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useCurrentLocale,
  useChangeLocale,
} = createI18nClient(clientLocales);
