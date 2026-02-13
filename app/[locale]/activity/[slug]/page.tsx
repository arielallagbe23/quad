import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Gallery from "@/components/Gallery";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ReservationForm from "@/components/ReservationForm";
import SectionReveal from "@/components/SectionReveal";
import { activities, getActivityBySlug } from "@/lib/activities";
import { formatPrice } from "@/lib/format";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";
import { createLocaleAlternates } from "@/lib/i18n/metadata";
import { getMessages } from "@/lib/i18n/messages";
import { resolveLocale } from "@/lib/i18n/request";
import { createTranslator, getStringArray } from "@/lib/i18n/translate";

type ActivityDetailsPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export function generateStaticParams() {
  return locales.flatMap((locale) => activities.map((activity) => ({ locale, slug: activity.slug })));
}

export function generateMetadata({ params }: ActivityDetailsPageProps): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const messages = getMessages(locale);
  const activity = getActivityBySlug(params.slug);
  const tMeta = createTranslator(messages, "meta");

  if (!activity) {
    return {
      title: tMeta("siteName"),
      alternates: createLocaleAlternates(`/activity/${params.slug}`)
    };
  }

  const tActivity = createTranslator(messages, `activities.items.${activity.slug}`);

  return {
    title: `${tActivity("title")} | ${tMeta("siteName")}`,
    description: tActivity("shortDescription"),
    alternates: createLocaleAlternates(`/activity/${params.slug}`),
    openGraph: {
      title: `${tActivity("title")} | ${tMeta("siteName")}`,
      description: tActivity("shortDescription")
    }
  };
}

export default function ActivityDetailsPage({ params }: ActivityDetailsPageProps) {
  const locale = resolveLocale(params.locale);
  const activity = getActivityBySlug(params.slug);

  if (!activity) {
    notFound();
  }

  const messages = getMessages(locale);
  const t = createTranslator(messages);
  const tActivity = createTranslator(messages, `activities.items.${activity.slug}`);

  const includes = getStringArray(messages, `activities.items.${activity.slug}.includes`);
  const requirements = getStringArray(messages, `activities.items.${activity.slug}.requirements`);
  const galleryLabels = getStringArray(messages, `activities.items.${activity.slug}.galleryLabels`);

  const galleryItems = activity.galleryRatios.map((ratio, index) => ({
    ratio,
    label: galleryLabels[index] ?? tActivity("heroLabel")
  }));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="section-pad">
          <div className="container-luxe grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <SectionReveal>
              <ImagePlaceholder ratio="16:9" label={tActivity("heroLabel")} className="w-full" />
            </SectionReveal>

            <SectionReveal delay={0.08} className="space-y-4 rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-ink/55">{t("activityDetail.badge")}</p>
              <h1 className="heading-lg text-ink">{tActivity("title")}</h1>
              <p className="text-sm leading-relaxed text-ink/70">{tActivity("shortDescription")}</p>

              <div className="grid grid-cols-2 gap-3 border-y border-line py-4 text-sm">
                <div>
                  <p className="text-ink/55">{t("activityDetail.priceLabel")}</p>
                  <p className="mt-1 font-semibold text-navy">{formatPrice(activity.pricePerPerson)}</p>
                </div>
                <div>
                  <p className="text-ink/55">{t("activityDetail.durationLabel")}</p>
                  <p className="mt-1 font-semibold text-ink">{tActivity("duration")}</p>
                </div>
              </div>

              <Link href="#reserve" className="inline-flex rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white">
                {t("activityDetail.reserveCta")}
              </Link>
            </SectionReveal>
          </div>
        </section>

        <section className="section-pad bg-white">
          <div className="container-luxe space-y-6">
            <SectionReveal>
              <h2 className="heading-lg text-ink">{t("activityDetail.galleryTitle")}</h2>
            </SectionReveal>
            <SectionReveal delay={0.05}>
              <Gallery items={galleryItems} />
            </SectionReveal>
          </div>
        </section>

        <section className="section-pad">
          <div className="container-luxe grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <SectionReveal className="space-y-6">
              <div>
                <h2 className="heading-lg text-ink">{t("activityDetail.detailsTitle")}</h2>
                <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-ink/72">{tActivity("fullDescription")}</p>
              </div>

              <div>
                <h3 className="heading-md text-ink">{t("activityDetail.includedTitle")}</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink/75">
                  {includes.map((item) => (
                    <li key={item} className="rounded-2xl border border-line bg-white px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="heading-md text-ink">{t("activityDetail.requirementsTitle")}</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink/75">
                  {requirements.map((item) => (
                    <li key={item} className="rounded-2xl border border-line bg-white px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ImagePlaceholder ratio="1:1" label={t("activityDetail.extraImageOne")} />
                <ImagePlaceholder ratio="1:1" label={t("activityDetail.extraImageTwo")} />
              </div>
            </SectionReveal>

            <SectionReveal id="reserve" delay={0.08} className="space-y-4">
              <h2 className="heading-lg text-ink">{t("activityDetail.reservationTitle")}</h2>
              <p className="text-sm text-ink/70">{t("activityDetail.reservationSubtitle")}</p>
              <ReservationForm activity={activity} />
            </SectionReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
