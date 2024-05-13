import config from "@/config/config.json";
import languages from "@/config/language.json";

const disabledLanguages = config.settings.disable_languages as string[];

export const getTranslations = async (lang: string) => {
  const menu = await import(`@/config/menu.${lang}.json`);
  const dictionary = await import(`@/i18n/${lang}.json`);
  return { ...menu, ...dictionary };
};

export const getLanguageObj = (lang: string) => {
  return languages?.find((language) => language.languageCode === lang)!;
};

export const getActiveLanguages = () => {
  return languages.filter(
    (lang) => !disabledLanguages.includes(lang.languageCode),
  );
};

export const getDefaultLanguage = () => {
  return config.settings.default_language;
};
