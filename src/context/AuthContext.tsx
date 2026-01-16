"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, LoginCredentials, RegisterCredentials } from "@/types/auth";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getMe,
} from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const hydrateAuth = async () => {
    try {
      const user = await getMe();
      setUser(user);
    } catch (error) {
      // If hydration fails with 401, just set user to null.
      // The Axios interceptor will handle the actual refresh/redirect.
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Hydrate auth state on mount and listen for background refreshes
  useEffect(() => {
    hydrateAuth();

    // Listen for background token refreshes to sync UI state
    const handleRefresh = () => {
      console.log("Session refreshed event received, re-hydrating user...");
      hydrateAuth();
    };

    window.addEventListener("session-refreshed", handleRefresh);
    return () => window.removeEventListener("session-refreshed", handleRefresh);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await apiLogin(credentials);
      setUser(response.user);
      toast.success("Welcome back!");
      router.push("/"); // Redirect to home page
    } catch (error: unknown) {
      console.error("Login failed:", error);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Invalid credentials");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      const response = await apiRegister(credentials);
      setUser(response.user);
      toast.success("Account created successfully!");
      router.push("/account/profile");
    } catch (error: unknown) {
      console.error("Registration failed:", error);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      router.push("/account/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
