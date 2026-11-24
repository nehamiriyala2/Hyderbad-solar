"use client";

import Link from "next/link";
import { T, type L } from "@/lib/i18n";
import { ARTICLES, getArticle } from "@/content/learn";
import { SITE } from "@/lib/site";
import { Icon } from "../Icon";
import { Band, CTABand, Card, IdeaCard, PageHero, Points, VerifyNote } from "../ui";

export function LearnHubView() {
  return (
    <>
      <PageHero icon="BookOpen" kicker={{ en: "Learn", te: "నేర్చుకోండి" }} title={{ en: "Short solar guides", te: "చిన్న సోలార్ గైడ్‌లు" }} sub={{ en: "2-minute reads in English and Telugu.", te: "ఇంగ్లీష్, తెలుగులో 2 నిమిషాల చదువు." }} />
      <Band tone="cream">
        <div className="grid gap-5 sm:grid-cols-2">
          {ARTICLES.map((a) => <IdeaCard key={a.slug} icon={a.icon} title={a.title} text={a.summary} href={`/learn/${a.slug}`} />)}
        </div>
      </Band>
      <CTABand />
    </>
  );
}

export function ArticleView({ slug }: { slug: string }) {
  const a = getArticle(slug)!;
  return (
    <>
      <PageHero icon={a.icon} kicker={{ en: "Guide", te: "గైడ్" }} title={a.title} sub={a.summary} />
      <Band tone="cream">
        <div className="mx-auto grid max-w-3xl gap-4">
          {a.sections.map((s, i) => (
            <Card key={i}>
              <h2 className="font-display text-2xl font-extrabold"><T {...s.h} /></h2>
              <div className="mt-3"><Points items={s.points} /></div>
            </Card>
          ))}
          <VerifyNote />
          <Link href="/learn" className="font-bold text-sun-deep">← <T en="All guides" te="అన్ని గైడ్‌లు" /></Link>
        </div>
      </Band>
      <CTABand />
    </>
  );
}

function LegalPage({ title, items }: { title: L; items: { h: L; p: L }[] }) {
  return (
    <>
      <PageHero icon="FileText" title={title} sub={{ en: "Last updated: [EDIT date]. Draft — have a lawyer review before launch.", te: "చివరి అప్‌డేట్: [EDIT]. డ్రాఫ్ట్ — లాంచ్ ముందు న్యాయవాదితో సమీక్షించండి." }} />
      <Band tone="cream">
        <div className="mx-auto grid max-w-3xl gap-4">
          {items.map((it, i) => (
            <Card key={i}>
              <h2 className="flex items-center gap-2 font-display text-xl font-bold"><Icon name="CircleCheck" className="text-leaf" size={20} /> <T {...it.h} /></h2>
              <p className="mt-2 text-ink/75"><T {...it.p} /></p>
            </Card>
          ))}
        </div>
      </Band>
    </>
  );
}

export function PrivacyView() {
  return (
    <LegalPage
      title={{ en: "Privacy policy", te: "గోప్యతా విధానం" }}
      items={[
        { h: { en: "What we collect", te: "మేము సేకరించేవి" }, p: { en: "Name, phone, area, place type, bill amount and your answers in our tools — only what you type.", te: "పేరు, ఫోన్, ప్రాంతం, స్థలం రకం, బిల్ మొత్తం, మా టూల్స్‌లో మీ జవాబులు — మీరు టైప్ చేసినవి మాత్రమే." } },
        { h: { en: "Why", te: "ఎందుకు" }, p: { en: "To reply to you on WhatsApp/phone with a solar plan and price.", te: "వాట్సాప్/ఫోన్‌లో సోలార్ ప్లాన్, ధరతో మీకు జవాబివ్వడానికి." } },
        { h: { en: "Where it is stored", te: "ఎక్కడ నిల్వ" }, p: { en: "In our private lead sheet / database. [EDIT: name the tool, e.g. Google Sheets]", te: "మా ప్రైవేట్ లీడ్ షీట్ / డేటాబేస్‌లో. [EDIT]" } },
        { h: { en: "Sharing", te: "పంచుకోవడం" }, p: { en: "We don't sell your data. We share only with partners needed for your install or loan, with your OK.", te: "మీ డేటా అమ్మము. మీ అనుమతితో, ఇన్‌స్టాల్ లేదా లోన్‌కు అవసరమైన భాగస్వాములతో మాత్రమే." } },
        { h: { en: "Your choice", te: "మీ ఎంపిక" }, p: { en: `Ask us to delete your details any time: ${SITE.email} [EDIT]`, te: `మీ వివరాలు తొలగించమని ఎప్పుడైనా అడగండి: ${SITE.email} [EDIT]` } },
        { h: { en: "Cookies", te: "కుకీలు" }, p: { en: "We store only your language choice in your browser. [EDIT if you add analytics]", te: "మీ భాష ఎంపిక మాత్రమే బ్రౌజర్‌లో నిల్వ. [EDIT]" } },
      ]}
    />
  );
}

export function TermsView() {
  return (
    <LegalPage
      title={{ en: "Terms of use", te: "వినియోగ నిబంధనలు" }}
      items={[
        { h: { en: "Estimates only", te: "అంచనాలు మాత్రమే" }, p: { en: "Calculator results, prices and savings are estimates, not quotes or guarantees.", te: "కాలిక్యులేటర్ ఫలితాలు, ధరలు, ఆదా అంచనాలు మాత్రమే, కొటేషన్ లేదా హామీ కాదు." } },
        { h: { en: "Schemes change", te: "స్కీములు మారతాయి" }, p: { en: "Government schemes, subsidy amounts and tariffs can change. We confirm the latest before you decide.", te: "ప్రభుత్వ స్కీములు, సబ్సిడీ, టారిఫ్‌లు మారవచ్చు. మీరు నిర్ణయించే ముందు తాజావి నిర్ధారిస్తాం." } },
        { h: { en: "Not tax advice", te: "పన్ను సలహా కాదు" }, p: { en: "Business tax information is general. Please talk to your CA.", te: "వ్యాపార పన్ను సమాచారం సాధారణమైనది. మీ CA తో మాట్లాడండి." } },
        { h: { en: "Final terms", te: "తుది నిబంధనలు" }, p: { en: "Your written quotation and agreement decide price, warranty and service. [EDIT]", te: "మీ రాతపూర్వక కొటేషన్, ఒప్పందం ధర, వారంటీ, సేవ నిర్ణయిస్తాయి. [EDIT]" } },
        { h: { en: "Law", te: "చట్టం" }, p: { en: "These terms follow Indian law; courts in Hyderabad, Telangana. [EDIT]", te: "ఈ నిబంధనలు భారత చట్టం ప్రకారం; హైదరాబాద్, తెలంగాణ కోర్టులు. [EDIT]" } },
      ]}
    />
  );
}
