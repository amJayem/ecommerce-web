"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Shield,
  Bell,
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
  updatePassword,
  deleteAccount,
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/lib/api/user";
import { NotificationPreferences } from "@/types/auth";

export default function SettingsPage() {
  const { logout } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState<NotificationPreferences>({
    orderUpdates: true,
    newsletters: false,
    stockAlerts: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        const notifs = await getNotificationPreferences();
        setNotifications(notifs);
      } catch (error) {
        console.error("Failed to fetch notification preferences:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "newPassword" && value && value.length < 8) {
      error = "Password must be at least 8 characters";
    }
    if (name === "confirmPassword" && value !== formData.newPassword) {
      error = "Passwords do not match";
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleNotificationChange = (key: keyof NotificationPreferences) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 1. Update Notifications
      await updateNotificationPreferences(notifications);

      // 2. Update Password if fields are filled
      if (formData.newPassword) {
        if (!formData.currentPassword) {
          toast.error("Current password is required to set a new one");
          setIsSaving(false);
          return;
        }

        const confirmError = validateField(
          "confirmPassword",
          formData.confirmPassword
        );
        if (confirmError) {
          toast.error(confirmError);
          setIsSaving(false);
          return;
        }

        await updatePassword({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });

        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }

      toast.success("Settings updated successfully!");
      setIsDirty(false);
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update settings";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      toast.success("Account deleted. Sorry to see you go!");
      logout();
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  // Warning for unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  if (isLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="max-w-[850px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden divide-y divide-gray-50">
        {/* Security Section */}
        <section className="p-8 space-y-8">
          <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Security and password
            </h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                  className="h-12 pr-12 rounded-xl border-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Min. 8 characters"
                    className={cn(
                      "h-12 pr-12 rounded-xl border-gray-100",
                      errors.newPassword &&
                        "border-red-500 focus:ring-red-500/10"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-xs font-bold text-red-500 flex items-center gap-1 pl-1">
                    <AlertCircle className="w-3 h-3" /> {errors.newPassword}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-type new password"
                    className={cn(
                      "h-12 pr-12 rounded-xl border-gray-100",
                      errors.confirmPassword &&
                        "border-red-500 focus:ring-red-500/10"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs font-bold text-red-500 flex items-center gap-1 pl-1">
                    <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="p-8 space-y-8">
          <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Communication preferences
            </h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between p-1">
              <div className="space-y-1">
                <p className="font-bold text-gray-900">Order status updates</p>
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  Real-time alerts about your purchases via email and SMS
                </p>
              </div>
              <Switch
                checked={notifications.orderUpdates}
                onCheckedChange={() => handleNotificationChange("orderUpdates")}
              />
            </div>

            <div className="flex items-start justify-between p-1">
              <div className="space-y-1">
                <p className="font-bold text-gray-900">
                  Promotions and newsletters
                </p>
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  Weekly updates on best-sellers and member-only deals
                </p>
              </div>
              <Switch
                checked={notifications.newsletters}
                onCheckedChange={() => handleNotificationChange("newsletters")}
              />
            </div>

            <div className="flex items-start justify-between p-1">
              <div className="space-y-1">
                <p className="font-bold text-gray-900">Stock alerts</p>
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  Get notified when items in your wishlist back in stock
                </p>
              </div>
              <Switch
                checked={notifications.stockAlerts}
                onCheckedChange={() => handleNotificationChange("stockAlerts")}
              />
            </div>
          </div>
        </section>

        {/* Save and Delete Actions */}
        <div className="p-8 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Button
              onClick={handleSave}
              disabled={isSaving || !isDirty}
              className="flex-1 sm:flex-none min-w-[160px] h-12 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-green-200 shadow-lg transition-all active:scale-[0.98] font-black"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                "Save changes"
              )}
            </Button>
            <Button
              variant="ghost"
              disabled={!isDirty}
              onClick={() => window.location.reload()}
              className="flex-1 sm:flex-none h-12 text-gray-400 font-bold hover:bg-gray-100/80 rounded-2xl"
            >
              Cancel
            </Button>
          </div>

          <div className="flex items-center gap-6">
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 hover:underline underline-offset-4 transition-all uppercase tracking-wider">
                  <Trash2 className="w-4 h-4" />
                  Delete account
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-red-600">
                    Permanently delete account?
                  </DialogTitle>
                  <DialogDescription className="pt-2 font-medium">
                    This action is irreversible. All your order history,
                    addresses, and saved data will be lost forever.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6 gap-3 flex-col sm:flex-row">
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      className="rounded-xl font-bold flex-1"
                    >
                      Keep my account
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex-1 h-12"
                  >
                    Yes, delete everything
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
