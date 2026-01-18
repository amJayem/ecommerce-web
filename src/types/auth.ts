export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  memberSince?: string;
  stats?: {
    totalOrders: number;
    activeOrders: number;
  };
}

export interface UserAddress {
  id: number;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  addressName?: string;
  addressType: "Home" | "Office" | "Other" | "saved" | "order_snapshot";
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  orderUpdates: boolean;
  newsletters: boolean;
  stockAlerts: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
