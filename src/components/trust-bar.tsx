"use client";

import { motion } from "motion/react";

const ITEMS = [
  { label: "No recruiters", d: "M12 3a4 4 0 100 8 4 4 0 000-8zM4 20c0-4 3.6-6 8-6s8 2 8 6M4 4l16 16" },
  { label: "Oil and gas specific", d: "M12 3c3 4 5 6.5 5 10a5 5 0 01-10 0c0-3.5 2-6 5-10z" },
  { label: "Direct phone and email", d: "M4 6h16v12H4zM4 7l8 6 8-6" },
  { label: "Secure document storage", d: "M6 11V8a6 6 0 0112 0v3M5 11h14v10H5zM12 15v2" },
];

export function TrustBar() {
  return (
    <section className="bg-gold py-9 pt-16 text-navy-900 md:pt-20">
      <ul className="wrap grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {ITEMS.map((it, i) => (
          <motion.li
            key={it.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex items-center gap-3 text-[18px] font-extrabold"
          >
            <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-navy-900/10">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={it.d} />
              </svg>
            </span>
            {it.label}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
