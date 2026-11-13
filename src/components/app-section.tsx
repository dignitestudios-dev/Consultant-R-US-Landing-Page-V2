"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { APP_STORE_URL, PLAY_STORE_URL } from "./data";
import { StoreButton } from "./store-button";
import { Reveal } from "./ui";

const PHONE_PEOPLE = [
  { name: "Sid Michael", role: "Oil Rig Operator", years: 3 },
  { name: "Ross Tanaka", role: "Completions Supervisor", years: 11 },
  { name: "Elena Ruiz", role: "Production Engineer", years: 7 },
];

function Star({ on }: { on: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] flex-none"
      animate={{ scale: on ? [1, 1.4, 1] : 1, rotate: on ? [0, 18, 0] : 0 }}
      transition={{ duration: 0.4 }}
      fill={on ? "#c1944d" : "none"}
      stroke={on ? "#c1944d" : "#5a6e84"}
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z" />
    </motion.svg>
  );
}

function Phone() {
  const reduce = useReducedMotion();
  const [stars, setStars] = useState<Record<string, boolean>>({ "Sid Michael": true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute inset-0 -z-0 scale-90 rounded-full bg-gold/25 blur-[90px]" aria-hidden="true" />
      <motion.div
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex w-[290px] flex-col gap-3.5 rounded-[40px] border-8 border-[#2a3d52] bg-navy-900 px-4 pb-7 pt-6 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6)]"
      >
        <div className="mx-auto mb-1 h-5 w-24 rounded-full bg-[#2a3d52]" aria-hidden="true" />

        {/* Shortlist notification */}
        <motion.div
          aria-hidden="true"
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
          animate={reduce ? undefined : { opacity: [0, 1, 1, 0], y: [-24, 0, 0, -24] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.85, 1], delay: 1.2 }}
          className="absolute inset-x-3 top-[52px] z-10 flex items-center gap-2.5 rounded-2xl bg-mist p-3 text-navy-900 shadow-xl"
        >
          <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-gold text-sm">★</span>
          <span className="text-[11px] leading-tight">
            <b className="block text-xs">You&apos;ve been shortlisted</b>
            A company is interested in you
          </span>
        </motion.div>

        <p className="pt-2 text-lg font-bold" aria-hidden="true">Home</p>
        <div className="flex h-10 items-center rounded-lg border border-[#465a70] px-3 text-xs text-muted" aria-hidden="true">
          Search
        </div>
        {PHONE_PEOPLE.map((p) => (
          <div key={p.name} className="border-t border-line pt-3">
            <div className="flex items-center justify-between gap-2">
              <strong className="text-sm">{p.name}</strong>
              <button
                type="button"
                aria-pressed={!!stars[p.name]}
                aria-label={`Shortlist ${p.name}`}
                onClick={() => setStars((s) => ({ ...s, [p.name]: !s[p.name] }))}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
              >
                <Star on={!!stars[p.name]} />
              </button>
            </div>
            <p className="mt-0.5 text-[11px] text-muted">
              {p.role} · {p.years} years
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-1.5" aria-hidden="true">
              <span className="grid h-[30px] place-items-center rounded-[5px] bg-gold text-[11px] font-bold text-navy-900">Resume</span>
              <span className="grid h-[30px] place-items-center rounded-[5px] border border-[#465a70] text-[11px] font-bold">Profile</span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function AppSection() {
  return (
    <section id="app" className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
      <div className="wrap flex flex-wrap items-center gap-14">
        <div className="flex min-w-0 flex-[999_1_460px] flex-col gap-6">
          <Reveal>
            <p className="eyebrow mb-4 text-gold-light">Web and mobile</p>
            <h2 className="h2">At your desk or in the field.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[620px] text-lg leading-relaxed text-soft">
              Companies can compare candidates on a full screen with the employer web app, then
              pick up on the mobile app. Consultants manage everything from their phone and get
              real-time alerts when they&apos;re shortlisted.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-wrap gap-3">
            <StoreButton store="apple" href={APP_STORE_URL} />
            <StoreButton store="google" href={PLAY_STORE_URL} />
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-sm text-muted">Tip: tap the stars on the phone to shortlist a consultant.</p>
          </Reveal>
        </div>
        <div className="flex flex-[1_1_300px] justify-center">
          <Phone />
        </div>
      </div>
    </section>
  );
}
