"use client";

import { useState } from "react";
import { GalleryItem } from "./GalleryItem";
import { GalleryLightbox } from "./GalleryLightbox";
import type { GallerySlide } from "@/lib/types";
import type { ObjectPosition } from "@/lib/types";

type ImageItem = {
  id: string;
  src: string;
  alt: string;
  objectPosition: ObjectPosition;
  title: string;
  description?: string | null;
};

type Props = {
  images: ImageItem[];
};

export function GalleryGridClient({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const slides: GallerySlide[] = images.map((image) => ({
    src: image.src,
    alt: image.alt,
    title: image.title,
    description: image.description ?? undefined,
  }));

  return (
    <>
      <section className="mb-20 grid grid-cols-1 justify-center gap-2 px-6 sm:grid-cols-2 md:grid-cols-3 md:px-10">
        {images.map((image, index) => (
          <GalleryItem
            key={image.id}
            src={image.src}
            alt={image.alt}
            index={index}
            objectPosition={image.objectPosition}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </section>

      <GalleryLightbox
        slides={slides}
        currentIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}
