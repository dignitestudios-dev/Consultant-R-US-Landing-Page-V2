"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { NAV } from "./data";
import { Button, LogoMark } from "./ui";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Highlight the nav link for the section currently in view
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(
      (e): e is HTMLElement => !!e,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold to-gold-light"
        aria-hidden="true"
      />
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "border-b border-white/10 bg-navy-900/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`wrap flex items-center justify-between gap-6 transition-all duration-300 ${
            scrolled ? "py-2.5" : "py-4"
          }`}
        >
          <a
            href="#top"
            className="group flex items-center no-underline"
            aria-label="Consultants R US, back to top"
          >
            <LogoMark
              className={`transition-all duration-300 group-hover:scale-105 ${scrolled ? "h-14" : "h-20"}`}
            />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={`relative inline-flex min-h-11 items-center px-3.5 text-sm font-semibold no-underline transition-colors ${
                  active === n.id ? "text-gold-light" : "text-soft hover:text-gold-light"
                }`}
              >
                {n.label}
                {active === n.id && (
                  <motion.span
                initial={false}
                    layoutId="nav-underline"
                    className="absolute inset-x-3.5 bottom-1.5 h-0.5 rounded bg-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button href="#demo" className="max-sm:!hidden !min-h-11">
              Book a Demo
            </Button>
            <button
              type="button"
              className="relative grid h-11 w-11 place-items-center rounded-lg border border-white/15 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">Menu</span>
              <motion.span
                initial={false}
                className="absolute h-0.5 w-5 rounded bg-mist"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
              />
              <motion.span
                initial={false}
                className="absolute h-0.5 w-5 rounded bg-mist"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                initial={false}
                className="absolute h-0.5 w-5 rounded bg-mist"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              className="overflow-hidden md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="wrap flex flex-col gap-1 pb-6 pt-2">
                {NAV.map((n, i) => (
                  <motion.a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                    className="flex min-h-12 items-center border-b border-white/10 text-lg font-semibold text-mist no-underline"
                  >
                    {n.label}
                  </motion.a>
                ))}
                <Button
                  href="#demo"
                  onClick={() => setOpen(false)}
                  className="mt-4"
                >
                  Book a Demo
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
