"use client";

import { computePlan, inr } from "@/lib/solar";
import type { L } from "@/lib/i18n";

import { T } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { HOME_PACKAGES, SHOP_PACKAGES } from "@/content/packages";
import { FindMyPlan } from "../FindMyPlan";
import { QuickSavingsCalc } from "../QuickSavingsCalc";
import { EmiCalculator, EmiExamples, SavingsCalculator, SubsidyCalculator } from "../Calculators";
import { ContactForm } from "../Forms";
import { PackageCards } from "../Packages";
import { Icon, type IconName } from "../Icon";
import { Band, CTABand, Card, Heading, IdeaCard, PageHero, Points, Steps, VerifyNote, WhatsAppBtn, cx } from "../ui";

export function FindMyPlanView() {
  return (
    <>
      <section className="bg-teal text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8 sm:py-12">
          <Heading as="h1" light title={{ en: "Find My Solar Plan", te: "నా సోలార్ ప్లాన్" }} sub={{ en: "5 quick questions. One per screen. Your plan in 1 minute.", te: "5 చిన్న ప్రశ్నలు. ఒక్కో స్క్రీన్‌కు ఒకటి. 1 నిమిషంలో మీ ప్లాన్." }} />
        </div>
      </section>
      <Band tone="cream">
        <FindMyPlan />
      </Band>
    </>
  );
}

export function SubsidyLoansView() {
  return (
    <>
      <PageHero icon="BadgeCheck" kicker={{ en: "Money help", te: "డబ్బు సహాయం" }} title={{ en: "Subsidy & loans", te: "సబ్సిడీ & లోన్లు" }} sub={{ en: "See your subsidy, your net cost, and your EMI.", te: "మీ సబ్సిడీ, నికర ఖర్చు, EMI చూడండి." }} />
      <Band tone="cream" id="subsidy">
        <Heading title={{ en: "Subsidy calculator", te: "సబ్సిడీ కాలిక్యులేటర్" }} />
        <SubsidyCalculator />
      </Band>
      <Band tone="pearl" id="emi">
        <Heading title={{ en: "EMI calculator", te: "EMI కాలిక్యులేటర్" }} />
        <EmiCalculator />
        <div className="mt-6">
          <h3 className="mb-3 font-display text-xl font-bold"><T en="Example EMIs" te="EMI ఉదాహరణలు" /></h3>
          <EmiExamples />
        </div>
      </Band>
      <Band tone="cream">
        <Heading title={{ en: "Loan options", te: "లోన్ ఎంపికలు" }} />
        <div className="grid gap-4 md:grid-cols-3">
          <IdeaCard icon="Landmark" title={{ en: "Bank solar loans", te: "బ్యాంక్ సోలార్ లోన్లు" }} text={{ en: "Many banks have rooftop solar loans for homes. [VERIFY]", te: "చాలా బ్యాంకులకు ఇంటి సోలార్ లోన్లు ఉన్నాయి. [VERIFY]" }} />
          <IdeaCard icon="House" title={{ en: "Home-improvement loans", te: "హోమ్ ఇంప్రూవ్‌మెంట్ లోన్లు" }} text={{ en: "Top-up on your home loan can also work. [VERIFY]", te: "మీ హోమ్ లోన్‌పై టాప్-అప్ కూడా పనికొస్తుంది. [VERIFY]" }} />
          <IdeaCard icon="Store" title={{ en: "MSME / business loans", te: "MSME / వ్యాపార లోన్లు" }} text={{ en: "For shops and small businesses. [VERIFY]", te: "షాపులు, చిన్న వ్యాపారాలకు. [VERIFY]" }} />
        </div>
        <Card className="mt-5">
          <h3 className="flex items-center gap-2 font-display text-xl font-bold"><Icon name="FileCheck" className="text-sun-deep" /> <T en="Documents for a loan" te="లోన్‌కు పత్రాలు" /></h3>
          <div className="mt-4">
            <Points
              cols={2}
              icon="FileText"
              items={[
                { en: "Aadhaar + PAN", te: "ఆధార్ + పాన్" },
                { en: "Latest electricity bill", te: "తాజా కరెంట్ బిల్" },
                { en: "Salary slips / ITR (2 years)", te: "జీతం స్లిప్పులు / ITR (2 ఏళ్లు)" },
                { en: "6 months' bank statement", te: "6 నెలల బ్యాంక్ స్టేట్‌మెంట్" },
                { en: "Property proof", te: "ఆస్తి ఆధారం" },
                { en: "Vendor quotation", te: "వెండర్ కొటేషన్" },
              ]}
            />
          </div>
        </Card>
        <VerifyNote />
      </Band>
      <Band tone="teal">
        <Heading light title={{ en: "Paperwork timeline", te: "పేపర్ వర్క్ టైమ్‌లైన్" }} sub={{ en: "We handle each step with you.", te: "ప్రతి స్టెప్ మీతో కలిసి చూస్తాం." }} />
        <Steps
          light
          items={[
            { icon: "FileText", title: { en: "Apply", te: "దరఖాస్తు" }, text: { en: "Portal + DISCOM", te: "పోర్టల్ + డిస్కమ్" } },
            { icon: "Wrench", title: { en: "Install", te: "ఇన్‌స్టాల్" }, text: { en: "1–3 days on roof", te: "పైకప్పుపై 1–3 రోజులు" } },
            { icon: "ClipboardCheck", title: { en: "Inspection", te: "తనిఖీ" }, text: { en: "By TGSPDCL", te: "TGSPDCL ద్వారా" } },
            { icon: "Gauge", title: { en: "Net meter", te: "నెట్ మీటర్" }, text: { en: "Savings start", te: "ఆదా మొదలు" } },
            { icon: "Banknote", title: { en: "Subsidy credit", te: "సబ్సిడీ జమ" }, text: { en: "To your bank [VERIFY]", te: "మీ బ్యాంక్‌కు [VERIFY]" } },
          ]}
        />
      </Band>
      <CTABand title={{ en: "Want us to check your subsidy?", te: "మీ సబ్సిడీ మేము చెక్ చేయాలా?" }} waText="Hi Hyderabad Solar, please check my subsidy and EMI options." />
    </>
  );
}

export function SavingsView() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-dark via-teal to-teal text-white">
        <div aria-hidden className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sun/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:px-8 lg:py-16">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-sun-soft">
              <Icon name="Sun" size={16} /> <T en="Savings calculator" te="ఆదా కాలిక్యులేటర్" />
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"><T en="How much will solar save you?" te="సోలార్‌తో మీకు ఎంత ఆదా?" /></h1>
            <p className="mt-4 max-w-md text-lg text-white/85"><T en="Enter your bill, pick a size and see your savings in seconds." te="మీ బిల్ ఇవ్వండి, సైజ్ ఎంచుకోండి, క్షణాల్లో ఆదా చూడండి." /></p>
          </div>
          <QuickSavingsCalc />
        </div>
      </section>
      <Band tone="cream">
        <SavingsCalculator />
      </Band>
      <CTABand />
    </>
  );
}

export function ProjectsView() {
  // [EDIT] Replace with real installs. Do not publish placeholder data as real projects.
  const gallery = Array.from({ length: 6 }).map((_, i) => ({ area: "[EDIT] Area", size: "[EDIT] kW", before: "₹[EDIT]", after: "₹[EDIT]", i }));
  return (
    <>
      <PageHero icon="LayoutGrid" kicker={{ en: "Packages & projects", te: "ప్యాకేజీలు & ప్రాజెక్టులు" }} title={{ en: "Packages & Hyderabad installs", te: "ప్యాకేజీలు & హైదరాబాద్ ఇన్‌స్టాలేషన్లు" }} sub={{ en: "Pick a package by your bill. See real installs (coming soon).", te: "మీ బిల్ బట్టి ప్యాకేజీ ఎంచుకోండి. నిజమైన ఇన్‌స్టాలేషన్లు (త్వరలో)." }} />
      <Band tone="cream">
        <Heading title={{ en: "Home packages", te: "ఇంటి ప్యాకేజీలు" }} />
        <PackageCards items={HOME_PACKAGES} />
      </Band>
      <Band tone="pearl">
        <Heading title={{ en: "Shop packages", te: "షాప్ ప్యాకేజీలు" }} />
        <PackageCards items={SHOP_PACKAGES} kind="shop" />
        <VerifyNote />
      </Band>
      <Band tone="cream">
        <Heading title={{ en: "Our Hyderabad installs", te: "మా హైదరాబాద్ ఇన్‌స్టాలేషన్లు" }} sub={{ en: "Placeholders. Owner will add real photos and numbers.", te: "ప్లేస్‌హోల్డర్లు. యజమాని నిజమైన ఫోటోలు, అంకెలు చేరుస్తారు." }} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g) => (
            <Card key={g.i} className="overflow-hidden !p-0">
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-teal to-teal-dark text-white/60" role="img" aria-label="Placeholder for installation photo">
                <Icon name="Camera" size={44} />
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-bold"><T en={g.area} te={g.area} /> · {g.size}</p>
                <p className="mt-1 text-ink/70"><T en="Bill before → after:" te="బిల్ ముందు → తర్వాత:" /> <T en={`${g.before} → ${g.after}`} te={`${g.before} → ${g.after}`} /></p>
              </div>
            </Card>
          ))}
        </div>
      </Band>
      <CTABand />
    </>
  );
}

export function AboutView() {
  const promises: { icon: IconName; title: { en: string; te: string }; text: { en: string; te: string } }[] = [
    { icon: "ShieldCheck", title: { en: "Written warranty", te: "రాతపూర్వక వారంటీ" }, text: { en: "Panels, inverter and workmanship in writing. [EDIT terms]", te: "ప్యానెల్స్, ఇన్వర్టర్, పనితనం రాతపూర్వకంగా. [EDIT terms]" } },
    { icon: "Wrench", title: { en: "After-sales service", te: "అమ్మకం తర్వాత సేవ" }, text: { en: "Fixed response time for issues. [EDIT]", te: "సమస్యలకు నిర్ణీత సమయంలో స్పందన. [EDIT]" } },
    { icon: "MessageCircle", title: { en: "Honest advice", te: "నిజాయితీ సలహా" }, text: { en: "If you don't need solar yet, we say so.", te: "మీకు ఇప్పుడు సోలార్ అవసరం లేకపోతే, అదే చెబుతాం." } },
    { icon: "BadgeCheck", title: { en: "Approvals", te: "అనుమతులు" }, text: { en: "Registrations / empanelments. [EDIT]", te: "రిజిస్ట్రేషన్లు / ఎంపానెల్మెంట్లు. [EDIT]" } },
  ];
  return (
    <>
      <PageHero icon="Sunrise" kicker={{ en: "About us", te: "మా గురించి" }} title={{ en: "Make your own power. Pay less for it.", te: "మీ కరెంట్ మీరే తయారు చేసుకోండి. తక్కువ చెల్లించండి." }} sub={{ en: "We are a Hyderabad team helping families and shops go solar the simple way.", te: "కుటుంబాలు, షాపులు సులభంగా సోలార్‌కు మారేలా సాయం చేసే హైదరాబాద్ టీమ్ మేము." }} />
      <Band tone="cream">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="h-full">
            <h2 className="font-display text-2xl font-extrabold"><T en="Our story" te="మా కథ" /></h2>
            <p className="mt-3 text-ink/75"><T en="[EDIT] How Hyderabad Solar started, in 3–4 short lines. Who started it and why." te="[EDIT] హైదరాబాద్ సోలార్ ఎలా మొదలైంది, 3–4 చిన్న లైన్లలో." /></p>
          </Card>
          <Card tone="teal" className="h-full">
            <h2 className="font-display text-2xl font-extrabold"><T en="Why only Hyderabad?" te="హైదరాబాద్ మాత్రమే ఎందుకు?" /></h2>
            <div className="mt-4">
              <Points
                light
                items={[
                  { en: "We know TGSPDCL process and timelines", te: "TGSPDCL ప్రక్రియ, సమయాలు మాకు తెలుసు" },
                  { en: "We know local roofs, tanks and wind", te: "స్థానిక పైకప్పులు, ట్యాంకులు, గాలి మాకు తెలుసు" },
                  { en: "Fast service because we are nearby", te: "దగ్గరలో ఉన్నాం కాబట్టి వేగమైన సేవ" },
                  { en: "We talk in Telugu, English, Hindi", te: "తెలుగు, ఇంగ్లీష్, హిందీలో మాట్లాడతాం" },
                ]}
              />
            </div>
          </Card>
        </div>
      </Band>
      <Band tone="pearl">
        <Heading title={{ en: "Our promise", te: "మా హామీ" }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p, i) => <IdeaCard key={i} icon={p.icon} title={p.title} text={p.text} />)}
        </div>
      </Band>
      <Band tone="cream">
        <Heading title={{ en: "Team", te: "టీమ్" }} />
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pearl text-teal"><Icon name="Users" size={34} /></div>
              <p className="mt-3 font-display text-lg font-bold">[EDIT] Name</p>
              <p className="text-ink/60">[EDIT] Role</p>
            </Card>
          ))}
        </div>
      </Band>
      <CTABand />
    </>
  );
}

// Shows HITEC City until an exact office pin is set in lib/site.ts (mapEmbedUrl). No API key needed.
const MAP_FALLBACK = "https://www.google.com/maps?q=HITEC+City,+Hyderabad,+Telangana&z=14&output=embed";

export function ContactView() {
  return (
    <>
      <PageHero icon="MessageCircle" kicker={{ en: "Contact", te: "సంప్రదించండి" }} title={{ en: "Talk to us on WhatsApp", te: "వాట్సాప్‌లో మాట్లాడండి" }} sub={{ en: "Fastest way: send your bill photo and roof photo on WhatsApp.", te: "వేగమైన మార్గం: మీ బిల్ ఫోటో, పైకప్పు ఫోటో వాట్సాప్‌లో పంపండి." }}>
        <WhatsAppBtn variant="light" text="Hi Hyderabad Solar, I want to know about solar. Sharing my bill photo." />
      </PageHero>
      <Band tone="cream">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2"><ContactForm /></div>
          <div className="grid content-start gap-4">
            {[
              { icon: "Phone" as IconName, k: { en: "Phone", te: "ఫోన్" }, v: SITE.phone, href: SITE.phoneHref },
              { icon: "Mail" as IconName, k: { en: "Email", te: "ఈమెయిల్" }, v: SITE.email, href: `mailto:${SITE.email}` },
              { icon: "MapPin" as IconName, k: { en: "Address", te: "చిరునామా" }, v: SITE.address },
              { icon: "Clock" as IconName, k: { en: "Hours", te: "సమయం" }, v: SITE.hours },
            ].map((c) => (
              <Card key={c.k.en} className="flex items-start gap-4 !p-5">
                <Icon name={c.icon} className="mt-1 shrink-0 text-sun-deep" />
                <div>
                  <p className="text-sm font-semibold text-ink/60"><T {...c.k} />{(c.k.en === "Email" || c.k.en === "Hours") && <span className="ml-1 inline-block rounded-md bg-sky-200 px-1.5 text-[11px] font-extrabold text-sky-900">[EDIT]</span>}</p>
                  {c.href ? <a href={c.href} className="font-bold text-teal">{c.v}</a> : <p className="font-bold">{c.v}</p>}
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-[2rem] bg-white shadow-soft">
          {(SITE.mapEmbedUrl || MAP_FALLBACK) ? (
            <iframe title="Hyderabad Solar location map" src={SITE.mapEmbedUrl || MAP_FALLBACK} className="h-[420px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <div className="flex h-56 items-center justify-center gap-2 bg-pearl text-ink/60"><Icon name="MapPin" /> Map [EDIT: add Google Maps embed URL in lib/site.ts]</div>
          )}
        </div>
      </Band>
    </>
  );
}
