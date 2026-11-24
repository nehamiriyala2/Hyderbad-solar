"use client";

import { useState } from "react";
import { ASSUME, inr, lakhs, pmSuryaGharSubsidy } from "@/lib/solar";
import { T } from "@/lib/i18n";
import { ColorIcon } from "./ColorIcon";
import { Icon, type IconName } from "./Icon";

/** Same maths as lib/solar.ts computePlan, but with the visitor's own size and tariff. */
function calc(bill: number, kw: number, tariff: number) {
  const units = tariff > 0 ? bill / tariff : 0;
  const gen = kw * ASSUME.unitsPerKwMonth;
  const monthly = Math.round(Math.min(Math.min(gen, units) * tariff, bill * (1 - ASSUME.fixedShare)));
  const net = Math.max(0, kw * ASSUME.pricePerKwOnGrid - pmSuryaGharSubsidy(kw));
  let total25 = 0;
  for (let y = 0; y < 25; y++) total25 += monthly * 12 * Math.pow(1 - ASSUME.degradation, y) * Math.pow(1 + ASSUME.tariffRise, y);
  return { monthly, annual: monthly * 12, payback: monthly > 0 ? net / (monthly * 12) : 0, total25: Math.round(total25), net };
}

export function QuickSavingsCalc() {
  const [bill, setBill] = useState("4000");
  const [kw, setKw] = useState(4);
  const [tariff, setTariff] = useState(String(ASSUME.tariffHome));
  const [res, setRes] = useState(() => calc(4000, 4, ASSUME.tariffHome));

  const run = (e?: React.FormEvent) => {
    e?.preventDefault();
    setRes(calc(Math.max(0, Number(bill) || 0), kw, Math.max(0, Number(tariff) || 0)));
  };

  const out: { icon: IconName; label: { en: string; te: string }; value: string }[] = [
    { icon: "IndianRupee", label: { en: "Monthly savings", te: "నెల ఆదా" }, value: `~${inr(res.monthly)}` },
    { icon: "TrendingUp", label: { en: "Annual savings", te: "ఏడాది ఆదా" }, value: `~${inr(res.annual)}` },
    { icon: "Clock", label: { en: "Payback period", te: "పెట్టుబడి తిరిగి" }, value: `~${res.payback.toFixed(1)} yrs` },
    { icon: "Leaf", label: { en: "25-year savings", te: "25 ఏళ్ల ఆదా" }, value: `~${lakhs(res.total25)}` },
  ];

  return (
    <form onSubmit={run} className="rounded-[2rem] bg-white p-5 text-ink shadow-lift sm:p-7">
      <div className="flex items-center gap-4">
        <ColorIcon name="Calculator" i={2} size="lg" />
        <div className="border-l border-ink/10 pl-4">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            <span className="text-leaf-deep"><T en="Solar" te="సోలార్" /></span> <T en="Savings Calculator" te="ఆదా కాలిక్యులేటర్" />
          </h2>
          <p className="mt-0.5 text-[15px] text-ink/60"><T en="Estimate your monthly savings and payback period." te="మీ నెల ఆదా, పెట్టుబడి తిరిగి వచ్చే కాలం అంచనా వేయండి." /></p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="q-bill" className="label text-[15px]"><T en="Monthly bill (₹)" te="నెల బిల్ (₹)" /></label>
          <input id="q-bill" inputMode="numeric" className="field" value={bill} onChange={(e) => setBill(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))} />
        </div>
        <div>
          <label htmlFor="q-kw" className="label text-[15px]"><T en="System size" te="సిస్టమ్ సైజ్" /></label>
          <select id="q-kw" className="field" value={kw} onChange={(e) => setKw(Number(e.target.value))}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((k) => (
              <option key={k} value={k}>{k} kW</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="q-tariff" className="label text-[15px]"><T en="Tariff (₹/unit)" te="టారిఫ్ (₹/యూనిట్)" /></label>
          <input id="q-tariff" inputMode="decimal" className="field" value={tariff} onChange={(e) => setTariff(e.target.value.replace(/[^0-9.]/g, "").slice(0, 5))} />
        </div>
      </div>

      <button type="submit" className="mx-auto mt-6 flex min-h-[56px] w-full max-w-md items-center justify-center gap-2 rounded-full bg-gradient-to-r from-leaf to-leaf-deep text-lg font-bold text-white shadow-[0_12px_30px_-10px_rgba(46,158,91,0.7)] transition hover:brightness-110 active:scale-[0.98]">
        <Icon name="Calculator" size={22} /> <T en="Calculate Savings" te="ఆదా లెక్కించు" />
      </button>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-leaf/20 sm:grid-cols-4" aria-live="polite">
        {out.map((o) => (
          <div key={o.label.en} className="flex flex-col items-center bg-leaf-soft px-3 py-4 text-center">
            <Icon name={o.icon} size={28} className="text-leaf-deep" />
            <dt className="mt-1.5 text-sm font-semibold text-ink/70"><T {...o.label} /></dt>
            <dd className="mt-1 font-display text-xl font-extrabold text-leaf-deep sm:text-2xl">{o.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-center text-xs text-ink/55">
        <T en={`Approximate. Assumes ${ASSUME.unitsPerKwMonth} units/kW/month, on-grid price and home subsidy. Detailed calculator below.`} te={`సుమారు. kW కి నెలకు ${ASSUME.unitsPerKwMonth} యూనిట్లు, ఆన్-గ్రిడ్ ధర, ఇంటి సబ్సిడీ ఆధారంగా. వివరమైన కాలిక్యులేటర్ కింద.`} />
      </p>
    </form>
  );
}
