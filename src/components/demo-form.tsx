"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "./ui";

type Errors = Partial<Record<"name" | "email" | "phone", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full min-h-[50px] rounded-lg border bg-navy-800 px-3.5 py-3 text-[15px] text-mist placeholder:text-muted/60 transition-colors focus:border-gold-light";

function validate(d: FormData): Errors {
  const e: Errors = {};
  if (!String(d.get("name") ?? "").trim()) e.name = "Please enter your name.";
  const email = String(d.get("email") ?? "").trim();
  if (!email) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "That email doesn't look right.";
  const phone = String(d.get("phone") ?? "").trim();
  if (phone && phone.replace(/\D/g, "").length < 7) e.phone = "That phone number looks too short.";
  return e;
}

function Field({
  label, name, type = "text", error, optional, autoComplete, textarea,
}: {
  label: string; name: string; type?: string; error?: string;
  optional?: boolean; autoComplete?: string; textarea?: boolean;
}) {
  const id = `f-${name}`;
  const common = {
    id, name, autoComplete,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-err` : undefined,
    className: `${inputCls} ${error ? "border-red-400" : "border-[#5a6e84]"}`,
  };
  return (
    <div className="flex flex-col gap-1.5 text-[13px] font-semibold">
      <label htmlFor={id}>
        {label}
        {optional && <span className="ml-1.5 font-medium text-muted">(optional)</span>}
      </label>
      {textarea ? (
        <textarea {...common} rows={4} className={`${common.className} min-h-[120px] resize-y`} />
      ) : (
        <input {...common} type={type} />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden text-[13px] font-medium text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DemoSection() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      ev.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="demo" className="relative overflow-hidden bg-gold py-20 text-navy-900 md:py-28">
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="wrap relative flex flex-wrap items-start gap-12">
        <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-6">
          <Reveal>
            <p className="eyebrow mb-4 text-navy-900/70">Get in touch</p>
            <h2 className="h2">See it working. Book a demo.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[520px] text-lg font-semibold leading-relaxed">
              Tell us what you&apos;re hiring for or how you&apos;d like to use the platform, and
              we&apos;ll be in touch.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col gap-1.5 text-base font-bold">
            <p>Dallas, TX</p>
            <a href="mailto:info@Consultantsrus.com" className="w-fit text-navy-900 underline decoration-navy-900/30 underline-offset-4 hover:decoration-navy-900">
              info@Consultantsrus.com
            </a>
          </Reveal>
        </div>

        <Reveal className="min-w-0 flex-[1_1_400px]">
          <div className="rounded-2xl bg-navy-900 p-6 text-mist shadow-[0_30px_60px_-20px_rgb(16_29_45/0.6)] md:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="ok"
                  role="status"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center"
                >
                  <svg viewBox="0 0 52 52" className="h-16 w-16" fill="none" aria-hidden="true">
                    <motion.circle cx="26" cy="26" r="24" stroke="#c1944d" strokeWidth="2.5"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                    <motion.path d="M15 27l8 8 14-16" stroke="#e2be82" strokeWidth="3.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
                  </svg>
                  <h3 className="text-2xl font-extrabold">Thanks, we&apos;ve got it.</h3>
                  <p className="max-w-xs text-soft">We&apos;ll be in touch shortly to set up your demo.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  <Field label="Name" name="name" autoComplete="name" error={errors.name} />
                  <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
                  <Field label="Phone Number" name="phone" type="tel" autoComplete="tel" optional error={errors.phone} />
                  <Field label="Message" name="message" textarea optional />
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-lg bg-gold px-6 text-[15px] font-bold text-navy-900 transition-colors hover:bg-gold-hover disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-900/30 border-t-navy-900" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      "Book a Demo"
                    )}
                  </motion.button>
                  {status === "error" && (
                    <p role="alert" className="text-sm font-medium text-red-300">
                      Something went wrong. Please try again or email info@Consultantsrus.com.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
