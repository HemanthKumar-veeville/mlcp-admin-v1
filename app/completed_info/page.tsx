"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CompletedInfoPage() {
  return (
    <div className="bg-[#fdfaf6] w-full h-full flex flex-col min-h-[calc(100vh-200px)]">
      {/* Main Content */}
      <div className="flex flex-col grow items-center justify-between pb-8 px-4 w-full">
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex flex-col gap-8 items-start justify-center w-full">
            <div className="flex flex-row gap-4 items-center">
              <div className="flex flex-col gap-2 items-start justify-center">
                <Link
                  href="/incubator_signup"
                  className="flex flex-row gap-2 items-center cursor-pointer"
                >
                  <ArrowLeft size={24} className="text-[#2a2a2a]" />
                  <span className="font-medium text-[12px] text-[#2a2a2a] leading-[16px]">
                    Retour
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-start w-full">
            <h2 className="font-bold text-[24px] text-[#2a2a2a] leading-[1.5] w-full">
              Bienvenue ! 🎉
            </h2>
            <div className="flex flex-col gap-4 items-start w-full">
              <div className="flex flex-col gap-4 items-start w-full">
                <div className="flex flex-col gap-4 items-start w-full">
                  <div className="flex flex-col gap-1 items-start w-full">
                    <p className="font-medium text-[16px] text-neutral-600 leading-[24px] w-full">
                      Maintenant, vous devez compléter le profil de votre
                      incubateur (salles, programmes, personnel...)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 items-start w-full">
          <Link
            href="/incubatorform"
            className="bg-[#cf4326] flex flex-row gap-2 items-center justify-center min-h-10 px-4 py-2 rounded-md w-full"
          >
            <span className="font-medium text-[14px] text-white leading-[20px] text-center">
              Compléter mon profil
            </span>
          </Link>
          <Link
            href="/"
            className="bg-neutral-100 flex flex-row gap-2 items-center justify-center min-h-10 px-4 py-2 rounded-md w-full"
          >
            <span className="font-medium text-[14px] text-neutral-600 leading-[20px] text-center">
              Plus tard
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
