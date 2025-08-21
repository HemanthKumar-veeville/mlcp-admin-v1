"use client";

import Image from "next/image";
import SignInButton from "@/components/ui/sign-in-button";
import SignUpButton from "@/components/ui/sign-up-button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, resendOTP } from "@/lib/store/slices/authSlice";
import { AppDispatch, RootState } from "@/lib/store/store";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  async function getMe() {
    await dispatch(getCurrentUser());
  }

  async function routingUsers() {
    if (user?.logged_in) {
      if (!user?.verified && user?.user_type) {
        try {
          await dispatch(resendOTP());
          router.push(`/validation?mode=${user?.user_type}`);
        } catch (error) {
          console.error("Error sending OTP:", error);
        }
      } else if (user?.user_type === "startup" && !user?.startup_id) {
        router.push("/startup_search");
      } else if (user?.user_type === "incubator" && !user?.incubator_id) {
        router.push("/incubator_search");
      } else {
        router.push("/");
      }
    }
  }

  useEffect(() => {
    !user && getMe();
    user && routingUsers();
  }, [user]);

  return (
    <main className="flex flex-col items-center justify-between px-4 pt-8">
      <div className="w-full opacity-85 relative mb-8">
        <div className="flex justify-start px-[38px]">
          <Image
            src="/thumb-up-dynamic-color.png"
            alt="Thumbs up"
            width={90}
            height={90}
            className="object-contain"
          />
        </div>
        <div className="flex justify-end px-[38px] -mt-[37px]">
          <Image
            src="/calender-dynamic-color.png"
            alt="Calendar"
            width={90}
            height={90}
            className="object-contain"
          />
        </div>
        <div className="flex justify-start px-[38px] -mt-[37px]">
          <div className="rotate-[340.521deg]">
            <Image
              src="/megaphone-dynamic-color.png"
              alt="Megaphone"
              width={90}
              height={90}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="w-full space-y-2 text-left mb-8">
        <h2 className="text-[20px] text-[#cf4326]">
          <span className="font-normal">Prenez le contrôle. </span>
          <span className="font-bold">Simplement.</span>
        </h2>
        <p className="text-[14px] text-neutral-600">
          Votre plateforme de gestion pour{" "}
          <span className="underline decoration-[#cf4326] font-bold">
            startups
          </span>{" "}
          et{" "}
          <span className="underline decoration-[#cf4326] font-bold">
            incubateurs
          </span>
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full space-y-2 gap-4 flex flex-col items-center">
        <SignUpButton />
        <SignInButton />
      </div>
    </main>
  );
}
