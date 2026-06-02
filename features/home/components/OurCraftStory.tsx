"use client";

import SectionHeader from "@/features/shared/components/SectionHeader";
import craftStory from "@/assets/images/craft-story.webp";
import { motion } from "motion/react";
import Line from "@/features/shared/components/Line";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function OurCraftStory() {
  return (
    <section className="mx-auto mt-32 max-w-[1120px] px-6 md:px-10 lg:mt-44">
      <div className="items-start justify-between gap-8 md:flex">
        {/* text content */}
        <div className="md:max-w-[500px] lg:max-w-[570px]">
          <SectionHeader
            supertitle="Behind the stars"
            title="OUR CRAFT STORY"
            subtitle="Creating timeless pieces that celebrate your unique style"
          />
          <div className="my-6">
            <Line isWider={true} />
          </div>
          <div>
            <p>
              The Stars Brand was born from a passion for creating custom pieces
              that tell a story. By merging traditional craftsmanship with
              modern design, every garment and handcrafted item reflects the
              uniqueness of the individual who wears it. With meticulous
              attention to detail and high-quality materials, each creation is
              made to help you shine.
            </p>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-primary mt-8 text-primary",
              )}
            >
              Learn More
            </Link>
          </div>
        </div>
        {/* image */}
        <motion.div
          className="mt-10 h-full md:mt-0"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ margin: "-150px 0px", once: true }}
        >
          <Image
            src={craftStory}
            className="aspect-auto h-full w-full object-cover lg:h-[400px]"
            alt="custom-tailored dress"
          />
        </motion.div>
      </div>
    </section>
  );
}
