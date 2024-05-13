import languages from "@/config/language.json";
import { concatenatePath } from "@/lib/concatenatePath";
import { getDefaultLanguage } from "@/lib/utils/languageParser";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";
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
  const segments = useSelectedLayoutSegments();

  const redirectedPathName = useCallback(
    (locale: string) => {
      if (locale === defaultLang) {
        router.push(
          concatenatePath("/", pathname.split("/").splice(2).join("/")),
        );
      } else {
        router.push(concatenatePath(locale, pathname));
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
