"use client";

import { AnimatePresence, motion } from "motion/react";
import { AUDIENCE } from "./data";
import { useAudience, type Audience } from "./providers";
import { Button, Reveal } from "./ui";

const OPTIONS: { id: Audience; label: string }[] = [
  { id: "company", label: "For Companies" },
  { id: "consultant", label: "For Consultants" },
];

export function AudienceSection() {
  const { audience, setAudience } = useAudience();
  const a = AUDIENCE[audience];

  return (
    <section id="audience" className="relative bg-cream py-20 text-navy-900 md:py-28">
      <div className="wrap flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow mb-4 text-gold-deep">Who it&apos;s for</p>
            <h2 className="h2 max-w-[760px]">One platform. Two ways to get ahead.</h2>
          </Reveal>
          <div
            role="group"
            aria-label="Choose your audience"
            className="relative flex rounded-xl border border-navy-900 p-1"
          >
            {OPTIONS.map((o) => {
              const on = audience === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setAudience(o.id)}
                  className={`relative min-h-[52px] rounded-lg px-4 text-sm font-bold transition-colors duration-300 sm:px-6 sm:text-[15px] ${
                    on ? "text-mist" : "text-navy-900 hover:text-gold-deep"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="aud-pill"
                      className="absolute inset-0 rounded-lg bg-navy-900"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{o.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-stretch gap-8 lg:gap-12" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={audience}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-w-0 flex-[999_1_460px] flex-col gap-8"
            >
              <h3 className="text-[clamp(26px,3vw,36px)] font-extrabold leading-[1.15] tracking-[-0.015em] text-balance">
                {a.title}
              </h3>
              <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 lg:gap-x-8">
                {a.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.45 }}
                    className="flex gap-3 rounded-xl border border-navy-900/10 bg-white/60 p-4 text-base font-medium leading-snug"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-5 w-5 flex-none fill-none stroke-gold-deep"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 12.5l5 5L20 6.5" />
                    </svg>
                    <span>{f}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <motion.div
            layout
            className="relative flex min-w-0 flex-[1_1_320px] flex-col justify-between gap-4 overflow-hidden rounded-2xl bg-navy-900 p-8 text-mist shadow-[0_30px_60px_-20px_rgb(16_29_45/0.5)]"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/25 blur-3xl"
              aria-hidden="true"
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={audience}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="relative flex flex-col gap-2"
              >
                <p className="text-sm font-bold text-gold-light">{a.priceLabel}</p>
                <p className="text-[64px] font-extrabold leading-none tracking-[-0.03em]">
                  {a.price}
                </p>
                <p className="text-[15px] leading-normal text-soft">{a.priceNote}</p>
              </motion.div>
            </AnimatePresence>
            <Button
              href={a.ctaHref}
              className="relative mt-4"
              {...(a.ctaHref.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {a.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
