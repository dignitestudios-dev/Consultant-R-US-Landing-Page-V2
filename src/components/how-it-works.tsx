"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { STEPS } from "./data";
import { Reveal } from "./ui";

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 60%"],
  });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="how" className="relative overflow-hidden py-20 md:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="wrap relative flex flex-col gap-14 md:gap-16">
        <Reveal>
          <p className="eyebrow mb-4 text-gold-light">How it works</p>
          <h2 className="h2 max-w-[760px]">Getting started takes minutes.</h2>
        </Reveal>

        <div ref={ref} className="relative">
          {/* Track + progress line (desktop) */}
          <div className="absolute left-0 right-0 top-0 hidden h-0.5 bg-line md:block" aria-hidden="true" />
          <motion.div
            style={{ scaleX: line }}
            className="absolute left-0 right-0 top-0 hidden h-0.5 origin-left bg-gold md:block"
            aria-hidden="true"
          />

          <ol className="grid list-none gap-10 md:grid-cols-3 md:gap-10">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.7, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col gap-3 rounded-2xl border border-line-soft bg-navy-800/60 p-7 transition-colors hover:border-gold/50 md:mt-8"
              >
                <span
                  className="absolute -top-[41px] left-7 hidden h-3 w-3 rounded-full bg-gold ring-4 ring-navy-900 md:block"
                  aria-hidden="true"
                />
                <p
                  className="text-[64px] font-extrabold leading-none text-gold transition-transform duration-500 group-hover:scale-110 group-hover:origin-left"
                  aria-hidden="true"
                >
                  {i + 1}
                </p>
                <h3 className="text-[22px] font-extrabold">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="text-base leading-[1.55] text-soft">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
