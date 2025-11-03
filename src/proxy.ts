// middleware.ts
import configFile from "@/config/config.json";
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";
const localeConfig = configFile.internationalization;

const I18nMiddleware = createI18nMiddleware({
  locales: localeConfig.locales.map((loc) => loc.value),
  defaultLocale: localeConfig.defaultLocale,
  urlMappingStrategy: "rewriteDefault",
});

export function proxy(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.png|robots.txt).*)"],
};
