// lib/api/axios.ts
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const isDev = process.env.NODE_ENV !== "production";

const api = axios.create({
  baseURL,
  timeout: 15000, // timeout for server-side requests
  headers: { "Content-Type": "application/json" },
});

// Debug: Log the base URL (only in development)

console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Better error logging (dev only to reduce build noise)
    if (isDev) {
      console.log("API Error:", {
        message: err.message,
        status: err.response?.status,
        url: err.config?.url,
        baseURL: err.config?.baseURL,
      });
    }
    return Promise.reject(err);
  }
);

export default api;
