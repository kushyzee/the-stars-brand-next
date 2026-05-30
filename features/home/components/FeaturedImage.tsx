"use client";

import { motion } from "motion/react";
import Image, { StaticImageData } from "next/image";

interface FeaturedImageProps {
  image: StaticImageData;
  alt: string;
  index: number;
}

export default function FeaturedImage({
  image,
  alt,
  index,
}: FeaturedImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      viewport={{ margin: "-150px 0px", once: true }}
    >
      <Image className="aspect-auto h-[423px] w-auto" src={image} alt={alt} />
    </motion.div>
  );
}
