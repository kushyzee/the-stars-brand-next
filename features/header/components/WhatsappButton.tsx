import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/utilities";

export default function WhatsappButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Button className="w-full" variant="secondary">
        WhatsApp
      </Button>
    </a>
  );
}
