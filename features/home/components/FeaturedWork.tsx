import SectionHeader from "@/features/shared/components/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import FeaturedImage from "./FeaturedImage";
import { cn } from "@/lib/utils";
import Link from "next/link";
import featuredWork1 from "@/assets/images/featured-work1.jpg";
import featuredWork2 from "@/assets/images/featured-work2.jpg";
import featuredWork3 from "@/assets/images/featured-work3.jpg";

export default function FeaturedWork() {
  return (
    <section
      className={"mt-28 bg-neutral-100 px-6 py-28 md:px-10 lg:mt-44 lg:pb-44"}
    >
      <div className={`mx-auto max-w-[1120px]`}>
        <SectionHeader
          supertitle="Showcase"
          title="Featured Work"
          subtitle="A glimpse of our recent creations"
          textCenter={true}
        />
        <div className="mt-6 mb-12 grid grid-cols-1 gap-2 md:grid-cols-3 lg:mt-14 lg:mb-14 lg:gap-3">
          <FeaturedImage
            image={featuredWork1}
            alt="featured work 1"
            index={0}
          />

          <FeaturedImage
            image={featuredWork2}
            alt="featured work 2"
            index={1}
          />

          <FeaturedImage
            image={featuredWork3}
            alt="featured work 3"
            index={2}
          />
        </div>
        <div className="flex justify-center">
          <Link
            href="/gallery"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-primary mt-8 text-primary",
            )}
          >
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
