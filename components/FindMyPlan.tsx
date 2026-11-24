"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { computePlan, inr, lakhs, type Place, type Roof, type Use } from "@/lib/solar";
import { documentsFor, matchSchemes } from "@/lib/match";
import { T, useLang, type L } from "@/lib/i18n";
import { sendLeadAndOpenWhatsApp } from "@/lib/leads";
import { Icon, type IconName } from "./Icon";
import { CountUp, RangeField, Stat } from "./controls";
import { Flag, VerifyNote, cx } from "./ui";

type Choice<V> = { value: V; label: L; hint?: L; icon: IconName };

const PLACES: Choice<Place>[] = [
  { value: "city", label: { en: "City", te: "సిటీ" }, hint: { en: "Inside Hyderabad city", te: "హైదరాబాద్ నగరంలో" }, icon: "Building2" },
  { value: "colony", label: { en: "Colony / Apartment", te: "కాలనీ / అపార్ట్‌మెంట్" }, hint: { en: "Gated community, colony, flats", te: "గేటెడ్ కమ్యూనిటీ, కాలనీ, ఫ్లాట్లు" }, icon: "House" },
  { value: "outskirts", label: { en: "Outskirts / Village", te: "శివారు / గ్రామం" }, hint: { en: "Plots, farmhouses, rural side", te: "ప్లాట్లు, ఫామ్‌హౌస్‌లు, గ్రామీణ ప్రాంతం" }, icon: "Tractor" },
];
const USES: Choice<Use>[] = [
  { value: "home", label: { en: "Home", te: "ఇల్లు" }, hint: { en: "Independent house / villa", te: "ఇండిపెండెంట్ ఇల్లు / విల్లా" }, icon: "House" },
  { value: "apartment", label: { en: "Apartment", te: "అపార్ట్‌మెంట్" }, hint: { en: "Flat or whole building", te: "ఫ్లాట్ లేదా మొత్తం భవనం" }, icon: "Building2" },
  { value: "shop", label: { en: "Shop", te: "షాప్" }, hint: { en: "Shop, office, small business", te: "షాప్, ఆఫీస్, చిన్న వ్యాపారం" }, icon: "Store" },
  { value: "farm", label: { en: "Farm / Plot", te: "వ్యవసాయ భూమి / ప్లాట్" }, hint: { en: "Farmhouse, land, pump", te: "ఫామ్‌హౌస్, భూమి, పంపు" }, icon: "Tractor" },
  { value: "institution", label: { en: "Institution", te: "సంస్థ" }, hint: { en: "Clinic, school, temple, hostel", te: "క్లినిక్, స్కూల్, గుడి, హాస్టల్" }, icon: "School" },
];
const ROOFS: Choice<Roof>[] = [
  { value: "own", label: { en: "Own roof", te: "సొంత పైకప్పు" }, hint: { en: "I can use the terrace", te: "టెర్రస్ వాడుకోగలను" }, icon: "House" },
  { value: "shared", label: { en: "Shared roof", te: "ఉమ్మడి పైకప్పు" }, hint: { en: "Apartment / building terrace", te: "అపార్ట్‌మెంట్ / భవనం టెర్రస్" }, icon: "Users" },
  { value: "none", label: { en: "No roof", te: "పైకప్పు లేదు" }, hint: { en: "Rented / no access", te: "అద్దె / వాడుకునే వీలు లేదు" }, icon: "Ban" },
];

const TYPE_LABEL: Record<string, L> = {
  "on-grid": { en: "On-grid (with net meter)", te: "ఆన్-గ్రిడ్ (నెట్ మీటర్‌తో)" },
  hybrid: { en: "Hybrid (solar + battery backup)", te: "హైబ్రిడ్ (సోలార్ + బ్యాటరీ బ్యాకప్)" },
  "off-grid": { en: "Off-grid (solar + battery, no grid)", te: "ఆఫ్-గ్రిడ్ (సోలార్ + బ్యాటరీ, గ్రిడ్ లేకుండా)" },
};

function ChoiceGrid<V extends string>({ options, value, onPick }: { options: Choice<V>[]; value: V | null; onPick: (v: V) => void }) {
  return (
    <div className={cx("grid gap-3", options.length > 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-3")}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onPick(o.value)}
          aria-pressed={value === o.value}
          className={cx("flex min-h-[88px] items-center gap-4 rounded-3xl p-4 text-left shadow-soft transition hover:-translate-y-0.5", value === o.value ? "bg-teal text-white" : "bg-white")}
        >
          <span className={cx("inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", value === o.value ? "bg-white/15" : "bg-sun/15 text-sun-deep")}>
            <Icon name={o.icon} size={26} />
          </span>
          <span>
            <span className="block font-display text-lg font-bold"><T {...o.label} /></span>
            {o.hint && <span className={cx("block text-[15px]", value === o.value ? "text-white/80" : "text-ink/60")}><T {...o.hint} /></span>}
          </span>
        </button>
      ))}
    </div>
  );
}

export function FindMyPlan() {
  const { t, lang } = useLang();
  const [step, setStep] = useState(0);
  const [place, setPlace] = useState<Place | null>(null);
  const [use, setUse] = useState<Use | null>(null);
  const [bill, setBill] = useState(3000);
  const [units, setUnits] = useState<string>("");
  const [cuts, setCuts] = useState<"yes" | "no" | null>(null);
  const [roof, setRoof] = useState<Roof | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  // Prefill from the home-page bill slider
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const b = Number(q.get("bill"));
    if (b >= 500 && b <= 20000) setBill(b);
    const p = q.get("place");
    if (p === "city" || p === "colony" || p === "outskirts") setPlace(p);
    const u = q.get("use");
    if (u === "home" || u === "shop") setUse(u);
  }, []);

  const total = 5;
  const done = step >= total;
  const unitsNum = Number(units) > 0 ? Number(units) : null;

  const plan = useMemo(
    () => computePlan({ bill, units: unitsNum, place: place ?? "city", use: use ?? "home", powerCuts: cuts === "yes", roof: roof ?? "own" }),
    [bill, unitsNum, place, use, cuts, roof]
  );
  const schemes = useMemo(() => matchSchemes({ place: place ?? "city", use: use ?? "home", roof: roof ?? "own", units: plan.units }), [place, use, roof, plan.units]);
  const docs = documentsFor(use ?? "home", roof ?? "own");

  const next = () => setStep((s) => Math.min(total, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const pick = <V,>(setter: (v: V) => void) => (v: V) => {
    setter(v);
    setTimeout(next, 180);
  };

  const label = (arr: Choice<string>[], v: string | null) => (v ? t(arr.find((a) => a.value === v)!.label) : "-");

  const onWhatsApp = () => {
    const msg = [
      t({ en: "Hi Hyderabad Solar, here is my solar plan from your website:", te: "హాయ్ హైదరాబాద్ సోలార్, మీ వెబ్‌సైట్ నుండి నా సోలార్ ప్లాన్:" }),
      name && `${t({ en: "Name", te: "పేరు" })}: ${name}`,
      area && `${t({ en: "Area", te: "ప్రాంతం" })}: ${area}`,
      `${t({ en: "Place", te: "స్థలం" })}: ${label(PLACES, place)}`,
      `${t({ en: "Type", te: "రకం" })}: ${label(USES, use)}`,
      `${t({ en: "Monthly bill", te: "నెల బిల్" })}: ${inr(bill)}${unitsNum ? ` (${unitsNum} units)` : ""}`,
      `${t({ en: "Power cuts", te: "కరెంట్ కోతలు" })}: ${cuts === "yes" ? t({ en: "Yes", te: "అవును" }) : t({ en: "No", te: "లేదు" })}`,
      `${t({ en: "Roof", te: "పైకప్పు" })}: ${label(ROOFS, roof)}`,
      `${t({ en: "Suggested", te: "సూచన" })}: ${plan.kw} kW ${t(TYPE_LABEL[plan.type])}`,
      `${t({ en: "Est. monthly saving", te: "అంచనా నెల ఆదా" })}: ~${inr(plan.monthlySaving)}`,
      `${t({ en: "Schemes", te: "స్కీములు" })}: ${schemes.map((s) => t(s.name)).join(", ")}`,
      t({ en: "Please confirm the price and next step.", te: "ధర, తదుపరి స్టెప్ చెప్పండి." }),
    ]
      .filter(Boolean)
      .join("\n");

    sendLeadAndOpenWhatsApp(
      {
        source: "find-my-plan",
        name,
        phone,
        area,
        place: place ?? "",
        use: use ?? "",
        bill,
        units: unitsNum ?? "",
        powerCuts: cuts ?? "",
        roof: roof ?? "",
        kw: plan.kw,
        systemType: plan.type,
        monthlySaving: plan.monthlySaving,
        schemes: schemes.map((s) => s.slug).join(","),
        lang,
      },
      msg
    );
  };

  const questions: { title: L; body: React.ReactNode; canNext: boolean }[] = [
    { title: { en: "Where is your place?", te: "మీ స్థలం ఎక్కడ ఉంది?" }, body: <ChoiceGrid options={PLACES} value={place} onPick={pick(setPlace)} />, canNext: !!place },
    { title: { en: "What is it?", te: "అది ఏమిటి?" }, body: <ChoiceGrid options={USES} value={use} onPick={pick(setUse)} />, canNext: !!use },
    {
      title: { en: "What is your monthly electricity bill?", te: "మీ నెల కరెంట్ బిల్ ఎంత?" },
      body: (
        <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-7">
          <RangeField id="fmp-bill" label={{ en: "Monthly bill", te: "నెల బిల్" }} value={bill} onChange={setBill} min={500} max={20000} step={100} display={inr(bill)} />
          <label htmlFor="fmp-units" className="label mt-6">
            <T en="Units used per month (optional, from your bill)" te="నెలకు వాడిన యూనిట్లు (ఐచ్ఛికం, బిల్‌లో ఉంటుంది)" />
          </label>
          <input id="fmp-units" inputMode="numeric" className="field" placeholder="e.g. 350" value={units} onChange={(e) => setUnits(e.target.value.replace(/[^0-9]/g, "").slice(0, 5))} />
        </div>
      ),
      canNext: true,
    },
    {
      title: { en: "Do you have power cuts often?", te: "తరచూ కరెంట్ కోతలు ఉంటాయా?" },
      body: (
        <ChoiceGrid
          options={[
            { value: "yes" as const, label: { en: "Yes, often", te: "అవును, తరచూ" }, hint: { en: "I need backup", te: "బ్యాకప్ కావాలి" }, icon: "BatteryCharging" as IconName },
            { value: "no" as const, label: { en: "No, rarely", te: "లేదు, అరుదుగా" }, hint: { en: "Grid is mostly fine", te: "గ్రిడ్ బాగానే ఉంది" }, icon: "PlugZap" as IconName },
          ]}
          value={cuts}
          onPick={pick(setCuts)}
        />
      ),
      canNext: !!cuts,
    },
    { title: { en: "What about the roof?", te: "పైకప్పు సంగతి ఏమిటి?" }, body: <ChoiceGrid options={ROOFS} value={roof} onPick={pick(setRoof)} />, canNext: !!roof },
  ];

  if (!done) {
    const q = questions[step];
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-sm font-bold text-ink/60">
            <T en={`Question ${step + 1} of ${total}`} te={`ప్రశ్న ${step + 1} / ${total}`} />
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-teal/10" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={step + 1}>
            <div className="h-full rounded-full bg-sun transition-all duration-500" style={{ width: `${((step + 1) / total) * 100}%` }} />
          </div>
        </div>
        <div key={step} className="animate-pop">
          <h2 className="mb-6 font-display text-3xl font-extrabold sm:text-4xl"><T {...q.title} /></h2>
          {q.body}
        </div>
        <div className="mt-8 flex items-center justify-between gap-3">
          <button type="button" onClick={back} disabled={step === 0} className="min-h-[52px] rounded-full px-5 font-bold text-teal disabled:opacity-30">
            ← <T en="Back" te="వెనక్కి" />
          </button>
          <button type="button" onClick={next} disabled={!q.canNext} className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-sun px-7 font-bold text-ink shadow-glow disabled:opacity-40 disabled:shadow-none">
            {step === total - 1 ? <T en="Show my plan" te="నా ప్లాన్ చూపించు" /> : <T en="Next" te="తర్వాత" />} <Icon name="ArrowRight" size={20} />
          </button>
        </div>
      </div>
    );
  }

  /* ───────── RESULT ───────── */
  return (
    <div className="animate-pop">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
          <T en="Your solar plan" te="మీ సోలార్ ప్లాన్" />
        </h2>
        <button type="button" onClick={() => setStep(0)} className="rounded-full bg-white px-4 py-2 font-bold text-teal shadow-soft">
          ↺ <T en="Change answers" te="జవాబులు మార్చండి" />
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Main result */}
        <div className="rounded-[2rem] bg-teal p-6 text-white shadow-lift sm:p-8 lg:col-span-2">
          <p className="text-white/75"><T en="We suggest" te="మా సూచన" /></p>
          <p className="font-display text-5xl font-extrabold sm:text-6xl">
            <CountUp value={plan.kw} /> kW
          </p>
          <p className="mt-1 text-xl font-bold text-sun-soft"><T {...TYPE_LABEL[plan.type]} /></p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-ink sm:grid-cols-4">
            <Stat icon="Ruler" label={{ en: "Roof area", te: "పైకప్పు" }}>~{plan.roofSqft} sq ft</Stat>
            <Stat icon="IndianRupee" tone="leaf" label={{ en: "Saving / month", te: "నెల ఆదా" }}>~<CountUp value={plan.monthlySaving} format={(n) => inr(n)} /></Stat>
            <Stat icon="Wallet" label={{ en: "Cost after subsidy", te: "సబ్సిడీ తర్వాత ఖర్చు" }} flag={<Flag />}>{lakhs(plan.netCost)}</Stat>
            <Stat icon="CalendarClock" tone="sun" label={{ en: "Payback", te: "పెట్టుబడి తిరిగి" }}>~{plan.paybackYears} <T en="yrs" te="ఏళ్లు" /></Stat>
          </div>
          <p className="mt-4 text-sm text-white/75">
            <T
              en={`Based on ~${plan.units} units/month. 1 kW makes about 120 units a month in Hyderabad. Price before subsidy ~${lakhs(plan.grossCost)}, subsidy ~${inr(plan.subsidy)}.`}
              te={`నెలకు ~${plan.units} యూనిట్ల ఆధారంగా. హైదరాబాద్‌లో 1 kW నెలకు సుమారు 120 యూనిట్లు ఇస్తుంది. సబ్సిడీ ముందు ధర ~${lakhs(plan.grossCost)}, సబ్సిడీ ~${inr(plan.subsidy)}.`}
            />{" "}
            <Flag />
          </p>
          {plan.roofNote !== "ok" && (
            <p className="mt-4 rounded-2xl bg-white/10 p-4">
              <Icon name="Info" size={18} className="mr-1 inline text-sun-soft" />
              {plan.roofNote === "shared" ? (
                <T en="Shared roof: you need your association's OK. Common-area solar for the building is often the easiest start." te="ఉమ్మడి పైకప్పు: అసోసియేషన్ అనుమతి కావాలి. భవనం కామన్ ఏరియాకు సోలార్ పెట్టడం సులభమైన మొదలు." />
              ) : (
                <T en="No roof: ask your owner or association, or consider solar on open land. Talk to us for options." te="పైకప్పు లేదు: యజమాని లేదా అసోసియేషన్‌ను అడగండి, లేదా ఖాళీ భూమిపై సోలార్ ఆలోచించండి. మాతో మాట్లాడండి." />
              )}
            </p>
          )}
          {plan.gruhaJyothiNote && (
            <p className="mt-4 rounded-2xl bg-white/10 p-4">
              <Icon name="Info" size={18} className="mr-1 inline text-sun-soft" />
              <T en="You use 200 units or less. If you get Gruha Jyothi free units, solar may not save much right now." te="మీరు 200 యూనిట్లు లేదా తక్కువ వాడుతున్నారు. గృహ జ్యోతి ఉచిత యూనిట్లు వస్తుంటే, ఇప్పుడు సోలార్‌తో పెద్దగా ఆదా ఉండకపోవచ్చు." />
              <Flag />
            </p>
          )}
        </div>

        {/* WhatsApp lead box */}
        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <h3 className="font-display text-xl font-extrabold"><T en="Next step" te="తదుపరి స్టెప్" /></h3>
          <p className="mt-1 text-ink/70"><T en="Send this plan to us on WhatsApp. We reply with price and the exact scheme rules." te="ఈ ప్లాన్‌ను వాట్సాప్‌లో పంపండి. ధర, స్కీమ్ నియమాలతో జవాబిస్తాం." /></p>
          <div className="mt-4 grid gap-3">
            <div>
              <label htmlFor="fmp-name" className="label"><T en="Your name" te="మీ పేరు" /></label>
              <input id="fmp-name" className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="fmp-phone" className="label"><T en="Phone (optional)" te="ఫోన్ (ఐచ్ఛికం)" /></label>
              <input id="fmp-phone" className="field" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            </div>
            <div>
              <label htmlFor="fmp-area" className="label"><T en="Area in Hyderabad" te="హైదరాబాద్‌లో ప్రాంతం" /></label>
              <input id="fmp-area" className="field" placeholder="e.g. Kukatpally" value={area} onChange={(e) => setArea(e.target.value)} />
            </div>
          </div>
          <button type="button" onClick={onWhatsApp} className="mt-5 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-leaf font-bold text-white transition hover:bg-leaf-deep">
            <Icon name="MessageCircle" size={22} /> <T en="Talk to us on WhatsApp" te="వాట్సాప్‌లో మాట్లాడండి" />
          </button>
          <p className="mt-2 text-xs text-ink/55"><T en="Your answers are saved so we can reply. See our Privacy page." te="మీకు జవాబు ఇవ్వడానికి మీ జవాబులు సేవ్ అవుతాయి. గోప్యత పేజీ చూడండి." /></p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <h3 className="flex items-center gap-2 font-display text-xl font-extrabold"><Icon name="BadgeCheck" className="text-leaf" /> <T en="Schemes you may qualify for" te="మీకు వర్తించే స్కీములు" /></h3>
          <ul className="mt-4 grid gap-3">
            {schemes.map((s) => (
              <li key={s.slug}>
                <Link href={`/schemes/${s.slug}`} className="block rounded-2xl bg-pearl p-4 transition hover:bg-cream">
                  <span className="block font-bold text-teal"><T {...s.name} /></span>
                  <span className="block text-[15px] text-ink/70"><T {...s.reason} /></span>
                </Link>
              </li>
            ))}
          </ul>
          <VerifyNote />
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <h3 className="flex items-center gap-2 font-display text-xl font-extrabold"><Icon name="FileCheck" className="text-sun-deep" /> <T en="Documents to keep ready" te="సిద్ధంగా ఉంచాల్సిన పత్రాలు" /></h3>
          <ul className="mt-4 grid gap-2.5">
            {docs.map((d, i) => (
              <li key={i} className="flex items-start gap-3">
                <Icon name="CircleCheck" size={20} className="mt-0.5 shrink-0 text-leaf" />
                <span><T {...d} /></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
