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
import { menu } from "@/lib/utilities";
import WhatsappButton from "./WhatsappButton";
import Link from "next/link";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild className="hover:bg-none lg:hidden">
        <Button
          size="icon-lg"
          variant="ghost"
          className="transition-transform duration-150 ease-out hover:scale-110 hover:bg-transparent"
        >
          <Menu className="text-primary-foreground size-7" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-primary text-primary-foreground border-l-0">
        <div className="mt-28">
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Mobile navigation links
          </SheetDescription>
          <ul className="flex flex-col items-center gap-6">
            {menu.map((menuItem) => (
              <li key={menuItem.name}>
                <SheetClose asChild>
                  <Link href={menuItem.path}>{menuItem.name}</Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </div>
        <SheetFooter className="pb-5">
          <WhatsappButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
