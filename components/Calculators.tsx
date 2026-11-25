"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ASSUME, computePlan, emi, inr, lakhs, pmSuryaGharSubsidy, pricePerKw, societySubsidy, type Place, type SystemType, type Use } from "@/lib/solar";
import { T, useLang } from "@/lib/i18n";
import { sendLeadAndOpenWhatsApp } from "@/lib/leads";
import { CountUp, RangeField, Segmented, Stat } from "./controls";
import { Flag, VerifyNote, cx } from "./ui";
import { Icon } from "./Icon";

/* ───────── 25-year chart ───────── */

function SavingsChart({ yearly, netCost }: { yearly: { year: number; cumulative: number }[]; netCost: number }) {
  const max = Math.max(...yearly.map((y) => y.cumulative), netCost) || 1;
  const W = 600, H = 250, padX = 28, padTop = 44, padBottom = 28;
  const bw = (W - padX * 2) / yearly.length;
  const yOf = (v: number) => H - padBottom - (v / max) * (H - padTop - padBottom);
  const payIdx = yearly.findIndex((y) => y.cumulative >= netCost);
  const lineY = yOf(netCost);
  const label = `Cost after subsidy ${lakhs(netCost)}`;
  const tagW = label.length * 7.2 + 24, tagH = 26;
  // Badge sits well above the dashed line; never clipped at the top.
  const tagY = Math.max(4, lineY - tagH - 14);
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Total savings grow to ${inr(yearly[yearly.length - 1].cumulative)} over 25 years. System cost after subsidy is ${inr(netCost)}.`}>
        {yearly.map((y, i) => (
          <rect key={y.year} x={padX + i * bw + 2} y={yOf(y.cumulative)} width={bw - 4} height={H - padBottom - yOf(y.cumulative)} rx="3" fill={i >= payIdx && payIdx >= 0 ? "#2E9E5B" : "#FFB27A"}>
            <title>{`Year ${y.year}: ${inr(y.cumulative)}`}</title>
          </rect>
        ))}
        <line x1={padX} x2={W - padX} y1={lineY} y2={lineY} stroke="#0B4F5C" strokeWidth="2" strokeDasharray="6 5" />
        <line x1={padX + 18} x2={padX + 18} y1={tagY + tagH} y2={lineY} stroke="#0B4F5C" strokeWidth="2" />
        <circle cx={padX + 18} cy={lineY} r="4" fill="#0B4F5C" stroke="#fff" strokeWidth="2" />
        <rect x={padX} y={tagY} width={tagW} height={tagH} rx={tagH / 2} fill="#0B4F5C" />
        <text x={padX + 12} y={tagY + 17.5} fontSize="13" fill="#ffffff" fontWeight="700">
          {label}
        </text>
        <line x1={padX} x2={W - padX} y1={H - padBottom} y2={H - padBottom} stroke="#1D1D1F" strokeOpacity="0.2" />
        {[1, 5, 10, 15, 20, 25].map((yr) => (
          <text key={yr} x={padX + (yr - 0.5) * bw} y={H - 8} fontSize="11" textAnchor="middle" fill="#1D1D1F" fillOpacity="0.6">
            {yr}
          </text>
        ))}
      </svg>
      <figcaption className="mt-1 flex flex-wrap gap-4 text-sm text-ink/65">
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-[#FFB27A]" /> <T en="Paying back the system" te="పెట్టుబడి తిరిగి వస్తున్న కాలం" /></span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-leaf" /> <T en="Pure saving" te="పూర్తి ఆదా" /></span>
        <span><T en="Bars = total saved by that year" te="ఆ సంవత్సరానికి మొత్తం ఆదా" /></span>
      </figcaption>
    </figure>
  );
}

/* ───────── Result card: round photo icon + big number ───────── */

function PhotoStat({ img, ring, label, children, flag }: { img: string; ring: string; label: { en: string; te: string }; children: React.ReactNode; flag?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3.5 rounded-3xl border border-ink/5 bg-white p-3.5 shadow-[0_6px_24px_-12px_rgba(11,79,92,0.25)] transition hover:-translate-y-0.5">
      <span className={cx("flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br p-1.5", ring)}>
        <Image src={img} alt="" width={96} height={96} className="h-full w-full rounded-full object-cover" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-2xl font-extrabold leading-tight text-ink">
          {children}
        </p>
        <p className="text-sm font-semibold text-ink/60"><T {...label} />{flag}</p>
      </div>
    </div>
  );
}

/* ───────── Savings calculator ───────── */

export function SavingsCalculator() {
  const { t, lang } = useLang();
  const [mode, setMode] = useState<"bill" | "units">("bill");
  const [bill, setBill] = useState(4000);
  const [units, setUnits] = useState(450);
  const [place, setPlace] = useState<Place>("city");
  const [use, setUse] = useState<"home" | "shop">("home");
  const [cuts, setCuts] = useState<"no" | "yes">("no");

  const plan = useMemo(
    () => computePlan({ bill, units: mode === "units" ? units : null, place, use: use as Use, powerCuts: cuts === "yes", roof: "own" }),
    [bill, units, mode, place, use, cuts]
  );

  const share = () =>
    sendLeadAndOpenWhatsApp(
      { source: "savings-calculator", place, use, bill: mode === "bill" ? bill : "", units: mode === "units" ? units : "", kw: plan.kw, systemType: plan.type, monthlySaving: plan.monthlySaving, lang },
      t({
        en: `Hi Hyderabad Solar, I used your savings calculator.\n${mode === "bill" ? `Bill: ${inr(bill)}/month` : `Units: ${units}/month`}\nPlace: ${place}, ${use}\nSuggested: ${plan.kw} kW ${plan.type}\nEst. saving: ~${inr(plan.monthlySaving)}/month\nPlease share exact price.`,
        te: `హాయ్ హైదరాబాద్ సోలార్, మీ ఆదా కాలిక్యులేటర్ వాడాను.\n${mode === "bill" ? `బిల్: ${inr(bill)}/నెల` : `యూనిట్లు: ${units}/నెల`}\nస్థలం: ${place}, ${use}\nసూచన: ${plan.kw} kW ${plan.type}\nఅంచనా ఆదా: ~${inr(plan.monthlySaving)}/నెల\nసరైన ధర చెప్పండి.`,
      })
    );

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft lg:col-span-2">
        <div className="grid gap-5">
          <Segmented<"bill" | "units"> label={{ en: "I know my", te: "నాకు తెలిసింది" }} value={mode} onChange={setMode} options={[{ value: "bill", label: { en: "Bill (₹)", te: "బిల్ (₹)" } }, { value: "units", label: { en: "Units", te: "యూనిట్లు" } }]} />
          {mode === "bill" ? (
            <RangeField id="sc-bill" label={{ en: "Monthly bill", te: "నెల బిల్" }} value={bill} onChange={setBill} min={500} max={20000} step={100} display={inr(bill)} />
          ) : (
            <RangeField id="sc-units" label={{ en: "Units per month", te: "నెలకు యూనిట్లు" }} value={units} onChange={setUnits} min={50} max={2500} step={10} display={`${units}`} />
          )}
          <Segmented<Place> size="sm" label={{ en: "Place", te: "స్థలం" }} value={place} onChange={setPlace} options={[{ value: "city", label: { en: "City", te: "సిటీ" } }, { value: "colony", label: { en: "Colony / Apt", te: "కాలనీ / అపా." } }, { value: "outskirts", label: { en: "Outskirts", te: "శివారు" } }]} />
          <Segmented<"home" | "shop"> label={{ en: "For", te: "దేనికి" }} value={use} onChange={setUse} options={[{ value: "home", label: { en: "Home", te: "ఇల్లు" }, icon: "House" }, { value: "shop", label: { en: "Shop", te: "షాప్" }, icon: "Store" }]} />
          <Segmented<"no" | "yes"> label={{ en: "Need power-cut backup?", te: "కరెంట్ కోత బ్యాకప్ కావాలా?" }} value={cuts} onChange={setCuts} options={[{ value: "no", label: { en: "No", te: "వద్దు" } }, { value: "yes", label: { en: "Yes (battery)", te: "అవును (బ్యాటరీ)" } }]} />
        </div>
      </div>

      <div className="rounded-[2rem] bg-white p-6 shadow-soft lg:col-span-3" aria-live="polite">
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-3">
          <PhotoStat img="/guide/stat-life.webp" ring="from-amber-50 to-orange-100" label={{ en: "System size", te: "సిస్టమ్ సైజ్" }}><CountUp value={plan.kw} /> kW</PhotoStat>
          <PhotoStat img="/guide/stat-subsidy.webp" ring="from-orange-50 to-amber-100" label={{ en: "Cost after subsidy", te: "సబ్సిడీ తర్వాత ఖర్చు" }}>{lakhs(plan.netCost)}</PhotoStat>
          <PhotoStat img="/home/benefit-lower-bill.webp" ring="from-emerald-50 to-green-100" label={{ en: "Monthly saving", te: "నెల ఆదా" }}>~<CountUp value={plan.monthlySaving} format={inr} /></PhotoStat>
          <PhotoStat img="/home/benefit-subsidy.webp" ring="from-violet-50 to-purple-100" label={{ en: "Payback", te: "పెట్టుబడి తిరిగి" }}>~{plan.paybackYears} <T en="yrs" te="ఏళ్లు" /></PhotoStat>
          <PhotoStat img="/home/benefit-panel-life.webp" ring="from-sky-50 to-blue-100" label={{ en: "25-year net saving", te: "25 ఏళ్ల నికర ఆదా" }}>{lakhs(plan.savings25)}</PhotoStat>
          <PhotoStat img="/home/benefit-clean-air.webp" ring="from-teal-50 to-emerald-100" label={{ en: "CO₂ saved / year", te: "ఏటా CO₂ తగ్గింపు" }}>{plan.co2TonnesYear} t</PhotoStat>
        </div>
        <p className="mt-3 rounded-2xl bg-leaf-soft p-3 text-[15px]">
          <Icon name="Leaf" size={18} className="mr-1 inline text-leaf-deep" />
          <T en={`That is like planting about ${plan.treesEquivalent} trees every year.`} te={`ఇది ప్రతి ఏడాది సుమారు ${plan.treesEquivalent} చెట్లు నాటినంత.`} />
        </p>
        <div className="mt-5">
          <h3 className="mb-2 font-display text-lg font-bold"><T en="Your 25 years with solar" te="సోలార్‌తో మీ 25 ఏళ్లు" /></h3>
          <SavingsChart yearly={plan.yearly} netCost={plan.netCost} />
        </div>
        <button type="button" onClick={share} className="mt-5 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-leaf font-bold text-white hover:bg-leaf-deep sm:w-auto sm:px-8">
          <Icon name="MessageCircle" size={20} /> <T en="Get exact price on WhatsApp" te="వాట్సాప్‌లో సరైన ధర పొందండి" />
        </button>
      </div>

      <div className="rounded-[2rem] bg-pearl p-6 lg:col-span-5">
        <h3 className="font-display text-lg font-bold"><T en="How we calculated this (assumptions)" te="మేము ఎలా లెక్కించాం (అంచనాలు)" /></h3>
        <ul className="mt-3 grid gap-2 text-[15px] text-ink/75 sm:grid-cols-2">
          <li>• <T en={`Home bill ≈ ₹${ASSUME.tariffHome}/unit, shop bill ≈ ₹${ASSUME.tariffShop}/unit on average`} te={`ఇంటి బిల్ ≈ యూనిట్‌కు ₹${ASSUME.tariffHome}, షాప్ బిల్ ≈ యూనిట్‌కు ₹${ASSUME.tariffShop} సగటున`} /></li>
          <li>• <T en={`1 kW makes ~${ASSUME.unitsPerKwMonth} units a month in Hyderabad (~4 a day)`} te={`హైదరాబాద్‌లో 1 kW నెలకు ~${ASSUME.unitsPerKwMonth} యూనిట్లు (రోజుకు ~4)`} /></li>
          <li>• <T en={`Price: ~${inr(ASSUME.pricePerKwOnGrid)}/kW on-grid, ~${inr(ASSUME.pricePerKwHybrid)}/kW hybrid with battery`} te={`ధర: ఆన్-గ్రిడ్ kW కు ~${inr(ASSUME.pricePerKwOnGrid)}, బ్యాటరీతో హైబ్రిడ్ kW కు ~${inr(ASSUME.pricePerKwHybrid)}`} /></li>
          <li>• <T en="Home subsidy: PM Surya Ghar, up to ₹78,000. Shops: no home subsidy." te="ఇంటి సబ్సిడీ: పీఎం సూర్య ఘర్, ₹78,000 వరకు. షాపులకు ఇంటి సబ్సిడీ లేదు." /></li>
          <li>• <T en="About 10% of your bill stays (fixed / minimum charges)" te="బిల్‌లో సుమారు 10% మిగులుతుంది (ఫిక్స్‌డ్ / కనీస చార్జీలు)" /></li>
          <li>• <T en="Panels lose ~0.5% output a year; power price rises ~2% a year (our guess)" te="ప్యానెల్స్ ఏటా ~0.5% తగ్గుతాయి; కరెంట్ ధర ఏటా ~2% పెరుగుతుందని అంచనా" /></li>
        </ul>
        <VerifyNote />
      </div>
    </div>
  );
}

/* ───────── Subsidy calculator ───────── */

export function SubsidyCalculator() {
  const [kw, setKw] = useState(3);
  const [who, setWho] = useState<"home" | "society">("home");
  const [type, setType] = useState<SystemType>("on-grid");
  const gross = kw * pricePerKw(type);
  const subsidy = who === "home" ? pmSuryaGharSubsidy(kw) : societySubsidy(kw);
  const net = Math.max(0, gross - subsidy);
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="grid gap-5 rounded-[2rem] bg-white p-6 shadow-soft">
        <RangeField id="sub-kw" label={{ en: "System size", te: "సిస్టమ్ సైజ్" }} value={kw} onChange={setKw} min={1} max={10} step={1} display={`${kw} kW`} />
        <Segmented<"home" | "society"> label={{ en: "Who is applying?", te: "ఎవరు దరఖాస్తు చేస్తున్నారు?" }} value={who} onChange={setWho} options={[{ value: "home", label: { en: "Home owner", te: "ఇంటి యజమాని" }, icon: "House" }, { value: "society", label: { en: "Apartment society", te: "అపార్ట్‌మెంట్ సొసైటీ" }, icon: "Building2" }]} />
        <Segmented<SystemType> size="sm" label={{ en: "System type", te: "సిస్టమ్ రకం" }} value={type} onChange={setType} options={[{ value: "on-grid", label: { en: "On-grid", te: "ఆన్-గ్రిడ్" } }, { value: "hybrid", label: { en: "Hybrid", te: "హైబ్రిడ్" } }, { value: "off-grid", label: { en: "Off-grid", te: "ఆఫ్-గ్రిడ్" } }]} />
      </div>
      <div className="rounded-[2rem] bg-teal p-6 text-white shadow-lift">
        <div className="grid gap-3">
          <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
            <span><T en="Approx. price" te="సుమారు ధర" /> <Flag /></span>
            <span className="font-display text-2xl font-extrabold">{inr(gross)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
            <span><T en="Subsidy" te="సబ్సిడీ" /> <Flag /></span>
            <span className="font-display text-2xl font-extrabold text-sun-soft">− <CountUp value={subsidy} format={inr} /></span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-sun p-4 text-ink">
            <span className="font-bold"><T en="You pay (approx.)" te="మీరు చెల్లించేది (సుమారు)" /></span>
            <span className="font-display text-3xl font-extrabold"><CountUp value={net} format={inr} /></span>
          </div>
        </div>
        <p className="mt-4 text-[15px] text-white/80">
          {who === "home" ? (
            <T en="PM Surya Ghar: ₹30,000/kW for the first 2 kW + ₹18,000 for the 3rd kW. Max ₹78,000. Paid to your bank after inspection." te="పీఎం సూర్య ఘర్: మొదటి 2 kW కు kW కి ₹30,000 + 3వ kW కి ₹18,000. గరిష్టం ₹78,000. తనిఖీ తర్వాత మీ బ్యాంక్‌లో జమ." />
          ) : (
            <T en="Society common-area solar: about ₹18,000 per kW (for lifts, lights, pumps)." te="సొసైటీ కామన్ ఏరియా సోలార్: kW కి సుమారు ₹18,000 (లిఫ్ట్, లైట్లు, పంపులకు)." />
          )}
        </p>
        <VerifyNote light />
      </div>
    </div>
  );
}

/* ───────── EMI calculator ───────── */

export function EmiCalculator() {
  const [cost, setCost] = useState(130000);
  const [down, setDown] = useState(20000);
  const [months, setMonths] = useState(36);
  const [rate, setRate] = useState(9);
  const principal = Math.max(0, cost - down);
  const e = emi(principal, rate, months);
  const totalInterest = e * months - principal;
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="grid gap-6 rounded-[2rem] bg-white p-6 shadow-soft">
        <RangeField id="emi-cost" label={{ en: "System cost (after subsidy)", te: "సిస్టమ్ ఖర్చు (సబ్సిడీ తర్వాత)" }} value={cost} onChange={setCost} min={50000} max={1000000} step={5000} display={inr(cost)} />
        <RangeField id="emi-down" label={{ en: "Down payment", te: "ముందస్తు చెల్లింపు" }} value={Math.min(down, cost)} onChange={setDown} min={0} max={cost} step={5000} display={inr(Math.min(down, cost))} />
        <RangeField id="emi-months" label={{ en: "Tenure (months)", te: "కాలం (నెలలు)" }} value={months} onChange={setMonths} min={12} max={120} step={6} display={`${months}`} />
        <RangeField id="emi-rate" label={{ en: "Interest (% per year)", te: "వడ్డీ (ఏటా %)" }} value={rate} onChange={setRate} min={6} max={16} step={0.25} display={`${rate}%`} />
      </div>
      <div className="rounded-[2rem] bg-teal p-6 text-white shadow-lift">
        <p className="text-white/75"><T en="Your monthly EMI" te="మీ నెల EMI" /></p>
        <p className="font-display text-5xl font-extrabold"><CountUp value={e} format={inr} /></p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-ink">
          <Stat icon="Banknote" label={{ en: "Loan amount", te: "లోన్ మొత్తం" }}>{inr(principal)}</Stat>
          <Stat icon="Percent" label={{ en: "Total interest", te: "మొత్తం వడ్డీ" }}>{inr(totalInterest)}</Stat>
        </div>
        <p className="mt-4 text-[15px] text-white/80">
          <T en="Tip: if your monthly solar saving is close to the EMI, solar pays for itself from day one." te="చిట్కా: మీ నెల సోలార్ ఆదా EMI కి దగ్గరగా ఉంటే, మొదటి రోజు నుంచే సోలార్ తనకు తానే చెల్లించుకుంటుంది." />
        </p>
        <p className="mt-2 text-sm text-white/70"><T en="Interest rates are examples. Your bank decides the real rate." te="వడ్డీ రేట్లు ఉదాహరణ మాత్రమే. అసలు రేటు మీ బ్యాంక్ నిర్ణయిస్తుంది." /> <Flag /></p>
      </div>
    </div>
  );
}

export function EmiExamples() {
  const rows = [
    { kw: 3, cost: 3 * ASSUME.pricePerKwOnGrid - pmSuryaGharSubsidy(3) },
    { kw: 5, cost: 5 * ASSUME.pricePerKwOnGrid - pmSuryaGharSubsidy(5) },
    { kw: 10, cost: 10 * ASSUME.pricePerKwOnGrid - pmSuryaGharSubsidy(10) },
  ];
  return (
    <div className="overflow-x-auto rounded-3xl bg-white shadow-soft">
      <table className="w-full min-w-[560px] text-left">
        <thead>
          <tr className="bg-teal/5 text-teal">
            <th className="px-5 py-3 font-display"><T en="System" te="సిస్టమ్" /></th>
            <th className="px-5 py-3 font-display"><T en="Cost after subsidy" te="సబ్సిడీ తర్వాత ఖర్చు" /></th>
            <th className="px-5 py-3 font-display"><T en="EMI 3 yrs" te="EMI 3 ఏళ్లు" /></th>
            <th className="px-5 py-3 font-display"><T en="EMI 5 yrs" te="EMI 5 ఏళ్లు" /></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.kw} className="border-t border-ink/5">
              <td className="px-5 py-3 font-semibold">{r.kw} kW</td>
              <td className="px-5 py-3">{inr(r.cost)} <Flag /></td>
              <td className="px-5 py-3">{inr(emi(r.cost, 9, 36))}</td>
              <td className="px-5 py-3">{inr(emi(r.cost, 9, 60))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-5 pb-4 pt-2 text-sm text-ink/60"><T en="Example at 9% a year, no down payment. On-grid price estimate." te="ఏటా 9% వడ్డీ, ముందస్తు చెల్లింపు లేకుండా ఉదాహరణ. ఆన్-గ్రిడ్ ధర అంచనా." /></p>
    </div>
  );
}

/* ───────── Shop bill → size ───────── */

export function ShopCalculator() {
  const { t, lang } = useLang();
  const [bill, setBill] = useState(8000);
  const [hours, setHours] = useState<"day" | "evening">("day");
  const plan = computePlan({ bill, place: "city", use: "shop", roof: "own" });
  const daytimeShare = hours === "day" ? 0.85 : 0.55;
  const saving = Math.round(plan.monthlySaving * (hours === "day" ? 1 : 0.85));
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="grid gap-5 rounded-[2rem] bg-white p-6 shadow-soft">
        <RangeField id="shop-bill" label={{ en: "Shop's monthly bill", te: "షాప్ నెల బిల్" }} value={bill} onChange={setBill} min={1000} max={20000} step={250} display={inr(bill)} />
        <Segmented<"day" | "evening"> label={{ en: "When is the shop busiest?", te: "షాప్ ఎప్పుడు ఎక్కువ నడుస్తుంది?" }} value={hours} onChange={setHours} options={[{ value: "day", label: { en: "Daytime", te: "పగలు" }, icon: "Sun" }, { value: "evening", label: { en: "Evening / night", te: "సాయంత్రం / రాత్రి" }, icon: "Moon" }]} />
        <p className="text-[15px] text-ink/65">
          <T en={`About ${Math.round(daytimeShare * 100)}% of your power is used while the sun shines. Extra units go to the grid through the net meter.`} te={`మీ కరెంట్‌లో సుమారు ${Math.round(daytimeShare * 100)}% ఎండ ఉన్నప్పుడే వాడతారు. అదనపు యూనిట్లు నెట్ మీటర్ ద్వారా గ్రిడ్‌కు వెళ్తాయి.`} />
        </p>
      </div>
      <div className="rounded-[2rem] bg-teal p-6 text-white shadow-lift" aria-live="polite">
        <div className="grid grid-cols-2 gap-3 text-ink">
          <Stat icon="Sun" tone="sun" label={{ en: "Suggested size", te: "సూచించిన సైజ్" }}><CountUp value={plan.kw} /> kW</Stat>
          <Stat icon="Ruler" label={{ en: "Roof needed", te: "కావాల్సిన పైకప్పు" }}>~{plan.roofSqft} sq ft</Stat>
          <Stat icon="IndianRupee" tone="leaf" label={{ en: "Saving / month", te: "నెల ఆదా" }}>~<CountUp value={saving} format={inr} /></Stat>
          <Stat icon="Wallet" label={{ en: "Approx. price", te: "సుమారు ధర" }} flag={<Flag />}>{lakhs(plan.grossCost)}</Stat>
        </div>
        <button
          type="button"
          onClick={() =>
            sendLeadAndOpenWhatsApp(
              { source: "shop-calculator", use: "shop", bill, kw: plan.kw, monthlySaving: saving, message: hours, lang },
              t({ en: `Hi Hyderabad Solar, I want a solar plan for my shop.\nBill: ${inr(bill)}/month\nBusy: ${hours === "day" ? "daytime" : "evening"}\nSuggested: ${plan.kw} kW\nPlease share price.`, te: `హాయ్ హైదరాబాద్ సోలార్, నా షాప్‌కు సోలార్ ప్లాన్ కావాలి.\nబిల్: ${inr(bill)}/నెల\nబిజీ: ${hours === "day" ? "పగలు" : "సాయంత్రం"}\nసూచన: ${plan.kw} kW\nధర చెప్పండి.` })
            )
          }
          className="mt-5 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-sun font-bold text-ink shadow-glow"
        >
          <Icon name="MessageCircle" size={20} /> <T en="Get my shop plan on WhatsApp" te="నా షాప్ ప్లాన్ వాట్సాప్‌లో పొందండి" />
        </button>
        <VerifyNote light />
      </div>
    </div>
  );
}

export function MiniLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cx("inline-flex items-center gap-1 font-bold text-sun-deep hover:underline", className)}>
      {children} <Icon name="ArrowRight" size={16} />
    </Link>
  );
}
