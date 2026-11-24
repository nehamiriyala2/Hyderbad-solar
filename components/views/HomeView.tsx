"use client";

import { T } from "@/lib/i18n";
import { AREAS } from "@/lib/site";
import { HOME_FAQ } from "@/content/faq";
import Image from "next/image";
import Link from "next/link";
import { HeroPlanCard } from "../HeroPlanCard";
import { FlowStrip } from "../FlowStrip";
import { Icon, type IconName } from "../Icon";
import { Band, Btn, CTABand, Card, Chips, FAQ, Heading, IconBubble, IdeaCard, Steps, VerifyNote, cx } from "../ui";
import type { L } from "@/lib/i18n";

const WHO: { icon: IconName; title: L; text: L; href: string; big?: boolean; tone?: "teal" | "white" | "cream" | "leaf"; image?: string }[] = [
  { icon: "House", title: { en: "Independent house", te: "ఇండిపెండెంట్ ఇల్లు" }, text: { en: "Your terrace makes your power. Subsidy for homes.", te: "మీ టెర్రస్ మీ కరెంట్ తయారు చేస్తుంది. ఇళ్లకు సబ్సిడీ." }, href: "/for/city-home", big: true, tone: "teal", image: "/home/independent-house.webp" },
  { icon: "Building2", title: { en: "Apartment / gated community", te: "అపార్ట్‌మెంట్ / గేటెడ్ కమ్యూనిటీ" }, text: { en: "Cut common-area bills: lifts, lights, pumps.", te: "కామన్ ఏరియా బిల్లు తగ్గించండి: లిఫ్ట్, లైట్లు, పంపులు." }, href: "/for/apartment" },
  { icon: "Store", title: { en: "Shop & small business", te: "షాప్ & చిన్న వ్యాపారం" }, text: { en: "Open in the day = perfect for solar.", te: "పగలు తెరిచి ఉంటే = సోలార్‌కు సరైనది." }, href: "/shops", tone: "leaf" },
  { icon: "Stethoscope", title: { en: "Clinic / school / institution", te: "క్లినిక్ / స్కూల్ / సంస్థ" }, text: { en: "Daytime load, big roofs, steady savings.", te: "పగటి వాడకం, పెద్ద పైకప్పులు, స్థిరమైన ఆదా." }, href: "/for/institution" },
  { icon: "Tractor", title: { en: "Outskirts farmhouse / plot", te: "శివారు ఫామ్‌హౌస్ / ప్లాట్" }, text: { en: "Power cuts? Hybrid backup and solar pumps.", te: "కరెంట్ కోతలా? హైబ్రిడ్ బ్యాకప్, సోలార్ పంపులు." }, href: "/for/outskirts", tone: "cream" },
  { icon: "Plane", title: { en: "NRI / landlord", te: "NRI / ఇంటి యజమాని" }, text: { en: "We install while you're away. Photo updates.", te: "మీరు దూరంగా ఉన్నా మేము పెడతాం. ఫోటో అప్‌డేట్స్." }, href: "/for/nri-landlord" },
];

const BENEFITS: { icon: IconName; title: L; text: L; image: string }[] = [
  { icon: "IndianRupee", title: { en: "Lower bill", te: "తక్కువ బిల్" }, text: { en: "Make units on your roof. Buy fewer.", te: "పైకప్పుపై యూనిట్లు తయారు చేయండి. తక్కువ కొనండి." }, image: "/home/benefit-lower-bill.webp" },
  { icon: "BatteryCharging", title: { en: "Power cut backup", te: "కరెంట్ కోత బ్యాకప్" }, text: { en: "With a hybrid system and battery.", te: "హైబ్రిడ్ సిస్టమ్, బ్యాటరీతో." }, image: "/home/benefit-backup.webp" },
  { icon: "ShieldCheck", title: { en: "25-year panel life", te: "25 ఏళ్ల ప్యానెల్ జీవితం" }, text: { en: "Good panels come with long warranty.", te: "మంచి ప్యానెల్స్‌కు దీర్ఘ వారంటీ ఉంటుంది." }, image: "/home/benefit-panel-life.webp" },
  { icon: "BadgeCheck", title: { en: "Subsidy support", te: "సబ్సిడీ సహాయం" }, text: { en: "Homes can get central subsidy.", te: "ఇళ్లకు కేంద్ర సబ్సిడీ రావచ్చు." }, image: "/home/benefit-subsidy.webp" },
  { icon: "TrendingUp", title: { en: "Adds property value", te: "ఆస్తి విలువ పెరుగుతుంది" }, text: { en: "Lower bills make a home more attractive.", te: "తక్కువ బిల్లులు ఇంటిని ఆకర్షణీయం చేస్తాయి." }, image: "/home/benefit-property.webp" },
  { icon: "Leaf", title: { en: "Clean air", te: "శుభ్రమైన గాలి" }, text: { en: "Less coal power for our city.", te: "మన నగరానికి తక్కువ బొగ్గు కరెంట్." }, image: "/home/benefit-clean-air.webp" },
];

const SCHEMES: { icon: IconName; title: L; text: L; href: string; image: string; alt: string }[] = [
  { icon: "BadgeCheck", title: { en: "PM Surya Ghar", te: "పీఎం సూర్య ఘర్" }, text: { en: "Home rooftop subsidy, up to ₹78,000.", te: "ఇంటి సోలార్ సబ్సిడీ, ₹78,000 వరకు." }, href: "/schemes/pm-surya-ghar", image: "/home/scheme-pm-surya-ghar.webp", alt: "Solar panels on a tiled home roof in the sun" },
  { icon: "Gauge", title: { en: "Net metering", te: "నెట్ మీటరింగ్" }, text: { en: "Extra units reduce your TGSPDCL bill.", te: "అదనపు యూనిట్లు మీ TGSPDCL బిల్ తగ్గిస్తాయి." }, href: "/schemes/net-metering", image: "/home/scheme-net-metering.webp", alt: "Bi-directional net meter on a wall" },
  { icon: "Droplets", title: { en: "PM-KUSUM", te: "పీఎం-కుసుమ్" }, text: { en: "Solar pumps for farms on the outskirts.", te: "శివారు పొలాలకు సోలార్ పంపులు." }, href: "/schemes/pm-kusum", image: "/home/scheme-pm-kusum.webp", alt: "Solar panels running a water pump in a green field" },
  { icon: "HandCoins", title: { en: "Business benefits", te: "వ్యాపార లాభాలు" }, text: { en: "Tax benefits and loans for shops.", te: "షాపులకు పన్ను లాభాలు, లోన్లు." }, href: "/schemes/commercial-benefits", image: "/home/scheme-business.webp", alt: "Shop with solar panels on its roof" },
];

export function HomeView() {
  return (
    <>
      {/* a. HERO — blueprint: full-bleed rooftop + Charminar photo, header floats over it */}
      <section className="relative isolate -mt-16 overflow-hidden">
        <Image
          src="/home/hero.webp"
          alt="Solar panels on a Hyderabad rooftop at sunset, with Charminar and the city skyline behind"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[38%_bottom]"
        />
        {/* soft wash so text stays readable on any crop */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-white/45 via-white/5 to-transparent lg:from-white/25" />
        <div className="mx-auto grid max-w-[1400px] items-start gap-8 px-4 pb-16 pt-28 sm:px-6 lg:min-h-[max(780px,100svh)] lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:px-8 lg:pb-20 lg:pt-32">
          <div className="lg:pt-6">
            <h1 className="font-display text-[2.7rem] font-extrabold leading-[1.05] tracking-tight text-[#0E2A38] sm:text-6xl lg:whitespace-nowrap lg:text-[4.1rem] xl:text-[4.5rem]">
              <T en="Let the Sun Power" te="మీ హైదరాబాద్ ఇంటికి" />
              <br />
              <T en="Your Hyderabad" te="సూర్యుడే కరెంట్" />
            </h1>
            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
              <Link href="/find-my-plan" className="inline-flex min-h-[60px] items-center gap-2.5 rounded-full bg-gradient-to-r from-[#FFB020] to-[#FF8A1A] px-7 text-lg font-bold text-ink shadow-glow transition hover:brightness-105 active:scale-[0.98]">
                <Icon name="Sparkles" size={22} /> <T en="Find My Solar Plan" te="నా సోలార్ ప్లాన్ చూడండి" />
              </Link>
              <Link href="/subsidy-loans" className="inline-flex min-h-[60px] items-center gap-2.5 rounded-full bg-white px-7 text-lg font-bold text-teal shadow-soft transition hover:bg-cream active:scale-[0.98]">
                <Icon name="BadgeCheck" size={22} /> <T en="Check My Subsidy" te="నా సబ్సిడీ చూడండి" />
              </Link>
            </div>
          </div>
          <div className="lg:max-w-[600px] lg:justify-self-end">
            <HeroPlanCard />
          </div>
        </div>
      </section>

      {/* b. START HERE */}
      <Band tone="cream" id="start-here">
        <Heading hideAlt kicker={{ en: "Zero knowledge needed", te: "ముందు తెలిసి ఉండక్కర్లేదు" }} title={{ en: "Never heard of solar? Start here", te: "సోలార్ గురించి తెలియదా? ఇక్కడ మొదలుపెట్టండి" }} />
        <div className="grid gap-5 md:grid-cols-3">
          <IdeaCard image={{ src: "/home/what-is-solar.webp", alt: "Solar panels on a tiled roof in bright sunshine" }} icon="Sun" title={{ en: "What is solar?", te: "సోలార్ అంటే ఏమిటి?" }} text={{ en: "Panels on your roof turn sunlight into electricity.", te: "మీ పైకప్పుపై ప్యానెల్స్ ఎండను కరెంట్‌గా మారుస్తాయి." }} href="/solar-guide" />
          <IdeaCard image={{ src: "/home/cut-my-bill.webp", alt: "Electricity bill showing a lower amount after solar, with a solar home behind" }} icon="IndianRupee" iconTone="leaf" title={{ en: "How does it cut my bill?", te: "నా బిల్ ఎలా తగ్గుతుంది?" }} text={{ en: "You use your own units first. Extra units are credited.", te: "ముందు మీ యూనిట్లు వాడతారు. అదనపువి జమ అవుతాయి." }} href="/solar-guide#how-it-works" />
          <IdeaCard image={{ src: "/home/right-for-me.webp", alt: "Couple looking at the solar panels on their home, with a checklist: sunny roof, bill above ₹1,500, roof space, lower cost" }} icon="CircleHelp" iconTone="teal" title={{ en: "Is it right for me?", te: "నాకు సరిపోతుందా?" }} text={{ en: "Sunny roof + bill above ₹1,500? Usually yes.", te: "ఎండ పడే పైకప్పు + ₹1,500 పైన బిల్? సాధారణంగా అవును." }} href="/solar-guide#before-you-buy" />
        </div>
      </Band>

      {/* c. WHO USES SOLAR — bento */}
      <Band tone="pearl">
        <Heading title={{ en: "Who uses solar in Hyderabad", te: "హైదరాబాద్‌లో సోలార్ ఎవరు వాడుతున్నారు" }} sub={{ en: "Pick yours. See the plan that fits.", te: "మీది ఎంచుకోండి. సరిపోయే ప్లాన్ చూడండి." }} />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHO.map((w) => (
            <Card key={w.href} href={w.href} tone={w.tone ?? "white"} className={cx("group flex flex-col", w.big && "sm:col-span-2 sm:row-span-2 lg:p-8", w.image && "overflow-hidden !p-0")}>
              {w.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-auto sm:min-h-[220px] sm:flex-1">
                  <Image src={w.image} alt="Modern home with solar panels on the roof" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className={cx(w.image && "flex flex-col p-6 lg:p-8")}>
              <IconBubble name={w.icon} tone={w.tone === "teal" ? "white" : "sun"} size={w.big ? "lg" : "md"} />
              <h3 className={cx("mt-4 font-display font-bold leading-snug", w.big ? "text-3xl" : "text-xl")}><T {...w.title} /></h3>
              <p className={cx("mt-1.5", w.tone === "teal" ? "text-white/85 text-lg" : "text-ink/70")}><T {...w.text} /></p>
              <span className={cx("mt-auto inline-flex items-center gap-1 pt-4 font-bold", w.tone === "teal" ? "text-sun-soft" : "text-sun-deep")}>
                <T en="See plan" te="ప్లాన్ చూడండి" /> <Icon name="ArrowRight" size={18} />
              </span>
              </div>
            </Card>
          ))}
        </div>
      </Band>

      {/* d. SOLAR IN 60 SECONDS */}
      <Band tone="teal">
        <Heading light title={{ en: "Solar in 60 seconds", te: "60 సెకన్లలో సోలార్" }} sub={{ en: "From the sun to your bill, in 6 simple steps.", te: "సూర్యుడి నుంచి మీ బిల్ వరకు, 6 సులభమైన స్టెప్స్." }} />
        <FlowStrip />
      </Band>

      {/* e. REAL BENEFITS */}
      <Band tone="cream">
        <Heading title={{ en: "Real benefits", te: "నిజమైన లాభాలు" }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Card key={i} tone={i % 3 === 1 ? "leaf" : "white"} className="flex h-full items-center gap-4 !p-4 sm:gap-5 sm:!p-5">
              <div className="relative h-24 w-28 shrink-0 sm:h-28 sm:w-32">
                <Image src={b.image} alt="" fill sizes="128px" className="object-contain mix-blend-multiply" />
              </div>
              <div className="self-stretch border-l border-sun/40" aria-hidden />
              <div>
                <h3 className="font-display text-lg font-bold leading-snug sm:text-xl"><T {...b.title} /></h3>
                <p className="mt-1 text-[15px] text-ink/70 sm:text-base"><T {...b.text} /></p>
              </div>
            </Card>
          ))}
        </div>
      </Band>

      {/* f. SCHEMES */}
      <Band tone="pearl">
        <Heading title={{ en: "Schemes that help you", te: "మీకు సాయపడే స్కీములు" }} sub={{ en: "Each scheme explained in simple words.", te: "ప్రతి స్కీమ్ సులభమైన మాటల్లో." }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SCHEMES.map((s) => (
            <Card key={s.href} href={s.href} className="group flex h-full flex-col overflow-hidden !p-0">
              <div className="relative aspect-[2/1] overflow-hidden">
                <Image src={s.image} alt={s.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="relative flex flex-1 flex-col px-6 pb-6 pt-10">
                <span className="absolute -top-8 left-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-teal shadow-soft">
                  <Icon name={s.icon} size={26} />
                </span>
                <h3 className="font-display text-xl font-bold leading-snug"><T {...s.title} /></h3>
                <p className="mt-1.5 text-ink/70"><T {...s.text} /></p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 font-bold text-sun-deep">
                  <T en="Learn more" te="ఇంకా తెలుసుకోండి" /> <Icon name="ArrowRight" size={18} />
                </span>
              </div>
            </Card>
          ))}
        </div>
        <VerifyNote />
        <div className="mt-6">
          <Btn href="/schemes" variant="teal" icon="Search"><T en="Find my scheme" te="నా స్కీమ్ కనుగొనండి" /></Btn>
        </div>
      </Band>

      {/* g. HOW WE WORK */}
      <Band tone="teal">
        <Heading light title={{ en: "How we work", te: "మేము ఎలా పని చేస్తాం" }} />
        <Steps
          light
          items={[
            { icon: "BookOpen", title: { en: "Learn", te: "తెలుసుకోండి" }, text: { en: "Understand solar and your options.", te: "సోలార్, మీ ఎంపికలు అర్థం చేసుకోండి." } },
            { icon: "ClipboardCheck", title: { en: "Pick system & scheme", te: "సిస్టమ్ & స్కీమ్ ఎంచుకోండి" }, text: { en: "Right size, right subsidy.", te: "సరైన సైజ్, సరైన సబ్సిడీ." } },
            { icon: "FileText", title: { en: "Paperwork", te: "పేపర్ వర్క్" }, text: { en: "We handle portal and DISCOM forms.", te: "పోర్టల్, డిస్కమ్ ఫారాలు మేమే చూస్తాం." } },
            { icon: "Wrench", title: { en: "Install", te: "ఇన్‌స్టాల్" }, text: { en: "Neat, safe fitting on your roof.", te: "మీ పైకప్పుపై చక్కగా, సురక్షితంగా." } },
            { icon: "Gauge", title: { en: "Net meter & savings", te: "నెట్ మీటర్ & ఆదా" }, text: { en: "Meter fixed. Savings start.", te: "మీటర్ పెట్టాక ఆదా మొదలు." } },
          ]}
        />
      </Band>

      {/* i. AREAS */}
      <Band tone="pearl" className="!py-12">
        <Heading title={{ en: "Across Hyderabad", te: "హైదరాబాద్ అంతటా" }} />
        <Chips items={AREAS.slice(0, 16)} />
      </Band>

      {/* j. FAQ */}
      <Band tone="cream">
        <Heading title={{ en: "Questions people ask", te: "ప్రజలు అడిగే ప్రశ్నలు" }} />
        <FAQ items={HOME_FAQ.slice(0, 5)} />
      </Band>

      <CTABand />
    </>
  );
}
