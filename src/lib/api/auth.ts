import api from "./axios";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from "@/types/auth";

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  return response.data;
};

export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");
  return response.data;
};

export const refreshToken = async (): Promise<void> => {
  await api.post("/auth/refresh");
};
