"use client";

import { useState } from "react";
import { ArrowLeft, User, Check, ChevronDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

// Image assets from Figma
const imgEllipse13 =
  "http://localhost:3845/assets/a8be8a0d95a1343f5194f1bf1a9f6d67c038aaca.svg";
const imgContainer =
  "http://localhost:3845/assets/5a2cbb31619dced1a60a5841880006c89dbf1b32.svg";

export default function IncubatorPricingPage() {
  const [activeTab, setActiveTab] = useState("solo");
  const router = useRouter();

  // Content for each tab based on Figma designs
  const tabContent = {
    solo: {
      title: "Formule Solo",
      description:
        "Parfait pour les fondateurs solo ou les petites structures en démarrage.",
      price: "35€",
      priceSubtext: "/mois",
      popular: false,
      userCount: "1 personne",
      showUserIcon: true,
    },
    team: {
      title: "Formule Équipe",
      description:
        "Bénéficiez de toutes les fonctionnalités pour votre équipe, avec un accès partagé sécurisé et centralisé.",
      price: "750€",
      priceSubtext: "/ an",
      popular: true,
      userCount: "2 à 5",
      showUserIcon: false,
    },
  };

  const currentContent = tabContent[activeTab as keyof typeof tabContent];

  return (
    <div className="bg-[#fdfaf6] min-h-screen flex flex-col">
      {/* Progress Bar */}
      <div className="w-80 h-[5px] bg-[#cf4326]" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 px-4 pb-8 max-w-sm mx-auto w-full">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-[#2a2a2a] mt-4">
          <ArrowLeft size={16} />
          <span className="text-xs font-medium">Retour</span>
        </button>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2a2a2a] leading-[1.3]">
            Abonnement
          </h2>
        </div>

        {/* Tabs with Badge */}
        <div className="relative">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-neutral-100 p-1 w-full">
              <TabsTrigger
                value="solo"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#cf4326] data-[state=active]:shadow-sm"
              >
                Formule Solo
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#cf4326] data-[state=active]:shadow-sm"
              >
                Formule Équipe
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Popular Badge */}
          {currentContent.popular && (
            <Badge className="absolute -top-3 -left-2 bg-[#cf4326] text-white text-xs font-semibold px-2.5 py-0.5">
              Populaire
            </Badge>
          )}
        </div>

        {/* Pricing Card */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col h-[250px] justify-between">
              {/* Card Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold text-neutral-900">
                    {currentContent.title}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    {currentContent.showUserIcon ? (
                      <div className="flex items-center gap-2.5 w-4 h-4">
                        <User size={16} className="text-neutral-600" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5 w-4 h-4">
                        <Users size={16} className="text-neutral-600" />
                      </div>
                    )}
                    <span className="text-xs font-medium text-black">
                      {currentContent.userCount}
                    </span>
                  </div>
                </div>

                <CardDescription className="text-sm text-neutral-500 leading-5">
                  {currentContent.description}
                </CardDescription>
              </div>

              {/* Price */}
              <div className="mt-6">
                {activeTab === "team" ? (
                  <div className="bg-white border border-neutral-300 rounded-md px-3 py-2 flex items-center justify-between min-h-10">
                    <div className="text-sm text-neutral-900">
                      <span className="font-bold">{currentContent.price}</span>
                      <span className="ml-1">
                        {currentContent.priceSubtext}
                      </span>
                    </div>
                    <div className="opacity-50 w-4 h-4">
                      <ChevronDown size={16} className="text-neutral-600" />
                    </div>
                  </div>
                ) : (
                  <div className="text-[20px] font-bold text-black leading-[28px]">
                    {currentContent.price}
                    <span className="font-medium text-[18px] ml-1">
                      {currentContent.priceSubtext}
                    </span>
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute h-36 w-[150px] -left-[100px] -top-[145.5px]">
                <img src={imgEllipse13} alt="" className="w-full h-full" />
              </div>
              <div className="absolute h-[197px] w-[200px] left-[202px] top-[164px]">
                <img src={imgContainer} alt="" className="w-full h-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button
          className="w-full bg-[#cf4326] hover:bg-[#b53a20] text-white font-medium py-2 px-4 rounded-md"
          onClick={() => {
            router.push("/completed_info");
          }}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}
