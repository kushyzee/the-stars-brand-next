import { MenuItem } from "@/lib/utilities";
import WhatsappButton from "./WhatsappButton";
import DesktopLinks from "./DesktopLinks";

export default function DesktopNav({ menu }: { menu: MenuItem[] }) {
  return (
    <div className="hidden h-full items-center gap-8 lg:flex">
      <DesktopLinks menu={menu} />
      <WhatsappButton />
    </div>
  );
}
