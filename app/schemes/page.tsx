import { SchemesHubView } from "@/components/views/SchemeView";
import { SCHEMES } from "@/content/schemes";
import { meta } from "@/lib/meta";
import { photoIf } from "@/lib/photos";

export const metadata = meta({
  en: "Solar schemes in Hyderabad",
  te: "హైదరాబాద్ సోలార్ స్కీములు",
  descEn: "PM Surya Ghar, TGSPDCL net metering, PM-KUSUM, Gruha Jyothi and business benefits, explained simply. Find the scheme that fits you.",
  descTe: "పీఎం సూర్య ఘర్, నెట్ మీటరింగ్, కుసుమ్, గృహ జ్యోతి, వ్యాపార లాభాలు — సులభంగా.",
  path: "/schemes",
});

// Photos: drop public/schemes/hero.webp and public/schemes/<scheme-slug>.webp, then rebuild.
export default function Page() {
  const cardImages = Object.fromEntries(SCHEMES.map((s) => [s.slug, photoIf(`schemes/${s.slug}.webp`)]));
  return <SchemesHubView heroImage={photoIf("schemes/hero.webp") ?? "/home/independent-house.webp"} cardImages={cardImages} />;
}
