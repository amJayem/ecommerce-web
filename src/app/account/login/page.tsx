"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Eye,
  EyeOff,
} from "lucide-react";
import { AxiosError } from "axios";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(formData);
    } catch (err: unknown) {
      // Error handling is mostly done in AuthContext (toast), but we can show inline error too
      console.log(err);
      const axiosError = err as AxiosError<{ message: string }>;
      setError(
        axiosError.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-10 lg:py-20 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row">
          {/* Left Side: Trust & Benefits */}
          <div className="bg-green-600 p-10 lg:p-12 lg:w-5/12 flex flex-col justify-between text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
              <p className="text-green-50 text-lg mb-8 leading-relaxed font-medium opacity-90">
                Log in to access your saved lists, track orders, and experience
                the freshest delivery in town.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-lg mr-4 shrink-0">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Fast Delivery</h4>
                    <p className="text-green-100 text-sm mt-1">
                      Get your groceries delivered in as fast as 1 hour.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-lg mr-4 shrink-0">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Secure & Safe</h4>
                    <p className="text-green-100 text-sm mt-1">
                      Your data and payments are protected with bank-level
                      security.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-lg mr-4 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Freshness Guaranteed</h4>
                    <p className="text-green-100 text-sm mt-1">
                      If it's not fresh, we'll replace it for free. No questions
                      asked.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 relative z-10 text-sm text-green-100 opacity-70">
              © 2024 GroceryFresh Inc.
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="p-8 lg:p-12 lg:w-7/12 bg-white flex flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                Sign In
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                Enter your details to access your account.
              </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {/* Error Banner */}
                {error && (
                  <div className="rounded-xl bg-red-50 p-4 border border-red-100 flex items-start animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-red-800">
                        Login Failed
                      </h4>
                      <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                  </div>
                )}

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
                      className="pl-11 h-12 block w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 sm:text-sm bg-gray-50/50 hover:bg-white transition-all shadow-sm"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!error}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 ml-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold text-gray-700"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs font-bold text-green-600 hover:text-green-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      placeholder="••••••••"
                      className="pl-11 pr-10 h-12 block w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 sm:text-sm bg-gray-50/50 hover:bg-white transition-all shadow-sm"
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
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                  />
                  <div className="ml-2">
                    <label
                      htmlFor="remember-me"
                      className="block text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Keep me signed in
                    </label>
                    <p className="text-[10px] text-gray-400 leading-tight">
                      For your security, don't check this on shared devices.
                    </p>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-lg shadow-green-200 text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    aria-label={isLoading ? "Signing in..." : "Sign In"}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In <ArrowRight className="ml-2 h-5 w-5" />
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
                      New to GroceryFresh?
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/account/register" className="w-full block">
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-xl border-2 border-green-50 text-green-700 font-bold hover:bg-green-50 hover:border-green-100 hover:text-green-800 transition-all"
                    >
                      Create an Account
                    </Button>
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
