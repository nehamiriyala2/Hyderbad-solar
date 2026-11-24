import { ForHubView } from "@/components/views/ForYouView";
import { meta } from "@/lib/meta";
import { photoIf } from "@/lib/photos";

export const metadata = meta({
  en: "Solar for you: homes, apartments, outskirts, NRIs",
  te: "మీ కోసం సోలార్",
  descEn: "Find the right solar plan for your independent house, apartment, outskirts plot, institution or NRI property in Hyderabad.",
  descTe: "మీ ఇల్లు, అపార్ట్‌మెంట్, శివారు ప్లాట్, సంస్థ లేదా NRI ఆస్తికి సరైన సోలార్ ప్లాన్.",
  path: "/for",
});

// Photo: drop public/for/hero.webp and rebuild.
export default function Page() {
  return <ForHubView heroImage={photoIf("for/hero.webp")} />;
}
