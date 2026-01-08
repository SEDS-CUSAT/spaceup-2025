"use client";
import { motion, useScroll } from "motion/react";

import { cn } from "@/lib/utils"

export function ScrollProgress({
  className,
  containerRef,
  ...props
}) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-100 h-[2px] origin-left bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props} />
  );
}
