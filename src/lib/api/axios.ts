import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const isDev = process.env.NODE_ENV !== "production";

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Important for HttpOnly cookies
});

// Debug: Log the base URL (only in development)
console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

// --- Refresh Token Logic ---
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: unknown = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(err);
    }

    // Check if error is 401 and NOT from an auth endpoint to avoid loops
    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !originalRequest.url?.includes("/auth/logout")
    ) {
      if (isRefreshing) {
        // If already refreshing, add to queue
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh token
        await api.post("/auth/refresh");

        // Notify app that session was refreshed (for AuthContext UI sync)
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("session-refreshed"));
        }

        // If successful, process queue and retry original
        processQueue(null);
        return api(originalRequest);
      } catch (refreshErr) {
        // If refresh fails, process queue with error
        processQueue(refreshErr as Error, null);

        // BREAK THE LOOP: Only redirect if we AREN'T already on the login page.
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/account/login"
        ) {
          window.location.href = "/account/login";
        }

        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    // Better error logging (dev only)
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
