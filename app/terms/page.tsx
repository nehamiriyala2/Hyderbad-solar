import { TermsView } from "@/components/views/TextViews";
import { meta } from "@/lib/meta";

export const metadata = meta({
  en: "Terms of use",
  te: "వినియోగ నిబంధనలు",
  descEn: "Terms for using the Hyderabad Solar website and tools.",
  descTe: "వెబ్‌సైట్, టూల్స్ వినియోగ నిబంధనలు.",
  path: "/terms",
});

export default function Page() {
  return <TermsView />;
}
