"use client";

import { useState } from "react";
import { ArrowLeft, User, Check } from "lucide-react";
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

// Image assets from Figma
const img =
  "http://localhost:3845/assets/ec284f1384fbdf6e8b0e1b84fbe9d5e1c977fa17.svg";
const img1 =
  "http://localhost:3845/assets/1b002524161aac295087eff25e2787ba07656896.svg";
const imgEllipse13 =
  "http://localhost:3845/assets/a8be8a0d95a1343f5194f1bf1a9f6d67c038aaca.svg";
const imgContainer =
  "http://localhost:3845/assets/5a2cbb31619dced1a60a5841880006c89dbf1b32.svg";

export default function IncubatorPricingPage() {
  const [activeTab, setActiveTab] = useState("complete");

  // Content for each tab based on Figma designs
  const tabContent = {
    complete: {
      title: "Complète",
      description:
        "Accès illimité à la plateforme pour vous et vos startups, avec gestion centralisée et accompagnement personnalisé.",
      price: "1000€ / an et par utilisateur",
      priceSubtext: "incubé",
      popular: true,
    },
    shared: {
      title: "Partagé",
      description:
        "Co-financé à 50/50\n\n✅ Startup : 500 €\n✅ Incubateur : 500 €",
      price: "1000 € / utilisateur / an",
      priceSubtext: "",
      popular: true,
    },
    custom: {
      title: "Sur-mesure",
      description: "Adaptée à votre structure",
      price: "Contacter contact@mlc.com",
      priceSubtext: "",
      popular: true,
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
        <button className="flex items-center gap-2 text-[#2a2a2a]">
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
                value="complete"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#cf4326] data-[state=active]:shadow-sm"
              >
                Complète
              </TabsTrigger>
              <TabsTrigger
                value="shared"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#cf4326] data-[state=active]:shadow-sm"
              >
                Partagé
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-[#cf4326] data-[state=active]:shadow-sm"
              >
                Sur-mesure
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
                    <span className="text-xs font-medium text-black">
                      Par utilisateur
                    </span>
                  </div>
                </div>

                <CardDescription className="text-sm text-neutral-500 leading-5 whitespace-pre-line">
                  {currentContent.description}
                </CardDescription>
              </div>

              {/* Price */}
              <div className="mt-6">
                <div className="text-[20px] font-bold text-black leading-[28px]">
                  {currentContent.price}
                </div>
                {currentContent.priceSubtext && (
                  <div className="text-base font-medium text-black leading-6">
                    {currentContent.priceSubtext}
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute h-36 w-[150px] -left-[100px] -top-[145.5px]">
                <img src={imgEllipse13} alt="" className="w-full h-full" />
              </div>
              <div className="absolute h-[197px] w-[200px] left-[212px] top-[184px]">
                <img src={imgContainer} alt="" className="w-full h-full" />
              </div>
              <div className="absolute h-[197px] w-[200px] left-[-150px] top-[-150px]">
                <img src={imgContainer} alt="" className="w-full h-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button className="w-full bg-[#cf4326] hover:bg-[#b53a20] text-white font-medium py-2 px-4 rounded-md">
          Continuer
        </Button>
      </div>
    </div>
  );
}
