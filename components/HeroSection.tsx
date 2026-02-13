"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { useLocale, useTranslations } from "@/components/providers/I18nProvider";

export default function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 image-grid opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(198,255,0,0.16),rgba(10,37,64,0))]" />

      <div className="container-luxe relative grid gap-8 pb-10 pt-8 sm:pb-14 sm:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="space-y-5"
        >
          <p className="inline-flex rounded-full border border-white/25 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/85">
            {t("badge")}
          </p>
          <h1 className="heading-xl max-w-[14ch] text-white">{t("title")}</h1>
          <p className="max-w-[38ch] text-sm leading-relaxed text-white/80 sm:text-[15px]">{t("subtitle")}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/catalog`}
              className="rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-soft"
            >
              {t("primaryCta")}
            </Link>
            <Link
              href={`/${locale}#tourism-circuits`}
              className="rounded-full border border-white/35 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 ease-premium hover:bg-white/10"
            >
              {t("secondaryCta")}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="space-y-4"
        >
          <ImagePlaceholder ratio="4:5" label={t("imageLabel")} dark className="w-full" />
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-3xl border border-white/20 bg-white/8 p-4">
              <p className="text-xl font-semibold">{t("stats.activitiesValue")}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/75">{t("stats.activitiesLabel")}</p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/8 p-4">
              <p className="text-xl font-semibold">{t("stats.mobileValue")}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/75">{t("stats.mobileLabel")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
