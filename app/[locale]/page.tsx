import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/HeroSection";
import ActivityCard from "@/components/ActivityCard";
import Gallery from "@/components/Gallery";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import SectionReveal from "@/components/SectionReveal";
import { activities } from "@/lib/activities";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { createLocaleAlternates } from "@/lib/i18n/metadata";
import { getMessages } from "@/lib/i18n/messages";
import { resolveLocale } from "@/lib/i18n/request";
import { createTranslator } from "@/lib/i18n/translate";

type HomePageProps = {
  params: {
    locale: string;
  };
};

const previewActivities = activities.slice(0, 3);
const circuitIds = ["one", "two", "three", "four"] as const;

export function generateMetadata({ params }: HomePageProps): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const messages = getMessages(locale);
  const tMeta = createTranslator(messages, "meta.home");

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: createLocaleAlternates("/"),
    openGraph: {
      title: tMeta("title"),
      description: tMeta("description")
    }
  };
}

export default function HomePage({ params }: HomePageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);
  const t = createTranslator(messages);

  const galleryItems = [
    { label: t("home.gallery.imageLabels.one"), ratio: "16:9" as const },
    { label: t("home.gallery.imageLabels.two"), ratio: "4:5" as const },
    { label: t("home.gallery.imageLabels.three"), ratio: "1:1" as const },
    { label: t("home.gallery.imageLabels.four"), ratio: "16:9" as const },
    { label: t("home.gallery.imageLabels.five"), ratio: "4:5" as const },
    { label: t("home.gallery.imageLabels.six"), ratio: "1:1" as const },
    { label: t("home.gallery.imageLabels.seven"), ratio: "16:9" as const },
    { label: t("home.gallery.imageLabels.eight"), ratio: "4:5" as const }
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />

        <section id="activities" className="section-pad">
          <div className="container-luxe space-y-7">
            <SectionReveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink/55">{t("home.activities.badge")}</p>
                  <h2 className="heading-lg mt-2 text-ink">{t("home.activities.title")}</h2>
                </div>
                <Link href={`/${locale}/catalog`} className="text-sm font-medium text-navy hover:underline">
                  {t("home.activities.seeAll")}
                </Link>
              </div>
            </SectionReveal>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {previewActivities.map((activity, index) => (
                <SectionReveal key={activity.slug} delay={index * 0.05}>
                  <ActivityCard activity={activity} />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad bg-white">
          <div className="container-luxe grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <SectionReveal className="space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-ink/55">{t("home.premium.badge")}</p>
              <h2 className="heading-lg text-ink">{t("home.premium.title")}</h2>
              <p className="max-w-[44ch] text-sm leading-relaxed text-ink/70">{t("home.premium.description")}</p>
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-300 ease-premium hover:border-lime hover:bg-lime/25"
              >
                {t("home.premium.cta")}
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <ImagePlaceholder ratio="16:9" label={t("home.premium.imageLabel")} className="w-full" />
            </SectionReveal>
          </div>
        </section>

        <section id="tourism-circuits" className="section-pad">
          <div className="container-luxe space-y-6">
            <SectionReveal>
              <p className="text-xs uppercase tracking-[0.18em] text-ink/55">{t("home.circuits.badge")}</p>
              <h2 className="heading-lg mt-2 text-ink">{t("home.circuits.title")}</h2>
            </SectionReveal>

            <div className="flex snap-x gap-4 overflow-x-auto pb-1">
              {circuitIds.map((id, index) => (
                <SectionReveal
                  key={id}
                  delay={index * 0.06}
                  className="min-w-[78vw] snap-start rounded-3xl border border-line bg-white p-4 shadow-soft sm:min-w-[320px]"
                >
                  <ImagePlaceholder ratio="4:5" label={t(`home.circuits.cards.${id}.imageLabel`)} />
                  <p className="mt-4 heading-md text-ink">{t(`home.circuits.cards.${id}.title`)}</p>
                  <p className="mt-2 text-sm text-ink/68">{t(`home.circuits.cards.${id}.label`)}</p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="riding-club" className="section-pad bg-navy text-white">
          <div className="container-luxe grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <SectionReveal className="space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/72">{t("home.club.badge")}</p>
              <h2 className="heading-lg text-white">{t("home.club.title")}</h2>
              <p className="max-w-[44ch] text-sm leading-relaxed text-white/78">{t("home.club.description")}</p>
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-300 ease-premium hover:bg-lime/92"
              >
                {t("home.club.cta")}
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.1} className="grid grid-cols-2 gap-3">
              <ImagePlaceholder ratio="4:5" label={t("home.club.imageLabels.one")} dark />
              <ImagePlaceholder ratio="4:5" label={t("home.club.imageLabels.two")} dark />
              <ImagePlaceholder ratio="16:9" label={t("home.club.imageLabels.three")} dark className="col-span-2" />
            </SectionReveal>
          </div>
        </section>

        <section className="section-pad bg-white">
          <div className="container-luxe space-y-6">
            <SectionReveal>
              <p className="text-xs uppercase tracking-[0.18em] text-ink/55">{t("home.gallery.badge")}</p>
              <h2 className="heading-lg mt-2 text-ink">{t("home.gallery.title")}</h2>
            </SectionReveal>
            <SectionReveal delay={0.05}>
              <Gallery items={galleryItems} />
            </SectionReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
