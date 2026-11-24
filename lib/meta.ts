import type { Metadata } from "next";

/** Bilingual page metadata: English + Telugu in title and description. */
export function meta(o: { en: string; te: string; descEn: string; descTe: string; path: string }): Metadata {
  const title = `${o.en} | ${o.te}`;
  const description = `${o.descEn} ${o.descTe}`;
  return {
    title,
    description,
    alternates: { canonical: o.path },
    openGraph: { title: `${title} | Hyderabad Solar`, description, url: o.path, locale: "en_IN", alternateLocale: ["te_IN"] },
  };
}
