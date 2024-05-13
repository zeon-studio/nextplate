import config from "@/config/config.json";
import languages from "@/config/language.json";
import { getDefaultLanguage } from "@/lib/languageParser";
import { slugSelector } from "@/lib/utils/slugSelector";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export default function LanguageSwitcher({
  className,
  lang,
}: {
  className?: string;
  lang: string;
}) {
  const defaultLang = useMemo(getDefaultLanguage, []);
  const [language, setLanguage] = useState(lang);
  const router = useRouter();
  const pathname = usePathname();

  const redirectedPathName = useCallback(
    (locale: string) => {
      if (config.settings.default_language_in_subdir) {
        const segments = pathname.split("/");
        segments[1] = locale;
        router.push(segments.join("/"));
      } else {
        if (locale === defaultLang) {
          router.push(
            slugSelector("/", pathname.split("/").splice(2).join("/")),
          );
        } else {
          router.push(slugSelector(locale, pathname));
        }
      }
    },
    [pathname],
  );

  return (
    <select
      name="language"
      value={language}
      className={className}
      onChange={(e) => {
        const language = e.target.value;
        setLanguage(language);
        redirectedPathName(language);
      }}
    >
      {languages.map((language) => (
        <option
          key={language.languageCode}
          id={language.languageCode}
          value={language.languageCode.toLowerCase()}
        >
          {language.languageName}
        </option>
      ))}
    </select>
  );
}
