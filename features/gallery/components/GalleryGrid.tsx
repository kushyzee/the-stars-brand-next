"use client";

import Image from "next/image";
import gallery1 from "@/assets/images/featured-work1.jpg";
import gallery2 from "@/assets/images/featured-work2.jpg";
import gallery3 from "@/assets/images/featured-work3.jpg";
import gallery4 from "@/assets/images/gallery1.jpg";
import gallery5 from "@/assets/images/gallery2.jpg";
import gallery6 from "@/assets/images/gallery3.jpg";
import gallery7 from "@/assets/images/gallery4.jpg";
import gallery8 from "@/assets/images/gallery5.jpg";
import gallery9 from "@/assets/images/gallery6.jpg";
import { motion } from "motion/react";

const images = [
  { id: 1, image: gallery1, alt: "Gallery image 1" },
  { id: 2, image: gallery2, alt: "Gallery image 2" },
  { id: 3, image: gallery3, alt: "Gallery image 3" },
  { id: 4, image: gallery4, alt: "Gallery image 4" },
  { id: 5, image: gallery5, alt: "Gallery image 5" },
  { id: 6, image: gallery6, alt: "Gallery image 6" },
  { id: 7, image: gallery7, alt: "Gallery image 7" },
  { id: 8, image: gallery8, alt: "Gallery image 8" },
  { id: 9, image: gallery9, alt: "Gallery image 9" },
];

export default function GalleryGrid() {
  return (
    <section className="mb-20 grid grid-cols-1 justify-center gap-2 px-6 sm:grid-cols-2 md:grid-cols-3 md:px-10">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
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
            key={index}
            src={image.image}
            alt={image.alt}
            className="h-full w-full object-cover"
          />
        </motion.div>
      ))}
    </section>
  );
}
