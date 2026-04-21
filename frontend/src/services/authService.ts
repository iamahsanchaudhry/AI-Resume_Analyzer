// services/authService.ts
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const API = axios.create({
  baseURL: `${BASE_URL}/api/auth`,
  timeout: 15000, // 15s — sane ceiling so hung requests fail instead of spinning forever
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    // Token is expired / invalid — boot the user.
    // Guard against redirect loops if we're already on /login.
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    // Normalize the error message so call sites get a consistent shape.
    const message =
      error.response?.data?.message ??
      error.message ??
      "Something went wrong. Please try again.";

    return Promise.reject(new Error(message));
  },
);

export const login = (email: string, password: string) =>
  API.post("/login", { email, password });

export const signup = (email: string, password: string) =>
  API.post("/signup", { email, password });

export const profile = () => API.get("/profile");

export const updateProfile = (data: { name?: string; email?: string }) =>
  API.put("/profile", data);

export const updatePassword = (currentPassword: string, newPassword: string) =>
  API.put("/profile/password", { currentPassword, newPassword });

export const logout = () => API.post("/logout");
