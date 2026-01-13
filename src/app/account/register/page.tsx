"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Lock,
  User,
  AlertCircle,
  Loader2,
  ArrowRight,
  Gift,
  MapPin,
  TrendingUp,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { AxiosError } from "axios";

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length > 5) score++;
    if (password.length > 7) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      await register(formData);
    } catch (err: unknown) {
      console.log(err);
      const axiosError = err as AxiosError<{ message: string }>;
      setError(
        axiosError.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-10 lg:py-20 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col lg:flex-row">
          {/* Left Side: Onboarding Benefits */}
          <div className="bg-green-600 p-10 lg:p-12 lg:w-5/12 flex flex-col justify-between text-white relative overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-green-500 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-green-400">
                Join Today
              </span>
              <h2 className="text-3xl font-bold mb-6">Start Fresh!</h2>
              <p className="text-green-50 text-lg mb-8 leading-relaxed font-medium opacity-90">
                Create an account to unlock exclusive perks and make your
                grocery shopping effortless.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-lg mr-4 shrink-0">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Welcome Bonus</h4>
                    <p className="text-green-100 text-sm mt-1 font-normal">
                      Get ৳100 credit on your first order over ৳500.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-lg mr-4 shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Earn Points</h4>
                    <p className="text-green-100 text-sm mt-1 font-normal">
                      Collect points on every purchase and redeem for cash.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-lg mr-4 shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      Smart Address Book
                    </h4>
                    <p className="text-green-100 text-sm mt-1 font-normal">
                      Save multiple delivery addresses for faster checkout.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 relative z-10 text-sm text-green-100 opacity-70">
              © {new Date().getFullYear()} GroceryFresh Inc.
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="p-8 lg:p-12 lg:w-7/12 bg-white flex flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-sm text-gray-500 mb-8 font-normal">
                Enter your details to get started.
              </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                {/* Error Banner */}
                {error && (
                  <div className="rounded-xl bg-red-50 p-4 border border-red-100 flex items-start animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-red-800">
                        Registration Failed
                      </h4>
                      <p className="text-sm text-red-600 mt-1 font-normal">
                        {error}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1.5 ml-1"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      className="h-12 rounded-xl bg-gray-50/50 border-gray-200 focus:border-green-500 focus:ring-green-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] font-normal"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1.5 ml-1"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      className="h-12 rounded-xl bg-gray-50/50 border-gray-200 focus:border-green-500 focus:ring-green-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] font-normal"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-700 mb-1.5 ml-1"
                  >
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="name@example.com"
                      className="pl-11 h-12 block w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 sm:text-sm bg-gray-50/50 hover:bg-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] font-normal placeholder:font-normal"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!error}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-gray-700 mb-1.5 ml-1"
                  >
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                      className="pl-11 pr-10 h-12 block w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 sm:text-sm bg-gray-50/50 hover:bg-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] font-normal placeholder:font-normal"
                      value={formData.password}
                      onChange={handleChange}
                      aria-invalid={!!error}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {formData.password && (
                    <div className="mt-2 ml-1">
                      <div className="flex gap-1 h-1 mb-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-full flex-1 rounded-full transition-all duration-300 ${
                              passwordStrength >= level
                                ? passwordStrength > 3
                                  ? "bg-green-500"
                                  : passwordStrength > 1
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-500 text-right">
                        {passwordStrength < 2
                          ? "Weak"
                          : passwordStrength < 4
                          ? "Medium"
                          : "Strong"}{" "}
                        Password
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-bold text-gray-700 mb-1.5 ml-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                    </div>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                      className="pl-11 pr-10 h-12 block w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 sm:text-sm bg-gray-50/50 hover:bg-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] font-normal placeholder:font-normal"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1 ml-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> Passwords do
                        not match
                      </p>
                    )}
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword && (
                      <p className="text-xs text-green-600 mt-1 ml-1 flex items-center">
                        <Check className="w-3 h-3 mr-1" /> Passwords match
                      </p>
                    )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Sign Up <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link
                    href="/account/login"
                    className="font-bold text-green-600 hover:text-green-500 transition-colors inline-flex items-center"
                  >
                    Log in here <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Footer Links */}
        <div className="mt-8 text-center text-xs text-gray-400 space-x-6">
          <a href="#" className="hover:text-gray-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            Help Center
          </a>
        </div>
      </div>
    </div>
  );
}
