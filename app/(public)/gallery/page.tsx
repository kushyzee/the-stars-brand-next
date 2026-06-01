import { Suspense } from "react";
import PageHeader from "@/features/shared/components/PageHeader";
import GalleryGrid from "@/features/gallery/components/GalleryGrid";
import { CategoryFilter } from "@/features/gallery/components/CategoryFilter";
import { getPublishedCategories } from "@/features/gallery/data/gallery.data";
import gallery from "@/assets/images/gallery.jpg";
import { getUser } from "@/features/auth/data/auth.data";
import { FloatingUploadButton } from "@/features/gallery/components/FloatingUploadButton";

export const metadata = {
  title: "Gallery",
  description:
    "Browse The Stars Brand gallery: custom tailoring, crochet pieces, ankara styles, and vintage shirts crafted in Ibadan, Nigeria.",
  alternates: { canonical: "https://thestarbrand.vercel.app/gallery" },
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function GalleryPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const [categories, user] = await Promise.all([
    getPublishedCategories(),
    getUser(),
  ]);

  return (
    <div>
      <PageHeader
        title="OUR GALLERY"
        subtitle="Explore our custom tailoring and crochet creations"
        image={gallery}
      />

      <Suspense>
        <CategoryFilter categories={categories} activeSlug={category ?? null} />
      </Suspense>

      <GalleryGrid categorySlug={category} />

      {user && <FloatingUploadButton />}
    </div>
  );
}
