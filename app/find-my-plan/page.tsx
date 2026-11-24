import { FindMyPlanView } from "@/components/views/ToolViews";
import { meta } from "@/lib/meta";

export const metadata = meta({
  en: "Find My Solar Plan",
  te: "నా సోలార్ ప్లాన్",
  descEn: "Answer 5 quick questions and get your recommended solar size, system type, saving, payback and schemes for your Hyderabad place.",
  descTe: "5 ప్రశ్నలకు జవాబిచ్చి మీ సోలార్ సైజ్, ఆదా, స్కీములు తెలుసుకోండి.",
  path: "/find-my-plan",
});

export default function Page() {
  return <FindMyPlanView />;
}
