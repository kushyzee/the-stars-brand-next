import GalleryGrid from "@/features/gallery/components/GalleryGrid";
import PageHeader from "@/features/shared/components/PageHeader";
import gallery from "@/assets/images/gallery.jpg";

export const metadata = {
  title: "Gallery",
  description:
    "Browse The Stars Brand gallery: custom tailoring, crochet pieces, ankara styles, and vintage shirts crafted in Ibadan, Nigeria.",
  alternates: { canonical: "https://thestarbrand.vercel.app/gallery" },
};

export default function page() {
  return (
    <div>
      <PageHeader
        title="OUR GALLERY"
        subtitle="Explore our custom tailoring and crochet creations"
        image={gallery}
      />
      <GalleryGrid />
    </div>
  );
}
