import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import config from "@/config/config.json";

const localeConfig = config.internationalization;

export const routing = defineRouting({
  locales: localeConfig.locales.map((l) => l.value),
  defaultLocale: localeConfig.defaultLocale,
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
