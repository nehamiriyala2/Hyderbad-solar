import { SavingsView } from "@/components/views/ToolViews";
import { meta } from "@/lib/meta";

export const metadata = meta({
  en: "Solar savings calculator",
  te: "సోలార్ ఆదా కాలిక్యులేటర్",
  descEn: "See your solar size, cost after subsidy, monthly saving, payback and 25-year savings for Hyderabad homes and shops.",
  descTe: "సైజ్, సబ్సిడీ తర్వాత ఖర్చు, నెల ఆదా, 25 ఏళ్ల ఆదా చూడండి.",
  path: "/savings-calculator",
});

export default function Page() {
  return <SavingsView />;
}
