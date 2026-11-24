import { ShopsView } from "@/components/views/ShopsView";
import { meta } from "@/lib/meta";

export const metadata = meta({
  en: "Solar for shops in Hyderabad",
  te: "హైదరాబాద్ షాపులకు సోలార్",
  descEn: "Your shop runs in the day, solar runs in the day. Sizes, savings and business benefits for kirana, medical, restaurants, salons and more.",
  descTe: "మీ షాప్ పగలు నడుస్తుంది, సోలార్ పగలు పని చేస్తుంది. కిరాణా, మెడికల్, రెస్టారెంట్లకు సైజ్, ఆదా.",
  path: "/shops",
});

export default function Page() {
  return <ShopsView />;
}
