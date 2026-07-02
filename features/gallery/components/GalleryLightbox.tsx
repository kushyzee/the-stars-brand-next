"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { GallerySlide } from "@/lib/types";

type Props = {
  slides: GallerySlide[];
  currentIndex: number | null;
  onClose: () => void;
};

export function GalleryLightbox({ slides, currentIndex, onClose }: Props) {
  if (currentIndex === null) return null;

  return (
    <Lightbox
      open={currentIndex !== null}
      close={onClose}
      index={currentIndex}
      slides={slides.map((slide) => ({
        src: slide.src,
        alt: slide.alt,
        title: slide.title,
        description: slide.description,
      }))}
      render={{
        slideFooter: ({ slide }) => {
          const s = slide as GallerySlide;
          if (!s.title && !s.description) return null;

          return (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-6 py-4 text-white">
              {s.title && (
                <p className="font-playfair text-lg font-semibold">{s.title}</p>
              )}
              {s.description && (
                <p className="text-sm text-white/80 mt-1">{s.description}</p>
              )}
            </div>
          );
        },
      }}
      styles={{
        container: { backgroundColor: "rgba(0,0,0,0.95)" },
      }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}
