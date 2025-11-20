import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  isSidebarOpen: boolean;
  theme: "light" | "dark";
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      theme: "light",

      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      setSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),

      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          if (typeof window !== "undefined") {
            document.documentElement.classList.toggle(
              "dark",
              newTheme === "dark"
            );
          }
          return { theme: newTheme };
        }),

      setTheme: (theme: "light" | "dark") => {
        if (typeof window !== "undefined") {
          document.documentElement.classList.toggle("dark", theme === "dark");
        }
        set({ theme });
      },
    }),
    {
      name: "ui-storage",
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== "undefined") {
          document.documentElement.classList.toggle(
            "dark",
            state.theme === "dark"
          );
        }
      },
    }
  )
);
