"use client";

import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale, useTranslations } from "@/components/providers/I18nProvider";

export default function SiteHeader() {
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/95 backdrop-blur">
      <div className="container-luxe flex items-center justify-between gap-4 py-3">
        <Link href={`/${locale}`} className="shrink-0" aria-label={tCommon("siteName")}>
          <BrandLogo alt={tCommon("siteName")} priority />
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label={tNav("ariaLabel")}>
          <Link href={`/${locale}`} className="text-sm text-ink/75 transition-colors hover:text-navy">
            {tNav("home")}
          </Link>
          <Link href={`/${locale}/catalog`} className="text-sm text-ink/75 transition-colors hover:text-navy">
            {tNav("catalog")}
          </Link>
          <Link href={`/${locale}#tourism-circuits`} className="text-sm text-ink/75 transition-colors hover:text-navy">
            {tNav("circuits")}
          </Link>
          <Link href={`/${locale}#riding-club`} className="text-sm text-ink/75 transition-colors hover:text-navy">
            {tNav("ridingClub")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/catalog`}
            className="rounded-full bg-navy px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 ease-premium hover:bg-navy/90 hover:shadow-soft"
          >
            {tNav("viewActivities")}
          </Link>
        </div>
      </div>
    </header>
  );
}
