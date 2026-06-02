"use client";

import SectionHeader from "@/features/shared/components/SectionHeader";
import esther from "@/assets/images/the_stars_brand.webp";
import { motion } from "motion/react";
import Line from "@/features/shared/components/Line";
import Image from "next/image";

export default function OurStory() {
  return (
    <section className={`mx-auto max-w-[1120px] gap-20 px-6 md:px-10 lg:flex`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ margin: "-150px 0px", once: true }}
        className="w-full"
      >
        <Image className="w-full" src={esther} alt="CEO of The Stars Brand" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        viewport={{ margin: "-150px 0px", once: true }}
        className="mt-10 lg:mt-0 lg:max-w-[580px]"
      >
        <SectionHeader
          supertitle="Our Story"
          title="The Stars Brand"
          subtitle="Every piece reflects dedication to quality and detail"
          textCenter={true}
        />
        <div className="my-6 flex justify-center">
          <Line isWider={true} />
        </div>
        <div className="space-y-5">
          <p>
            The Stars Brand was born from my passion for creating stunning,
            custom pieces that tell a story. I believe every garment and
            handcrafted item should reflect the uniqueness of the individual who
            wears or owns it.
          </p>
          <p>
            By merging traditional craftsmanship with modern design, I craft
            pieces that honor my heritage while appealing to contemporary
            tastes. Whether it’s a chic tailored jumpsuit for your special event
            or a stylish handmade tote bag for daily use, I pour my heart into
            every creation.
          </p>
          <p>
            With a focus on high-quality materials and meticulous attention to
            detail, I ensure that each piece meets my rigorous standards of
            quality and craftsmanship.
          </p>
          <p>
            What inspires me is the joy of seeing my clients shine in pieces
            made just for them. Every satisfied customer, every smile, and every
            compliment they receive makes my craft truly fulfilling.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
