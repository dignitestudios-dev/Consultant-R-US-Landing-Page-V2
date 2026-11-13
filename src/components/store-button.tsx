"use client";

import { motion } from "motion/react";

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 flex-none" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.62c-.03-2.7 2.2-4 2.3-4.06-1.25-1.83-3.2-2.08-3.9-2.11-1.66-.17-3.24.98-4.08.98-.85 0-2.14-.96-3.52-.93-1.81.03-3.48 1.05-4.41 2.67-1.88 3.26-.48 8.09 1.35 10.74.9 1.3 1.97 2.75 3.37 2.7 1.35-.05 1.86-.87 3.5-.87 1.63 0 2.09.87 3.52.84 1.46-.02 2.38-1.32 3.27-2.63 1.03-1.51 1.46-2.97 1.48-3.05-.03-.01-2.84-1.09-2.87-4.28zM13.7 4.7c.74-.9 1.25-2.15 1.11-3.4-1.07.04-2.37.71-3.14 1.61-.69.8-1.3 2.08-1.13 3.3 1.2.09 2.42-.61 3.16-1.51z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 flex-none" aria-hidden="true">
      <path fill="#00d0ff" d="M3.6 2.2c-.3.3-.5.8-.5 1.4v16.8c0 .6.2 1.1.5 1.4l.1.1 9.4-9.4v-.2L3.7 2.1z" />
      <path fill="#ffd400" d="M16.2 15.4l-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1.1.6 1.1 1.6 0 2.2l-3.7 2.1z" />
      <path fill="#ff3a44" d="M16.3 15.3l-3.2-3.2L3.6 21.6c.4.4.9.4 1.6.1l11.1-6.4" />
      <path fill="#00f076" d="M16.3 8.9L5.2 2.6c-.7-.4-1.2-.3-1.6.1l9.5 9.4z" />
    </svg>
  );
}

const STORES = {
  apple: { icon: <AppleIcon />, small: "Download on the", big: "App Store" },
  google: { icon: <PlayIcon />, small: "Get it on", big: "Google Play" },
} as const;

export function StoreButton({
  store,
  href,
  className = "",
}: {
  store: keyof typeof STORES;
  href: string;
  className?: string;
}) {
  const s = STORES[store];
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${s.small} ${s.big}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={`inline-flex min-h-[54px] items-center gap-3 rounded-xl border border-white/25 bg-black px-5 py-2 text-white no-underline shadow-[0_10px_30px_-12px_rgb(0_0_0/0.8)] transition-colors duration-200 hover:border-gold ${className}`}
    >
      {s.icon}
      <span className="flex flex-col text-left leading-none">
        <span className="text-[10px] font-medium tracking-wide text-white/80">{s.small}</span>
        <span className="mt-1 text-[17px] font-semibold tracking-tight">{s.big}</span>
      </span>
    </motion.a>
  );
}
