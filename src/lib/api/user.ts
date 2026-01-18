import api from "./axios";
import { User, UserAddress, NotificationPreferences } from "@/types/auth";

export const getProfile = async (): Promise<User> => {
  const response = await api.get<User>("/users/profile");
  return response.data;
};

export const updateProfile = async (data: Partial<User>): Promise<void> => {
  await api.patch("/users/profile", data);
};

export const uploadAvatar = async (
  file: File
): Promise<{ avatarUrl: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/users/profile/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updatePassword = async (data: {
  currentPassword?: string;
  newPassword: string;
}): Promise<void> => {
  await api.patch("/users/profile/password", data);
};

export const deleteAccount = async (): Promise<void> => {
  await api.delete("/users/profile");
};

// --- Address Management ---
export const getAddresses = async (): Promise<UserAddress[]> => {
  const response = await api.get<UserAddress[]>("/users/addresses");
  return response.data;
};

export const createAddress = async (
  data: Partial<UserAddress>
): Promise<UserAddress> => {
  const response = await api.post<UserAddress>("/users/addresses", data);
  return response.data;
};

export const updateAddress = async (
  id: number,
  data: Partial<UserAddress>
): Promise<UserAddress> => {
  const response = await api.patch<UserAddress>(`/users/addresses/${id}`, data);
  return response.data;
};

export const deleteAddress = async (id: number): Promise<void> => {
  await api.delete(`/users/addresses/${id}`);
};

export const setDefaultAddress = async (id: number): Promise<void> => {
  await api.patch(`/users/addresses/${id}/default`);
};

// --- Notification Preferences ---
export const getNotificationPreferences =
  async (): Promise<NotificationPreferences> => {
    const response = await api.get<NotificationPreferences>(
      "/users/notifications"
    );
    return response.data;
  };

export const updateNotificationPreferences = async (
  data: NotificationPreferences
): Promise<void> => {
  await api.patch("/users/notifications", data);
};
