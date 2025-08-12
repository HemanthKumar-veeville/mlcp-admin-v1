"use client";

import { useState } from "react";
import { ArrowLeft, User, Menu } from "lucide-react";
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
    <div className="flex flex-col gap-4 items-center justify-start pb-8 pt-0 px-0 relative size-full bg-[#fdfaf6]">
      {/* Header */}
      <div className="flex flex-row items-center justify-between px-8 py-4 relative shrink-0 w-80">
        <div className="flex flex-row items-start justify-start p-0 relative shrink-0">
          <div className="flex flex-row h-6 items-center justify-center p-0 relative shrink-0">
            <Menu className="text-[#2a2a2a] text-[24px]" />
          </div>
        </div>
        <div className="flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
          <div className="flex flex-col items-end justify-center pb-1 pt-0 px-0 relative shrink-0">
            <div className="font-bold leading-[0] mb-[-4px] not-italic relative shrink-0 text-[#1a1d26] text-[18px] text-left text-nowrap">
              <p className="block leading-[1.1] whitespace-pre">
                MyLittleCockpit
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#2a2a2a] flex flex-row items-center justify-center p-0 relative rounded-[100px] shrink-0 size-8">
          <User className="text-[16px] text-neutral-50" />
        </div>
      </div>

      {/* Main Container */}
      <div className="basis-0 flex flex-col grow items-center justify-between min-h-px min-w-px px-4 py-0 relative shrink-0 w-full">
        <div className="basis-0 flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px pb-4 pt-0 px-0 relative shrink-0 w-full">
          {/* Back Button and Title */}
          <div className="flex flex-col gap-4 items-center justify-start p-0 relative shrink-0 w-full">
            <Link href="/incubatorform" className="w-full">
              <button className="flex flex-col gap-4 items-start justify-center overflow-visible p-0 relative shrink-0 w-full">
                <div className="flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full">
                  <div className="flex flex-row items-start justify-start p-0 relative shrink-0">
                    <ArrowLeft className="text-[#2a2a2a] text-[24px]" />
                  </div>
                  <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#2a2a2a] text-[12px] text-left text-nowrap">
                    <p className="block leading-[16px] whitespace-pre">
                      Retour
                    </p>
                  </div>
                </div>
              </button>
            </Link>
            <div className="flex flex-col gap-4 items-start justify-center p-0 relative shrink-0 w-full">
              <div className="flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                  <div className="font-bold leading-[0] not-italic relative shrink-0 text-[#2a2a2a] text-[24px] text-left text-nowrap">
                    <p className="block leading-[1.3] whitespace-pre">
                      Votre incubateur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Container */}
          <div className="basis-0 bg-[#ffffff] flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative rounded shrink-0 w-full">
            {/* Search Input */}
            <div className="flex flex-col gap-2.5 items-start justify-start p-[4px] relative shrink-0 w-full">
              <div className="flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="basis-0 bg-[#ffffff] flex flex-row grow h-10 items-center justify-start min-h-10 min-w-px px-3 py-2 relative rounded-md shrink-0 border border-neutral-300">
                  <div className="basis-0 font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-left text-neutral-500">
                    <input
                      type="text"
                      placeholder="Recherchez votre incubateur"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-[14px] text-neutral-500 placeholder-neutral-500"
                    />
                  </div>
                  <div
                    className="overflow-clip relative shrink-0 size-4"
                    data-name="Icon"
                  >
                    <div className="absolute inset-[8.33%_16.67%_16.67%_8.33%]">
                      <img
                        alt="Search icon part 1"
                        className="block max-w-none size-full"
                        src={img}
                      />
                    </div>
                    <div className="absolute inset-[65.21%_8.33%_8.33%_65.21%]">
                      <img
                        alt="Search icon part 2"
                        className="block max-w-none size-full"
                        src={img1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="h-0 shrink-0 w-full" data-name="Separator">
              <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                <img
                  alt="Separator"
                  className="block max-w-none size-full"
                  src={imgSeparator}
                />
              </div>
            </div>

            {/* Incubator List */}
            <div className="basis-0 bg-[#ffffff] flex flex-col grow items-start justify-start min-h-px min-w-px overflow-x-clip overflow-y-auto p-[4px] relative rounded-lg shrink-0 w-full">
              {/* Separator */}
              <div
                className="h-0 relative shrink-0 w-full"
                data-name="Separator"
              >
                <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                  <img
                    alt="Separator"
                    className="block max-w-none size-full"
                    src={imgSeparator1}
                  />
                </div>
              </div>

              {/* Incubator Items */}
              {filteredIncubators.map((incubator, index) => (
                <div key={incubator.id}>
                  <button
                    onClick={() => setSelectedIncubator(incubator.id)}
                    className={`bg-[#ffffff] flex flex-row gap-2 items-center justify-start min-h-11 min-w-11 px-4 py-3 relative shrink-0 w-full hover:bg-neutral-50 transition-colors ${
                      selectedIncubator === incubator.id ? "bg-neutral-50" : ""
                    }`}
                  >
                    <div
                      className="bg-center bg-contain bg-no-repeat rounded-[99px] shrink-0 size-6"
                      style={{ backgroundImage: `url('${incubator.logo}')` }}
                    />
                    <div className="font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-center text-neutral-600 text-nowrap">
                      <p className="block leading-[20px] whitespace-pre">
                        {incubator.name}
                      </p>
                    </div>
                  </button>
                  {index < filteredIncubators.length - 1 && (
                    <div
                      className="h-0 relative shrink-0 w-full"
                      data-name="Separator"
                    >
                      <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                        <img
                          alt="Separator"
                          className="block max-w-none size-full"
                          src={imgSeparator2}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex flex-col gap-2 items-center justify-center p-0 relative shrink-0 w-full">
          <button
            disabled={!selectedIncubator}
            className={`flex flex-row gap-2 items-center justify-center min-h-10 min-w-10 px-4 py-2 relative rounded-md shrink-0 w-full font-medium text-[14px] transition-colors ${
              selectedIncubator
                ? "bg-[#cf4326] text-[#ffffff] hover:bg-[#b83a22]"
                : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            }`}
            onClick={() => {
              if (selectedIncubator) {
                router.push(`/incubatorform?incubatorId=${selectedIncubator}`);
              }
            }}
          >
            <span className="block leading-[20px]">Continuer</span>
          </button>
          <button className="bg-neutral-100 flex flex-row gap-2 items-center justify-center min-h-10 min-w-10 px-4 py-2 relative rounded-md shrink-0 w-full font-medium text-[14px] text-[#cf4326] hover:bg-neutral-200 transition-colors">
            <span className="block leading-[20px]">Créer mon incubateur</span>
          </button>
        </div>
      </div>
    </div>
  );
}
