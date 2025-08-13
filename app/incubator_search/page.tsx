"use client";

import { useState } from "react";
import { ArrowLeft, User, Menu, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Figma design assets
const imgEllipse =
  "http://localhost:3845/assets/702155418d724d422dab16aaa56b11f9081c081d.png";
const imgSeparator =
  "http://localhost:3845/assets/3c69a86da418b18237c56f2cbb2a70eac379dbcb.svg";
const img =
  "http://localhost:3845/assets/2748976e62ae2cddd12e956d5de4d25b748c56b5.svg";
const img1 =
  "http://localhost:3845/assets/691e57551526b37f88bed954ecdecdce3b028152.svg";
const imgSeparator1 =
  "http://localhost:3845/assets/193810a6849a963964124242e6c8fb23d099bfd7.svg";
const imgSeparator2 =
  "http://localhost:3845/assets/f68ca7a68c62482e07580c63adabf6549e6797dd.svg";

// Mock data for incubators
const incubators = [
  { id: 1, name: "Ieseg", logo: imgEllipse },
  { id: 2, name: "How i met your tech", logo: imgEllipse },
  { id: 3, name: "How i met your tech", logo: imgEllipse },
  { id: 4, name: "How i met your tech", logo: imgEllipse },
  { id: 5, name: "How i met your tech", logo: imgEllipse },
];

export default function IncubatorSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncubator, setSelectedIncubator] = useState<number | null>(
    null
  );
  const router = useRouter();
  const filteredIncubators = incubators.filter((incubator) =>
    incubator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#fdfaf6] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 pb-8 max-w-md mx-auto w-full">
        {/* Back Button and Title */}
        <div className="flex flex-col gap-4 mb-4">
          <Link href="/incubatorform" className="w-full">
            <button className="flex items-center gap-2 w-full text-left">
              <ArrowLeft className="text-[#2a2a2a] text-2xl" />
              <span className="font-medium text-[#2a2a2a] text-xs">Retour</span>
            </button>
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-[#2a2a2a] text-2xl leading-tight">
              Votre incubateur
            </h1>
          </div>
        </div>

        {/* Search Container */}
        <div className="flex-1 flex flex-col bg-white rounded-lg overflow-hidden">
          {/* Search Input */}
          <div className="p-1">
            <div className="flex items-center h-10 px-3 py-2 border border-neutral-300 rounded-md">
              <input
                type="text"
                placeholder="Recherchez votre incubateur"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm text-neutral-500 bg-transparent border-none outline-none placeholder-neutral-500"
              />
              <Search className="text-neutral-500 w-4 h-4 ml-2" />
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-neutral-300 w-full my-4"></div>

          {/* Incubator List */}
          <div className="flex flex-col gap-2">
            {/* Incubator Items */}
            {filteredIncubators.map((incubator, index) => (
              <div key={incubator.id}>
                <button
                  onClick={() => setSelectedIncubator(incubator.id)}
                  className={`w-full flex items-center gap-2 px-4 py-3 min-h-11 hover:bg-neutral-50 transition-colors ${
                    selectedIncubator === incubator.id ? "bg-neutral-50" : ""
                  }`}
                >
                  <img
                    src={incubator.logo}
                    alt={incubator.name}
                    className="w-8 h-auto object-contain"
                  />
                  <span className="font-medium text-sm text-neutral-600 text-left">
                    {incubator.name}
                  </span>
                </button>
                {index < filteredIncubators.length - 1 && (
                  <div className="h-px bg-neutral-300 w-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            disabled={!selectedIncubator}
            className={`w-full h-10 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              selectedIncubator
                ? "bg-[#cf4326] text-white hover:bg-[#b83a22]"
                : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            }`}
            onClick={() => {
              if (selectedIncubator) {
                router.push(`/incubatorform?incubatorId=${selectedIncubator}`);
              }
            }}
          >
            Continuer
          </button>
          <button
            className="w-full h-10 px-4 py-2 bg-neutral-100 rounded-md font-medium text-sm text-[#cf4326] hover:bg-neutral-200 transition-colors"
            onClick={() => {
              router.push("/incubator_signup");
            }}
          >
            Créer mon incubateur
          </button>
        </div>
      </div>
    </div>
  );
}
