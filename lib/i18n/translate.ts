import type { Messages } from "@/lib/i18n/messages";

export type TranslationValues = Record<string, string | number>;

function resolveValue(source: unknown, key: string): unknown {
  const segments = key.split(".");
  let current: unknown = source;

  for (const segment of segments) {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }

    if (!(segment in current)) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}

function interpolate(template: string, values?: TranslationValues): string {
  if (!values) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}

export function getMessageValue<T = unknown>(messages: Messages, key: string): T | undefined {
  return resolveValue(messages, key) as T | undefined;
}

export function getStringArray(messages: Messages, key: string): string[] {
  const value = getMessageValue<unknown>(messages, key);
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export function translate(messages: Messages, key: string, values?: TranslationValues): string {
  const value = getMessageValue<unknown>(messages, key);
  if (typeof value !== "string") {
    return key;
  }

  return interpolate(value, values);
}

export function createTranslator(messages: Messages, namespace?: string) {
  const prefix = namespace ? `${namespace}.` : "";
  return (key: string, values?: TranslationValues) => translate(messages, `${prefix}${key}`, values);
}
