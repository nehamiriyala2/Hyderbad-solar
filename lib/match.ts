import type { L } from "./i18n";
import type { Place, Plan, PlanInput, Roof, Use } from "./solar";

export type SchemeMatch = { slug: string; name: L; reason: L };

export const SCHEME_NAMES: Record<string, L> = {
  "pm-surya-ghar": { en: "PM Surya Ghar (home rooftop subsidy)", te: "పీఎం సూర్య ఘర్ (ఇంటి సబ్సిడీ)" },
  "net-metering": { en: "Net metering (TGSPDCL)", te: "నెట్ మీటరింగ్ (TGSPDCL)" },
  "pm-kusum": { en: "PM-KUSUM (farm solar & pumps)", te: "పీఎం-కుసుమ్ (వ్యవసాయ సోలార్, పంపులు)" },
  "gruha-jyothi-and-solar": { en: "Gruha Jyothi & solar", te: "గృహ జ్యోతి & సోలార్" },
  "telangana-state-and-ghmc-support": { en: "Telangana / GHMC support", te: "తెలంగాణ / GHMC సహాయం" },
  "commercial-benefits": { en: "Business benefits (tax, loans)", te: "వ్యాపార లాభాలు (పన్ను, లోన్లు)" },
};

export function matchSchemes(i: { place: Place; use: Use; roof: Roof; units: number }): SchemeMatch[] {
  const out: SchemeMatch[] = [];
  const add = (slug: string, reason: L) => out.push({ slug, name: SCHEME_NAMES[slug], reason });

  if ((i.use === "home" || i.use === "farm") && i.roof === "own")
    add("pm-surya-ghar", { en: "You have a home connection and your own roof.", te: "మీకు ఇంటి కనెక్షన్, సొంత పైకప్పు ఉంది." });
  if (i.use === "apartment")
    add("pm-surya-ghar", {
      en: i.roof === "own" ? "Villa / own-roof homes in a community can apply as a home." : "Your association can apply for common-area solar (lifts, lights, pumps).",
      te: i.roof === "own" ? "కమ్యూనిటీలో విల్లా / సొంత పైకప్పు ఇళ్లు ఇంటిగా దరఖాస్తు చేయొచ్చు." : "మీ అసోసియేషన్ కామన్ ఏరియా సోలార్ (లిఫ్ట్, లైట్లు, పంపులు) కోసం దరఖాస్తు చేయొచ్చు.",
    });
  if (i.roof !== "none" && i.place !== "outskirts")
    add("net-metering", { en: "Extra daytime units go to the grid and cut your bill.", te: "పగటి అదనపు యూనిట్లు గ్రిడ్‌కు వెళ్లి మీ బిల్ తగ్గిస్తాయి." });
  if (i.place === "outskirts" && i.roof !== "none")
    add("net-metering", { en: "If you have a TGSPDCL connection, extra units can be adjusted in your bill.", te: "TGSPDCL కనెక్షన్ ఉంటే అదనపు యూనిట్లు బిల్లో సర్దుబాటు అవుతాయి." });
  if (i.use === "farm" || i.place === "outskirts")
    add("pm-kusum", { en: "Farm land or pump? Solar pump support may apply where eligible.", te: "వ్యవసాయ భూమి లేదా పంపు ఉందా? అర్హత ఉంటే సోలార్ పంపు సహాయం ఉండొచ్చు." });
  if ((i.use === "home" || i.use === "apartment") && i.units <= 250)
    add("gruha-jyothi-and-solar", { en: "Your use is near the free-units limit. Check if solar is worth it now.", te: "మీ వాడకం ఉచిత యూనిట్ల పరిమితికి దగ్గరగా ఉంది. సోలార్ ఇప్పుడు అవసరమా చూడండి." });
  if (i.use === "shop" || i.use === "institution")
    add("commercial-benefits", { en: "Business connections can use tax benefits and solar loans.", te: "వ్యాపార కనెక్షన్‌కు పన్ను లాభాలు, సోలార్ లోన్లు ఉపయోగపడతాయి." });
  add("telangana-state-and-ghmc-support", { en: "Building permissions and state programmes in Hyderabad.", te: "హైదరాబాద్‌లో భవన అనుమతులు, రాష్ట్ర కార్యక్రమాలు." });
  return out;
}

export function documentsFor(use: Use, roof: Roof): L[] {
  const docs: L[] = [
    { en: "Latest electricity bill (TGSPDCL)", te: "తాజా కరెంట్ బిల్ (TGSPDCL)" },
    { en: "Aadhaar card", te: "ఆధార్ కార్డ్" },
    { en: "Bank passbook / cancelled cheque", te: "బ్యాంక్ పాస్‌బుక్ / క్యాన్సిల్ చెక్" },
    { en: "Clear photo of your roof", te: "మీ పైకప్పు స్పష్టమైన ఫోటో" },
  ];
  if (use === "home" || use === "farm") docs.push({ en: "Property tax receipt or ownership proof", te: "ఆస్తి పన్ను రసీదు లేదా యాజమాన్య ఆధారం" });
  if (use === "apartment" && roof !== "own") docs.push({ en: "Association resolution (committee approval)", te: "అసోసియేషన్ తీర్మానం (కమిటీ ఆమోదం)" }, { en: "Society registration certificate", te: "సొసైటీ రిజిస్ట్రేషన్ సర్టిఫికెట్" });
  if (use === "shop" || use === "institution") docs.push({ en: "PAN, GST / trade licence", te: "పాన్, GST / ట్రేడ్ లైసెన్స్" }, { en: "Rent agreement + owner's consent (if rented)", te: "అద్దె ఒప్పందం + యజమాని అనుమతి (అద్దె అయితే)" });
  if (use === "farm") docs.push({ en: "Pattadar passbook / land records (for PM-KUSUM)", te: "పట్టాదార్ పాస్‌బుక్ / భూమి రికార్డులు (కుసుమ్ కోసం)" });
  return docs;
}

export type { PlanInput, Plan };
