"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/features/auth/actions/auth.actions";
import { Button } from "@/components/ui/button";

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-sidebar border-b border-sidebar-border">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        {/* Brand */}
        <Link href="/admin/dashboard" className="flex items-baseline gap-2 shrink-0">
          <span className="font-playfair text-lg font-bold text-sidebar-foreground leading-none">
            The Stars Brand
          </span>
          <span className="font-montserrat text-[10px] uppercase tracking-widest text-muted-foreground leading-none">
            Admin
          </span>
        </Link>

        {/* Nav links — center on sm+, inline after brand on mobile */}
        <div className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/admin/dashboard"
            className={`font-montserrat text-sm px-2 py-1 transition-colors ${
              pathname === "/admin/dashboard"
                ? "text-foreground-black font-semibold"
                : "text-muted-foreground hover:text-sidebar-foreground"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/dashboard/upload"
            className={`font-montserrat text-sm px-2 py-1 transition-colors ${
              pathname === "/admin/dashboard/upload"
                ? "text-foreground-black font-semibold"
                : "text-muted-foreground hover:text-sidebar-foreground"
            }`}
          >
            Upload
          </Link>
        </div>

        {/* Sign out */}
        <form action={logout} className="shrink-0">
          <Button type="submit" variant="outline" size="sm" className="font-montserrat text-xs">
            Sign out
          </Button>
        </form>
      </div>
    </nav>
  );
}
