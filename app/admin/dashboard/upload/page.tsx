import { getCategories } from "@/features/admin/data/categories.data";
import { ImageUploadForm } from "@/features/admin/components/ImageUploadForm";

export default async function UploadPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1>Upload Image</h1>
      <ImageUploadForm categories={categories} />
    </div>
  );
}
