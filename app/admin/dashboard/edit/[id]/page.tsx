import { notFound } from "next/navigation";
import { getImageById } from "@/features/admin/data/images.data";
import { getCategories } from "@/features/admin/data/categories.data";
import { ImageEditForm } from "@/features/admin/components/ImageEditForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: Props) {
  const { id } = await params;

  const [image, categories] = await Promise.all([
    getImageById(id),
    getCategories(),
  ]);

  if (!image) notFound();

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col gap-6 max-w-lg mx-auto font-montserrat">
      <h1 className="font-playfair text-3xl font-bold text-foreground tracking-tight">
        Edit Image
      </h1>
      <ImageEditForm image={image} categories={categories} />
    </div>
  );;
}
