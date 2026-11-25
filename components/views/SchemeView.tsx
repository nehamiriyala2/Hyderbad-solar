"use client";

import { T } from "@/lib/i18n";
import { SCHEMES, getScheme } from "@/content/schemes";
import { SchemeFinder } from "../Forms";
import { Icon } from "../Icon";
import Image from "next/image";
import { Band, Btn, CTABand, Card, FAQ, Heading, PageHero, Points, Steps, VerifyNote, WhatsAppBtn, cx } from "../ui";
import { ColorIcon, GRADS } from "../ColorIcon";

export function SchemeView({ slug }: { slug: string }) {
  const s = getScheme(slug)!;
  const wa = `Hi Hyderabad Solar, I want to know about ${s.name.en}. Can you check if I qualify?`;
  return (
    <>
      <PageHero icon={s.icon} kicker={{ en: "Scheme explained", te: "స్కీమ్ వివరణ" }} title={s.name} sub={s.what}>
        <div className="flex flex-wrap gap-3">
          <Btn href="/find-my-plan" icon="Sparkles"><T en="Find My Solar Plan" te="నా సోలార్ ప్లాన్ చూడండి" /></Btn>
          <WhatsAppBtn variant="light" text={wa} label={{ en: "Check if I qualify", te: "నాకు అర్హత ఉందా చూడండి" }} />
        </div>
      </PageHero>

      <Band tone="cream">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="h-full">
            <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold"><Icon name="Users" className="text-sun-deep" /> <T en="Who can apply" te="ఎవరు దరఖాస్తు చేయొచ్చు" /></h2>
            <div className="mt-4"><Points items={s.who} /></div>
          </Card>
          <Card tone="teal" className="h-full">
            <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold"><Icon name="IndianRupee" className="text-sun-soft" /> <T en="Benefit in numbers" te="అంకెల్లో లాభం" /></h2>
            <dl className="mt-4 grid gap-2">
              {s.benefits.map((b, i) => (
                <div key={i} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/10 px-4 py-3">
                  <dt className="text-white/80"><T {...b.label} /></dt>
                  <dd className="font-display text-lg font-bold"><T {...b.value} /></dd>
                </div>
              ))}
            </dl>
            <VerifyNote light />
          </Card>
        </div>
      </Band>

      <Band tone="pearl">
        <Heading title={{ en: "Steps to apply", te: "దరఖాస్తు స్టెప్స్" }} />
        <Steps items={s.steps} />
      </Band>

      <Band tone="cream">
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="h-full">
            <h2 className="flex items-center gap-2 font-display text-xl font-extrabold"><Icon name="FileCheck" className="text-sun-deep" /> <T en="Documents needed" te="కావాల్సిన పత్రాలు" /></h2>
            <div className="mt-4"><Points items={s.docs} icon="FileText" /></div>
          </Card>
          <Card tone="leaf" className="h-full">
            <h2 className="flex items-center gap-2 font-display text-xl font-extrabold"><Icon name="MapPin" className="text-leaf-deep" /> <T en="How it helps in Hyderabad" te="హైదరాబాద్‌లో ఎలా సాయపడుతుంది" /></h2>
            <div className="mt-4"><Points items={s.helps} icon="Sun" /></div>
          </Card>
          <Card className="h-full">
            <h2 className="flex items-center gap-2 font-display text-xl font-extrabold"><Icon name="TriangleAlert" className="text-red-600" /> <T en="Common mistakes" te="సాధారణ తప్పులు" /></h2>
            <ul className="mt-4 grid gap-3">
              {s.mistakes.map((m, i) => (
                <li key={i} className="flex items-start gap-3"><Icon name="CircleX" size={22} className="mt-0.5 shrink-0 text-red-600" /><span><T {...m} /></span></li>
              ))}
            </ul>
          </Card>
        </div>
        {s.official && (
          <p className="mt-5 text-ink/70">
            <T en="Official source:" te="అధికారిక మూలం:" />{" "}
            <a href={s.official.url} target="_blank" rel="noopener noreferrer" className="font-bold text-teal underline">{s.official.label}</a>
          </p>
        )}
      </Band>

      <Band tone="pearl">
        <Heading title={{ en: "Questions", te: "ప్రశ్నలు" }} />
        <FAQ items={s.faq} />
      </Band>

      <CTABand title={{ en: "Not sure if you qualify? Ask us.", te: "అర్హత ఉందో తెలియదా? మమ్మల్ని అడగండి." }} waText={wa} />
    </>
  );
}

function SchemeCard({ slug, i, img }: { slug: string; i: number; img?: string | null }) {
  const s = SCHEMES.find((x) => x.slug === slug)!;
  return (
    <Card href={`/schemes/${s.slug}`} className="group flex h-full flex-col overflow-hidden !p-0">
      <div className={cx("relative aspect-[16/9] overflow-hidden", !img && "bg-gradient-to-br", !img && GRADS[i % GRADS.length])}>
        {img ? (
          <Image src={img} alt={s.name.en} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <>
            <div aria-hidden className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/15" />
            <div aria-hidden className="absolute -bottom-10 left-10 h-28 w-28 rounded-full bg-white/10" />
            <Icon name={s.icon} size={110} strokeWidth={1.4} className="absolute bottom-3 right-5 text-white/30 transition duration-500 group-hover:scale-110" />
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold leading-snug"><T {...s.name} /></h3>
        <p className="mt-1.5 text-ink/70"><T {...s.short} /></p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 font-bold text-sun-deep">
          <T en="Learn more" te="ఇంకా తెలుసుకోండి" /> <Icon name="ArrowRight" size={18} />
        </span>
      </div>
    </Card>
  );
}

export function SchemesHubView({ heroImage, cardImages = {} }: { heroImage?: string | null; cardImages?: Record<string, string | null> }) {
  return (
    <>
      <PageHero
        image={heroImage ? { src: heroImage, alt: "Home with rooftop solar panels" } : null}
        overlay={
          <div className="rounded-2xl bg-white/95 p-4 text-ink shadow-lift ring-1 ring-white backdrop-blur">
            <div className="flex items-center gap-3">
              <ColorIcon name="Landmark" i={1} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-ink/55"><T en="PM Surya Ghar subsidy" te="పీఎం సూర్య ఘర్ సబ్సిడీ" /></p>
                <p className="font-display text-2xl font-extrabold text-teal"><T en="up to ₹78,000" te="₹78,000 వరకు" /></p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-leaf-soft px-3 py-2 text-sm font-semibold text-leaf-deep">
              <Icon name="Banknote" size={18} /> <T en="Paid straight to your bank account" te="నేరుగా మీ బ్యాంక్ ఖాతాలో జమ" />
            </div>
            <p className="mt-2 text-[11px] text-ink/50"><T en="For home rooftop systems of 3 kW+. Approximate; rules can change." te="3 kW+ ఇంటి సిస్టమ్‌లకు. సుమారు; నియమాలు మారవచ్చు." /></p>
          </div>
        }
        icon="Landmark" kicker={{ en: "Schemes", te: "స్కీములు" }} title={{ en: "Schemes that help you go solar", te: "సోలార్‌కు సాయపడే స్కీములు" }} sub={{ en: "Each one explained the same simple way: who, how much, how to apply.", te: "ప్రతిదీ ఒకే సులభ పద్ధతిలో: ఎవరు, ఎంత, ఎలా దరఖాస్తు." }} />
      <Band tone="cream">
        <Heading title={{ en: "Scheme finder", te: "స్కీమ్ ఫైండర్" }} sub={{ en: "3 questions. See what matches you.", te: "3 ప్రశ్నలు. మీకు సరిపోయేవి చూడండి." }} />
        <SchemeFinder />
      </Band>
      <Band tone="pearl">
        <Heading title={{ en: "All schemes", te: "అన్ని స్కీములు" }} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SCHEMES.map((s, i) => (
            <SchemeCard key={s.slug} slug={s.slug} i={i} img={cardImages[s.slug]} />
          ))}
        </div>
        <VerifyNote />
      </Band>
      <CTABand />
    </>
  );
}
