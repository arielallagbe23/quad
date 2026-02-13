"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "@/components/providers/I18nProvider";

export default function LocaleNotFound() {
  const locale = useLocale();
  const t = useTranslations("notFound");

  return (
    <main className="section-pad">
      <section className="container-luxe rounded-3xl border border-line bg-white p-8 text-center shadow-soft">
        <h1 className="heading-md text-ink">{t("title")}</h1>
        <p className="mt-2 text-sm text-ink/70">{t("description")}</p>
        <Link href={`/${locale}/catalog`} className="mt-5 inline-flex rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white">
          {t("backToCatalog")}
        </Link>
      </section>
    </main>
  );
}
