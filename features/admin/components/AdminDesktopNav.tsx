"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/features/auth/actions/auth.actions";
import { Button } from "@/components/ui/button";

interface AdminNavProps {
  adminLinks: { label: string; href: string }[];
}

export default function AdminDesktopNav({ adminLinks }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <div className="hidden h-full items-center gap-8 lg:flex">
      <ul className="inline-flex gap-6">
        {adminLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`font-montserrat text-sm transition-colors text-white ${
                pathname === link.href
                  ? "underline underline-offset-2 font-semibold"
                  : "hover:text-white no-underline underline-offset-2"
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
