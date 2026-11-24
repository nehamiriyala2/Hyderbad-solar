"use client";

import { T } from "@/lib/i18n";
import { waLink } from "@/lib/site";
import type { Pkg } from "@/content/packages";
import { Icon } from "./Icon";
import { Flag, cx } from "./ui";

export function PackageCards({ items, kind = "home" }: { items: Pkg[]; kind?: "home" | "shop" }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((p, i) => (
        <div key={p.kw} className={cx("flex flex-col rounded-[2rem] p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift", i === 1 ? "bg-teal text-white" : "bg-white")}>
          <div className="flex items-center justify-between">
            <span className={cx("inline-flex h-12 w-12 items-center justify-center rounded-2xl", i === 1 ? "bg-white/15" : "bg-sun/15 text-sun-deep")}>
              <Icon name={p.icon} size={26} />
            </span>
            {i === 1 && (
              <span className="rounded-full bg-sun px-3 py-1 text-sm font-bold text-ink">
                <T en="Most asked" te="ఎక్కువగా అడిగేది" />
              </span>
            )}
          </div>
          <p className="mt-4 font-display text-4xl font-extrabold">{p.kw}</p>
          <p className={cx("mt-1", i === 1 ? "text-white/80" : "text-ink/70")}><T {...p.best} /></p>
          <dl className="mt-5 grid gap-2.5 text-[16px]">
            {[
              { k: { en: "Bill range", te: "బిల్ రేంజ్" }, v: p.bill, icon: "Receipt" as const },
              { k: { en: "Units / month", te: "నెలకు యూనిట్లు" }, v: p.units, icon: "Zap" as const },
              { k: { en: "Roof area", te: "పైకప్పు" }, v: p.roof, icon: "Ruler" as const },
            ].map((r) => (
              <div key={r.k.en} className={cx("flex items-center justify-between rounded-xl px-3 py-2", i === 1 ? "bg-white/10" : "bg-pearl")}>
                <dt className="flex items-center gap-2"><Icon name={r.icon} size={16} /> <T {...r.k} /></dt>
                <dd className="font-bold">{r.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm opacity-80"><T en="Starting from" te="ప్రారంభ ధర" /></p>
          <p className="font-display text-2xl font-extrabold">
            {p.price} <Flag kind="EDIT" />
          </p>
          <a
            href={waLink(`Hi Hyderabad Solar, I'm interested in the ${p.kw} ${kind} package. Please share price and details.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={cx("mt-5 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full font-bold", i === 1 ? "bg-sun text-ink" : "bg-leaf text-white")}
          >
            <Icon name="MessageCircle" size={20} /> <T en="Ask price on WhatsApp" te="వాట్సాప్‌లో ధర అడగండి" />
          </a>
        </div>
      ))}
    </div>
  );
}
