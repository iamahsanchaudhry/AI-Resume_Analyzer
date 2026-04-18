// services/authService.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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
