import config from "@/config/config.json";
import languages from "@/config/language.json";

const disabledLanguages = config.settings.disable_languages as string[];

export const getDictionary = async (lang: string) => {
  const menu = await import(`@/config/menu.${lang}.json`);
  const dictionary = await import(`@/i18n/${lang}.json`);
  return { ...menu, ...dictionary };
};

export const getLanguage = (lang: string) => {
  return languages?.find((language) => language.languageCode === lang)!;
};

export const getActiveLanguage = () => {
  return languages.filter(
    (lang) => !disabledLanguages.includes(lang.languageCode),
  );
};

export const getDefaultLanguage = () => {
  const activeLanguages = getActiveLanguage();
  return activeLanguages.length === 1
    ? activeLanguages[0].languageCode
    : config.settings.default_language;
};
