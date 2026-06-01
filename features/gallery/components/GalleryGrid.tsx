import { getPublishedImages } from "@/features/gallery/data/gallery.data";

import { GalleryItem } from "./GalleryItem";
import { getPublicUrl } from "@/lib/utils/image.utils";

type Props = {
  categorySlug?: string;
};

export default async function GalleryGrid({ categorySlug }: Props) {
  const images = await getPublishedImages(categorySlug);

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] p-8 text-center">
        <p className="font-montserrat text-muted-foreground">
          No images found.
        </p>
      </div>
    );
  }

  return (
    <section className="mb-20 grid grid-cols-1 justify-center gap-2 px-6 sm:grid-cols-2 md:grid-cols-3 md:px-10">
      {images.map((image, index) => (
        <GalleryItem
          key={image.id}
          src={getPublicUrl(image.storage_path)}
          alt={image.title}
          index={index}
          objectPosition={image.object_position}
        />
      ))}
    </section>
  );
}
