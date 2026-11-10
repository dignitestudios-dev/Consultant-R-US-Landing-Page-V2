"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FAQ } from "./data";
import { Reveal } from "./ui";

export function FaqSection() {
  const [open, setOpen] = useState<string | null>("For companies0");

  return (
    <section id="faq" className="bg-cream py-20 text-navy-900 md:py-28">
      <div className="wrap flex flex-wrap gap-10 lg:gap-x-[72px]">
        <Reveal className="flex-[1_1_320px]">
          <p className="eyebrow mb-4 text-gold-deep">FAQ</p>
          <h2 className="h2">Questions, answered.</h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-navy-900/70">
            Can&apos;t find what you need? Book a demo and we&apos;ll walk you through it.
          </p>
        </Reveal>

        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-10">
          {FAQ.map((g) => (
            <Reveal key={g.label}>
              <h3 className="eyebrow mb-3 text-gold-deep">{g.label}</h3>
              {g.items.map((q, i) => {
                const id = `${g.label}${i}`;
                const isOpen = open === id;
                return (
                  <div key={id} className="border-t border-[#cfc8b8] last:border-b">
                    <h4>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-${id}`}
                        onClick={() => setOpen(isOpen ? null : id)}
                        className="group flex min-h-[60px] w-full items-center justify-between gap-4 py-4 text-left text-base font-bold transition-colors hover:text-gold-deep"
                      >
                        <span>{q.q}</span>
                        <motion.span
                          aria-hidden="true"
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 26 }}
                          className="grid h-8 w-8 flex-none place-items-center rounded-full border border-navy-900/20 text-xl font-medium transition-colors group-hover:border-gold-deep"
                        >
                          +
                        </motion.span>
                      </button>
                    </h4>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-${id}`}
                          role="region"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 pr-10 text-[15px] leading-relaxed">{q.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
