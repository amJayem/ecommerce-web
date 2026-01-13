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

  // Hydrate auth state on mount
  useEffect(() => {
    const hydrateAuth = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch (error) {
        // If hydration fails with 401, clear the invalid cookie to fix middleware loops
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          try {
            await apiLogout();
          } catch (e) {
            console.error("Failed to clear cookie on hydration error", e);
          }
        }
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    hydrateAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await apiLogin(credentials);
      setUser(response.user);
      toast.success("Welcome back!");
      router.push("/account"); // Redirect to account dashboard or previous page
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
      router.push("/account");
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
