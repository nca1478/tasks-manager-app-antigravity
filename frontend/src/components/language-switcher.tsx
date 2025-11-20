"use client";

import { useLanguageStore } from "@/application/stores/language.store";
import { useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguageStore();
  const t = useTranslations("language");

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "es" : "en";
    setLocale(newLocale);
  };

  return (
    <Button
      variant="outline"
      className="w-full justify-start gap-2"
      onClick={toggleLanguage}
      title={t("toggle")}
    >
      <Languages className="h-4 w-4" />
      <span>{locale === "en" ? t("english") : t("spanish")}</span>
    </Button>
  );
}
