import config from "@/config/config.json";

const localeConfig = config.internationalization;

// Server-side function to get menu based on locale
export async function getLocaleMenu(locale: string) {
  try {
    // Dynamically import the menu JSON based on locale
    const menuData = await import(`@/config/menu.${locale}.json`);
    return menuData.default || menuData;
  } catch (error) {
    console.error(`Error loading menu for locale ${locale}:`, error);
    // Fallback to default menu from `@/locales/config` if locale-specific menu doesn't exist
    const defaultLocale = localeConfig.defaultLocale;
    const fallbackMenu = await import(`@/config/menu.${defaultLocale}.json`);
    return fallbackMenu.default || fallbackMenu;
  }
}
