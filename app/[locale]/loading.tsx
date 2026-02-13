"use client";

import { useTranslations } from "@/components/providers/I18nProvider";

export default function LocaleLoading() {
  const t = useTranslations("loading");

  return (
    <main className="section-pad">
      <section className="container-luxe space-y-4">
        <p className="text-xs uppercase tracking-[0.18em] text-ink/55">{t("badge")}</p>
        <h1 className="heading-md text-ink">{t("title")}</h1>
        <p className="text-sm text-ink/70">{t("subtitle")}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3 rounded-3xl border border-line bg-white p-4 shadow-soft">
              <div className="aspect-[16/9] animate-pulse rounded-3xl bg-cloud" />
              <div className="h-5 w-2/3 animate-pulse rounded-full bg-line" />
              <div className="h-4 w-full animate-pulse rounded-full bg-line" />
              <div className="h-4 w-3/4 animate-pulse rounded-full bg-line" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
