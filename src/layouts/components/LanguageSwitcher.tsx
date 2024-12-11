import languages from "@/config/language.json";
import { slugSelector } from "@/lib/utils/slugSelector";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function LanguageSwitcher({
  className,
  lang,
}: {
  className?: string;
  lang: string;
}) {
  const [language, setLanguage] = useState(lang);
  const router = useRouter();
  const pathname = usePathname();

  const redirectedPathName = useCallback(
    (locale: string) => {
      const hasLocale = languages.some((lang) => {
        return pathname.includes(lang.languageCode);
      });
      const sliceNumber = hasLocale ? 2 : 1;
      router.push(
        slugSelector(locale, pathname.split("/").slice(sliceNumber).join("/")),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
