"use client";

import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { useLocale, useTranslations } from "@/components/providers/I18nProvider";

export default function SiteFooter() {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");

  return (
    <footer className="border-t border-line bg-white">
      <div className="container-luxe grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href={`/${locale}`} className="inline-flex" aria-label={tCommon("siteName")}>
            <BrandLogo alt={tCommon("siteName")} />
          </Link>
          <p className="mt-3 text-sm text-ink/70">{tFooter("tagline")}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">{tFooter("contactTitle")}</p>
          <ul className="mt-3 space-y-2 text-sm text-ink/75">
            <li>{tFooter("email")}</li>
            <li>{tFooter("phone")}</li>
            <li>{tFooter("location")}</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">{tFooter("whatsappTitle")}</p>
          <p className="mt-3 text-sm text-ink/75">{tFooter("phone")}</p>
          <Link href="#" className="mt-2 inline-block text-sm font-medium text-navy underline-offset-4 hover:underline">
            {tCommon("openChat")}
          </Link>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/65">{tFooter("socialTitle")}</p>
          <ul className="mt-3 space-y-2 text-sm text-ink/75">
            <li>
              <Link href="#" className="hover:text-navy">
                {tFooter("instagram")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-navy">
                {tFooter("facebook")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-navy">
                {tFooter("twitter")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
