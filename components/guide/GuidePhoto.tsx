"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { GUIDE_SLOTS, type GuideSlot } from "@/content/guideImages";
import { Icon } from "../Icon";
import { cx } from "../ui";

/**
 * A photo slot. Always reserves its box (aspect ratio set by the parent className) so there is no layout shift.
 * Shows the real photo when /public/guide/<slot>.webp exists, otherwise a neutral labelled frame.
 */
export function GuidePhoto({ slot, src, className, sizes = "(min-width: 1024px) 33vw, 100vw", priority, overlay }: { slot: GuideSlot; src?: string | null; className?: string; sizes?: string; priority?: boolean; overlay?: boolean }) {
  const { lang } = useLang();
  const s = GUIDE_SLOTS[slot];
  return (
    <div className={cx(!className?.includes("absolute") && "relative", "overflow-hidden bg-teal-dark", className)}>
      {src ? (
        <Image src={src} alt={lang === "te" ? s.altTe : s.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          className={cx(
            "absolute inset-0 flex flex-col gap-2 bg-gradient-to-br from-teal via-teal-dark to-[#052E36] p-4 text-white/55",
            overlay ? "items-end justify-end pb-20 text-right" : "items-center justify-center text-center"
          )}
          role="img"
          aria-label={lang === "te" ? s.altTe : s.alt}
        >
          <Icon name="Camera" size={30} />
          <span className="text-xs font-semibold">Photo slot: {s.label}</span>
          <span className="rounded-md bg-sky-200 px-1.5 text-[10px] font-extrabold text-sky-900">[EDIT] /public/guide/{s.file}</span>
        </div>
      )}
      {overlay && <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-teal-dark/95 via-teal/80 to-teal/40" />}
    </div>
  );
}
