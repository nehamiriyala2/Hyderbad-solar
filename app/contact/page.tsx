import { ContactView } from "@/components/views/ToolViews";
import { meta } from "@/lib/meta";

export const metadata = meta({
  en: "Contact Hyderabad Solar",
  te: "సంప్రదించండి",
  descEn: "Talk to Hyderabad Solar on WhatsApp. Share your bill and get your solar plan.",
  descTe: "వాట్సాప్‌లో మాట్లాడండి. మీ బిల్ పంపి సోలార్ ప్లాన్ పొందండి.",
  path: "/contact",
});

export default function Page() {
  return <ContactView />;
}
