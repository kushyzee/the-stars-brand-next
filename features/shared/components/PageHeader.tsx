import { motion, stagger } from "motion/react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  image: string;
}

const headerParent = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delayChildren: stagger(0.1, { startDelay: 0.2 }),
    },
  },
};

const headerItems = {
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

export default function PageHeader({
  title,
  subtitle,
  image,
}: PageHeaderProps) {
  return (
    <motion.div
      variants={headerParent}
      initial="hidden"
      animate="show"
      className="relative mt-16 mb-28 h-[450px] bg-cover md:h-[500px] lg:mt-20 lg:h-[550px]"
    >
      <div className="absolute inset-0 h-full">
        <img
          className="h-full w-full object-cover object-right md:object-top"
          src={image}
        />
      </div>
      <div className="absolute inset-0 bg-black/60"></div>
      <div
        className={`text-background relative z-10 mx-auto flex h-full max-w-[1120px] flex-col justify-center px-6 text-center md:px-10 md:text-left`}
      >
        <motion.h1
          variants={headerItems}
          className="font-montserrat text-3xl font-extrabold md:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={headerItems}
          className="font-playfair mt-1 italic md:text-lg lg:mt-4 lg:text-xl"
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.div>
  );
}
