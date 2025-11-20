import enMessages from "./messages/en.json";
import esMessages from "./messages/es.json";

const messages = {
  en: enMessages,
  es: esMessages,
};

/**
 * Get translation for a key based on current locale
 * This is a utility function for use outside React components
 */
export function getTranslation(key: string): string {
  // Get locale from localStorage
  const storedLanguage = localStorage.getItem("language-storage");
  let locale = "en";

  if (storedLanguage) {
    try {
      const parsed = JSON.parse(storedLanguage);
      locale = parsed.state?.locale || "en";
    } catch (e) {
      // Fallback to English
    }
  }

  // Navigate through nested keys (e.g., "tasks.createSuccess")
  const keys = key.split(".");
  let value: any = messages[locale as keyof typeof messages];

  for (const k of keys) {
    if (value && typeof value === "object") {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === "string" ? value : key;
}
