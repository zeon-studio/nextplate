import config from "@/config/config.json";
import { getDefaultLanguage } from "@/lib/languageParser";

export function slugSelector(lang: string, href: string) {
  const defaultLang = getDefaultLanguage();
  lang =
    lang === defaultLang && !config.settings.default_language_in_subdir
      ? ""
      : lang.replace(/^\/|\/$/g, "");
  href = href.replace(/^\/|\/$/g, "");

  if (lang !== "") {
    lang = `/${lang}`;
  }

  return `${lang}/${href}`;
}
