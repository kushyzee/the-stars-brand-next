import { getPublishedImages } from "@/features/gallery/data/gallery.data";

import { getPublicUrl } from "@/lib/utils/image.utils";
import { GalleryGridClient } from "./GalleryGridClient";

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

  const formattedImages = images.map((image) => ({
    id: image.id,
    src: getPublicUrl(image.storage_path),
    alt: image.title,
    objectPosition: image.object_position,
    title: image.title,
    description: image.description,
  }));

  return <GalleryGridClient images={formattedImages} />;
}
