"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/features/auth/actions/auth.actions";
import { Button } from "@/components/ui/button";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Upload", href: "/admin/dashboard/upload" },
];

export default function AdminDesktopNav() {
  const pathname = usePathname();

  return (
    <div className="hidden h-full items-center gap-8 lg:flex">
      <ul className="inline-flex gap-6">
        {adminLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`font-montserrat text-sm transition-colors ${
                pathname === link.href
                  ? "text-foreground-black font-semibold"
                  : "text-muted-foreground hover:text-sidebar-foreground"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <form action={logout}>
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="font-montserrat text-xs"
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
