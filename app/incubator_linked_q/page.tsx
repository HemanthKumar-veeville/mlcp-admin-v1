"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function IncubatorLinkedQuestionPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<"yes" | "no" | null>(
    null
  );

  const handleContinue = () => {
    if (selectedOption === "yes") {
      router.push("/incubator_search");
    } else if (selectedOption === "no") {
      router.push("/startup_pricing");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFAF6]">
      {/* Progress Bar */}
      <div className="w-80 mx-auto mt-4">
        <div className="h-[5px] bg-[#CF4326] w-[213.32px]" />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 max-w-[320px] mx-auto mt-8">
        {/* Back Button */}
        <div className="mb-4">
          <Link href="/startup_search" className="w-full">
            <button className="flex items-center gap-2 w-full text-left">
              <ArrowLeft className="text-[#2a2a2a] text-2xl" />
              <span className="font-medium text-[#2a2a2a] text-xs">Retour</span>
            </button>
          </Link>
        </div>

        {/* Question */}
        <div className="flex flex-col gap-8 items-center justify-center w-full mb-8">
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <h2 className="text-2xl font-bold text-[#2a2a2a] text-left w-full leading-[1.3]">
              Êtes-vous rattaché à un incubateur ?
            </h2>
          </div>

          {/* Yes/No Options */}
          <div className="flex flex-row gap-4 items-start justify-start w-72">
            <div className="flex flex-row gap-4 items-center justify-center w-full">
              <div className="flex flex-row gap-4 items-start justify-start w-full">
                {/* No Button */}
                <button
                  onClick={() => setSelectedOption("no")}
                  className={`flex-1 flex items-center justify-center min-h-11 px-8 py-2.5 rounded-md border transition-colors ${
                    selectedOption === "no"
                      ? "bg-[#fef4f2] border-[#b53a20] text-[#b53a20]"
                      : "bg-white border-neutral-300 text-neutral-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium text-sm">Non</span>
                </button>

                {/* Yes Button */}
                <button
                  onClick={() => setSelectedOption("yes")}
                  className={`flex-1 flex items-center justify-center min-h-11 px-8 py-2.5 rounded-md border transition-colors relative ${
                    selectedOption === "yes"
                      ? "bg-[#fef4f2] border-[#b53a20] text-[#b53a20]"
                      : "bg-white border-neutral-300 text-neutral-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium text-sm">Oui</span>
                  {selectedOption === "yes" && (
                    <div className="absolute -top-3 -right-3 w-6 h-6 flex items-center justify-center">
                      <div className="w-5 h-5 bg-[#b53a20] rounded-full flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-white"
                        >
                          <path
                            d="M9 12L11 14L15 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="w-full">
          <Button
            onClick={handleContinue}
            disabled={selectedOption === null}
            className="w-full bg-[#cf4326] text-white font-medium text-sm py-2.5 px-4 rounded-md hover:bg-[#b53a20] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuer
          </Button>
        </div>
      </main>
    </div>
  );
}
