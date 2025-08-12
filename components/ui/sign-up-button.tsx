"use client";

import { useRouter } from "next/navigation";

export default function SignUpButton() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <button
      onClick={handleSignUp}
      className="w-full bg-[#cf4326] text-white rounded-md px-4 py-2 text-[14px] font-medium"
    >
      S'inscrire
    </button>
  );
}
