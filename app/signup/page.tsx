"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SelectionGroup,
  SelectionOption,
} from "@/components/ui/selection-group";
import { ClientOnly } from "@/components/ui/client-only";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type MemberType = "startup" | "incubator" | null;

const memberOptions: SelectionOption[] = [
  {
    value: "startup",
    label: "Un membre d'une startup",
    icon: "🚀",
  },
  {
    value: "incubator",
    label: "Un membre d'un incubateur",
    icon: "💡",
  },
];

// Static fallback component for SSR - matches exact Figma design
function SelectionFallback() {
  return (
    <div className="flex flex-col gap-4">
      {memberOptions.map((option) => (
        <div
          key={option.value}
          className="w-full rounded-md flex items-center px-8 py-2.5 gap-2 bg-white border border-[#d4d4d4] cursor-pointer hover:border-[#cf4326] hover:bg-gray-50 transition-all duration-200"
        >
          <span className="text-base flex-shrink-0 text-[#cf4326] transition-colors duration-200">
            {option.icon}
          </span>
          <span className="text-sm font-medium font-['Inter'] flex-1 text-left text-[#525252] transition-colors duration-200">
            {option.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SignupPage() {
  const [selectedType, setSelectedType] = useState<MemberType>(null);
  const router = useRouter();
  const handleSelectionChange = (value: string) => {
    setSelectedType(value as MemberType);
  };

  const handleContinue = () => {
    if (selectedType) {
      if (selectedType === "startup") {
        router.push("/startupform");
      } else {
        router.push("/incubatorform");
      }
    }
  };

  return (
    <main className="bg-[#fdfaf6] h-full min-h-[500px] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 px-4 flex flex-col">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[#2a2a2a] mt-4 mb-8"
        >
          <span className="text-xs">←</span>
          <span className="text-xs font-medium font-['Inter']">Retour</span>
        </Link>

        {/* Form */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-bold text-[#cf4326] font-['Inter']">
              Vous un membre de ?
            </h2>

            <ClientOnly fallback={<SelectionFallback />}>
              <SelectionGroup
                options={memberOptions}
                value={selectedType || undefined}
                onValueChange={handleSelectionChange}
                aria-label="Sélectionnez votre type de membre"
              />
            </ClientOnly>
          </div>
        </div>

        {/* Continue Button */}
        <div className="p-4 mb-8 mt-auto">
          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            className={cn(
              "w-full bg-[#cf4326] text-white rounded-md px-4 py-2 text-sm font-medium font-['Inter'] transition-all duration-200",
              !selectedType && "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            Continuer
          </Button>
        </div>
      </div>
    </main>
  );
}
