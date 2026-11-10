import Link from "next/link";
import { Footer } from "./footer";
import { LogoMark } from "./ui";

/** A block is a paragraph, a bullet list, or a "Term: definition" list. */
export type Block = string | { list: string[] } | { defs: string[] };
export type LegalSection = { title?: string; blocks: Block[] };

function Defs({ items }: { items: string[] }) {
  return (
    <dl className="space-y-3">
      {items.map((d) => {
        const i = d.indexOf(":");
        return (
          <div key={d}>
            <dt className="inline font-bold text-mist">{d.slice(0, i)}: </dt>
            <dd className="inline">{d.slice(i + 1).trim()}</dd>
          </div>
        );
      })}
    </dl>
  );
}

function renderBlock(b: Block, i: number) {
  if (typeof b === "string") return <p key={i}>{b}</p>;
  if ("list" in b)
    return (
      <ul key={i} className="list-disc space-y-2 pl-6 marker:text-gold">
        {b.list.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    );
  return <Defs key={i} items={b.defs} />;
}

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <header className="border-b border-white/10 bg-navy-900/80 backdrop-blur-xl">
        <div className="wrap flex items-center justify-between gap-4 py-4">
          <Link
            href="/"
            className="flex items-center no-underline"
            aria-label="Consultants R US, home"
          >
            <LogoMark className="h-16" />
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-soft no-underline transition-colors hover:text-gold-light"
          >
            <span aria-hidden="true">←</span> Back to home
          </Link>
        </div>
      </header>

      <main className="relative flex-1 overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <article className="wrap relative max-w-[860px]">
          <p className="eyebrow mb-4 text-gold-light">Legal</p>
          <h1 className="h2 mt-2">{title}</h1>
          <p className="mt-4 text-sm text-muted">Updated at {updated}</p>

          <div className="mt-14 space-y-12 text-[16px] leading-[1.75] text-soft">
            {sections.map((s, i) => (
              <section key={s.title ?? i} className="space-y-4">
                {s.title && (
                  <h2 className="border-t border-line-soft pt-8 text-2xl font-extrabold tracking-tight text-mist">
                    {s.title}
                  </h2>
                )}
                {s.blocks.map(renderBlock)}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
