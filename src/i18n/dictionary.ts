import "server-only";

export const getDictionary = async (lang: string) => {
  const menu = await import(`@/config/menu.${lang}.json`);
  return { ...menu };
};
