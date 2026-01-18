"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User as UserIcon,
  Mail,
  MapPin,
  Camera,
  Loader2,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Package,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { updateProfile, uploadAvatar, getAddresses } from "@/lib/api/user";
import { UserAddress } from "@/types/auth";

export default function ProfilePage() {
  const { user, logout, isLoading: isAuthLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Hydrate form data once user is available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || user.name?.split(" ")[0] || "",
        lastName:
          user.lastName || user.name?.split(" ").slice(1).join(" ") || "",
        phone: user.phone?.replace("+880", "") || "",
      }));
    }
  }, [user]);

  // Fetch addresses for summary
  useEffect(() => {
    const fetchData = async () => {
      try {
        const addrs = await getAddresses();
        setAddresses(addrs);
      } catch (error) {
        console.error("Failed to fetch profile supplemental data:", error);
      }
    };
    fetchData();
  }, []);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "firstName" && !value.trim()) error = "First name is required";
    if (name === "lastName" && !value.trim()) error = "Last name is required";
    if (name === "phone") {
      if (!value.trim()) error = "Phone number is required";
      else if (!/^\d{10}$/.test(value.replace(/\D/g, "")))
        error = "Enter a valid 10-digit number";
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

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    const loadingToast = toast.loading("Uploading image...");
    try {
      const { avatarUrl } = await uploadAvatar(file);
      // Notify session changed to refresh user object globally
      window.dispatchEvent(new CustomEvent("session-refreshed"));
      toast.success("Profile picture updated", { id: loadingToast });
    } catch (error) {
      toast.error("Upload failed", { id: loadingToast });
    } finally {
      setIsUploading(false);
    }
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
    try {
      // Update Profile Info
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone ? `+880${formData.phone}` : undefined,
      });

      toast.success("Profile updated successfully!");
      setIsDirty(false);
      window.dispatchEvent(new CustomEvent("session-refreshed"));
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update profile";
      toast.error(message);
    } finally {
      setIsSaving(false);
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

  if (isAuthLoading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900">Session Error</h3>
          <p className="text-gray-500">
            Could not retrieve user profile. Please try logging in again.
          </p>
        </div>
        <Button
          onClick={() => logout()}
          variant="outline"
          className="rounded-xl"
        >
          Go to Login
        </Button>
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
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="w-14 h-14 text-green-600" />
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                </div>
              )}
            </div>
            <label className="absolute bottom-1 right-1 p-2.5 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all active:scale-90 cursor-pointer">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={isUploading}
              />
            </label>
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
                  {user.role === "admin" ? "Administrator" : "Member"}
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
                    {user.stats?.totalOrders || 0}
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
                    {user.stats?.activeOrders || 0}
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
                    {user.memberSince
                      ? new Date(user.memberSince).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editable Form Area */}
      <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden divide-y divide-gray-50">
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
                  href="/account/support"
                  className="text-[10px] font-bold text-green-600 hover:text-green-700 underline underline-offset-2"
                >
                  Contact support to change email
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
            </div>
          </div>
        </section>

        <section className="p-8 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Shipping addresses
              </h3>
            </div>
            <Link href="/account/addresses">
              <Button
                size="sm"
                variant="ghost"
                className="text-green-600 hover:text-green-700 font-bold h-9"
              >
                Manage addresses <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.length > 0 ? (
              addresses.slice(0, 2).map((addr) => (
                <div
                  key={addr.id}
                  className={cn(
                    "p-5 rounded-2xl border transition-all",
                    addr.isDefault
                      ? "border-green-500 bg-green-50/20"
                      : "border-gray-100 bg-white"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900">
                      {addr.addressName || "Address"}
                    </h4>
                    {addr.isDefault && (
                      <Badge
                        variant="success"
                        className="bg-green-500 text-white border-0 text-[10px]"
                      >
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 font-medium line-clamp-2">
                    {addr.street}, {addr.city}
                  </p>
                </div>
              ))
            ) : (
              <div className="md:col-span-2 py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-sm text-gray-400 font-bold">
                  No addresses saved yet
                </p>
                <Link href="/account/addresses">
                  <Button variant="link" className="text-green-600 font-black">
                    Add your first address
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        <div className="p-8 bg-gray-50/50 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleSave}
              disabled={isSaving || !isDirty}
              className="min-w-[160px] h-12 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-green-200 shadow-lg transition-all active:scale-[0.98] font-black"
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
              className="h-12 text-gray-400 font-bold hover:bg-gray-100/80 rounded-2xl"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-4 pb-12 text-center">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
          End of profile management
        </p>
      </div>
    </div>
  );
}
