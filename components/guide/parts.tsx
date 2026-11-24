"use client";

import { useEffect, useState } from "react";
import { T, useLang, type L } from "@/lib/i18n";
import { useInView } from "../controls";
import { cx } from "../ui";

/* ───────── Fade-up on scroll (transform/opacity only → no layout shift) ───────── */
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false), []);
  const shown = inView || reduce;
  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown && !reduce ? `${delay}ms` : undefined }}
      className={cx("transition duration-700 ease-out motion-reduce:transition-none", shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0", className)}
    >
      {children}
    </div>
  );
}

/* ───────── Chapters ───────── */
export const CHAPTERS: { id: string; n: string; title: L }[] = [
  { id: "what-is-solar", n: "01", title: { en: "What is solar?", te: "సోలార్ అంటే ఏమిటి?" } },
  { id: "how-it-works", n: "02", title: { en: "How it works", te: "ఇది ఎలా పని చేస్తుంది" } },
  { id: "three-types", n: "03", title: { en: "Three types", te: "మూడు రకాలు" } },
  { id: "what-can-it-run", n: "04", title: { en: "What can solar run?", te: "సోలార్‌తో ఏం నడుస్తుంది?" } },
  { id: "solar-in-hyderabad", n: "05", title: { en: "Solar in Hyderabad", te: "హైదరాబాద్‌లో సోలార్" } },
  { id: "before-you-buy", n: "06", title: { en: "Before you buy", te: "కొనే ముందు" } },
];

export function useActiveChapter() {
  const [active, setActive] = useState(CHAPTERS[0].id);
  useEffect(() => {
    const els = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/** Desktop: sticky left table of contents */
export function TocSidebar({ active }: { active: string }) {
  return (
    <nav aria-label="Guide chapters" className="pointer-events-auto sticky top-24 w-[244px] rounded-2xl bg-white/95 p-5 shadow-soft backdrop-blur">
      <p className="mb-2 px-2 text-xs font-bold uppercase tracking-widest text-ink/50"><T en="In this guide" te="ఈ గైడ్‌లో" /></p>
      <ol className="grid gap-0.5">
        {CHAPTERS.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              aria-current={active === c.id ? "true" : undefined}
              className={cx("flex items-baseline gap-3 rounded-xl px-3 py-2.5 text-[16px] transition", active === c.id ? "bg-teal text-white" : "text-ink/75 hover:bg-cream")}
            >
              <span className={cx("font-display text-sm font-extrabold", active === c.id ? "text-sun-soft" : "text-sun-deep")}>{c.n}</span>
              <span className="font-semibold leading-snug"><T {...c.title} /></span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Mobile: sticky horizontal chip bar */
export function TocChips({ active }: { active: string }) {
  useEffect(() => {
    document.getElementById(`chip-${active}`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);
  return (
    <nav aria-label="Guide chapters" className="sticky top-16 z-30 border-b border-ink/10 bg-cream/95 backdrop-blur lg:hidden">
      <ol className="flex gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none]">
        {CHAPTERS.map((c) => (
          <li key={c.id} className="shrink-0">
            <a id={`chip-${c.id}`} href={`#${c.id}`} className={cx("inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold", active === c.id ? "bg-teal text-white" : "bg-white text-ink/75 shadow-soft")}>
              <span className={cx("font-display text-xs font-extrabold", active === c.id ? "text-sun-soft" : "text-sun-deep")}>{c.n}</span>
              <T {...c.title} />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Numbered chapter heading: big number + English + Telugu line */
export function ChapterHead({ n, title, sub, light }: { n: string; title: L; sub?: L; light?: boolean }) {
  return (
    <header className="mb-8 sm:mb-10">
      <p className={cx("font-display text-sm font-extrabold uppercase tracking-[0.2em]", light ? "text-sun-soft" : "text-sun-deep")}>
        <T en="Chapter" te="అధ్యాయం" /> {n}
      </p>
      <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">
        <T {...title} />
      </h2>
      {sub && <p className={cx("mt-3 max-w-2xl text-lg", light ? "text-white/80" : "text-ink/70")}><T {...sub} /></p>}
    </header>
  );
}

export function Approx({ light }: { light?: boolean }) {
  return (
    <span className={cx("ml-1.5 inline-block rounded-full px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide", light ? "bg-white/15 text-white/80" : "bg-ink/5 text-ink/55")}>
      <T en="Approximate" te="సుమారు" />
    </span>
  );
}

/* ───────── Monthly sunshine chart ─────────
 * Average daily solar energy on a flat surface in Hyderabad, kWh/m²/day (= "peak sun hours").
 * [VERIFY] Values are approximate climatology figures; confirm against NASA POWER
 * (power.larc.nasa.gov, lat 17.39 N, lon 78.49 E) or MNRE/NIWE solar atlas before launch.
 */
const SUN: { m: L; v: number }[] = [
  { m: { en: "Jan", te: "జన" }, v: 5.0 },
  { m: { en: "Feb", te: "ఫిబ్ర" }, v: 5.8 },
  { m: { en: "Mar", te: "మార్చి" }, v: 6.3 },
  { m: { en: "Apr", te: "ఏప్రి" }, v: 6.6 },
  { m: { en: "May", te: "మే" }, v: 6.6 },
  { m: { en: "Jun", te: "జూన్" }, v: 5.2 },
  { m: { en: "Jul", te: "జులై" }, v: 4.3 },
  { m: { en: "Aug", te: "ఆగ" }, v: 4.3 },
  { m: { en: "Sep", te: "సెప్టె" }, v: 4.7 },
  { m: { en: "Oct", te: "అక్టో" }, v: 4.9 },
  { m: { en: "Nov", te: "నవ" }, v: 4.8 },
  { m: { en: "Dec", te: "డిసె" }, v: 4.6 },
];

export function SunChart() {
  const { t } = useLang();
  const [hover, setHover] = useState<number | null>(null);
  const max = 7;
  const peak = SUN.reduce((a, b, i) => (b.v > SUN[a].v ? i : a), 0);
  return (
    <figure className="rounded-2xl bg-white p-5 text-ink shadow-soft sm:p-7">
      <figcaption>
        <p className="font-display text-xl font-bold"><T en="Sunshine in Hyderabad, month by month" te="హైదరాబాద్‌లో నెలవారీ ఎండ" /> <Approx /></p>
        <p className="mt-1 text-[15px] text-ink/60"><T en="Average daily solar energy, kWh per m² per day (≈ peak sun hours)" te="రోజువారీ సగటు సౌర శక్తి, చ.మీ.కు kWh (≈ పీక్ సన్ అవర్స్)" /></p>
      </figcaption>
      <div className="relative mt-6 h-56" onMouseLeave={() => setHover(null)}>
        {/* recessive gridlines */}
        {[0, 2, 4, 6].map((g) => (
          <div key={g} className="absolute inset-x-0 border-t border-ink/10" style={{ bottom: `${(g / max) * 100}%` }}>
            <span className="absolute -top-2.5 left-0 bg-white pr-1 text-[11px] text-ink/45">{g}</span>
          </div>
        ))}
        <div className="absolute inset-0 flex items-end gap-[2px] pl-6">
          {SUN.map((d, i) => (
            <div key={i} className="relative flex h-full flex-1 items-end justify-center" onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onBlur={() => setHover(null)} tabIndex={0} aria-label={`${d.m.en}: ${d.v} kWh/m²/day`}>
              <div className={cx("w-full max-w-[34px] rounded-t-[4px] transition-colors", hover === i ? "bg-sun" : "bg-teal")} style={{ height: `${(d.v / max) * 100}%` }} />
              {(i === peak || hover === i) && (
                <span className="pointer-events-none absolute z-10 whitespace-nowrap rounded-lg bg-ink px-2 py-1 text-xs font-bold text-white" style={{ bottom: `calc(${(d.v / max) * 100}% + 6px)` }}>
                  {t(d.m)} · {d.v}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-[2px] pl-6">
        {SUN.map((d, i) => (
          <span key={i} className="flex-1 text-center text-[11px] text-ink/55"><T {...d.m} /></span>
        ))}
      </div>
      <p className="mt-4 text-[15px] text-ink/70"><T en="Strongest from March to May; lowest in July–August (monsoon), but never zero." te="మార్చి–మేలో ఎక్కువ; జులై–ఆగస్టు (వర్షాకాలం)లో తక్కువ, కానీ ఎప్పుడూ సున్నా కాదు." /></p>
      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-semibold text-teal"><T en="Show as table" te="పట్టికగా చూపించు" /></summary>
        <table className="mt-2 w-full text-left">
          <thead><tr className="text-ink/60"><th className="py-1"><T en="Month" te="నెల" /></th><th className="py-1">kWh/m²/day</th></tr></thead>
          <tbody>{SUN.map((d, i) => <tr key={i} className="border-t border-ink/5"><td className="py-1"><T {...d.m} /></td><td className="py-1">{d.v}</td></tr>)}</tbody>
        </table>
      </details>
      <p className="mt-3 text-xs text-ink/50"><T en="Source: NASA POWER climatology for Hyderabad (approximate)." te="మూలం: హైదరాబాద్‌కు NASA POWER వాతావరణ డేటా (సుమారు)." /></p>
    </figure>
  );
}
