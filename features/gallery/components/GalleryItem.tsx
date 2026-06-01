"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Props = {
  src: string;
  alt: string;
  index: number;
};

export function GalleryItem({ src, alt, index }: Props) {
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
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}
