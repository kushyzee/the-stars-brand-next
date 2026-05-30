import Line from "@/features/shared/components/Line";
import Image, { StaticImageData } from "next/image";

interface ServicesCardProps {
  image: string | StaticImageData;
  title: string;
  content: string;
}

export default function ServicesCard({
  image,
  title,
  content,
}: ServicesCardProps) {
  return (
    <div className="mx-auto max-w-[520px]">
      <div className="relative h-52 lg:h-80">
        <Image
          className="h-full w-full object-cover"
          src={image}
          alt={title}
          width={520}
          height={320}
        />
      </div>
      <div className="mt-5">
        <h3 className="text-foreground-black font-montserrat text-xl font-bold">
          {title}
        </h3>
        <div className="mt-2.5 mb-4">
          <Line />
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
}
