import {
  getActiveLanguages,
  getDefaultLanguage,
  getTranslations,
} from "@/lib/languageParser";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useTranslate() {
  const [data, setData] = useState<any>();
  const pathname = usePathname();
  const possibleLang = pathname.split("/")[1];

  const lang = getActiveLanguages().some((lang) =>
    lang.languageCode.includes(possibleLang),
  )
    ? possibleLang
    : getDefaultLanguage();

  if (typeof window !== "undefined" && !data) {
    setData(JSON.parse(localStorage.getItem(`content-${lang}`) ?? `{}`));
  }

  useEffect(() => {
    if (lang) {
      getTranslations(lang).then((res) => {
        localStorage.setItem(`content-${lang}`, JSON.stringify(res));
        setData(res);
      });
    }
  }, []);

  return { ...(data ?? {}), lang };
}
