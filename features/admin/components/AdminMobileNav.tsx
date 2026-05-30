"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { logout } from "@/features/auth/actions/auth.actions";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Upload", href: "/admin/dashboard/upload" },
];

export default function AdminMobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button
          size="icon"
          variant="ghost"
          className="transition-transform duration-150 ease-out hover:scale-110 hover:bg-transparent"
        >
          <Menu className="text-primary-foreground size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-primary text-primary-foreground border-l-0 flex flex-col">
        <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Admin navigation links
        </SheetDescription>

        <ul className="mt-32 flex flex-col items-center gap-8">
          {adminLinks.map((link) => (
            <li key={link.href}>
              <SheetClose asChild>
                <Link
                  href={link.href}
                  className="font-montserrat text-lg text-primary-foreground hover:text-muted-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>

        <SheetFooter className="mt-auto pb-6">
          <SheetClose asChild>
            <form action={logout} className="w-full">
              <Button
                type="submit"
                variant="outline"
                className="font-montserrat w-full"
              >
                Sign out
              </Button>
            </form>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
