"use client";

import DesktopNav from "@/features/header/components/DesktopNav";
import MobileNav from "@/features/header/components/MobileNav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 64);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <header
      className={`text-primary-foreground fixed top-0 right-0 left-0 z-20 h-16 px-6 lg:h-20 lg:px-8 ${scrolled ? "bg-primary" : ""} ${isHome ? "" : "bg-primary"}`}
      aria-label="Navigation header"
    >
      <div className="mx-auto h-full max-w-[1440px]">
        <div className="flex h-full items-center justify-between">
          <div className="w-fit">
            <Link href="/" className="font-montserrat font-bold">
              The Stars Brand
            </Link>
          </div>
          <MobileNav />
          <DesktopNav />
        </div>
      </div>
    </header>
  );
}
