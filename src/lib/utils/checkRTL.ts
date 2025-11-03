import config from "@/config/config.json";
import { getCurrentLocale } from "@/locales/server";

const rtlLocales = [
  "ar", // Arabic
  "he", // Hebrew
  "fa", // Persian (Farsi)
  "ur", // Urdu
  "ps", // Pashto
  "sd", // Sindhi
  "ug", // Uyghur
  "ku", // Kurdish (Sorani)
  "dv", // Divehi
  "syr", // Syriac
  "arc", // Aramaic
  "az-IR", // Azeri (Iran) - specific locale for RTL
];

export async function getDir() {
  const locale = await getCurrentLocale();
  const dir =
    config.internationalization.enableRTL && rtlLocales.includes(locale)
      ? "rtl"
      : "ltr";
  return dir;
}
