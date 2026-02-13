"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import { getMessageValue, translate, type TranslationValues } from "@/lib/i18n/translate";

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  messages,
  children
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18nContext() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18nContext must be used within I18nProvider");
  }

  return context;
}

export function useLocale() {
  return useI18nContext().locale;
}

export function useTranslations(namespace?: string) {
  const { messages } = useI18nContext();
  const prefix = namespace ? `${namespace}.` : "";

  return useCallback(
    (key: string, values?: TranslationValues) => translate(messages, `${prefix}${key}`, values),
    [messages, prefix]
  );
}

export function useMessageValue<T = unknown>(key: string): T | undefined {
  const { messages } = useI18nContext();
  return getMessageValue<T>(messages, key);
}
