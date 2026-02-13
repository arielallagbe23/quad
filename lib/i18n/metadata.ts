import { defaultLocale, locales } from "@/lib/i18n/config";

export function createLocaleAlternates(pathname: string) {
  const normalized = pathname === "/" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  const languages = Object.fromEntries(locales.map((locale) => [locale, `/${locale}${normalized}`]));

  return {
    canonical: `/${defaultLocale}${normalized}`,
    languages: {
      ...languages,
      "x-default": `/${defaultLocale}${normalized}`
    }
  };
}
