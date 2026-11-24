import { notFound } from "next/navigation";
import { ArticleView } from "@/components/views/TextViews";
import { ARTICLES, getArticle } from "@/content/learn";
import { meta } from "@/lib/meta";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return meta({ en: a.title.en, te: a.title.te, descEn: a.metaEn, descTe: a.metaTe, path: `/learn/${slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getArticle(slug)) notFound();
  return <ArticleView slug={slug} />;
}
