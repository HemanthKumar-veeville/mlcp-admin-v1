import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "MyLittleCockpit - Plateforme de gestion",
  description: "Votre plateforme de gestion pour startups et incubateurs",
  openGraph: {
    title: "MyLittleCockpit - Plateforme de gestion",
    description: "Votre plateforme de gestion pour startups et incubateurs",
    url: "https://mylittlecockpit.com",
  },
  alternates: {
    canonical: "https://mylittlecockpit.com",
  },
};

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-between px-4 pt-8 outline outline-blue-500">
      <div className="w-full opacity-85 relative mb-8">
        <div className="flex justify-start px-[38px]">
          <Image
            src="/thumb-up-dynamic-color.png"
            alt="Thumbs up"
            width={90}
            height={90}
            className="object-contain"
          />
        </div>
        <div className="flex justify-end px-[38px] -mt-[37px]">
          <Image
            src="/calender-dynamic-color.png"
            alt="Calendar"
            width={90}
            height={90}
            className="object-contain"
          />
        </div>
        <div className="flex justify-start px-[38px] -mt-[37px]">
          <div className="rotate-[340.521deg]">
            <Image
              src="/megaphone-dynamic-color.png"
              alt="Megaphone"
              width={90}
              height={90}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="w-full space-y-2 text-left mb-8">
        <h2 className="text-[20px] text-[#cf4326]">
          <span className="font-normal">Prenez le contrôle. </span>
          <span className="font-bold">Simplement.</span>
        </h2>
        <p className="text-[14px] text-neutral-600">
          Votre plateforme de gestion pour{" "}
          <span className="underline decoration-[#cf4326] font-bold">
            startups
          </span>{" "}
          et{" "}
          <span className="underline decoration-[#cf4326] font-bold">
            incubateurs
          </span>
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full space-y-2">
        <button className="w-full bg-[#cf4326] text-white rounded-md px-4 py-2 text-[14px] font-medium">
          S'inscrire
        </button>
        <button className="w-full bg-neutral-100 text-[#cf4326] rounded-md px-4 py-2 text-[14px] font-medium underline">
          Se connecter
        </button>
      </div>
    </main>
  );
}
