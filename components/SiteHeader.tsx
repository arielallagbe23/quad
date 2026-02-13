"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale, useTranslations } from "@/components/providers/I18nProvider";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  const links = useMemo(
    () => [
      { label: tNav("home"), href: `/${locale}` },
      { label: tNav("catalog"), href: `/${locale}/catalog` },
      { label: tNav("circuits"), href: `/${locale}#tourism-circuits` },
      { label: tNav("ridingClub"), href: `/${locale}#riding-club` }
    ],
    [locale, tNav]
  );

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/95 backdrop-blur">
      <div className="container-luxe flex items-center justify-between gap-3 py-3">
        <Link href={`/${locale}`} className="shrink-0" aria-label={tCommon("siteName")}>
          <BrandLogo alt={tCommon("siteName")} priority />
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label={tNav("ariaLabel")}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-ink/75 transition-colors hover:text-navy">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/catalog`}
            className="rounded-full bg-navy px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 ease-premium hover:bg-navy/90 hover:shadow-soft"
          >
            {tNav("viewActivities")}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy transition-colors hover:bg-cloud"
            aria-label={isMenuOpen ? tNav("closeMenu") : tNav("openMenu")}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            <span className="sr-only">{isMenuOpen ? tNav("closeMenu") : tNav("openMenu")}</span>
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[2px] w-5 bg-current transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-[2px] w-5 bg-current transition-all duration-300 ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-line/70 transition-all duration-300 ease-premium md:hidden ${
          isMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-luxe py-3">
          <nav aria-label={tNav("ariaLabel")} className="rounded-3xl border border-line bg-white p-3 shadow-soft">
            <div className="space-y-1">
              {links.map((link) => (
                <Link
                  key={`mobile-${link.href}`}
                  href={link.href}
                  className="block rounded-2xl px-3 py-2.5 text-sm text-ink/80 transition-colors hover:bg-cloud hover:text-navy"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href={`/${locale}/catalog`}
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-navy px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white"
            >
              {tNav("viewActivities")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
