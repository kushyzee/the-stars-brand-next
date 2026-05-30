export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  storage_path: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type GalleryImageWithCategory = GalleryImage & {
  categories: Pick<Category, "id" | "name" | "slug"> | null;
};
