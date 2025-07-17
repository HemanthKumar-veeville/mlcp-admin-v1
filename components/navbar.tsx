"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center px-8 py-4">
      <button className="text-neutral-900">
        <Menu size={24} />
      </button>
      <h1 className="text-[18px] font-bold text-neutral-900">
        MyLittleCockpit
      </h1>
      <div className="bg-neutral-900 rounded-full w-8 h-8 flex items-center justify-center">
        <User size={16} className="text-[#fdfaf6]" />
      </div>
    </header>
  );
}
