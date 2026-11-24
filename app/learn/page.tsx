import { LearnHubView } from "@/components/views/TextViews";
import { meta } from "@/lib/meta";

export const metadata = meta({
  en: "Learn solar",
  te: "సోలార్ నేర్చుకోండి",
  descEn: "Short English and Telugu guides on solar cost, monsoon, kirana shops and net metering in Hyderabad.",
  descTe: "సోలార్ ఖర్చు, వర్షాకాలం, కిరాణా, నెట్ మీటరింగ్‌పై చిన్న గైడ్‌లు.",
  path: "/learn",
});

export default function Page() {
  return <LearnHubView />;
}
