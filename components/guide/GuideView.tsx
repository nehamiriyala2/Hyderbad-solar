"use client";

import Image from "next/image";
import Link from "next/link";
import { T, useLang, type L } from "@/lib/i18n";
import type { GuidePhotos, GuideSlot } from "@/content/guideImages";
import { Icon, type IconName } from "../Icon";
import { CountUp } from "../controls";
import { Btn, CTABand, cx } from "../ui";
import { GuidePhoto } from "./GuidePhoto";
import { ColorIcon } from "../ColorIcon";
import { Approx, ChapterHead, Reveal, SunChart, TocChips, TocSidebar, useActiveChapter } from "./parts";

type Tone = "cream" | "white" | "teal";
const BAND: Record<Tone, string> = { cream: "bg-cream text-ink", white: "bg-white text-ink", teal: "bg-teal text-white" };

/** Full-width band whose content leaves room for the sticky TOC (left) and the WhatsApp float (right). */
function Chapter({ id, tone, children }: { id: string; tone: Tone; children: React.ReactNode }) {
  return (
    <section id={id} className={cx(BAND[tone], "scroll-mt-28 py-14 sm:py-20 lg:scroll-mt-20")}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:pl-[308px] lg:pr-24 min-[1600px]:pr-8">{children}</div>
    </section>
  );
}

function PhotoCard({ slot, photos, title, text, light }: { slot: GuideSlot; photos: GuidePhotos; title: L; text: L; light?: boolean }) {
  return (
    <article className={cx("h-full overflow-hidden rounded-2xl shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift", light ? "bg-white/10" : "bg-white")}>
      <GuidePhoto slot={slot} src={photos[slot]} className="aspect-[4/3]" sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw" />
      <div className="p-5">
        <h3 className="font-display text-xl font-bold"><T {...title} /></h3>
        <p className={cx("mt-1 line-clamp-2 text-[16px]", light ? "text-white/80" : "text-ink/70")}><T {...text} /></p>
      </div>
    </article>
  );
}

/* ───────── Content ───────── */

const FLOW: { icon: IconName; label: L; img: string; alt: string }[] = [
  { icon: "Sun", label: { en: "Sun", te: "సూర్యుడు" }, img: "/guide/flow-sun.webp", alt: "Bright sun in a blue sky" },
  { icon: "LayoutGrid", label: { en: "Panels", te: "ప్యానెల్స్" }, img: "/guide/flow-panels.webp", alt: "A solar panel" },
  { icon: "Cable", label: { en: "Inverter", te: "ఇన్వర్టర్" }, img: "/guide/flow-inverter.webp", alt: "Solar inverter on the wall of a house" },
  { icon: "House", label: { en: "Home", te: "ఇల్లు" }, img: "/guide/flow-home.webp", alt: "Home with rooftop solar" },
  { icon: "Gauge", label: { en: "Net meter", te: "నెట్ మీటర్" }, img: "/guide/flow-net-meter.webp", alt: "Bidirectional net meter" },
  { icon: "UtilityPole", label: { en: "Grid", te: "గ్రిడ్" }, img: "/guide/flow-grid.webp", alt: "Electricity transmission tower" },
];

// [VERIFY] typical appliance wattages (nameplate ranges vary by model)
const LOADS: { icon: IconName; name: L; w: string }[] = [
  { icon: "Lightbulb", name: { en: "LED bulb", te: "LED బల్బ్" }, w: "9 W" },
  { icon: "Fan", name: { en: "Ceiling fan (BLDC 30 W)", te: "సీలింగ్ ఫ్యాన్ (BLDC 30 W)" }, w: "70 W" },
  { icon: "Tv", name: { en: "TV", te: "టీవీ" }, w: "100 W" },
  { icon: "Monitor", name: { en: "Laptop", te: "ల్యాప్‌టాప్" }, w: "60 W" },
  { icon: "Refrigerator", name: { en: "Fridge", te: "ఫ్రిజ్" }, w: "150–200 W" },
  { icon: "Zap", name: { en: "Mixer / grinder", te: "మిక్సర్ / గ్రైండర్" }, w: "500 W" },
  { icon: "AirVent", name: { en: "1.5-ton inverter AC", te: "1.5 టన్ ఇన్వర్టర్ ఏసీ" }, w: "1,000–1,500 W" },
  { icon: "Droplets", name: { en: "Water pump (0.5–1 HP)", te: "నీటి పంపు (0.5–1 HP)" }, w: "400–750 W" },
];

const CHECKLIST: { icon: IconName; title: L; text: L }[] = [
  { icon: "Ruler", title: { en: "Roof space", te: "పైకప్పు స్థలం" }, text: { en: "About 100 sq ft of open roof per kW.", te: "kW కి సుమారు 100 చ.అ. ఖాళీ పైకప్పు." } },
  { icon: "Sun", title: { en: "Shadow-free 9 AM–4 PM", te: "ఉదయం 9–సాయంత్రం 4 నీడ లేదు" }, text: { en: "No tank, tree or tower shading the panels.", te: "ట్యాంక్, చెట్టు, టవర్ నీడ పడకూడదు." } },
  { icon: "PlugZap", title: { en: "Sanctioned load", te: "శాంక్షన్డ్ లోడ్" }, text: { en: "Printed on your bill; solar size usually stays within it.", te: "బిల్‌పై ఉంటుంది; సోలార్ సైజ్ సాధారణంగా దానిలోపే." } },
  { icon: "Gauge", title: { en: "Net metering", te: "నెట్ మీటరింగ్" }, text: { en: "Apply to TGSPDCL so extra units earn credit.", te: "అదనపు యూనిట్లకు జమ కోసం TGSPDCL కి దరఖాస్తు." } },
  { icon: "BadgeCheck", title: { en: "Approved vendor", te: "ఆమోదిత వెండర్" }, text: { en: "Registered on the PM Surya Ghar portal for subsidy.", te: "సబ్సిడీ కోసం పీఎం సూర్య ఘర్ పోర్టల్‌లో రిజిస్టర్డ్." } },
  { icon: "FileCheck", title: { en: "Written warranties", te: "రాతపూర్వక వారంటీలు" }, text: { en: "Panels, inverter and workmanship, all on paper.", te: "ప్యానెల్స్, ఇన్వర్టర్, పనితనం — అన్నీ రాతపూర్వకంగా." } },
  { icon: "HeartHandshake", title: { en: "After-sales service", te: "అమ్మకం తర్వాత సేవ" }, text: { en: "A named contact and response time for issues.", te: "సమస్యలకు ఒక సంప్రదింపు వ్యక్తి, స్పందన సమయం." } },
];

/* ───────── View ───────── */

export function GuideView({ photos }: { photos: GuidePhotos }) {
  const active = useActiveChapter();
  const { t } = useLang();

  return (
    <>
      {/* HERO — split: text left, premium photo right */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-dark via-teal to-teal text-white">
        <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sun/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 pb-28 pt-14 sm:px-6 lg:px-8 lg:min-h-[600px] lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <h1 className="max-w-3xl font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.2rem]">
              <T en="Solar Knowledge Centre" te="సోలార్ నాలెడ్జ్ సెంటర్" />
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-xl">
              <T en="A complete, plain-language guide to rooftop solar in Hyderabad." te="హైదరాబాద్‌లో రూఫ్‌టాప్ సోలార్‌కు పూర్తి, సులభమైన భాషలో గైడ్." />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="/find-my-plan" icon="Sparkles"><T en="Find My Solar Plan" te="నా సోలార్ ప్లాన్ చూడండి" /></Btn>
              <Btn href="/subsidy-loans" variant="light" icon="BadgeCheck"><T en="Check My Subsidy" te="నా సబ్సిడీ చూడండి" /></Btn>
            </div>
          </div>
          <div className="relative">
            <div aria-hidden className="absolute -inset-3 rotate-2 rounded-[2.2rem] bg-sun/30" />
            <GuidePhoto slot="hero" src={photos.hero} priority sizes="(min-width: 1024px) 520px, 100vw" className="aspect-[4/3] rounded-[2rem] shadow-lift ring-4 ring-white/10 lg:aspect-square" />
          </div>
        </div>
      </section>

      {/* Floating quick-facts bar */}
      <div className="relative z-10 mx-auto -mt-16 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10 shadow-lift lg:grid-cols-4">
          {[
            // [VERIFY] all four figures
            { icon: "Zap" as IconName, k: { en: "Units per kW per day", te: "kW కి రోజుకు యూనిట్లు" }, v: <>~<CountUp value={4} /></> },
            { icon: "Ruler" as IconName, k: { en: "Roof per kW", te: "kW కి పైకప్పు" }, v: <>~<CountUp value={100} /> sq ft</> },
            { icon: "ShieldCheck" as IconName, k: { en: "Panel life", te: "ప్యానెల్ జీవితం" }, v: <><CountUp value={25} />+ <T en="yrs" te="ఏళ్లు" /></> },
            { icon: "BadgeCheck" as IconName, k: { en: "Home subsidy up to", te: "ఇంటి సబ్సిడీ" }, v: <>₹<CountUp value={78000} /></> },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-white p-4 sm:gap-4 sm:p-6">
              <ColorIcon name={f.icon} i={i} />
              <div>
                <dt className="text-sm font-semibold text-ink/60"><T {...f.k} /></dt>
                <dd className="mt-0.5 font-display text-2xl font-extrabold text-teal sm:text-3xl">{f.v}</dd>
              </div>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-right text-xs text-ink/50"><T en="Approximate figures" te="సుమారు అంకెలు" /></p>
      </div>

      <TocChips active={active} />

      <div className="relative">
        {/* Desktop sticky TOC: sits over the bands, in the reserved left column */}
        <div aria-hidden={false} className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="mx-auto h-full max-w-[1400px] px-4 pt-14 sm:px-6 lg:px-8">
            <TocSidebar active={active} />
          </div>
        </div>

        {/* 01 */}
        <Chapter id="what-is-solar" tone="cream">
          <ChapterHead n="01" title={{ en: "What is solar?", te: "సోలార్ అంటే ఏమిటి?" }} sub={{ en: "A rooftop system has three main parts.", te: "రూఫ్‌టాప్ సిస్టమ్‌లో మూడు ముఖ్య భాగాలు." }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal><PhotoCard photos={photos} slot="panel-closeup" title={{ en: "Panels", te: "ప్యానెల్స్" }} text={{ en: "Catch sunlight and make DC power. Each panel is 400–550 W.", te: "ఎండను పట్టి DC కరెంట్ తయారు చేస్తాయి. ఒక్కోటి 400–550 W." }} /></Reveal>
            <Reveal delay={100}><PhotoCard photos={photos} slot="inverter" title={{ en: "Inverter", te: "ఇన్వర్టర్" }} text={{ en: "Turns DC into AC for your home and shows live generation.", te: "DC ని ఇంటి AC గా మార్చి, లైవ్ ఉత్పత్తి చూపిస్తుంది." }} /></Reveal>
            <Reveal delay={200}><PhotoCard photos={photos} slot="net-meter" title={{ en: "Net meter", te: "నెట్ మీటర్" }} text={{ en: "A two-way meter from TGSPDCL that counts units in and out.", te: "లోపలికి, బయటికి యూనిట్లు లెక్కించే TGSPDCL రెండు వైపుల మీటర్." }} /></Reveal>
          </div>
          <Reveal>
            <div className="mt-8 rounded-2xl bg-white p-4 shadow-soft sm:p-5">
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-ink/50"><T en="How power flows" te="కరెంట్ ఎలా ప్రవహిస్తుంది" /></p>
              <ol aria-label={t({ en: "How power flows", te: "కరెంట్ ఎలా ప్రవహిస్తుంది" })} className="-mx-1 flex snap-x items-center gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:justify-between sm:gap-1">
                {FLOW.map((f, i) => (
                  <li key={i} className={cx("flex shrink-0 snap-start items-center gap-1", i < FLOW.length - 1 && "sm:flex-1")}>
                    <figure className="w-[92px] shrink-0 text-center sm:w-[88px] lg:w-[118px]">
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-pearl ring-1 ring-ink/5">
                        <Image src={f.img} alt={f.alt} fill sizes="120px" className="object-cover" />
                        <span className="absolute bottom-1 right-1 scale-75"><ColorIcon name={f.icon} i={i} size="sm" /></span>
                      </div>
                      <figcaption className="mt-1.5 flex items-center justify-center gap-1 text-[13px] font-bold text-teal sm:text-sm">
                        <T {...f.label} />
                      </figcaption>
                    </figure>
                    {i < FLOW.length - 1 && (
                      <span aria-hidden className="mb-6 flex w-8 shrink-0 items-center sm:w-auto sm:min-w-[22px] sm:flex-1">
                        <span className="h-[4px] flex-1 animate-march rounded-full bg-[repeating-linear-gradient(90deg,#FF7A1A_0_9px,transparent_9px_14px)] bg-[length:28px_4px] shadow-[0_0_8px_rgba(255,122,26,0.7)]" />
                        <Icon name="ArrowRight" size={18} strokeWidth={3} className="-ml-1 shrink-0 animate-nudge text-sun" />
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Chapter>

        {/* 02 */}
        <Chapter id="how-it-works" tone="teal">
          <ChapterHead light n="02" title={{ en: "How it works", te: "ఇది ఎలా పని చేస్తుంది" }} sub={{ en: "What happens at your home through a full day.", te: "రోజంతా మీ ఇంట్లో ఏం జరుగుతుంది." }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal><PhotoCard light photos={photos} slot="day-roof" title={{ en: "Day", te: "పగలు" }} text={{ en: "Your home uses solar first. Extra units go to the grid as credit.", te: "ఇల్లు ముందు సోలార్ వాడుతుంది. అదనపు యూనిట్లు గ్రిడ్‌కు జమగా." }} /></Reveal>
            <Reveal delay={100}><PhotoCard light photos={photos} slot="evening-home" title={{ en: "Night", te: "రాత్రి" }} text={{ en: "Your home takes grid power. Daytime credit cuts this bill.", te: "ఇల్లు గ్రిడ్ కరెంట్ తీసుకుంటుంది. పగటి జమ ఈ బిల్ తగ్గిస్తుంది." }} /></Reveal>
            <Reveal delay={200}><PhotoCard light photos={photos} slot="battery" title={{ en: "Power cut", te: "కరెంట్ కోత" }} text={{ en: "On-grid shuts off for safety. A hybrid battery keeps essentials on.", te: "ఆన్-గ్రిడ్ భద్రత కోసం ఆగుతుంది. హైబ్రిడ్ బ్యాటరీ ముఖ్యమైనవి నడుపుతుంది." }} /></Reveal>
          </div>
        </Chapter>

        {/* 03 */}
        <Chapter id="three-types" tone="white">
          <ChapterHead n="03" title={{ en: "Three types of solar", te: "మూడు రకాల సోలార్" }} sub={{ en: "Most Hyderabad homes and shops choose on-grid. Choose hybrid if you face frequent power cuts.", te: "చాలా హైదరాబాద్ ఇళ్లు, షాపులు ఆన్-గ్రిడ్ ఎంచుకుంటాయి. తరచూ కోతలు ఉంటే హైబ్రిడ్." }} />
          <Reveal>
            <div className="overflow-x-auto rounded-2xl bg-white shadow-soft ring-1 ring-ink/5">
              <table className="w-full min-w-[640px] table-fixed text-left text-[16px]">
                <thead>
                  <tr>
                    <th scope="col" className="w-[22%] p-3" />
                    {([["on-grid", { en: "On-grid", te: "ఆన్-గ్రిడ్" }], ["hybrid", { en: "Hybrid", te: "హైబ్రిడ్" }], ["off-grid-pump", { en: "Off-grid", te: "ఆఫ్-గ్రిడ్" }]] as [GuideSlot, L][]).map(([slot, label]) => (
                      <th key={slot} scope="col" className="p-3 align-bottom">
                        <GuidePhoto slot={slot} src={photos[slot]} className="aspect-[4/3] rounded-xl" sizes="220px" />
                        <span className="mt-3 block font-display text-xl font-bold text-teal"><T {...label} /></span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      [{ en: "Cost", te: "ఖర్చు" }, { en: "Lowest", te: "తక్కువ" }, { en: "Medium–high", te: "మధ్యస్థం–ఎక్కువ" }, { en: "Highest", te: "ఎక్కువ" }],
                      [{ en: "Battery", te: "బ్యాటరీ" }, { en: "No", te: "లేదు" }, { en: "Yes", te: "ఉంది" }, { en: "Yes (larger)", te: "ఉంది (పెద్దది)" }],
                      [{ en: "Power-cut backup", te: "కోత బ్యాకప్" }, { en: "No", te: "లేదు" }, { en: "Yes, essentials", te: "అవును, ముఖ్యమైనవి" }, { en: "Yes", te: "అవును" }],
                      [{ en: "Net meter credit", te: "నెట్ మీటర్ జమ" }, { en: "Yes", te: "అవును" }, { en: "Yes", te: "అవును" }, { en: "No", te: "లేదు" }],
                      [{ en: "Best for", te: "ఎవరికి" }, { en: "City homes & shops", te: "సిటీ ఇళ్లు & షాపులు" }, { en: "Areas with frequent cuts", te: "తరచూ కోతలు ఉన్న చోట" }, { en: "Farms, no grid line", te: "పొలాలు, గ్రిడ్ లేని చోట" }],
                      [{ en: "Maintenance", te: "మెయింటెనెన్స్" }, { en: "Low: rinse panels", te: "తక్కువ: ప్యానెల్స్ కడగడం" }, { en: "Low + battery care", te: "తక్కువ + బ్యాటరీ జాగ్రత్త" }, { en: "Battery care & replacement", te: "బ్యాటరీ జాగ్రత్త & మార్పు" }],
                    ] as L[][]
                  ).map((row, i) => (
                    <tr key={i} className="border-t border-ink/5">
                      {row.map((c, j) => (
                        <td key={j} className={cx("p-3", j === 0 ? "font-semibold text-ink/60" : i === 0 && j === 1 ? "font-bold text-leaf-deep" : "")}>
                          <T {...c} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Chapter>

        {/* 04 */}
        <Chapter id="what-can-it-run" tone="cream">
          <ChapterHead n="04" title={{ en: "What can solar run?", te: "సోలార్‌తో ఏం నడుస్తుంది?" }} sub={{ en: "Everything in a normal home. Typical power each appliance draws:", te: "సాధారణ ఇంట్లో అన్నీ. ఒక్కో ఉపకరణం వాడే సాధారణ కరెంట్:" }} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {LOADS.map((l, i) => (
              <Reveal key={i} delay={(i % 4) * 60}>
                <div className="h-full rounded-2xl bg-white p-4 shadow-soft">
                  <ColorIcon name={l.icon} i={i} />
                  <p className="mt-3 font-semibold leading-snug"><T {...l.name} /></p>
                  <p className="mt-0.5 font-display text-lg font-extrabold text-teal">{l.w}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-3 text-sm text-ink/55"><T en="Typical ratings; your model may differ." te="సాధారణ రేటింగ్‌లు; మీ మోడల్ వేరుగా ఉండొచ్చు." /> <Approx /></p>

          <h3 className="mt-10 font-display text-2xl font-bold"><T en="Quick size guide" te="త్వరిత సైజ్ గైడ్" /></h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { u: { en: "0–150 units / month", te: "నెలకు 0–150 యూనిట్లు" }, s: "1–2 kW" },
              { u: { en: "150–300 units / month", te: "నెలకు 150–300 యూనిట్లు" }, s: "2–3 kW" },
              { u: { en: "Above 300 units / month", te: "నెలకు 300 పైన" }, s: "3 kW +" },
            ].map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={cx("rounded-2xl p-5 shadow-soft", i === 1 ? "bg-teal text-white" : "bg-white")}>
                  <p className={i === 1 ? "text-white/80" : "text-ink/60"}><T {...r.u} /></p>
                  <p className="font-display text-3xl font-extrabold">{r.s}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-3 text-[15px] text-ink/65"><T en="Final size depends on your roof, bill and sanctioned load." te="తుది సైజ్ మీ పైకప్పు, బిల్, శాంక్షన్డ్ లోడ్‌పై ఆధారపడుతుంది." /></p>
        </Chapter>

        {/* 05 */}
        <Chapter id="solar-in-hyderabad" tone="teal">
          <ChapterHead light n="05" title={{ en: "Solar in Hyderabad", te: "హైదరాబాద్‌లో సోలార్" }} sub={{ en: "Why our city is a good place for rooftop solar.", te: "రూఫ్‌టాప్ సోలార్‌కు మన నగరం ఎందుకు మంచిది." }} />
          <Reveal>
            <GuidePhoto slot="skyline" src={photos.skyline} className="mb-6 aspect-[21/9] rounded-2xl" sizes="(min-width: 1024px) 760px, 100vw" />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {[
              // [VERIFY] all figures in this block
              { icon: "Zap" as IconName, k: { en: "Units from 1 kW / month", te: "1 kW నుంచి నెలకు యూనిట్లు" }, v: <>100–<CountUp value={140} /></> },
              { icon: "Ruler" as IconName, k: { en: "Roof per kW", te: "kW కి పైకప్పు" }, v: <>~<CountUp value={100} /> sq ft</> },
              { icon: "ShieldCheck" as IconName, k: { en: "Panel life", te: "ప్యానెల్ జీవితం" }, v: <><CountUp value={25} />+ <T en="years" te="ఏళ్లు" /></> },
              { icon: "Sun" as IconName, k: { en: "Daily sunshine", te: "రోజువారీ ఎండ" }, v: <>5–<CountUp value={5.5} format={(n) => n.toFixed(1)} /> <span className="text-base">kWh/m²</span></> },
              { icon: "BadgeCheck" as IconName, k: { en: "Home subsidy up to", te: "ఇంటి సబ్సిడీ" }, v: <>₹<CountUp value={78000} /></>, href: "/schemes/pm-surya-ghar" },
              { icon: "Gauge" as IconName, k: { en: "Net metering by", te: "నెట్ మీటరింగ్" }, v: <>TGSPDCL</>, href: "/schemes/net-metering" },
            ].map((s, i) => (
              <Reveal key={i} delay={(i % 3) * 80}>
                <div className="h-full rounded-2xl bg-white/10 p-5">
                  <ColorIcon name={s.icon} i={i} size="sm" />
                  <p className="mt-3 text-sm font-semibold text-white/75"><T {...s.k} /></p>
                  <p className="mt-1 font-display text-3xl font-extrabold">{s.v}</p>
                  {s.href && (
                    <Link href={s.href} className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-sun-soft hover:underline">
                      <T en="How it works" te="ఎలా పని చేస్తుంది" /> <Icon name="ArrowRight" size={14} />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-3 text-sm text-white/65"><T en="All figures approximate. Rules and amounts can change." te="అన్ని అంకెలు సుమారు. నియమాలు, మొత్తాలు మారవచ్చు." /></p>
          <Link href="/subsidy-loans" className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-sun px-5 font-bold text-ink">
            <T en="Check my subsidy" te="నా సబ్సిడీ చూడండి" /> <Icon name="ArrowRight" size={18} />
          </Link>
          <Reveal className="mt-8"><SunChart /></Reveal>
        </Chapter>

        {/* 06 */}
        <Chapter id="before-you-buy" tone="cream">
          <ChapterHead n="06" title={{ en: "Before you buy: 7 checks", te: "కొనే ముందు: 7 చెక్‌లు" }} />
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
            <ol className="grid gap-3">
              {CHECKLIST.map((c, i) => (
                <Reveal key={i} delay={i * 40}>
                  <li className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-soft">
                    <ColorIcon name={c.icon} i={i + 2} size="sm" />
                    <span>
                      <span className="block font-bold"><span className="mr-1 font-display text-sun-deep">{i + 1}.</span> <T {...c.title} /></span>
                      <span className="block text-[15px] text-ink/65"><T {...c.text} /></span>
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal>
              <figure>
                <GuidePhoto slot="technician-cleaning" src={photos["technician-cleaning"]} className="aspect-[8/7] rounded-2xl shadow-soft ring-4 ring-white" sizes="(min-width: 1024px) 320px, 100vw" />
                <figcaption className="mt-2 text-sm text-ink/55"><T en="Simple upkeep: rinse panels every 2–3 weeks." te="సులభమైన జాగ్రత్త: 2–3 వారాలకు ఒకసారి ప్యానెల్స్ కడగండి." /></figcaption>
              </figure>
            </Reveal>
          </div>
          <p className="mt-10 border-t border-ink/10 pt-5 text-sm text-ink/55">
            <T en="Data sources: MNRE (mnre.gov.in), PM Surya Ghar portal (pmsuryaghar.gov.in), TGSPDCL (tgsouthernpower.org), PIB releases, NASA POWER (sunshine data). Figures are approximate and can change." te="డేటా మూలాలు: MNRE, పీఎం సూర్య ఘర్ పోర్టల్, TGSPDCL, PIB, NASA POWER. అంకెలు సుమారు, మారవచ్చు." />
          </p>
        </Chapter>

      </div>

      <CTABand title={{ en: "Not sure what suits you?", te: "మీకు ఏది సరిపోతుందో తెలియదా?" }} sub={{ en: "Answer 5 quick questions, or ask us on WhatsApp.", te: "5 చిన్న ప్రశ్నలకు జవాబివ్వండి, లేదా వాట్సాప్‌లో అడగండి." }} />
    </>
  );
}
