import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { parseCheckoutPayload } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { createLocaleAlternates } from "@/lib/i18n/metadata";
import { getMessages } from "@/lib/i18n/messages";
import { resolveLocale } from "@/lib/i18n/request";
import { createTranslator } from "@/lib/i18n/translate";

type ConfirmationPageProps = {
  params: {
    locale: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

function getReference(searchParams: Record<string, string | string[] | undefined>) {
  const raw = searchParams.reference;
  if (typeof raw === "string" && raw.trim().length > 0) return raw;
  if (Array.isArray(raw) && raw[0]) return raw[0];
  return "RE-PENDING";
}

export function generateMetadata({ params }: ConfirmationPageProps): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const messages = getMessages(locale);
  const tMeta = createTranslator(messages, "meta.confirmation");

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: createLocaleAlternates("/confirmation"),
    openGraph: {
      title: tMeta("title"),
      description: tMeta("description")
    }
  };
}

export default function ConfirmationPage({ params, searchParams }: ConfirmationPageProps) {
  const locale = resolveLocale(params.locale);
  const payload = parseCheckoutPayload(searchParams);
  const reference = getReference(searchParams);
  const messages = getMessages(locale);
  const t = createTranslator(messages);

  return (
    <>
      <SiteHeader />
      <main className="section-pad">
        <section className="container-luxe">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-ink/55">{t("confirmation.badge")}</p>
            <h1 className="heading-lg mt-2 text-ink">{t("confirmation.title")}</h1>
            <p className="mt-3 text-sm text-ink/72">{t("confirmation.description")}</p>

            <div className="mt-6 rounded-3xl bg-navy p-5 text-white">
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">{t("confirmation.referenceLabel")}</p>
              <p className="mt-2 text-xl font-semibold">{reference}</p>
            </div>

            {payload ? (
              <div className="mt-6 grid gap-3 rounded-3xl border border-line bg-cloud p-4 text-sm sm:grid-cols-2">
                <Summary label={t("confirmation.summary.activity")} value={payload.activity} />
                <Summary label={t("confirmation.summary.persons")} value={String(payload.persons)} />
                <Summary label={t("confirmation.summary.totalPaid")} value={formatPrice(payload.total)} />
                <Summary label={t("confirmation.summary.phone")} value={payload.phone} />
              </div>
            ) : (
              <p className="mt-6 text-sm text-ink/72">{t("confirmation.summaryUnavailable")}</p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/catalog`}
                className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-premium hover:bg-navy/92"
              >
                {t("confirmation.browseMore")}
              </Link>
              <Link
                href={`/${locale}`}
                className="rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-300 ease-premium hover:border-lime hover:bg-lime/25"
              >
                {t("confirmation.backHome")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white px-3 py-2.5">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ink/55">{label}</p>
      <p className="mt-1 font-medium text-ink">{value}</p>
    </div>
  );
}
