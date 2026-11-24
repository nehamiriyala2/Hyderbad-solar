import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SEGMENTS } from "@/content/forYou";
import { SCHEMES } from "@/content/schemes";
import { ARTICLES } from "@/content/learn";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", "/solar-guide", "/for", "/shops", "/find-my-plan", "/schemes", "/subsidy-loans", "/savings-calculator",
    "/projects", "/about", "/contact", "/learn", "/privacy", "/terms",
    ...SEGMENTS.map((s) => `/for/${s.slug}`),
    ...SCHEMES.map((s) => `/schemes/${s.slug}`),
    ...ARTICLES.map((a) => `/learn/${a.slug}`),
  ];
  return paths.map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date(), changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
