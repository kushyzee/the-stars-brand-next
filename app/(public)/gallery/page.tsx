import GalleryGrid from "@/features/gallery/components/GalleryGrid";
import PageHeader from "@/features/shared/components/PageHeader";
import gallery from "@/assets/images/gallery.jpg";

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
