"use client";

import { useEffect } from "react";
import { useUIStore } from "@/application/stores/ui.store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    // Apply theme on mount and when it changes
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <>{children}</>;
}
