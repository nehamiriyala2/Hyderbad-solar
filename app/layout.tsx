import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { Header, Footer, MobileBar, WhatsAppPill } from "@/components/Chrome";
import { SITE, AREAS } from "@/lib/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const telugu = Noto_Sans_Telugu({ subsets: ["telugu"], weight: ["400", "600", "700", "800"], variable: "--font-telugu", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Hyderabad Solar | Rooftop solar for homes & shops | హైదరాబాద్ సోలార్",
    template: "%s | Hyderabad Solar",
  },
  description:
    "Learn solar in 2 minutes. Find the right rooftop solar plan and scheme (PM Surya Ghar, net metering) for your Hyderabad home, apartment or shop. సులభమైన తెలుగులో సోలార్ సమాచారం.",
  openGraph: { type: "website", locale: "en_IN", alternateLocale: ["te_IN"], siteName: "Hyderabad Solar" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0B4F5C", width: "device-width", initialScale: 1 };

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE.url + "/#business",
  name: "Hyderabad Solar",
  alternateName: "హైదరాబాద్ సోలార్",
  description: "Rooftop solar guidance and installation for homes, apartments and shops in Hyderabad.",
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email, // [EDIT]
  address: { "@type": "PostalAddress", streetAddress: "HITEC City", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" }, // [EDIT] add full street address + postalCode
  areaServed: AREAS.map((a) => ({ "@type": "Place", name: `${a}, Hyderabad` })),
  knowsLanguage: ["en", "te"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${telugu.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        <LangProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppPill />
          <MobileBar />
        </LangProvider>
      </body>
    </html>
  );
}
