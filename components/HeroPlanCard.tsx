"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { computePlan, inr } from "@/lib/solar";
import { T } from "@/lib/i18n";
import { CountUp, Segmented, Stat } from "./controls";
import { Icon } from "./Icon";

/** Glass plan card used in the home hero (blueprint design). */
export function HeroPlanCard() {
  const [bill, setBill] = useState(3000);
  const [use, setUse] = useState<"home" | "shop">("home");
  const plan = useMemo(() => computePlan({ bill, place: "city", use, roof: "own" }), [bill, use]);

  return (
    <div className="rounded-[28px] bg-white/85 p-5 text-ink shadow-[0_30px_60px_-20px_rgba(11,79,92,0.45)] ring-1 ring-white/60 backdrop-blur-md sm:p-6">
      {/* Compact bill slider (drives the numbers below) */}
      <div className="mb-4">
        <div className="flex items-end justify-between">
          <label htmlFor="hero-bill" className="text-sm font-bold uppercase tracking-wide text-ink/60">
            <T en="Your monthly bill" te="మీ నెల బిల్" />
          </label>
          <span className="font-display text-xl font-extrabold text-teal">{inr(bill)}</span>
        </div>
        <input id="hero-bill" type="range" min={500} max={20000} step={100} value={bill} onChange={(e) => setBill(Number(e.target.value))} className="range-lg mt-2" />
      </div>

      <Segmented<"home" | "shop">
        label={{ en: "What is it?", te: "ఏది?" }}
        value={use}
        onChange={setUse}
        options={[
          { value: "home", label: { en: "Home", te: "ఇల్లు" }, icon: "House" },
          { value: "shop", label: { en: "Shop", te: "షాప్" }, icon: "Store" },
        ]}
      />

      <div className="mt-4 grid grid-cols-2 gap-3" aria-live="polite">
        <Stat icon="Sun" tone="sun" label={{ en: "Suggested size", te: "సూచించిన సైజ్" }}>
          <CountUp value={plan.kw} /> kW
        </Stat>
        <Stat icon="Ruler" label={{ en: "Roof area needed", te: "కావాల్సిన పైకప్పు" }}>
          ~<CountUp value={plan.roofSqft} /> sq ft
        </Stat>
        <Stat icon="IndianRupee" tone="leaf" label={{ en: "Monthly saving", te: "నెల ఆదా" }}>
          ~₹<CountUp value={plan.monthlySaving} />
        </Stat>
        <Stat icon="BadgeCheck" label={{ en: "Subsidy", te: "సబ్సిడీ" }}>
          <span className="block text-base font-bold leading-snug">
            {use === "shop" ? <T en="No home subsidy" te="ఇంటి సబ్సిడీ లేదు" /> : <T en={`Yes, up to ${inr(plan.subsidy)}`} te={`అవును, ${inr(plan.subsidy)} వరకు`} />}
          </span>
          <span className="mt-1 inline-block rounded-md bg-amber-200 px-1.5 py-0.5 text-[11px] font-extrabold tracking-wide text-amber-900">[VERIFY]</span>
        </Stat>
      </div>

      <Link
        href={`/find-my-plan?bill=${bill}&use=${use}`}
        className="mt-5 flex min-h-[58px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF9A1F] to-[#FF7A1A] text-lg font-bold text-ink shadow-glow transition hover:brightness-105"
      >
        <T en="See my full plan" te="నా పూర్తి ప్లాన్ చూడండి" /> <Icon name="ArrowRight" size={22} />
      </Link>
      <p className="mt-3 text-center text-[13px] text-ink/60">
        <T en="Estimate only. Rules change. We confirm the latest for you." te="ఇది అంచనా మాత్రమే. నియమాలు మారుతుంటాయి. తాజా వివరాలు మేమే చెబుతాం." />
      </p>
    </div>
  );
}
