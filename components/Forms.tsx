"use client";

import Link from "next/link";
import { useState } from "react";
import { matchSchemes } from "@/lib/match";
import { T, useLang, type L } from "@/lib/i18n";
import { sendLeadAndOpenWhatsApp } from "@/lib/leads";
import type { Place, Roof, Use } from "@/lib/solar";
import { Segmented } from "./controls";
import { Icon } from "./Icon";
import { VerifyNote } from "./ui";

/* ───────── Scheme finder: 3 questions ───────── */

export function SchemeFinder() {
  const [who, setWho] = useState<"home" | "apartment" | "shop" | "farm" | null>(null);
  const [place, setPlace] = useState<Place | null>(null);
  const [usage, setUsage] = useState<"low" | "mid" | "high" | null>(null);
  const ready = who && place && usage;
  const units = usage === "low" ? 150 : usage === "mid" ? 350 : 700;
  const roof: Roof = who === "apartment" ? "shared" : "own";
  const results = ready ? matchSchemes({ place: place!, use: who as Use, roof, units }) : [];

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr_1fr] lg:gap-6">
        <Segmented
          size="sm"
          oneLine
          colorIcons
          label={{ en: "1. Who are you?", te: "1. మీరు ఎవరు?" }}
          value={who ?? ("" as never)}
          onChange={setWho}
          options={[
            { value: "home", label: { en: "Home", te: "ఇల్లు" }, icon: "House" },
            { value: "apartment", label: { en: "Apartment", te: "అపార్ట్‌మెంట్" }, icon: "Building2" },
            { value: "shop", label: { en: "Shop", te: "షాప్" }, icon: "Store" },
            { value: "farm", label: { en: "Farm / plot", te: "పొలం / ప్లాట్" }, icon: "Tractor" },
          ]}
        />
        <Segmented
          size="sm"
          oneLine
          colorIcons={4}
          label={{ en: "2. Where?", te: "2. ఎక్కడ?" }}
          value={place ?? ("" as never)}
          onChange={setPlace}
          options={[
            { value: "city", label: { en: "City", te: "సిటీ" }, icon: "Building2" },
            { value: "colony", label: { en: "Colony", te: "కాలనీ" }, icon: "Users" },
            { value: "outskirts", label: { en: "Outskirts", te: "శివారు" }, icon: "TreePine" },
          ]}
        />
        <Segmented
          size="sm"
          oneLine
          colorIcons={5}
          label={{ en: "3. Units per month?", te: "3. నెలకు యూనిట్లు?" }}
          value={usage ?? ("" as never)}
          onChange={setUsage}
          options={[
            { value: "low", label: { en: "Under 200", te: "200 లోపు" }, icon: "Lightbulb" },
            { value: "mid", label: { en: "200–500", te: "200–500" }, icon: "Zap" },
            { value: "high", label: { en: "500+", te: "500+" }, icon: "BatteryCharging" },
          ]}
        />
      </div>
      <div className="mt-6" aria-live="polite">
        {!ready ? (
          <p className="rounded-2xl bg-pearl p-4 text-ink/70">
            <T en="Answer all 3 to see the schemes that match you." te="మీకు సరిపోయే స్కీములు చూడటానికి 3 ప్రశ్నలకు జవాబివ్వండి." />
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 animate-pop">
            {results.map((r) => (
              <Link key={r.slug} href={`/schemes/${r.slug}`} className="flex items-start gap-3 rounded-2xl bg-cream p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
                <Icon name="BadgeCheck" className="mt-0.5 shrink-0 text-leaf" />
                <span>
                  <span className="block font-bold text-teal"><T {...r.name} /></span>
                  <span className="block text-[15px] text-ink/70"><T {...r.reason} /></span>
                </span>
              </Link>
            ))}
          </div>
        )}
        <VerifyNote />
      </div>
    </div>
  );
}

/* ───────── Contact form (WhatsApp-first) ───────── */

const PLACE_OPTS: { v: string; l: L }[] = [
  { v: "City home", l: { en: "City – independent house", te: "సిటీ – ఇండిపెండెంట్ ఇల్లు" } },
  { v: "Apartment / gated community", l: { en: "Apartment / gated community", te: "అపార్ట్‌మెంట్ / గేటెడ్ కమ్యూనిటీ" } },
  { v: "Shop / business", l: { en: "Shop / business", te: "షాప్ / వ్యాపారం" } },
  { v: "Clinic / school / institution", l: { en: "Clinic / school / institution", te: "క్లినిక్ / స్కూల్ / సంస్థ" } },
  { v: "Outskirts plot / farmhouse", l: { en: "Outskirts plot / farmhouse", te: "శివారు ప్లాట్ / ఫామ్‌హౌస్" } },
  { v: "NRI / landlord", l: { en: "NRI / landlord", te: "NRI / ఇంటి యజమాని" } },
];

export function ContactForm({ source = "contact" }: { source?: string }) {
  const { t, lang } = useLang();
  const [f, setF] = useState({ name: "", phone: "", area: "", place: PLACE_OPTS[0].v, bill: "", message: "" });
  const [err, setErr] = useState<string | null>(null);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || f.phone.replace(/\D/g, "").length < 10) {
      setErr(t({ en: "Please enter your name and a 10-digit phone number.", te: "దయచేసి మీ పేరు, 10 అంకెల ఫోన్ నంబర్ ఇవ్వండి." }));
      return;
    }
    setErr(null);
    const msg = [
      t({ en: "Hi Hyderabad Solar,", te: "హాయ్ హైదరాబాద్ సోలార్," }),
      `${t({ en: "Name", te: "పేరు" })}: ${f.name}`,
      `${t({ en: "Phone", te: "ఫోన్" })}: ${f.phone}`,
      f.area && `${t({ en: "Area", te: "ప్రాంతం" })}: ${f.area}`,
      `${t({ en: "Place", te: "స్థలం" })}: ${f.place}`,
      f.bill && `${t({ en: "Monthly bill", te: "నెల బిల్" })}: ₹${f.bill}`,
      f.message && `${t({ en: "Message", te: "సందేశం" })}: ${f.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    sendLeadAndOpenWhatsApp({ source, name: f.name, phone: f.phone, area: f.area, place: f.place, bill: f.bill, message: f.message, lang }, msg);
  };

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[2rem] bg-white p-6 shadow-soft sm:grid-cols-2 sm:p-8" noValidate>
      <div>
        <label className="label" htmlFor="c-name"><T en="Name" te="పేరు" /> *</label>
        <input id="c-name" className="field" value={f.name} onChange={set("name")} autoComplete="name" required />
      </div>
      <div>
        <label className="label" htmlFor="c-phone"><T en="Phone / WhatsApp" te="ఫోన్ / వాట్సాప్" /> *</label>
        <input id="c-phone" className="field" inputMode="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" required />
      </div>
      <div>
        <label className="label" htmlFor="c-area"><T en="Area in Hyderabad" te="హైదరాబాద్‌లో ప్రాంతం" /></label>
        <input id="c-area" className="field" placeholder="e.g. Miyapur" value={f.area} onChange={set("area")} />
      </div>
      <div>
        <label className="label" htmlFor="c-place"><T en="Place type" te="స్థలం రకం" /></label>
        <select id="c-place" className="field" value={f.place} onChange={set("place")}>
          {PLACE_OPTS.map((o) => (
            <option key={o.v} value={o.v}>{t(o.l)}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="c-bill"><T en="Monthly bill (₹)" te="నెల బిల్ (₹)" /></label>
        <input id="c-bill" className="field" inputMode="numeric" value={f.bill} onChange={(e) => setF({ ...f, bill: e.target.value.replace(/[^0-9]/g, "").slice(0, 6) })} />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-msg"><T en="Message (optional)" te="సందేశం (ఐచ్ఛికం)" /></label>
        <textarea id="c-msg" rows={3} className="field py-3" value={f.message} onChange={set("message")} />
      </div>
      {err && <p className="text-[15px] font-semibold text-red-700 sm:col-span-2" role="alert">{err}</p>}
      <div className="sm:col-span-2">
        <button type="submit" className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-leaf px-8 font-bold text-white hover:bg-leaf-deep sm:w-auto">
          <Icon name="MessageCircle" size={22} /> <T en="Send on WhatsApp" te="వాట్సాప్‌లో పంపండి" />
        </button>
        <p className="mt-2 text-sm text-ink/55"><T en="We save your details only to reply to you. See Privacy." te="మీకు జవాబు ఇవ్వడానికే మీ వివరాలు సేవ్ చేస్తాం. గోప్యత చూడండి." /></p>
      </div>
    </form>
  );
}
