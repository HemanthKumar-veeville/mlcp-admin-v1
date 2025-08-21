"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import {
  registerStartupCompany,
  clearStartupError,
} from "@/lib/store/slices/authSlice";
import { StartupData } from "@/lib/services/authService";

interface FormData {
  logo: File | null;
  startupName: string;
  startupAddress: string;
  email: string;
  phone: string;
  website: string;
}

interface ValidationErrors {
  logo?: string;
  startupName?: string;
  startupAddress?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export default function StartupSignupPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { startupLoading, startupError } = useSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState<FormData>({
    logo: null,
    startupName: "How i met your tech",
    startupAddress: "4/26 Rue pasteur, Lille 59000",
    email: "contact@himyt.com",
    phone: "+33 3 20 00 00 00",
    website: "",
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const handleInputChange = (
    field: keyof FormData,
    value: string | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Validate logo
    if (!formData.logo) {
      errors.logo = "Logo is required";
    }

    // Validate startup name
    if (!formData.startupName.trim()) {
      errors.startupName = "Startup name is required";
    } else if (formData.startupName.trim().length < 2) {
      errors.startupName = "Startup name must be at least 2 characters";
    }

    // Validate address
    if (!formData.startupAddress.trim()) {
      errors.startupAddress = "Address is required";
    } else if (formData.startupAddress.trim().length < 5) {
      errors.startupAddress = "Address must be at least 5 characters";
    }

    // Validate phone
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid phone number";
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    // Validate website (optional but if provided, should be valid)
    if (
      formData.website.trim() &&
      !/^https?:\/\/.+/.test(formData.website.trim())
    ) {
      errors.website =
        "Please enter a valid website URL (starting with http:// or https://)";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Clear any previous errors
    dispatch(clearStartupError());

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      // Prepare data for API
      const startupData: StartupData = {
        name: formData.startupName.trim(),
        logo: formData.logo!, // We know it's not null because validation passed
        address: formData.startupAddress.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        website: formData.website.trim() || "https://example.com", // Default if empty
      };

      // Dispatch the action
      const result = await dispatch(
        registerStartupCompany(startupData)
      ).unwrap();

      // If successful, navigate to next page
      if (result) {
        router.push("/incubator_linked_q");
      }
    } catch (error) {
      // Error is handled by the Redux slice
      console.error("Registration failed:", error);
    }
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
          <Link href="/startup_search" className="w-full">
            <button className="flex items-center gap-2 w-full text-left">
              <ArrowLeft className="text-[#2a2a2a] text-2xl" />
              <span className="font-medium text-[#2a2a2a] text-xs">Retour</span>
            </button>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-[#2A2A2A] mb-4">
          Informations de la startup
        </h2>

        {/* Error Message */}
        {startupError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{startupError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
                onChange={(file: File | null) =>
                  handleInputChange("logo", file)
                }
                accept="image/*"
                maxSize={5}
                showPreview={true}
                className={`w-full ${
                  validationErrors.logo ? "border-red-500" : ""
                }`}
              />
              {validationErrors.logo && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.logo}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="startupName"
                className="text-sm font-medium text-[#2A2A2A] mb-1"
              >
                Nom de la startup*
              </Label>
              <Input
                id="startupName"
                value={formData.startupName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("startupName", e.target.value)
                }
                className={`w-full h-10 px-3 py-2 bg-white border rounded-md text-sm text-[rgba(17,17,19,0.6)] ${
                  validationErrors.startupName
                    ? "border-red-500"
                    : "border-neutral-300"
                }`}
              />
              {validationErrors.startupName && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.startupName}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="startupAddress"
                className="text-sm font-medium text-[#2A2A2A] mb-1"
              >
                Adresse de la startup*
              </Label>
              <Input
                id="startupAddress"
                value={formData.startupAddress}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("startupAddress", e.target.value)
                }
                className={`w-full h-10 px-3 py-2 bg-white border rounded-md text-sm text-[rgba(17,17,19,0.6)] ${
                  validationErrors.startupAddress
                    ? "border-red-500"
                    : "border-neutral-300"
                }`}
              />
              {validationErrors.startupAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.startupAddress}
                </p>
              )}
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
                className={`w-full h-10 px-3 py-2 bg-white border rounded-md text-sm text-[rgba(17,17,19,0.6)] ${
                  validationErrors.phone
                    ? "border-red-500"
                    : "border-neutral-300"
                }`}
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.phone}
                </p>
              )}
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
                type="email"
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("email", e.target.value)
                }
                className={`w-full h-10 px-3 py-2 bg-white border rounded-md text-sm text-[rgba(17,17,19,0.6)] ${
                  validationErrors.email
                    ? "border-red-500"
                    : "border-neutral-300"
                }`}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="website"
                className="text-sm font-medium text-[#2A2A2A] mb-1"
              >
                Site web
              </Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("website", e.target.value)
                }
                placeholder="https://example.com"
                className={`w-full h-10 px-3 py-2 bg-white border rounded-md text-sm text-[rgba(17,17,19,0.6)] ${
                  validationErrors.website
                    ? "border-red-500"
                    : "border-neutral-300"
                }`}
              />
              {validationErrors.website && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.website}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={startupLoading}
            className="w-full h-10 bg-[#CF4326] text-white hover:bg-[#CF4326]/90 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {startupLoading ? "Enregistrement..." : "Continuer"}
          </Button>
        </form>
      </main>
    </div>
  );
}
