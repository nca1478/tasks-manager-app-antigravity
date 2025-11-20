"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useState } from "react";
import { I18nProvider } from "@/components/providers/i18n-provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Task Manager - Manage Your Tasks Efficiently</title>
        <meta
          name="description"
          content="A modern task management application built with Next.js and NestJS"
        />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <I18nProvider>
            {children}
            <Toaster position="top-right" richColors />
          </I18nProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
