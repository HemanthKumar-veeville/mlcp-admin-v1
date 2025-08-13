"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Menu, User } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    profilePicture: z.any().optional(),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    firstName: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères"),
    address: z.string().min(1, "L'adresse est requise"),
    email: z.string().email("Veuillez entrer une adresse email valide"),
    phone: z.string().min(1, "Le numéro de téléphone est requis"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export default function StartupFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePicture: null,
      lastName: "",
      firstName: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleProfilePictureChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("profilePicture", file);
    } else {
      setProfilePreview(null);
      form.setValue("profilePicture", null);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    router.push("/validation");
  };

  return (
    <div className="bg-[#fdfaf6] flex flex-col gap-4 items-center justify-start pb-8 pt-0 px-4 relative w-full">
      {/* Container */}
      <div className="flex flex-col gap-8 items-start justify-center relative w-full">
        <div className="flex flex-col gap-4 items-start justify-start relative w-full">
          {/* Back Button */}
          <button
            className="flex flex-col gap-4 items-start justify-center relative"
            onClick={() => router.back()}
          >
            <div className="flex flex-row gap-2 items-center justify-start relative w-full">
              <ArrowLeft className="w-6 h-6 text-neutral-900" />
              <div className="font-medium leading-[0] text-[12px] text-left text-[#2a2a2a]">
                <p className="block leading-[16px]">Retour</p>
              </div>
            </div>
          </button>

          {/* Form Container */}
          <div className="flex flex-col gap-4 items-start justify-start relative w-full">
            <div className="flex flex-col gap-4 items-start justify-start relative w-full">
              {/* Title */}
              <div className="flex flex-col gap-1 items-start justify-start relative w-full">
                <div className="font-bold leading-[0] text-[24px] text-left text-[#2a2a2a]">
                  <p className="block leading-[1.5]">Vos informations</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 items-start justify-start relative w-full"
              >
                {/* Profile Picture Upload */}
                <div className="flex flex-col gap-1 items-start justify-start relative w-72">
                  <div className="font-medium leading-[0] text-[14px] text-left text-[#2a2a2a]">
                    <p className="block leading-[20px]">Photo de profil</p>
                  </div>
                  <FileUpload
                    onFileSelect={handleProfilePictureChange}
                    previewUrl={profilePreview}
                    className="w-full"
                  />
                </div>

                {/* Name Fields */}
                <div className="flex flex-row gap-4 items-start justify-start relative w-full">
                  {/* Last Name */}
                  <div className="basis-0 flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px relative">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium leading-[0] text-[14px] text-left text-neutral-900">
                            <p className="block leading-[20px]">Nom*</p>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
                              {...field}
                              className="basis-0 bg-[#ffffff] flex flex-row grow h-10 items-center justify-start min-h-10 min-w-px px-3 py-2 relative rounded-md border border-neutral-300 focus:border-[#cf4326] focus:ring-[#cf4326] text-[14px] text-left"
                            />
                          </FormControl>
                          <FormMessage className="text-[#cf4326]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* First Name */}
                  <div className="basis-0 flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px relative">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium leading-[0] text-[14px] text-left text-neutral-900">
                            <p className="block leading-[20px]">Prénom*</p>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              {...field}
                              className="basis-0 bg-[#ffffff] flex flex-row grow h-10 items-center justify-start min-h-10 min-w-px px-3 py-2 relative rounded-md border border-neutral-300 focus:border-[#cf4326] focus:ring-[#cf4326] text-[14px] text-left"
                            />
                          </FormControl>
                          <FormMessage className="text-[#cf4326]" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1.5 items-start justify-start relative w-full">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium leading-[0] text-[14px] text-left text-neutral-900">
                          <p className="block leading-[20px]">Adresse*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="4/26 Rue Pasteur, Lille 59000"
                            {...field}
                            className="basis-0 bg-[#ffffff] flex flex-row grow h-10 items-center justify-start min-h-10 min-w-px px-3 py-2 relative rounded-md border border-neutral-300 focus:border-[#cf4326] focus:ring-[#cf4326] text-[14px] text-left text-[rgba(17,17,19,0.6)]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#cf4326]" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5 items-start justify-start relative w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium leading-[0] text-[14px] text-left text-neutral-900">
                          <p className="block leading-[20px]">Email*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@gmail.com"
                            {...field}
                            className="basis-0 bg-[#ffffff] flex flex-row grow h-10 items-center justify-start min-h-10 min-w-px px-3 py-2 relative rounded-md border border-neutral-300 focus:border-[#cf4326] focus:ring-[#cf4326] text-[14px] text-left text-[rgba(17,17,19,0.6)]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#cf4326]" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5 items-start justify-start relative w-full">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium leading-[0] text-[14px] text-left text-neutral-900">
                          <p className="block leading-[20px]">
                            Numéro de téléphone*
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0712093923"
                            {...field}
                            className="basis-0 bg-[#ffffff] flex flex-row grow h-10 items-center justify-start min-h-10 min-w-px px-3 py-2 relative rounded-md border border-neutral-300 focus:border-[#cf4326] focus:ring-[#cf4326] text-[14px] text-left text-[rgba(17,17,19,0.6)]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#cf4326]" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5 items-start justify-start relative w-full">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium leading-[0] text-[14px] text-left text-neutral-900">
                          <p className="block leading-[20px]">Mot de passe*</p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*********"
                            {...field}
                            className="basis-0 bg-[#ffffff] flex flex-row grow h-10 items-center justify-start min-h-10 min-w-px px-3 py-2 relative rounded-md border border-neutral-300 focus:border-[#cf4326] focus:ring-[#cf4326] text-[14px] text-left text-[rgba(17,17,19,0.6)]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#cf4326]" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5 items-start justify-start relative w-full">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium leading-[0] text-[14px] text-left text-neutral-900">
                          <p className="block leading-[20px]">
                            Confirmation du mot de passe*
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*********"
                            {...field}
                            className="basis-0 bg-[#ffffff] flex flex-row grow h-10 items-center justify-start min-h-10 min-w-px px-3 py-2 relative rounded-md border border-neutral-300 focus:border-[#cf4326] focus:ring-[#cf4326] text-[14px] text-left text-[rgba(17,17,19,0.6)]"
                          />
                        </FormControl>
                        <FormMessage className="text-[#cf4326]" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#cf4326] flex flex-row gap-2 items-center justify-center min-h-10 min-w-10 px-4 py-2 relative rounded-md w-full text-[#ffffff] text-[14px] text-center font-medium hover:bg-[#b83a22] disabled:opacity-50"
                >
                  <span className="basis-0 font-medium grow leading-[0] min-h-px min-w-px text-[#ffffff] text-[14px] text-center">
                    <p className="block leading-[20px]">
                      {isSubmitting ? "Chargement..." : "Continuer"}
                    </p>
                  </span>
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
