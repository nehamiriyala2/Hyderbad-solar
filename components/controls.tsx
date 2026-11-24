"use client";

import { useEffect, useRef, useState } from "react";
import { T, type L } from "@/lib/i18n";
import { Icon, type IconName } from "./Icon";
import { GRADS } from "./ColorIcon";
import { cx } from "./ui";

export function useInView<E extends Element>(once = true) {
  const ref = useRef<E | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return { ref, inView };
}

/** Animates smoothly from the previous value to the new value. */
export function CountUp({ value, format = (n) => Math.round(n).toLocaleString("en-IN"), duration = 700 }: { value: number; format?: (n: number) => string; duration?: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  const { ref, inView } = useInView<HTMLSpanElement>();
  const started = useRef(false);

  useEffect(() => {
    if (!inView) return;
    const start = started.current ? from.current : 0;
    started.current = true;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(value);
      from.current = value;
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = start + (value - start) * eased;
      setShown(v);
      from.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, inView, duration]);

  return <span ref={ref}>{format(shown)}</span>;
}

export type Opt<V extends string> = { value: V; label: L; icon?: IconName };

/** Big-tap segmented toggle */
export function Segmented<V extends string>({ value, onChange, options, label, light, size = "md", oneLine, colorIcons }: { value: V; onChange: (v: V) => void; options: Opt<V>[]; label: L; light?: boolean; size?: "md" | "sm"; oneLine?: boolean; colorIcons?: boolean | number }) {
  return (
    <fieldset>
      <legend className={cx("mb-2 text-sm font-bold uppercase tracking-wide", light ? "text-white/70" : "text-ink/60")}>
        <T {...label} />
      </legend>
      <div className={cx("grid gap-2", oneLine ? "auto-cols-fr grid-flow-col" : options.length === 2 ? "grid-cols-2" : options.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-3")}>
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={cx(
                "flex items-center justify-center gap-1.5 rounded-2xl px-2 text-center font-bold leading-tight transition",
                size === "sm" ? "min-h-[46px] text-[14px]" : "min-h-[52px] text-[15px]",
                active ? "bg-teal text-white shadow-soft" : light ? "bg-white/10 text-white hover:bg-white/20" : "bg-pearl text-ink hover:bg-white"
              )}
            >
              {o.icon && (colorIcons ? (
                <span className={cx("inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm", GRADS[(options.indexOf(o) + (typeof colorIcons === "number" ? colorIcons : 0)) % GRADS.length])}>
                  <Icon name={o.icon} size={16} strokeWidth={2.4} />
                </span>
              ) : (
                <Icon name={o.icon} size={18} className="shrink-0" />
              ))}
              <span>
                <T {...o.label} />
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function RangeField({ value, onChange, min, max, step, label, display, id }: { value: number; onChange: (n: number) => void; min: number; max: number; step: number; label: L; display: string; id: string }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <label htmlFor={id} className="font-bold">
          <T {...label} />
        </label>
        <span className="font-display text-2xl font-extrabold text-teal">{display}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="range-lg mt-3" />
      <div className="mt-1 flex justify-between text-xs text-ink/50">
        <span>{min.toLocaleString("en-IN")}</span>
        <span>{max.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}

export function Stat({ label, children, icon, tone = "pearl", flag }: { label: L; children: React.ReactNode; icon: IconName; tone?: "pearl" | "sun" | "leaf" | "teal"; flag?: React.ReactNode }) {
  const t = { pearl: "bg-pearl", sun: "bg-sun/15", leaf: "bg-leaf-soft", teal: "bg-teal text-white" }[tone];
  return (
    <div className={cx("rounded-2xl p-4", t)}>
      <p className={cx("flex items-center gap-1.5 text-sm font-semibold", tone === "teal" ? "text-white/80" : "text-ink/65")}>
        <Icon name={icon} size={16} /> <T {...label} />
      </p>
      <p className="mt-1 font-display text-2xl font-extrabold leading-tight">
        {children}
        {flag}
      </p>
    </div>
  );
}
