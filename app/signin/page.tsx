"use client";

import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Menu, User } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/lib/store/slices/authSlice";
import { AppDispatch, RootState } from "@/lib/store/store";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(formData));
      router.push("/");
    } catch (error: any) {
      console.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="flex h-full min-h-[500px] flex-col bg-[#fdfaf6]">
      {/* Main Content */}
      <div className="flex flex-1 flex-col px-4">
        <div className="flex flex-col gap-6">
          {/* Back Button */}
          <Link href="/" className="flex items-center gap-2 text-[#2a2a2a]">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-xs font-medium">Retour</span>
          </Link>

          {/* Welcome Message */}
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-semibold text-[#cf4326]">
              Content de vous revoir
            </h1>
            <p className="text-sm text-[#2a2a2a]">
              Veuillez vous connectez pour continuer
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-neutral-900"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@gmail.com"
                  className="h-10 rounded-md border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-neutral-900"
                >
                  Mot de passe
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="*********"
                  className="h-10 rounded-md border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600"
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Forgot Password */}
            <Link
              href="/forgot-password"
              className="self-end text-sm font-medium text-[#cf4326] underline decoration-[#cf4326]"
            >
              Mot de passe oublié
            </Link>

            {/* Continue Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-auto mb-8 w-full bg-[#cf4326] text-sm font-medium text-white hover:bg-[#cf4326]/90 disabled:opacity-50"
            >
              {isLoading ? "Chargement..." : "Continuer"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
