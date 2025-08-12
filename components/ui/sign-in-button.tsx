"use client";

import { useRouter } from "next/navigation";

export default function SignInButton() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    <button
      onClick={handleSignIn}
      className="w-full bg-neutral-100 text-[#cf4326] rounded-md px-4 py-2 text-[14px] font-medium underline"
    >
      Se connecter
    </button>
  );
}
