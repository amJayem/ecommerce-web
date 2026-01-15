"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  User as UserIcon,
  Mail,
  MapPin,
  Shield,
  Bell,
  Plus,
  Settings,
  Camera,
  LogOut,
  Loader2,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Clock,
  Package,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
  });

  // Hydrate form data once user is available
  useEffect(() => {
    if (user?.name) {
      const names = user.name.split(" ");
      setFormData((prev) => ({
        ...prev,
        firstName: names[0] || "",
        lastName: names.slice(1).join(" ") || "",
      }));
    }
  }, [user]);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "firstName" && !value.trim()) error = "First name is required";
    if (name === "lastName" && !value.trim()) error = "Last name is required";
    if (name === "phone") {
      if (!value.trim()) error = "Phone number is required";
      else if (!/^\d{10}$/.test(value.replace(/\D/g, "")))
        error = "Enter a valid 10-digit number";
    }
    if (name === "confirmPassword" && value !== formData.newPassword) {
      error = "Passwords do not match";
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Phone mask logic for +880
    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setIsDirty(true);

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    // Final validation
    const newErrors: Record<string, string> = {};
    ["firstName", "lastName", "phone"].forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData]
      );
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ firstName: true, lastName: true, phone: true });
      toast.error("Please fix the errors before saving");
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsDirty(false);
    toast.success("Profile updated successfully!");
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

  if (!user) {
    return (
      <div className="py-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="max-w-[850px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Account Summary Card */}
      <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-green-50 flex items-center justify-center border-4 border-white shadow-md overflow-hidden ring-1 ring-gray-100 transition-transform group-hover:scale-105 duration-300">
              <UserIcon className="w-14 h-14 text-green-600" />
            </div>
            <button className="absolute bottom-1 right-1 p-2.5 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all active:scale-90">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
                <h2 className="text-2xl font-black text-gray-900 leading-none">
                  {user.name}
                </h2>
                <Badge
                  variant="success"
                  className="w-fit mx-auto md:mx-0 py-1 px-3"
                >
                  Gold member
                </Badge>
              </div>
              <p className="text-gray-500 font-medium">{user.email}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-green-600">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">
                    Total orders
                  </p>
                  <p className="text-lg font-black text-gray-900 leading-none">
                    12
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-blue-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">
                    Active orders
                  </p>
                  <p className="text-lg font-black text-gray-900 leading-none">
                    3
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-3 col-span-2 lg:col-span-1">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-purple-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider leading-none mb-1">
                    Member since
                  </p>
                  <p className="text-lg font-black text-gray-900 leading-none">
                    Jan 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editable Form Area */}
      <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden divide-y divide-gray-50">
        {/* Personal Information */}
        <section className="p-8 space-y-8">
          <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <UserIcon className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Personal information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-1">
                First name <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={() => handleBlur("firstName")}
                placeholder="Enter your first name"
                className={cn(
                  "h-12 rounded-xl transition-all",
                  errors.firstName
                    ? "border-red-500 focus:ring-red-500/10"
                    : "border-gray-100"
                )}
              />
              {errors.firstName && touched.firstName && (
                <p className="text-xs font-bold text-red-500 flex items-center gap-1 pl-1">
                  <AlertCircle className="w-3 h-3" /> {errors.firstName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-1">
                Last name <span className="text-red-500 text-xs">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={() => handleBlur("lastName")}
                placeholder="Enter your last name"
                className={cn(
                  "h-12 rounded-xl transition-all",
                  errors.lastName
                    ? "border-red-500 focus:ring-red-500/10"
                    : "border-gray-100"
                )}
              />
              {errors.lastName && touched.lastName && (
                <p className="text-xs font-bold text-red-500 flex items-center gap-1 pl-1">
                  <AlertCircle className="w-3 h-3" /> {errors.lastName}
                </p>
              )}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative group">
                <Input
                  id="email"
                  disabled
                  value={user.email}
                  className="h-12 pl-10 rounded-xl bg-gray-50 border-gray-100 cursor-not-allowed text-gray-500 font-medium"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between px-1">
                <p className="text-[10px] font-bold text-gray-400">
                  Email can't be changed from this page
                </p>
                <Link
                  href="/account/settings"
                  className="text-[10px] font-bold text-green-600 hover:text-green-700 underline underline-offset-2"
                >
                  Change email address
                </Link>
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-1">
                Phone number <span className="text-red-500 text-xs">*</span>
              </Label>
              <div className="flex gap-2">
                <div className="h-12 px-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-gray-500">
                  +880
                </div>
                <div className="flex-1 space-y-1">
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="1XXXXXXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("phone")}
                    className={cn(
                      "h-12 rounded-xl border-gray-100",
                      errors.phone &&
                        touched.phone &&
                        "border-red-500 focus:ring-red-500/10"
                    )}
                  />
                </div>
              </div>
              {errors.phone && touched.phone && (
                <p className="text-xs font-bold text-red-500 flex items-center gap-1 pl-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
              <p className="text-[10px] font-bold text-gray-400 pl-1">
                Required for order notifications and delivery
              </p>
            </div>
          </div>
        </section>

        {/* Addresses Section */}
        <section className="p-8 space-y-8">
          <div className="flex items-center justify-between pb-2 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Shipping addresses
              </h3>
            </div>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold h-9"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Add new address
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border-2 border-green-500 bg-green-50/20 relative group transition-all">
              <div className="absolute top-4 right-4 flex items-center gap-1">
                <Badge
                  variant="success"
                  className="bg-green-500 text-white border-0 shadow-sm"
                >
                  Default
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900">Home</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  House #12, Road #4, Sector #10
                  <br />
                  Uttara, Dhaka - 1230
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <button className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors">
                    Edit
                  </button>
                  <button className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 relative group transition-all">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900">Office</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  Green Tower, Level 4, Plot 16
                  <br />
                  Banani, Dhaka - 1213
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <button className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors">
                    Edit
                  </button>
                  <button className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">
                    Set as default
                  </button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-xs font-bold text-red-400 hover:text-red-500 transition-colors">
                        Delete
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Confirm deletion</DialogTitle>
                        <DialogDescription className="pt-2 font-medium">
                          Are you sure you want to remove this address? This
                          action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4 gap-3">
                        <Button
                          variant="ghost"
                          className="rounded-xl font-bold"
                        >
                          Cancel
                        </Button>
                        <Button className="bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold">
                          Delete address
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </section>

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
              <p className="text-[10px] font-bold text-gray-400 pl-1">
                Required if you want to change your password
              </p>
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
                    className="h-12 pr-12 rounded-xl border-gray-100"
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
                <p className="text-[10px] font-bold text-gray-400 pl-1">
                  Uses uppercase, numbers, and symbols
                </p>
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
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="Re-type new password"
                    className={cn(
                      "h-12 pr-12 rounded-xl border-gray-100",
                      errors.confirmPassword &&
                        touched.confirmPassword &&
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
                {errors.confirmPassword && touched.confirmPassword && (
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
                checked={notifications.promotions}
                onCheckedChange={() => handleNotificationChange("promotions")}
              />
            </div>
          </div>
        </section>

        {/* Form Actions Footer */}
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
              onClick={() => {
                setIsDirty(false);
                window.location.reload();
              }}
              className="flex-1 sm:flex-none h-12 text-gray-400 font-bold hover:bg-gray-100/80 rounded-2xl"
            >
              Cancel
            </Button>
          </div>

          <div className="flex items-center gap-6">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm font-bold text-red-500 hover:text-red-600 hover:underline underline-offset-4 transition-all uppercase tracking-wider">
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
                  <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex-1 h-12">
                    Yes, delete everything
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Visual Separation Footer Stats */}
      <div className="pt-4 pb-12 text-center">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
          End of profile management
        </p>
      </div>
    </div>
  );
}
