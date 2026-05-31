"use client";

import { CheckCircle2, Layers, PencilRuler, Sparkles } from "lucide-react";
import whyUs from "@/assets/images/why_us.jpg";
import { motion } from "motion/react";
import SectionHeader from "@/features/shared/components/SectionHeader";
import OfferCard from "./OfferCard";
import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="mt-28 bg-neutral-100 py-28">
      <div className={`mx-auto max-w-[1120px] px-6 md:px-8`}>
        <div>
          <SectionHeader
            supertitle="What we offer"
            title="WHY CHOOSE US?"
            textCenter={true}
          />
          <div className="mt-10 lg:mt-16 lg:flex lg:gap-10">
            <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 md:mx-auto md:max-w-[600px]">
              <OfferCard
                Icon={Layers}
                title="Quality Materials"
                body="We source only the finest fabrics and premium yarns to ensure your piece lasts and looks beautiful."
              />
              <OfferCard
                Icon={PencilRuler}
                title="Custom Designs"
                body="No two pieces are alike. We create designs tailored specifically to your style and occasion."
              />
              <OfferCard
                Icon={Sparkles}
                title="Nigerian Excellence"
                body="We celebrate our culture through craft, blending traditional techniques with modern aesthetics."
              />
              <OfferCard
                Icon={CheckCircle2}
                title="Attention to Detail"
                body="Every stitch, every knot matters to us. We take pride in the small details that make big differences."
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ margin: "-150px 0px", once: true }}
              className="mt-12 w-full md:mx-auto md:max-w-[600px] lg:mt-0 lg:w-full"
            >
              <Image className="w-full" src={whyUs} alt="Why Choose Us" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
