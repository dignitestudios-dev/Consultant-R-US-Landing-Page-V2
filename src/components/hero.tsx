"use client";

import { motion } from "motion/react";
import { useAudience } from "./providers";
import { Button } from "./ui";

const HEADLINE = ["Cut", "out", "the", "middleman.", "Hire", "oilfield", "talent", "directly."];

export function Hero() {
  const { setAudience } = useAudience();

  return (
    <section className="relative overflow-hidden pb-24 pt-10 md:pt-16">
      {/* Atmosphere */}
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full bg-gold/25 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="animate-drift pointer-events-none absolute -left-40 top-40 h-[380px] w-[380px] rounded-full bg-navy-600/60 blur-[110px]"
        style={{ animationDelay: "-6s" }}
        aria-hidden="true"
      />

      <div className="wrap relative flex flex-col gap-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow inline-flex w-fit items-center gap-3 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-gold-light"
        >
          <span className="pulse-dot h-2 w-2 rounded-full bg-gold-light" aria-hidden="true" />
          Built for the U.S. oil and gas industry
        </motion.p>

        <h1 className="max-w-[1180px] text-[clamp(44px,8.2vw,116px)] font-extrabold leading-[0.98] tracking-[-0.035em] text-balance">
          {HEADLINE.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className={`inline-block ${i === 7 ? "text-gold-gradient" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
              {i < HEADLINE.length - 1 && " "}
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8"
        >
          <p className="max-w-[620px] text-[19px] leading-[1.55] text-soft">
            Search experienced consultants by the certifications, availability, and location
            the job needs. Then call or email them yourself.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#demo">Book a Demo</Button>
            <Button
              href="#audience"
              variant="outline"
              arrow={false}
              onClick={() => setAudience("consultant")}
            >
              I&apos;m a Consultant
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
