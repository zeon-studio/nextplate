import { languages } from "@/config/language.json";
import "server-only";

export const getDictionary = async (lang: string) => {
  const menu = await import(`@/config/menu.${lang}.json`);
  const dictionary = await import(`@/i18n/${lang}.json`);
  return { ...menu, ...dictionary };
};

export const getLanguages = (lang: string) => {
  return languages.find((language) => language.languageCode === lang)!;
};
