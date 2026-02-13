import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ActivityCard from "@/components/ActivityCard";
import SectionReveal from "@/components/SectionReveal";
import { activities } from "@/lib/activities";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { createLocaleAlternates } from "@/lib/i18n/metadata";
import { getMessages } from "@/lib/i18n/messages";
import { resolveLocale } from "@/lib/i18n/request";
import { createTranslator } from "@/lib/i18n/translate";

type CatalogPageProps = {
  params: {
    locale: string;
  };
};

export function generateMetadata({ params }: CatalogPageProps): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const messages = getMessages(locale);
  const tMeta = createTranslator(messages, "meta.catalog");

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: createLocaleAlternates("/catalog"),
    openGraph: {
      title: tMeta("title"),
      description: tMeta("description")
    }
  };
}

export default function CatalogPage({ params }: CatalogPageProps) {
  const locale = resolveLocale(params.locale);
  const messages = getMessages(locale);
  const t = createTranslator(messages);

  return (
    <>
      <SiteHeader />
      <main className="section-pad">
        <section className="container-luxe space-y-8">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.18em] text-ink/55">{t("catalog.badge")}</p>
            <h1 className="heading-lg mt-2 text-ink">{t("catalog.title")}</h1>
            <p className="mt-3 max-w-[50ch] text-sm text-ink/70">{t("catalog.description")}</p>
          </SectionReveal>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {activities.map((activity, index) => (
              <SectionReveal key={activity.slug} delay={index * 0.04}>
                <ActivityCard activity={activity} />
              </SectionReveal>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
