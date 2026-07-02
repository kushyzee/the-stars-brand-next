import { getCategories } from "@/features/admin/data/categories.data";
import { CategoryList } from "@/features/admin/components/CategoryList";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-svh px-4 py-8 flex flex-col gap-6 max-w-4xl mx-auto font-montserrat">
      <div className="flex flex-col gap-2">
        <h1 className="font-montserrat text-3xl font-bold text-foreground-black">
          Categories
        </h1>
        <p className="text-muted-foreground text-sm">
          {categories.length}{" "}
          {categories.length === 1 ? "category" : "categories"}
        </p>
      </div>

      <div className="bg-card border border-border p-4 sm:p-6">
        <CategoryList categories={categories} />
      </div>
    </div>
  );
}
