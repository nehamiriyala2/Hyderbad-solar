import { ProjectsView } from "@/components/views/ToolViews";
import { meta } from "@/lib/meta";

export const metadata = meta({
  en: "Solar packages & projects",
  te: "సోలార్ ప్యాకేజీలు & ప్రాజెక్టులు",
  descEn: "3 kW, 5 kW, 10 kW home and shop solar packages with bill range, units and roof area.",
  descTe: "ఇల్లు, షాప్ సోలార్ ప్యాకేజీలు: బిల్ రేంజ్, యూనిట్లు, పైకప్పు.",
  path: "/projects",
});

export default function Page() {
  return <ProjectsView />;
}
