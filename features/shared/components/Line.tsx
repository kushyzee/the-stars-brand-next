"use client";

import { motion } from "motion/react";

interface LineProps {
  isWider?: boolean;
  isWhite?: boolean;
}

export default function Line({ isWider, isWhite }: LineProps) {
  return isWider ? (
    <motion.div
      initial={{ width: "0px" }}
      whileInView={{ width: "90px" }}
      transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
      viewport={{ margin: "-150px 0px", once: true }}
      className={`${isWhite ? "bg-white" : "bg-primary"} h-[3px]`}
    ></motion.div>
  ) : (
    <div
      className={`${isWhite ? "bg-white" : "bg-primary"} h-[3px] w-10`}
    ></div>
  );
}
