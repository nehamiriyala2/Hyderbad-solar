import { SubsidyLoansView } from "@/components/views/ToolViews";
import { meta } from "@/lib/meta";

export const metadata = meta({
  en: "Solar subsidy & loans",
  te: "సోలార్ సబ్సిడీ & లోన్లు",
  descEn: "Calculate your PM Surya Ghar subsidy, net cost and solar loan EMI in Hyderabad.",
  descTe: "మీ సబ్సిడీ, నికర ఖర్చు, సోలార్ లోన్ EMI లెక్కించండి.",
  path: "/subsidy-loans",
});

export default function Page() {
  return <SubsidyLoansView />;
}
