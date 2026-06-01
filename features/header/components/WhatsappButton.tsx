import { buttonVariants } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/utilities";
import { cn } from "@/lib/utils";

export default function WhatsappButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("block", buttonVariants({ variant: "secondary" }))}
    >
      WhatsApp
    </a>
  );
}
