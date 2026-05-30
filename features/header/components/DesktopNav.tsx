"use client";

import { menu } from "@/lib/utilities";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WhatsappButton from "./WhatsappButton";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="hidden h-full items-center gap-8 lg:flex">
      <ul className="inline-flex gap-8">
        {menu.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className={`${pathname === item.path ? "border-primary-foreground border-b-2 pb-1" : "hover:border-primary-foreground underline-offset-8 transition-all duration-200 ease-in-out hover:border-b-2 hover:pb-1"}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <WhatsappButton />
    </div>
  );
}
