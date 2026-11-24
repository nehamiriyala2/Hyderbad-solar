import { PrivacyView } from "@/components/views/TextViews";
import { meta } from "@/lib/meta";

export const metadata = meta({
  en: "Privacy policy",
  te: "గోప్యతా విధానం",
  descEn: "How Hyderabad Solar uses the details you share.",
  descTe: "మీరు ఇచ్చే వివరాలు ఎలా వాడతాం.",
  path: "/privacy",
});

export default function Page() {
  return <PrivacyView />;
}
