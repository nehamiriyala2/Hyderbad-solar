import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { GuideView } from "@/components/guide/GuideView";
import { GUIDE_SLOTS, type GuidePhotos, type GuideSlot } from "@/content/guideImages";

// Checked at build time: any photo dropped into /public/guide/ is used automatically after the next build.
function findPhotos(): GuidePhotos {
  const out: GuidePhotos = {};
  for (const [slot, s] of Object.entries(GUIDE_SLOTS)) {
    out[slot as GuideSlot] = fs.existsSync(path.join(process.cwd(), "public", "guide", s.file)) ? `/guide/${s.file}` : null;
  }
  return out;
}

const DESC =
  "A complete, plain-language guide to rooftop solar in Hyderabad: panels, inverter, net meter, on-grid vs hybrid vs off-grid, what solar can run, myths and a buying checklist. హైదరాబాద్‌లో రూఫ్‌టాప్ సోలార్‌కు పూర్తి గైడ్.";

export function generateMetadata(): Metadata {
  const hero = findPhotos().hero;
  return {
    title: { absolute: "Solar Knowledge Centre | Hyderabad Solar" },
    description: DESC,
    alternates: { canonical: "/solar-guide" },
    openGraph: {
      title: "Solar Knowledge Centre | Hyderabad Solar",
      description: DESC,
      url: "/solar-guide",
      locale: "en_IN",
      alternateLocale: ["te_IN"],
      images: hero ? [{ url: hero, width: 1200, height: 1200, alt: GUIDE_SLOTS.hero.alt }] : undefined,
    },
  };
}

export default function Page() {
  return <GuideView photos={findPhotos()} />;
}
