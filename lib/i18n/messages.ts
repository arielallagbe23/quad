import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import type { Locale } from "@/lib/i18n/config";

export type Messages = typeof fr;

const dictionaries: Record<Locale, Messages> = {
  fr,
  en
};

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}
