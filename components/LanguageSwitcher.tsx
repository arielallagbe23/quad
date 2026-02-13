"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { useLocale, useTranslations } from "@/components/providers/I18nProvider";

function buildLocalePath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }

  return `/${segments.join("/")}`;
}

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const t = useTranslations("languageSwitcher");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSwitch = (nextLocale: Locale) => {
    if (nextLocale === currentLocale) {
      return;
    }

    const nextPath = buildLocalePath(pathname, nextLocale);
    const query = searchParams.toString();
    const nextUrl = query ? `${nextPath}?${query}` : nextPath;

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  };

  return (
    <div
      className="inline-flex items-center rounded-full border border-line bg-white p-1 shadow-soft"
      role="group"
      aria-label={t("label")}
    >
      {locales.map((localeOption) => {
        const active = localeOption === currentLocale;

        return (
          <button
            key={localeOption}
            type="button"
            onClick={() => onSwitch(localeOption)}
            disabled={isPending}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 ease-premium ${
              active ? "bg-navy text-white" : "text-ink/70 hover:bg-cloud"
            }`}
            aria-pressed={active}
          >
            {t(localeOption)}
          </button>
        );
      })}
    </div>
  );
}
