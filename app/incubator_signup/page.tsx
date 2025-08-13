"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
  logo: string;
  incubatorName: string;
  campusName: string;
  address: string;
  phone: string;
  email: string;
}

export default function IncubatorSignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    logo: "",
    incubatorName: "Ieseg",
    campusName: "Ieseg - Vauban",
    address: "4/26 Rue Pasteur, Lille 59000",
    phone: "+33 3 20 00 00 00",
    email: "contact@example.com",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    router.push("/incubator_pricing");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFAF6]">
      {/* Progress Bar */}
      <div className="w-80 mx-auto mt-4">
        <div className="h-[5px] bg-[#CF4326] w-[71.42857%]" />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 max-w-[320px] mx-auto mt-8">
        {/* Back Button and Title */}
        <div className="flex flex-col gap-4 mb-4">
          <Link href="/incubator_search" className="w-full">
            <button className="flex items-center gap-2 w-full text-left">
              <ArrowLeft className="text-[#2a2a2a] text-2xl" />
              <span className="font-medium text-[#2a2a2a] text-xs">Retour</span>
            </button>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-[#2A2A2A] mb-4">
          Informations de l'incubateur
        </h2>

        <form className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="logo"
                className="text-sm font-medium text-[#2A2A2A] mb-1"
              >
                Logo*
              </Label>
              <FileUpload
                id="logo"
                value={formData.logo}
                onChange={(value: string) => handleInputChange("logo", value)}
                className="w-full"
              />
            </div>

            <div>
              <Label
                htmlFor="incubatorName"
                className="text-sm font-medium text-[#2A2A2A] mb-1"
              >
                Nom de l'incubateur*
              </Label>
              <Input
                id="incubatorName"
                value={formData.incubatorName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("incubatorName", e.target.value)
                }
                className="w-full h-10 px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-[rgba(17,17,19,0.6)]"
              />
            </div>

            <div>
              <Label
                htmlFor="campusName"
                className="text-sm font-medium text-[#2A2A2A] mb-1"
              >
                Nom du campus*
              </Label>
              <Input
                id="campusName"
                value={formData.campusName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("campusName", e.target.value)
                }
                className="w-full h-10 px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-[rgba(17,17,19,0.6)]"
              />
            </div>

            <div>
              <Label
                htmlFor="address"
                className="text-sm font-medium text-[#2A2A2A] mb-1"
              >
                Adresse*
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("address", e.target.value)
                }
                className="w-full h-10 px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-[rgba(17,17,19,0.6)]"
              />
            </div>

            <div>
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-[#2A2A2A] mb-1"
              >
                Téléphone*
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("phone", e.target.value)
                }
                className="w-full h-10 px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-[rgba(17,17,19,0.6)]"
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-[#2A2A2A] mb-1"
              >
                Email*
              </Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("email", e.target.value)
                }
                className="w-full h-10 px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm text-[rgba(17,17,19,0.6)]"
              />
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full h-10 bg-[#CF4326] text-white hover:bg-[#CF4326]/90 rounded-md text-sm font-medium"
          >
            Continuer
          </Button>
        </form>
      </main>
    </div>
  );
}
