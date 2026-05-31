import Line from "@/features/shared/components/Line";
import type { LucideIcon } from "lucide-react";

interface OfferCardProps {
  Icon: LucideIcon;
  title: string;
  body: string;
}

export default function OfferCard({ Icon, title, body }: OfferCardProps) {
  return (
    <div>
      <div className="bg-primary flex size-10 items-center justify-center rounded-full">
        <Icon className="text-background size-5" />
      </div>
      <div className="mt-3.5 space-y-3">
        <p className="font-montserrat text-primary text-lg font-bold">
          {title}
        </p>
        <div>
          <Line />
        </div>
        <p>{body}</p>
      </div>
    </div>
  );
}
