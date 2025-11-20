"use client";

import { NextIntlClientProvider } from "next-intl";
import { useLanguageStore } from "@/application/stores/language.store";
import enMessages from "@/infrastructure/i18n/messages/en.json";
import esMessages from "@/infrastructure/i18n/messages/es.json";

const messages = {
  en: enMessages,
  es: esMessages,
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useLanguageStore((state) => state.locale);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages[locale]}
      timeZone="America/New_York"
    >
      {children}
    </NextIntlClientProvider>
  );
}
