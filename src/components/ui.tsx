"use client";

import Image from "next/image";
import { motion, type HTMLMotionProps } from "motion/react";

/* ---------- Reveal: fade + rise when scrolled into view ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "h2" | "h3" | "section";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

/* ---------- Button / link ---------- */
type Variant = "gold" | "navy" | "outline" | "outline-dark";

const variants: Record<Variant, string> = {
  gold: "border-transparent bg-gold text-navy-900 hover:bg-gold-hover shadow-[0_8px_30px_-8px_rgb(193_148_77/0.6)]",
  navy: "border-transparent bg-navy-900 text-mist hover:bg-navy-700",
  outline: "border-[#5a6e84] text-mist hover:bg-navy-700 hover:border-gold-light",
  "outline-dark": "border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-mist",
};

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${className ?? ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export function Button({
  variant = "gold",
  arrow = true,
  className = "",
  children,
  ...props
}: HTMLMotionProps<"a"> & { variant?: Variant; arrow?: boolean }) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={`group relative inline-flex min-h-[50px] items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border px-6 text-[15px] font-bold no-underline transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children as React.ReactNode}
      {arrow && <Arrow />}
    </motion.a>
  );
}

/* ---------- Logo ---------- */
export function LogoMark({ className = "h-14" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Consultants R US"
      width={198}
      height={204}
      priority
      className={`w-auto ${className}`}
    />
  );
}
