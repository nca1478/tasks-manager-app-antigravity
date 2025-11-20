import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "en"; // Default locale

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: "America/New_York", // Configura tu zona horaria preferida
  };
});
