import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token and language
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add language header
    const languageStorage = localStorage.getItem("language-storage");
    if (languageStorage) {
      try {
        const { state } = JSON.parse(languageStorage);
        if (state?.locale) {
          config.headers["Accept-Language"] = state.locale;
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if not already on login/register pages
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const isAuthPage =
          currentPath === "/login" || currentPath === "/register";

        if (!isAuthPage) {
          // Clear token and redirect to login only if not on auth pages
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);
