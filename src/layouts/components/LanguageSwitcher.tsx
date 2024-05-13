import languages from "@/config/language.json";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

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
