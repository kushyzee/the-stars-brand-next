"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ObjectPosition } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getObjectPositionClass } from "@/lib/utils/image.utils";

type Props = {
  src: string;
  alt: string;
  index: number;
  objectPosition: ObjectPosition;
  onClick: () => void;
};

export function GalleryItem({
  src,
  alt,
  index,
  objectPosition,
  onClick,
}: Props) {
  return (
    <motion.div
      className="relative overflow-hidden h-full w-full cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ margin: "-150px 0px", once: true }}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        className={cn(
          "h-full w-full object-cover hover:scale-110 transition-transform duration-300",
          getObjectPositionClass(objectPosition),
        )}
      />
    </motion.div>
  );
}
