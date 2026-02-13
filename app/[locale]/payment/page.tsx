import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileMoneyCheckout from "@/components/MobileMoneyCheckout";
import { parseCheckoutPayload } from "@/lib/checkout";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { createLocaleAlternates } from "@/lib/i18n/metadata";
import { getMessages } from "@/lib/i18n/messages";
import { resolveLocale } from "@/lib/i18n/request";
import { createTranslator } from "@/lib/i18n/translate";

type PaymentPageProps = {
  params: {
    locale: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export function generateMetadata({ params }: PaymentPageProps): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const messages = getMessages(locale);
  const tMeta = createTranslator(messages, "meta.payment");

  return {
    title: tMeta("title"),
    description: tMeta("description"),
    alternates: createLocaleAlternates("/payment"),
    openGraph: {
      title: tMeta("title"),
      description: tMeta("description")
    }
  };
}

export default function PaymentPage({ params, searchParams }: PaymentPageProps) {
  const locale = resolveLocale(params.locale);
  const payload = parseCheckoutPayload(searchParams);
  const messages = getMessages(locale);
  const t = createTranslator(messages);

  return (
    <>
      <SiteHeader />
      <main className="section-pad">
        <section className="container-luxe space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-ink/55">{t("payment.badge")}</p>
            <h1 className="heading-lg mt-2 text-ink">{t("payment.title")}</h1>
          </div>

          {payload ? (
            <MobileMoneyCheckout payload={payload} />
          ) : (
            <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
              <p className="text-sm text-ink/72">{t("payment.missingDetails")}</p>
              <Link
                href={`/${locale}/catalog`}
                className="mt-4 inline-flex rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white"
              >
                {t("common.backToCatalog")}
              </Link>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
