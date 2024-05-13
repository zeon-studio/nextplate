export function concatenatePath(lang: string, href: string) {
  const defaultLang = "en";
  lang = lang === defaultLang ? "" : lang.replace(/^\/|\/$/g, "");
  href = href.replace(/^\/|\/$/g, "");

  if (lang !== "") {
    lang = `/${lang}`;
  }

  return `${lang}/${href}`;
}
