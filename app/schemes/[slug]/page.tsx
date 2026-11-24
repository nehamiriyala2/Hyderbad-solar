import { notFound } from "next/navigation";
import { SchemeView } from "@/components/views/SchemeView";
import { SCHEMES, getScheme } from "@/content/schemes";
import { meta } from "@/lib/meta";

export function generateStaticParams() {
  return SCHEMES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getScheme(slug);
  if (!s) return {};
  return meta({ en: s.name.en, te: s.name.te, descEn: s.metaEn, descTe: s.metaTe, path: `/schemes/${slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getScheme(slug)) notFound();
  return <SchemeView slug={slug} />;
}
