"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CHIPS, PEOPLE, type Person } from "./data";

const COLS =
  "md:grid md:grid-cols-[minmax(230px,2.2fr)_.8fr_1.3fr_1.1fr_1.2fr_1.1fr] md:items-center md:gap-4";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("");
}

function Row({ p, match }: { p: Person; match: boolean }) {
  const now = p.availability === "Available now";
  return (
    <motion.div
      layout="position"
      transition={{ type: "spring", stiffness: 380, damping: 36 }}
      animate={{ opacity: match ? 1 : 0.24, scale: match ? 1 : 0.985 }}
      aria-hidden={!match}
      className={`border-t border-line-soft px-5 py-4 text-[13px] transition-colors md:px-6 ${COLS} ${
        match ? "bg-navy-800 hover:bg-[#1a2c42]" : "bg-navy-800"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full border border-[#465a70] bg-navy-700 text-xs font-extrabold text-gold-light"
        >
          {initials(p.name)}
        </span>
        <span className="min-w-0">
          <strong className="block text-sm">{p.name}</strong>
          <span className="text-xs text-muted">{p.role}</span>
        </span>
      </div>

      {/* Mobile: compact meta chips. Desktop: table cells. */}
      <div className="mt-3 flex flex-wrap gap-2 md:hidden">
        {[`${p.years} yrs`, p.expertise, p.location, p.cert].map((t) => (
          <span key={t} className="rounded-full bg-navy-700 px-2.5 py-1 text-xs text-soft">
            {t}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-700 px-2.5 py-1 text-xs text-soft">
          <i className={`h-2 w-2 rounded-full ${now ? "bg-gold-light" : "border-[1.5px] border-[#8796a8]"}`} />
          {p.availability}
        </span>
      </div>
      <span className="hidden font-bold md:block">{p.years} years</span>
      <span className="hidden md:block">{p.expertise}</span>
      <span className="hidden md:block">{p.location}</span>
      <span className="hidden items-center gap-2 md:flex">
        <i
          aria-hidden="true"
          className={`h-2 w-2 flex-none rounded-full ${now ? "bg-gold-light" : "border-[1.5px] border-[#8796a8]"}`}
        />
        {p.availability}
      </span>
      <span className="hidden md:block">{p.cert}</span>
    </motion.div>
  );
}

export function ProductDemo() {
  const [on, setOn] = useState<Record<string, boolean>>({});

  const toggle = (label: string) =>
    setOn((prev) => {
      const next = { ...prev, [label]: !prev[label] };
      // Completions and Engineering are mutually exclusive
      if (!prev[label] && label === "Completions") next.Engineering = false;
      if (!prev[label] && label === "Engineering") next.Completions = false;
      return next;
    });

  const active = CHIPS.filter((c) => on[c.label]);
  const matches = PEOPLE.filter((p) => active.every((c) => c.test(p)));
  const ordered = [...matches, ...PEOPLE.filter((p) => !matches.includes(p))];

  return (
    <section aria-label="Product preview" className="relative -mt-2 pb-0">
      <div
        className="absolute inset-x-0 bottom-0 top-1/2 bg-gold"
        aria-hidden="true"
      />
      <div className="wrap relative">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "0px 0px -120px 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1400 }}
          className="overflow-hidden rounded-[20px] border border-line bg-navy-800 shadow-[0_30px_80px_rgb(5_11_19/0.5)] ring-1 ring-white/5"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-line-soft bg-navy-900/60 px-5 py-3" aria-hidden="true">
            <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            <span className="ml-3 rounded-md bg-navy-800 px-3 py-1 text-[11px] text-muted">
              app.consultantsrus.co / search
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 px-5 py-5 md:px-6">
            <strong className="mr-2 text-[15px]">Try the filters</strong>
            {CHIPS.map((c) => {
              const pressed = !!on[c.label];
              return (
                <motion.button
                  key={c.label}
                  type="button"
                  aria-pressed={pressed}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => toggle(c.label)}
                  className={`min-h-11 rounded-full border px-4 text-[13px] font-semibold transition-colors duration-200 ${
                    pressed
                      ? "border-gold bg-gold text-navy-900 hover:bg-gold-hover"
                      : "border-line bg-navy-700 text-mist hover:bg-navy-600"
                  }`}
                >
                  {c.label}
                </motion.button>
              );
            })}
            <AnimatePresence>
              {active.length > 0 && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  onClick={() => setOn({})}
                  className="min-h-11 px-2 text-[13px] font-bold text-gold-light hover:underline"
                >
                  Clear
                </motion.button>
              )}
            </AnimatePresence>
            <span role="status" className="text-[13px] text-muted md:ml-auto">
              <motion.b
                key={matches.length}
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-block text-gold-light"
              >
                {matches.length}
              </motion.b>{" "}
              of {PEOPLE.length} match · sample profiles
            </span>
          </div>

          <div className="overflow-x-auto">
            <div className="md:min-w-[880px]">
              <div
                className={`hidden h-11 bg-[#132235] px-6 text-xs font-bold text-muted ${COLS}`}
                aria-hidden="true"
              >
                <span>Consultant</span>
                <span>Experience</span>
                <span>Expertise</span>
                <span>Location</span>
                <span>Availability</span>
                <span>Certification</span>
              </div>
              <div className="relative">
                <AnimatePresence>
                  {matches.length === 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: -8, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: -8, x: "-50%" }}
                      className="pointer-events-none absolute left-1/2 top-6 z-10 whitespace-nowrap rounded-3xl bg-mist px-4 py-3 text-[13px] font-bold text-navy-900 shadow-xl"
                    >
                      No matches. Turn off a filter to see more.
                    </motion.p>
                  )}
                </AnimatePresence>
                {ordered.map((p) => (
                  <Row key={p.name} p={p} match={matches.includes(p)} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
