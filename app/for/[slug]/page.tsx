import { notFound } from "next/navigation";
import { ForYouView } from "@/components/views/ForYouView";
import { SEGMENTS, getSegment } from "@/content/forYou";
import { meta } from "@/lib/meta";

export function generateStaticParams() {
  return SEGMENTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSegment(slug);
  if (!s) return {};
  return meta({ en: s.title.en, te: s.title.te, descEn: s.metaEn, descTe: s.metaTe, path: `/for/${slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSegment(slug)) notFound();
  return <ForYouView slug={slug} />;
}
