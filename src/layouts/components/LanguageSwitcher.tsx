import config from "@/config/config.json";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";

const localeConfig = config.internationalization;
export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const changeLocale = useChangeLocale({ preserveSearchParams: true });
  const currentLocale = useCurrentLocale();

  return (
    <select
      name="language"
      value={currentLocale}
      className={className}
      onChange={(e) => {
        const language = e.target.value;
        changeLocale(language as any);
      }}
    >
      {localeConfig.locales.map((locale) => (
        <option key={locale} id={locale} value={locale}>
          {localeConfig.localeDetails.find((l) => l.value === locale)?.name}
        </option>
      ))}
    </select>
  );
}
