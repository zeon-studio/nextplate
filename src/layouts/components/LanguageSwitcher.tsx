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
      {localeConfig.localeDetails.map((locale) => (
        <option key={locale.value} id={locale.value} value={locale.value}>
          {locale.name}
        </option>
      ))}
    </select>
  );
}
