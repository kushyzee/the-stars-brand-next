"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types";

type Props = {
  categories: Category[];
  activeSlug: string | null;
};

export function CategoryFilter({ categories, activeSlug }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }

    router.push(`/gallery?${params.toString()}`, { scroll: false });
  };

  if (categories.length === 0) return null;

  return (
    <div className="flex overflow-x-auto gap-2 px-6 md:px-10 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <button
        onClick={() => handleSelect(null)}
        data-active={activeSlug === null}
        aria-label="Show all categories"
        className="font-montserrat text-sm rounded-full px-6 py-2 transition-colors whitespace-nowrap bg-secondary text-secondary-foreground border border-border hover:bg-accent data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:border-primary"
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleSelect(category.slug)}
          data-active={activeSlug === category.slug}
          aria-label={`Filter by ${category.name}`}
          className="font-montserrat text-sm rounded-full px-6 py-2 transition-colors whitespace-nowrap bg-secondary text-secondary-foreground border border-border hover:bg-accent data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:border-primary"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
