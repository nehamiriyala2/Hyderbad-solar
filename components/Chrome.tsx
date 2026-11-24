"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { T, useLang } from "@/lib/i18n";
import { AREAS, SITE, waLink } from "@/lib/site";
import { cx } from "./ui";

const NAV = [
  { href: "/solar-guide", en: "Solar Guide", te: "సోలార్ గైడ్" },
  { href: "/for", en: "For You", te: "మీ కోసం" },
  { href: "/shops", en: "Shops", te: "షాపులు" },
  { href: "/schemes", en: "Schemes", te: "స్కీములు" },
  { href: "/savings-calculator", en: "Savings Calculator", te: "ఆదా లెక్కలు" },
  { href: "/contact", en: "Contact", te: "సంప్రదించండి" },
];

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Hyderabad Solar — home">
      {/* [EDIT] Replace with the real Hyderabad Solar logo (public/logo.svg) */}
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
        <circle cx="24" cy="22" r="20" fill="#FF7A1A" />
        <path d="M6 34h36v8H6z" fill="#0B4F5C" />
        <path d="M14 34v-9h3v-3h2v3h3v9zM26 34v-12l3-3 3 3v12zM34 34v-7h4v7z" fill="#0B4F5C" />
        <path d="M8 38h32" stroke="#FFF6E8" strokeWidth="2" />
      </svg>
      <span className="leading-tight">
        <span className={cx("block font-display text-lg font-extrabold", light ? "text-white" : "text-teal")}>Hyderabad Solar</span>
        <span className={cx("block font-telugu text-xs font-semibold", light ? "text-sun-soft" : "text-sun-deep")}>హైదరాబాద్ సోలార్</span>
      </span>
    </Link>
  );
}

export function LangToggle({ compact }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <>
    {/* Phones: one compact switch button */}
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "te" : "en")}
      aria-label={lang === "en" ? "తెలుగులో చూడండి (Switch to Telugu)" : "Switch to English"}
      className={cx("inline-flex h-11 items-center rounded-full bg-teal px-3 text-sm font-bold text-white sm:hidden", lang === "en" && "font-telugu")}
    >
      {lang === "en" ? "తెలుగు" : "EN"}
    </button>
    <div role="group" aria-label="Language" className={cx("hidden rounded-full bg-pearl p-1 text-sm font-bold sm:inline-flex", compact && "text-xs")}>
      <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"} className={cx("rounded-full px-3 py-1.5 transition", lang === "en" ? "bg-teal text-white" : "text-teal")}>
        EN
      </button>
      <button type="button" onClick={() => setLang("te")} aria-pressed={lang === "te"} className={cx("rounded-full px-3 py-1.5 font-telugu transition", lang === "te" ? "bg-teal text-white" : "text-teal")}>
        తెలుగు
      </button>
    </div>
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cx("sticky top-0 z-40 transition-[background-color,box-shadow] duration-300", path === "/" && !scrolled && !open ? "bg-transparent" : "bg-cream/90 backdrop-blur", scrolled && "shadow-soft")}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:rounded-lg focus:bg-white focus:p-2">
        Skip to content
      </a>
      {/* fixed 64px height: the home hero slides under it (-mt-16) and nothing shifts on scroll */}
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={cx("rounded-full px-3 py-2 text-[15px] font-semibold transition hover:bg-white", path?.startsWith(n.href) ? "bg-white text-teal shadow-soft" : "text-ink/80")}>
              <T en={n.en} te={n.te} />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle compact />
          <Link href="/find-my-plan" className="hidden min-h-[46px] items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FF9A1F] to-[#FF7A1A] px-5 text-[15px] font-bold text-ink shadow-glow transition hover:brightness-105 md:inline-flex">
            <Icon name="Sparkles" size={18} />
            <T en="Find My Plan" te="నా ప్లాన్" />
          </Link>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-teal shadow-soft lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            <span className="text-2xl leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-ink/10 bg-cream px-4 pb-6 pt-2 lg:hidden">
          <ul className="grid gap-1">
            {[{ href: "/", en: "Home", te: "హోమ్" }, ...NAV, { href: "/subsidy-loans", en: "Subsidy & Loans", te: "సబ్సిడీ & లోన్లు" }, { href: "/projects", en: "Packages & Projects", te: "ప్యాకేజీలు & ప్రాజెక్టులు" }, { href: "/learn", en: "Learn", te: "నేర్చుకోండి" }, { href: "/about", en: "About", te: "మా గురించి" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="flex min-h-[52px] items-center justify-between rounded-2xl px-4 text-lg font-semibold hover:bg-white">
                  <T en={n.en} te={n.te} />
                  <Icon name="ArrowRight" size={18} className="text-sun-deep" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/** Floating WhatsApp pill — visible on every page (desktop); mobile uses the bottom bar */
export function WhatsAppPill() {
  const { t } = useLang();
  return (
    <a
      href={waLink(t({ en: "Hi Hyderabad Solar, I have a question about solar.", te: "హాయ్ హైదరాబాద్ సోలార్, సోలార్ గురించి ఒక ప్రశ్న ఉంది." }))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      title="WhatsApp"
      className="group fixed bottom-6 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-leaf text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-leaf-deep lg:inline-flex animate-pulseRing"
    >
      <Icon name="MessageCircle" size={26} />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-sm font-bold text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
        <T en="WhatsApp us" te="వాట్సాప్ చేయండి" />
      </span>
    </a>
  );
}

/** Mobile bottom sticky bar: [Call] [WhatsApp] [Find My Plan] */
export function MobileBar() {
  const { t } = useLang();
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-2 border-t border-ink/10 bg-white/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <a href={SITE.phoneHref} className="flex min-h-[54px] flex-col items-center justify-center rounded-2xl bg-pearl text-sm font-bold text-teal">
        <Icon name="Phone" size={20} />
        <T en="Call" te="కాల్" />
      </a>
      <a href={waLink(t({ en: "Hi Hyderabad Solar, I want to know about solar.", te: "హాయ్ హైదరాబాద్ సోలార్, సోలార్ గురించి తెలుసుకోవాలి." }))} target="_blank" rel="noopener noreferrer" className="flex min-h-[54px] flex-col items-center justify-center rounded-2xl bg-leaf text-sm font-bold text-white">
        <Icon name="MessageCircle" size={20} />
        WhatsApp
      </a>
      <Link href="/find-my-plan" className="flex min-h-[54px] flex-col items-center justify-center rounded-2xl bg-sun text-sm font-bold text-ink">
        <Icon name="Sparkles" size={20} />
        <T en="My Plan" te="నా ప్లాన్" />
      </Link>
    </nav>
  );
}

export function Footer() {
  const links = [
    { href: "/solar-guide", en: "Solar Guide", te: "సోలార్ గైడ్" },
    { href: "/find-my-plan", en: "Find My Plan", te: "నా ప్లాన్" },
    { href: "/for", en: "For You", te: "మీ కోసం" },
    { href: "/shops", en: "Shops", te: "షాపులు" },
    { href: "/schemes", en: "Schemes", te: "స్కీములు" },
    { href: "/subsidy-loans", en: "Subsidy & Loans", te: "సబ్సిడీ & లోన్లు" },
    { href: "/savings-calculator", en: "Savings Calculator", te: "ఆదా లెక్కలు" },
    { href: "/projects", en: "Packages & Projects", te: "ప్యాకేజీలు" },
    { href: "/learn", en: "Learn", te: "నేర్చుకోండి" },
    { href: "/about", en: "About", te: "మా గురించి" },
    { href: "/contact", en: "Contact", te: "సంప్రదించండి" },
  ];
  return (
    <footer className="bg-ink pb-28 pt-14 text-white lg:pb-14">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-white/75">
            <T en="Hyderabad Solar helps homes, apartments and shops in Hyderabad understand solar, pick the right plan and use the right scheme." te="హైదరాబాద్‌లో ఇళ్లు, అపార్ట్‌మెంట్లు, షాపులకు సోలార్ అర్థమయ్యేలా చెప్పి, సరైన ప్లాన్, సరైన స్కీమ్ ఎంచుకోవడంలో సాయం చేస్తాం." />
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold">
            <T en="Quick links" te="లింకులు" />
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-white/80 md:grid-cols-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-sun">
                  <T en={l.en} te={l.te} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold">
            <T en="Areas we serve" te="మేము సేవ చేసే ప్రాంతాలు" />
          </h2>
          <p className="mt-3 text-white/75">{AREAS.slice(0, 18).join(" · ")} …</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold">
            <T en="Contact" te="సంప్రదించండి" />
          </h2>
          <ul className="mt-3 grid gap-2 text-white/80">
            <li className="flex gap-2"><Icon name="Phone" size={18} className="mt-1 text-sun" /> <a href={SITE.phoneHref}>{SITE.phone}</a></li>
            <li className="flex gap-2"><Icon name="MessageCircle" size={18} className="mt-1 text-sun" /> <a href={waLink("Hi Hyderabad Solar")} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li className="flex gap-2"><Icon name="Mail" size={18} className="mt-1 text-sun" /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a> <span className="text-xs text-sky-300">[EDIT]</span></li>
            <li className="flex gap-2"><Icon name="MapPin" size={18} className="mt-1 text-sun" /> <span>{SITE.address}</span></li>
          </ul>
          <p className="mt-4 text-sm text-white/60">
            Instagram · Facebook · YouTube <span className="text-sky-300">[EDIT links]</span>
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1400px] flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 pt-6 text-sm text-white/60 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Hyderabad Solar. <T en="Make your own power. Pay less for it." te="మీ కరెంట్ మీరే తయారు చేసుకోండి. తక్కువ చెల్లించండి." /></p>
        <p className="flex gap-4">
          <Link href="/privacy" className="hover:text-sun"><T en="Privacy" te="గోప్యత" /></Link>
          <Link href="/terms" className="hover:text-sun"><T en="Terms" te="నిబంధనలు" /></Link>
        </p>
      </div>
    </footer>
  );
}
