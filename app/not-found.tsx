import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-cream py-24 text-center">
      <p className="font-display text-6xl font-extrabold text-sun">404</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold">Page not found · పేజీ దొరకలేదు</h1>
      <Link href="/" className="mt-6 inline-flex min-h-[52px] items-center rounded-full bg-sun px-6 font-bold text-ink">Go home · హోమ్</Link>
    </section>
  );
}
