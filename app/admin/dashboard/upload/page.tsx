import { getCategories } from "@/features/admin/data/categories.data";
import { ImageUploadForm } from "@/features/admin/components/ImageUploadForm";

export default async function UploadPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col gap-6 max-w-lg mx-auto font-montserrat">
      <h1 className="font-playfair text-3xl font-bold text-foreground tracking-tight">
        Upload Image
      </h1>
      <ImageUploadForm categories={categories} />
    </div>
  );
}
