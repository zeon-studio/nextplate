import setting from "@/config/config.json";
import { getActiveLanguages, getDefaultLanguage } from "@/lib/languageParser";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse, type NextRequest } from "next/server";

const activeLanguages = getActiveLanguages();
let locales = activeLanguages?.map((lang) => lang.languageCode);
const defaultLocale = getDefaultLanguage();

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = matchLocale(languages, locales, defaultLocale);
  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale && setting.settings.default_language_in_subdir) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
