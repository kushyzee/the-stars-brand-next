"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, stagger } from "motion/react";
import Link from "next/link";

const heroParent = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delayChildren: stagger(0.1, { startDelay: 0.2 }),
    },
  },
};

const heroTexts = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const heroButtons = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Hero() {
  return (
    <motion.section
      variants={heroParent}
      initial="hidden"
      animate="show"
      className="text-background relative hero-bg bg-cover bg-right bg-no-repeat pt-10"
    >
      {/* backdrop */}
      <div className="bg-primary/60 absolute inset-0"></div>
      {/* content */}
      <div
        className={`relative z-10 mx-auto flex h-full min-h-[550px] max-w-[1120px] flex-col justify-center px-6 md:min-h-[600px] md:px-12 lg:py-52`}
      >
        <motion.h1
          variants={heroTexts}
          className="font-montserrat text-3xl font-extrabold md:text-4xl lg:text-6xl"
        >
          THE STARS BRAND
        </motion.h1>
        <motion.p
          variants={heroTexts}
          className="font-playfair mt-1.5 mb-10 italic md:text-xl lg:mt-2.5 lg:mb-16 lg:text-2xl"
        >
          Designs that makes you bold, confident & unforgettable
        </motion.p>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <motion.div variants={heroButtons}>
            <Link
              href="/gallery"
              className={cn(buttonVariants({ variant: "secondary" }), "w-fit")}
            >
              View Gallery
            </Link>
          </motion.div>
          <motion.div variants={heroButtons}>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
