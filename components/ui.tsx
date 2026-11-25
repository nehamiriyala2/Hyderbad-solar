"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon, type IconName } from "./Icon";
import { ColorIcon, GRADS } from "./ColorIcon";
import { T, useLang, type L } from "@/lib/i18n";
import { waLink } from "@/lib/site";

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/* ───────── Layout ───────── */

type Tone = "cream" | "teal" | "pearl" | "white" | "ink";
const toneCls: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  teal: "bg-teal text-white",
  pearl: "bg-pearl text-ink",
  white: "bg-white text-ink",
  ink: "bg-ink text-white",
};

export function Band({ tone = "cream", id, className, children }: { tone?: Tone; id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cx(toneCls[tone], "py-14 sm:py-20", className)}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function Heading({
  title,
  sub,
  kicker,
  light,
  center,
  as = "h2",
  hideAlt,
}: {
  title: L;
  sub?: L;
  kicker?: L;
  light?: boolean;
  center?: boolean;
  as?: "h1" | "h2";
  /** hide the second-language line under the heading */
  hideAlt?: boolean;
}) {
  const H = as;
  return (
    <div className={cx("mb-8 sm:mb-10", center && "text-center mx-auto max-w-3xl")}>
      {kicker && (
        <p className={cx("mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold", light ? "bg-white/10 text-sun-soft" : "bg-sun/15 text-sun-deep")}>
          <T {...kicker} />
        </p>
      )}
      <H className={cx("font-display font-extrabold tracking-tight", as === "h1" ? "text-4xl sm:text-5xl lg:text-6xl leading-[1.05]" : "text-3xl sm:text-4xl leading-tight")}>
        <T {...title} />
      </H>
      {sub && <p className={cx("mt-3 text-lg", light ? "text-white/85" : "text-ink/75")}><T {...sub} /></p>}
    </div>
  );
}

/* ───────── Cards ───────── */

export function Card({
  children,
  className,
  tone = "white",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "white" | "cream" | "teal" | "sun" | "leaf" | "pearl";
  href?: string;
}) {
  const t = {
    white: "bg-white text-ink",
    cream: "bg-cream text-ink",
    pearl: "bg-pearl text-ink",
    teal: "bg-teal text-white",
    sun: "bg-sun text-ink",
    leaf: "bg-leaf-soft text-ink",
  }[tone];
  const cls = cx("block rounded-3xl p-6 shadow-soft transition duration-300", href && "hover:-translate-y-1 hover:shadow-lift focus-visible:-translate-y-1", t, className);
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return <div className={cls}>{children}</div>;
}

export function IconBubble({ name, tone = "sun", size = "md" }: { name: IconName; tone?: "sun" | "teal" | "leaf" | "white"; size?: "md" | "lg" }) {
  const t = { sun: "bg-sun/15 text-sun-deep", teal: "bg-teal/10 text-teal", leaf: "bg-leaf/15 text-leaf-deep", white: "bg-white/15 text-white" }[tone];
  return (
    <span className={cx("inline-flex shrink-0 items-center justify-center rounded-2xl", t, size === "lg" ? "h-14 w-14" : "h-11 w-11")}>
      <Icon name={name} size={size === "lg" ? 28 : 22} />
    </span>
  );
}

/** One idea per card: icon + title + max-2-line text */
export function IdeaCard({ icon, title, text, href, tone = "white", iconTone = "sun", children, image }: { icon?: IconName; title: L; text?: L; href?: string; tone?: "white" | "cream" | "teal" | "pearl" | "leaf"; iconTone?: "sun" | "teal" | "leaf" | "white"; children?: React.ReactNode; image?: { src: string; alt: string } }) {
  return (
    <Card href={href} tone={tone} className={cx("h-full", image && "group overflow-hidden !p-0")}>
      {image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        </div>
      )}
      <div className={cx(image && "p-6")}>
      {icon && <IconBubble name={icon} tone={tone === "teal" ? "white" : iconTone} />}
      <h3 className={cx("font-display text-xl font-bold leading-snug", icon && "mt-4")}>
        <T {...title} />
      </h3>
      {text && (
        <p className={cx("mt-1.5", tone === "teal" ? "text-white/85" : "text-ink/75")}>
          <T {...text} />
        </p>
      )}
      {children}
      {href && (
        <span className={cx("mt-4 inline-flex items-center gap-1 font-bold", tone === "teal" ? "text-sun-soft" : "text-sun-deep")}>
          <T en="Learn more" te="ఇంకా తెలుసుకోండి" /> <Icon name="ArrowRight" size={18} />
        </span>
      )}
      </div>
    </Card>
  );
}

/** List of short points, each with an icon */
export function Points({ items, light, icon = "CircleCheck", cols = 1 }: { items: (L | { icon?: IconName; text: L })[]; light?: boolean; icon?: IconName; cols?: 1 | 2 }) {
  return (
    <ul className={cx("grid gap-3", cols === 2 && "sm:grid-cols-2")}>
      {items.map((it, i) => {
        const obj = "text" in it ? it : { text: it as L, icon: undefined };
        return (
          <li key={i} className="flex items-start gap-3">
            <Icon name={obj.icon ?? icon} size={22} className={cx("mt-0.5 shrink-0", light ? "text-sun-soft" : "text-leaf")} />
            <span className={cx("text-[17px]", light ? "text-white/90" : "text-ink/85")}>
              <T {...obj.text} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ───────── Tags & notes ───────── */

export function Flag({ kind = "VERIFY" }: { kind?: "VERIFY" | "EDIT" }) {
  return (
    <span
      title={kind === "VERIFY" ? "Owner: confirm this number before launch" : "Owner: replace with your real details"}
      className={cx("ml-1 inline-block rounded-md px-1.5 py-0.5 align-middle text-[11px] font-extrabold tracking-wide", kind === "VERIFY" ? "bg-amber-200 text-amber-900" : "bg-sky-200 text-sky-900")}
    >
      [{kind}]
    </span>
  );
}

export function VerifyNote({ light, className }: { light?: boolean; className?: string }) {
  return (
    <p className={cx("mt-3 flex items-start gap-2 text-sm", light ? "text-white/75" : "text-ink/60", className)}>
      <Icon name="Info" size={16} className="mt-0.5 shrink-0" />
      <span>
        <T en="Rules change. We confirm the latest for you." te="నియమాలు మారుతుంటాయి. తాజా వివరాలు మేమే నిర్ధారించి చెబుతాం." />
      </span>
    </p>
  );
}

export function SchemeBanner() {
  return (
    <div className="bg-sun-soft/60 text-ink">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 text-[15px] font-semibold sm:px-6 lg:px-8">
        <Icon name="TriangleAlert" size={20} className="shrink-0 text-sun-deep" />
        <T en="Rules and amounts can change. We confirm the latest for you." te="నియమాలు, మొత్తాలు మారవచ్చు. తాజా సమాచారం మేమే నిర్ధారించి చెబుతాం." />
      </div>
    </div>
  );
}

/* ───────── Buttons ───────── */

type BtnVariant = "primary" | "teal" | "ghost" | "whatsapp" | "light";
const btnCls: Record<BtnVariant, string> = {
  primary: "bg-sun text-ink hover:bg-[#ff8b38] shadow-glow",
  teal: "bg-teal text-white hover:bg-teal-dark",
  ghost: "bg-transparent text-current ring-2 ring-current hover:bg-black/5",
  whatsapp: "bg-leaf text-white hover:bg-leaf-deep",
  light: "bg-white text-teal hover:bg-cream",
};

export function Btn({ href, variant = "primary", icon, children, className, external }: { href: string; variant?: BtnVariant; icon?: IconName; children: React.ReactNode; className?: string; external?: boolean }) {
  const cls = cx("inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 text-[17px] font-bold transition active:scale-[0.98]", btnCls[variant], className);
  if (external || href.startsWith("http") || href.startsWith("tel:"))
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {icon && <Icon name={icon} size={20} />}
        {children}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {icon && <Icon name={icon} size={20} />}
      {children}
    </Link>
  );
}

export function WhatsAppBtn({ text, label, className, variant = "whatsapp" }: { text: string; label?: L; className?: string; variant?: BtnVariant }) {
  return (
    <Btn href={waLink(text)} variant={variant} icon="MessageCircle" className={className}>
      <T {...(label ?? { en: "Chat on WhatsApp", te: "వాట్సాప్‌లో మాట్లాడండి" })} />
    </Btn>
  );
}

export function PrimaryCTAs({ light }: { light?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Btn href="/find-my-plan" icon="Sparkles">
        <T en="Find My Solar Plan" te="నా సోలార్ ప్లాన్ చూడండి" />
      </Btn>
      <Btn href="/subsidy-loans" variant={light ? "light" : "teal"} icon="BadgeCheck">
        <T en="Check My Subsidy" te="నా సబ్సిడీ చూడండి" />
      </Btn>
    </div>
  );
}

/* ───────── FAQ ───────── */

export function FAQ({ items, light }: { items: { q: L; a: L }[]; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="grid gap-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={cx("rounded-3xl", light ? "bg-white/10" : "bg-white shadow-soft")}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-bold sm:px-6"
            >
              <span className="flex items-start gap-3">
                <Icon name="CircleHelp" size={22} className={cx("mt-0.5 shrink-0", light ? "text-sun-soft" : "text-sun-deep")} />
                <T {...f.q} />
              </span>
              <span className={cx("text-2xl leading-none transition", isOpen && "rotate-45")} aria-hidden>
                +
              </span>
            </button>
            {isOpen && (
              <div className={cx("px-5 pb-5 pl-[3.25rem] text-[17px] sm:px-6 sm:pl-[3.6rem]", light ? "text-white/85" : "text-ink/75")}>
                <T {...f.a} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ───────── Chips & strips ───────── */

export function Chips({ items, light, icon = "MapPin" }: { items: string[]; light?: boolean; icon?: IconName }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map((a) => (
        <li key={a} className={cx("inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-semibold", light ? "bg-white/10 text-white" : "bg-white text-teal shadow-soft")}>
          <Icon name={icon} size={16} className={light ? "text-sun-soft" : "text-sun-deep"} />
          {a}
        </li>
      ))}
    </ul>
  );
}

const PASTELS = ["from-orange-50 to-amber-100", "from-sky-50 to-blue-100", "from-emerald-50 to-green-100", "from-rose-50 to-pink-100", "from-violet-50 to-indigo-100", "from-cyan-50 to-teal-100", "from-red-50 to-rose-100", "from-lime-50 to-emerald-100"];

export function Steps({ items, light }: { items: { icon: IconName; title: L; text?: L; image?: string }[]; light?: boolean }) {
  const illustrated = items.some((s) => s.image);
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((s, i) => {
        const g = GRADS[i % GRADS.length];
        if (illustrated)
          return (
            <li key={i} className={cx("group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br text-ink shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift", PASTELS[i % PASTELS.length])}>
              <span aria-hidden className={cx("absolute inset-x-0 top-0 z-20 h-1.5 bg-gradient-to-r", g)} />
              <span className={cx("absolute right-3.5 top-4 z-20 rounded-full bg-gradient-to-br px-3 py-0.5 font-display text-lg font-extrabold text-white shadow-md", g)}>
                <span className="sr-only">Step </span>{String(i + 1).padStart(2, "0")}
              </span>
              {s.image ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
              ) : (
                <div className="px-6 pt-7">
                  <ColorIcon name={s.icon} i={i} size="lg" />
                </div>
              )}
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-xl font-bold leading-snug"><T {...s.title} /></h3>
                {s.text && <p className="mt-1.5 text-[16px] text-ink/70"><T {...s.text} /></p>}
              </div>
            </li>
          );
        return (
          <li
            key={i}
            className={cx(
              "group relative overflow-hidden rounded-3xl p-5 pt-6 transition duration-300 hover:-translate-y-1",
              light ? "bg-white/10 hover:bg-white/15" : "bg-white shadow-soft hover:shadow-lift"
            )}
          >
            <span aria-hidden className={cx("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r", g)} />
            <span aria-hidden className={cx("absolute right-4 top-3 bg-gradient-to-br bg-clip-text font-display text-5xl font-extrabold leading-none text-transparent drop-shadow-sm", g)}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="sr-only">Step {i + 1}: </span>
            <ColorIcon name={s.icon} i={i} />
            <h3 className="mt-4 font-display text-lg font-bold"><T {...s.title} /></h3>
            {s.text && <p className={cx("mt-1 text-[15px]", light ? "text-white/80" : "text-ink/70")}><T {...s.text} /></p>}
          </li>
        );
      })}
    </ol>
  );
}

/* ───────── Page hero (inner pages) ───────── */

export function PageHero({ title, sub, kicker, icon = "Sun", children, image, overlay }: { title: L; sub?: L; kicker?: L; icon?: IconName; children?: React.ReactNode; image?: { src: string; alt: string } | null; overlay?: React.ReactNode }) {
  if (image)
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-dark via-teal to-teal text-white">
        <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sun/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 pb-14 pt-12 sm:px-6 lg:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <Heading as="h1" title={title} sub={sub} kicker={kicker} light />
            {children}
          </div>
          <div className="relative">
            <div aria-hidden className="absolute -inset-3 rotate-2 rounded-[2.2rem] bg-sun/30" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift ring-4 ring-white/10">
              <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
            </div>
            {overlay && <div className="absolute -bottom-6 left-4 right-4 sm:left-auto sm:right-[-12px] sm:w-[300px]">{overlay}</div>}
          </div>
        </div>
      </section>
    );
  return (
    <section className="relative overflow-hidden bg-teal text-white">
      <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sun/90 blur-0 animate-rise" />
      <div aria-hidden className="absolute -right-10 top-40 h-40 w-40 rounded-full bg-sun-soft/30" />
      <div className="relative mx-auto max-w-[1400px] px-4 pb-14 pt-12 sm:px-6 lg:px-8 sm:pb-20 sm:pt-16">
        <div className="max-w-3xl">
          <Heading as="h1" title={title} sub={sub} kicker={kicker} light />
          {children}
        </div>
        <Icon name={icon} size={120} className="pointer-events-none absolute bottom-6 right-6 hidden text-white/10 md:block" />
      </div>
    </section>
  );
}

/* ───────── Final CTA band ───────── */

export function CTABand({ title, sub, waText }: { title?: L; sub?: L; waText?: string }) {
  const { t } = useLang();
  return (
    <section className="bg-cream py-14 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-teal p-8 text-white shadow-lift sm:p-12">
          <div aria-hidden className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-sun" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              <T {...(title ?? { en: "Ready to make your own power?", te: "మీ కరెంట్ మీరే తయారు చేసుకోవడానికి సిద్ధమా?" })} />
            </h2>
            <p className="mt-3 text-lg text-white/85">
              <T {...(sub ?? { en: "Answer 5 quick questions. Get your plan and scheme in 1 minute.", te: "5 చిన్న ప్రశ్నలకు జవాబు ఇవ్వండి. 1 నిమిషంలో మీ ప్లాన్, స్కీమ్ తెలుసుకోండి." })} />
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn href="/find-my-plan" icon="Sparkles">
                <T en="Find My Solar Plan" te="నా సోలార్ ప్లాన్ చూడండి" />
              </Btn>
              <WhatsAppBtn variant="light" text={waText ?? t({ en: "Hi Hyderabad Solar, I want to know about solar for my place.", te: "హాయ్ హైదరాబాద్ సోలార్, నా ఇంటికి సోలార్ గురించి తెలుసుకోవాలి." })} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Simple table ───────── */

export function DataTable({ head, rows, caption }: { head: L[]; rows: (L | string)[][]; caption?: L }) {
  return (
    <div className="overflow-x-auto rounded-3xl bg-white shadow-soft">
      <table className="w-full min-w-[520px] text-left text-[16px]">
        {caption && (
          <caption className="px-5 pt-4 text-left text-sm text-ink/60">
            <T {...caption} />
          </caption>
        )}
        <thead>
          <tr className="border-b border-ink/10 bg-teal/5">
            {head.map((h, i) => (
              <th key={i} scope="col" className="px-5 py-3.5 font-display font-bold text-teal">
                <T {...h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-ink/5 last:border-0">
              {r.map((c, j) => (
                <td key={j} className={cx("px-5 py-3.5", j === 0 && "font-semibold")}>
                  {typeof c === "string" ? c : <T {...c} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
