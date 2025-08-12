import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Menu, User } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MyLittleCockpit - Connexion",
  description: "Connectez-vous à votre compte MyLittleCockpit",
};

export default function SignInPage() {
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
          <div className="flex flex-col gap-3">
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
                  type="email"
                  placeholder="john@gmail.com"
                  className="h-10 rounded-md border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600"
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
                  type="password"
                  placeholder="*********"
                  className="h-10 rounded-md border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <Link
              href="/forgot-password"
              className="self-end text-sm font-medium text-[#cf4326] underline decoration-[#cf4326]"
            >
              Mot de passe oublié
            </Link>
          </div>
        </div>

        {/* Continue Button */}
        <Button className="mt-auto mb-8 w-full bg-[#cf4326] text-sm font-medium text-white hover:bg-[#cf4326]/90">
          Continuer
        </Button>
      </div>
    </main>
  );
}
