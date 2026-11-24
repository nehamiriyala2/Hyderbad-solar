import { AboutView } from "@/components/views/ToolViews";
import { meta } from "@/lib/meta";

export const metadata = meta({
  en: "About Hyderabad Solar",
  te: "మా గురించి",
  descEn: "Make your own power. Pay less for it. A Hyderabad-focused solar team.",
  descTe: "మీ కరెంట్ మీరే తయారు చేసుకోండి. హైదరాబాద్ సోలార్ టీమ్.",
  path: "/about",
});

export default function Page() {
  return <AboutView />;
}
