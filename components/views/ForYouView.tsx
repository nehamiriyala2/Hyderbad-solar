"use client";

import Image from "next/image";
import { ColorIcon, GRADS } from "../ColorIcon";
import type { IconName } from "../Icon";
import type { L } from "@/lib/i18n";

import Link from "next/link";
import { T, useLang } from "@/lib/i18n";
import { computePlan, inr, lakhs } from "@/lib/solar";
import { SCHEME_NAMES } from "@/lib/match";
import { SEGMENTS, getSegment } from "@/content/forYou";
import { Icon } from "../Icon";
import { Band, Btn, CTABand, Card, DataTable, FAQ, Flag, Heading, IconBubble, IdeaCard, PageHero, Points, Steps, VerifyNote, WhatsAppBtn } from "../ui";

export function ForYouView({ slug }: { slug: string }) {
  const s = getSegment(slug)!;
  const { t } = useLang();
  const ex = computePlan({ bill: s.calc.example, place: s.calc.place, use: s.calc.use, powerCuts: s.calc.powerCuts, roof: s.calc.use === "apartment" ? "shared" : "own" });

  return (
    <>
      <PageHero icon={s.icon} kicker={{ en: "For you", te: "మీ కోసం" }} title={s.title} sub={s.sub}>
        <div className="flex flex-wrap gap-3">
          <Btn href="/find-my-plan" icon="Sparkles"><T en="Find My Solar Plan" te="నా సోలార్ ప్లాన్ చూడండి" /></Btn>
          <WhatsAppBtn variant="light" text={s.wa} />
        </div>
      </PageHero>

      <Band tone="cream">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="h-full">
            <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold"><Icon name="CircleHelp" className="text-sun-deep" /> <T en="Is this you?" te="ఇది మీరేనా?" /></h2>
            <div className="mt-4"><Points items={s.isThisYou} /></div>
          </Card>
          <Card tone="teal" className="h-full">
            <p className="text-white/75"><T en="Recommended system" te="సూచించిన సిస్టమ్" /></p>
            <h2 className="font-display text-3xl font-extrabold"><T {...s.system.name} /></h2>
            <p className="mt-1 text-lg font-bold text-sun-soft"><T {...s.system.size} /></p>
            <div className="mt-4"><Points light items={s.system.why} /></div>
          </Card>
        </div>
      </Band>

      <Band tone="pearl">
        <Heading title={{ en: "Your bill → system size", te: "మీ బిల్ → సిస్టమ్ సైజ్" }} />
        <DataTable
          head={[{ en: "Monthly bill", te: "నెల బిల్" }, { en: "Size", te: "సైజ్" }, { en: "Roof area", te: "పైకప్పు" }, { en: "Saving / month", te: "నెల ఆదా" }]}
          rows={s.calc.bills.map((b) => {
            const p = computePlan({ bill: b, place: s.calc.place, use: s.calc.use, powerCuts: s.calc.powerCuts });
            return [inr(b), `${p.kw} kW`, `~${p.roofSqft} sq ft`, `~${inr(p.monthlySaving)}`];
          })}
          caption={{ en: "Estimates. 1 kW ≈ 120 units/month in Hyderabad.", te: "అంచనాలు. హైదరాబాద్‌లో 1 kW ≈ నెలకు 120 యూనిట్లు." }}
        />
        <VerifyNote />
      </Band>

      {s.extra && (
        <Band tone="teal">
          <Heading light title={s.extra.title} />
          <Steps light items={s.extra.steps} />
        </Band>
      )}

      <Band tone="cream">
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <Heading title={{ en: "Schemes that apply", te: "వర్తించే స్కీములు" }} />
            <div className="grid gap-3">
              {s.schemes.map((sl) => (
                <Link key={sl} href={`/schemes/${sl}`} className="flex items-center justify-between gap-3 rounded-3xl bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
                  <span className="flex items-center gap-3 font-bold text-teal"><IconBubble name="BadgeCheck" tone="leaf" /> <T {...SCHEME_NAMES[sl]} /></span>
                  <Icon name="ArrowRight" className="text-sun-deep" />
                </Link>
              ))}
            </div>
            <VerifyNote />
          </div>
          <div>
            <Heading title={{ en: "Example savings", te: "ఆదా ఉదాహరణ" }} />
            <Card tone="leaf">
              <p className="text-lg"><T en={`A bill of ${inr(s.calc.example)} a month →`} te={`నెలకు ${inr(s.calc.example)} బిల్ →`} /></p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                  { k: { en: "System", te: "సిస్టమ్" }, v: `${ex.kw} kW ${ex.type}` },
                  { k: { en: "Saving / month", te: "నెల ఆదా" }, v: `~${inr(ex.monthlySaving)}` },
                  { k: { en: "Cost after subsidy", te: "సబ్సిడీ తర్వాత" }, v: lakhs(ex.netCost), f: true },
                  { k: { en: "Payback", te: "పెట్టుబడి తిరిగి" }, v: `~${ex.paybackYears} ${t({ en: "yrs", te: "ఏళ్లు" })}` },
                ].map((r) => (
                  <div key={r.k.en} className="rounded-2xl bg-white p-3">
                    <p className="text-sm text-ink/60"><T {...r.k} /></p>
                    <p className="font-display text-xl font-extrabold">{r.v}{r.f && <Flag />}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-ink/60"><T en="Example only, not a quote." te="ఉదాహరణ మాత్రమే, కొటేషన్ కాదు." /></p>
            </Card>
          </div>
        </div>
      </Band>

      <Band tone="pearl">
        <Heading title={{ en: "Questions", te: "ప్రశ్నలు" }} />
        <FAQ items={s.faq} />
      </Band>

      <CTABand waText={s.wa} />
    </>
  );
}

// Card photos (reused from the site library until dedicated ones are added to /public/for/)
const FOR_CARD_IMG: Record<string, { src: string; alt: string }> = {
  "city-home": { src: "/home/independent-house.webp", alt: "Independent house with solar panels on the terrace" },
  apartment: { src: "/guide/hero.webp", alt: "Multi-storey home with a raised rooftop solar structure" },
  outskirts: { src: "/guide/off-grid-pump.webp", alt: "Solar panels running a water pump on a farm" },
  "nri-landlord": { src: "/guide/evening-home.webp", alt: "Family looking at the solar panels on their home" },
  institution: { src: "/guide/technician-cleaning.webp", alt: "Technician servicing a large rooftop solar array" },
  shops: { src: "/home/scheme-business.webp", alt: "Shop with solar panels on its roof" },
};

function ForCard({ href, img, icon, title, text, i }: { href: string; img: { src: string; alt: string }; icon: IconName; title: L; text: L; i: number }) {
  return (
    <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        <div aria-hidden className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${GRADS[i % GRADS.length]}`} />
      </div>
      <div className="relative flex flex-1 flex-col px-6 pb-6 pt-6">
        <h3 className="font-display text-xl font-bold leading-snug"><T {...title} /></h3>
        <p className="mt-1.5 text-ink/70"><T {...text} /></p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 font-bold text-sun-deep">
          <T en="See my plan" te="నా ప్లాన్ చూడండి" /> <Icon name="ArrowRight" size={18} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ForHubView({ heroImage }: { heroImage?: string | null }) {
  return (
    <>
      {/* HERO — blueprint: teal left, house photo blended in on the right */}
      <section className="relative isolate overflow-hidden bg-teal text-white">
        <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-[68%]">
          <Image src={heroImage || "/for/hero-house.webp"} alt="Home with solar panels on its roof at sunrise" fill priority sizes="(min-width: 768px) 68vw, 100vw" className="object-cover object-right" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-teal via-teal/60 to-transparent md:via-teal/10" />
          <div aria-hidden className="absolute inset-0 bg-teal/55 md:hidden" />
        </div>
        <div className="mx-auto flex min-h-[380px] max-w-[1400px] items-center px-4 py-14 sm:px-6 lg:min-h-[440px] lg:px-8">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-sun-soft backdrop-blur">
              <T en="Pick your place" te="మీ స్థలం ఎంచుకోండి" />
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"><T en="Solar for you" te="మీ కోసం సోలార్" /></h1>
            <p className="mt-4 text-lg text-white/85 sm:text-xl"><T en="Every place is different. Find the page that matches yours." te="ప్రతి స్థలం వేరు. మీకు సరిపోయే పేజీ చూడండి." /></p>
          </div>
        </div>
      </section>
      <Band tone="cream">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SEGMENTS.map((s, i) => (
            <ForCard key={s.slug} i={i} href={`/for/${s.slug}`} img={FOR_CARD_IMG[s.slug]} icon={s.icon} title={s.title} text={s.sub} />
          ))}
          <ForCard i={SEGMENTS.length} href="/shops" img={FOR_CARD_IMG.shops} icon="Store" title={{ en: "Shops & small business", te: "షాపులు & చిన్న వ్యాపారాలు" }} text={{ en: "Your shop runs in the day. Solar runs in the day.", te: "మీ షాప్ పగలు నడుస్తుంది. సోలార్ పగలు నడుస్తుంది." }} />
        </div>
      </Band>
      <CTABand />
    </>
  );
}
