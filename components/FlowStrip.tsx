"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { T, type L } from "@/lib/i18n";
import { useInView } from "./controls";
import { cx } from "./ui";

const STEPS: { img: string; title: L; text: L }[] = [
  { img: "/guide/check-sun.jpg", title: { en: "Sun", te: "సూర్యుడు" }, text: { en: "Sunlight falls on your roof.", te: "ఎండ మీ పైకప్పుపై పడుతుంది." } },
  { img: "/guide/day-roof.webp", title: { en: "Panels", te: "ప్యానెల్స్" }, text: { en: "Panels turn light into power (DC).", te: "ప్యానెల్స్ వెలుతురును కరెంట్ (DC) గా మారుస్తాయి." } },
  { img: "/guide/flow-inverter.webp", title: { en: "Inverter", te: "ఇన్వర్టర్" }, text: { en: "Changes it to home power (AC).", te: "దాన్ని ఇంటి కరెంట్ (AC) గా మారుస్తుంది." } },
  { img: "/guide/flow-home.webp", title: { en: "Your home", te: "మీ ఇల్లు" }, text: { en: "Fans, lights, AC run on it first.", te: "ఫ్యాన్లు, లైట్లు, ఏసీ ముందుగా దీనితో నడుస్తాయి." } },
  { img: "/guide/flow-net-meter.webp", title: { en: "Net meter", te: "నెట్ మీటర్" }, text: { en: "Counts units in and out.", te: "లోపలికి, బయటికి వెళ్లే యూనిట్లు లెక్కిస్తుంది." } },
  { img: "/guide/flow-grid.webp", title: { en: "Grid", te: "గ్రిడ్" }, text: { en: "Extra units go here. Your bill drops.", te: "అదనపు యూనిట్లు ఇక్కడికి. మీ బిల్ తగ్గుతుంది." } },
];

export function FlowStrip() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView<HTMLDivElement>(false);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 1400);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
      {STEPS.map((s, i) => (
        <Fragment key={i}>
          <div className={cx("flex flex-1 items-center gap-3 rounded-3xl p-3 transition duration-500 lg:flex-col lg:p-3.5 lg:text-center", i <= active ? "bg-white text-ink shadow-lift" : "bg-white/10 text-white")}>
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-2xl bg-pearl ring-1 ring-black/5 lg:aspect-[16/10] lg:h-auto lg:w-full">
              <Image src={s.img} alt="" fill sizes="(min-width: 1024px) 200px, 96px" className="object-cover" />
            </div>
            <span>
              <span className="block font-display text-lg font-bold"><T {...s.title} /></span>
              <span className={cx("block text-[14px] leading-snug", i <= active ? "text-ink/70" : "text-white/75")}><T {...s.text} /></span>
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <svg aria-hidden viewBox="0 0 24 24" className="mx-auto h-6 w-6 shrink-0 rotate-90 text-sun lg:rotate-0">
              <path d="M2 12h18" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" className={i < active ? "animate-flow" : ""} />
              <path d="M15 6l6 6-6 6" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          )}
        </Fragment>
      ))}
    </div>
  );
}
