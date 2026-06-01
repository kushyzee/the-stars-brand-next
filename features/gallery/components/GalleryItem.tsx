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
};

export function GalleryItem({ src, alt, index, objectPosition }: Props) {
  return (
    <motion.div
      className="h-full w-full"
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
          "h-full w-full object-cover",
          getObjectPositionClass(objectPosition),
        )}
      />
    </motion.div>
  );
}
