import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { createLocaleAlternates } from "@/lib/i18n/metadata";
import { isLocale, locales } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export function generateMetadata({ params }: LocaleLayoutProps): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "fr";
  const messages = getMessages(locale);
  const tMeta = createTranslator(messages, "meta");

  return {
    title: {
      default: tMeta("siteName"),
      template: `%s | ${tMeta("siteName")}`
    },
    description: tMeta("siteDescription"),
    alternates: createLocaleAlternates("/"),
    openGraph: {
      title: tMeta("siteName"),
      description: tMeta("siteDescription"),
      type: "website"
    }
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const messages = getMessages(params.locale);

  return (
    <html lang={params.locale}>
      <body>
        <I18nProvider locale={params.locale} messages={messages}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
