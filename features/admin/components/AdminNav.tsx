import Link from "next/link";
import AdminDesktopNav from "./AdminDesktopNav";
import AdminMobileNav from "./AdminMobileNav";

const adminLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Categories", href: "/admin/dashboard/categories" },
  { label: "Upload", href: "/admin/dashboard/upload" },
];

export function AdminNav() {
  return (
    <header className="bg-primary text-primary-foreground border-b border-sidebar-border fixed top-0 right-0 left-0 z-20 h-16 px-6 lg:h-20 lg:px-8">
      <div className="mx-auto h-full max-w-[1440px]">
        <div className="flex h-full items-center justify-between">
          {/* Brand */}
          <Link
            href="/admin/dashboard"
            className="flex items-baseline gap-2 font-montserrat"
          >
            <span className="font-bold">The Stars Brand</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground leading-none">
              Admin
            </span>
          </Link>

          <AdminMobileNav adminLinks={adminLinks} />
          <AdminDesktopNav adminLinks={adminLinks} />
        </div>
      </div>
    </header>
  );
}
