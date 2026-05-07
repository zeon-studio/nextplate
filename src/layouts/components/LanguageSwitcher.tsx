"use client";

import config from "@/config/config.json";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

const localeConfig = config.internationalization;
export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <select
      name="language"
      value={locale}
      className={className}
      onChange={(e) => {
        const language = e.target.value;
        changeLocale(language);
      }}
    >
      {localeConfig.locales.map((locale) => (
        <option key={locale.value} id={locale.value} value={locale.value}>
          {locale.name}
        </option>
      ))}
    </select>
  );
}
