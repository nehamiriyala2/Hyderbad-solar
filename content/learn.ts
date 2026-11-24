import type { L } from "@/lib/i18n";
import type { IconName } from "@/components/Icon";

export type Article = { slug: string; icon: IconName; title: L; summary: L; sections: { h: L; points: L[] }[]; metaEn: string; metaTe: string };

export const ARTICLES: Article[] = [
  {
    slug: "solar-cost-in-hyderabad",
    icon: "IndianRupee",
    title: { en: "Solar cost in Hyderabad", te: "హైదరాబాద్‌లో సోలార్ ఖర్చు" },
    summary: { en: "What a home system costs, what subsidy covers, and what you really pay.", te: "ఇంటి సిస్టమ్ ఖర్చు, సబ్సిడీ ఎంత, మీరు నిజంగా చెల్లించేది." },
    sections: [
      { h: { en: "Price per kW", te: "kW కి ధర" }, points: [{ en: "On-grid home system: about ₹55,000–₹65,000 per kW [VERIFY]", te: "ఆన్-గ్రిడ్ ఇంటి సిస్టమ్: kW కి సుమారు ₹55,000–₹65,000 [VERIFY]" }, { en: "Hybrid with battery: costs more because of the battery [VERIFY]", te: "బ్యాటరీతో హైబ్రిడ్: బ్యాటరీ వల్ల ఎక్కువ ఖర్చు [VERIFY]" }] },
      { h: { en: "Subsidy", te: "సబ్సిడీ" }, points: [{ en: "PM Surya Ghar: up to ₹78,000 for homes at 3 kW [VERIFY]", te: "పీఎం సూర్య ఘర్: 3 kW ఇంటికి ₹78,000 వరకు [VERIFY]" }, { en: "Shops don't get this subsidy", te: "షాపులకు ఈ సబ్సిడీ రాదు" }] },
      { h: { en: "What changes the price", te: "ధర ఎందుకు మారుతుంది" }, points: [{ en: "Panel brand and type", te: "ప్యానెల్ బ్రాండ్, రకం" }, { en: "Structure height (raised costs more)", te: "స్ట్రక్చర్ ఎత్తు (ఎత్తైనది ఖరీదు)" }, { en: "Wire length from roof to meter", te: "పైకప్పు నుంచి మీటర్ వరకు వైర్ పొడవు" }] },
    ],
    metaEn: "Rooftop solar cost in Hyderabad per kW, subsidy and net price, explained simply.",
    metaTe: "హైదరాబాద్‌లో రూఫ్‌టాప్ సోలార్ ఖర్చు, సబ్సిడీ, నికర ధర.",
  },
  {
    slug: "does-solar-work-in-monsoon",
    icon: "CloudRain",
    title: { en: "Does solar work in monsoon?", te: "వర్షాకాలంలో సోలార్ పని చేస్తుందా?" },
    summary: { en: "Yes, with less output. Here is what to expect month by month.", te: "అవును, కొంచెం తక్కువగా. ఏ నెలలో ఎలా ఉంటుందో చూడండి." },
    sections: [
      { h: { en: "Cloudy days", te: "మబ్బు రోజులు" }, points: [{ en: "Panels still make power from daylight", te: "పగటి వెలుతురుతో ప్యానెల్స్ కరెంట్ తయారు చేస్తాయి" }, { en: "Output can drop on heavy-cloud days", te: "దట్టమైన మబ్బు రోజుల్లో ఉత్పత్తి తగ్గొచ్చు" }] },
      { h: { en: "The full year matters", te: "మొత్తం ఏడాది ముఖ్యం" }, points: [{ en: "Hyderabad's strong sun from Oct to May makes up for it", te: "అక్టోబర్ నుంచి మే వరకు హైదరాబాద్ బలమైన ఎండ దాన్ని భర్తీ చేస్తుంది" }, { en: "Net metering credits from sunny months help", te: "ఎండ నెలల నెట్ మీటరింగ్ జమ సాయపడుతుంది" }] },
      { h: { en: "Monsoon care", te: "వర్షాకాల జాగ్రత్తలు" }, points: [{ en: "Rain cleans panels for free", te: "వర్షం ప్యానెల్స్‌ను ఉచితంగా కడుగుతుంది" }, { en: "Check earthing and wire joints once a year", te: "ఏటా ఒకసారి ఎర్తింగ్, వైర్ జాయింట్లు చెక్ చేయండి" }] },
    ],
    metaEn: "Does rooftop solar work in Hyderabad's monsoon? Output, yearly savings and care tips.",
    metaTe: "హైదరాబాద్ వర్షాకాలంలో సోలార్ పని చేస్తుందా? ఉత్పత్తి, ఆదా, జాగ్రత్తలు.",
  },
  {
    slug: "solar-for-kirana-shops",
    icon: "ShoppingCart",
    title: { en: "Solar for kirana shops", te: "కిరాణా షాపులకు సోలార్" },
    summary: { en: "Fridges and lights all day? Your kirana is a perfect fit for solar.", te: "రోజంతా ఫ్రిజ్‌లు, లైట్లు? మీ కిరాణా సోలార్‌కు సరైనది." },
    sections: [
      { h: { en: "Why it fits", te: "ఎందుకు సరిపోతుంది" }, points: [{ en: "Open 8 AM – 10 PM, most load in the day", te: "ఉదయం 8 – రాత్రి 10, ఎక్కువ లోడ్ పగలు" }, { en: "Commercial units cost more [VERIFY]", te: "వ్యాపార యూనిట్లు ఖరీదు [VERIFY]" }] },
      { h: { en: "Typical size", te: "సాధారణ సైజ్" }, points: [{ en: "Small kirana: 2–3 kW", te: "చిన్న కిరాణా: 2–3 kW" }, { en: "Supermarket with freezers: 5–15 kW", te: "ఫ్రీజర్లతో సూపర్‌మార్కెట్: 5–15 kW" }] },
      { h: { en: "Rented shop?", te: "అద్దె షాపా?" }, points: [{ en: "Get the owner's written OK", te: "యజమాని రాతపూర్వక అనుమతి తీసుకోండి" }, { en: "Panels can move with you", te: "ప్యానెల్స్ మీతో పాటు మారొచ్చు" }] },
    ],
    metaEn: "Solar for kirana and supermarket shops in Hyderabad: size, savings and rented-shop tips.",
    metaTe: "హైదరాబాద్ కిరాణా, సూపర్‌మార్కెట్లకు సోలార్: సైజ్, ఆదా, అద్దె షాప్ చిట్కాలు.",
  },
  {
    slug: "how-net-metering-works-in-hyderabad",
    icon: "Gauge",
    title: { en: "How net metering works in Hyderabad", te: "హైదరాబాద్‌లో నెట్ మీటరింగ్ ఎలా పని చేస్తుంది" },
    summary: { en: "Units in, units out, and what your new TGSPDCL bill looks like.", te: "లోపలికి యూనిట్లు, బయటికి యూనిట్లు, మీ కొత్త TGSPDCL బిల్ ఎలా ఉంటుంది." },
    sections: [
      { h: { en: "The idea", te: "ఆలోచన" }, points: [{ en: "Meter counts units you take (import)", te: "మీరు తీసుకున్న యూనిట్లు (దిగుమతి) మీటర్ లెక్కిస్తుంది" }, { en: "And units you give (export)", te: "మీరు ఇచ్చిన యూనిట్లు (ఎగుమతి) కూడా" }, { en: "You pay for import minus export", te: "దిగుమతి మైనస్ ఎగుమతికి చెల్లిస్తారు" }] },
      { h: { en: "Steps", te: "స్టెప్స్" }, points: [{ en: "Apply to TGSPDCL → feasibility → install → meter → inspection", te: "TGSPDCL కి దరఖాస్తు → సాధ్యాసాధ్యాలు → ఇన్‌స్టాల్ → మీటర్ → తనిఖీ" }] },
      { h: { en: "Your new bill", te: "మీ కొత్త బిల్" }, points: [{ en: "Shows import, export and net units", te: "దిగుమతి, ఎగుమతి, నికర యూనిట్లు చూపిస్తుంది" }, { en: "Fixed charges stay", te: "ఫిక్స్‌డ్ చార్జీలు ఉంటాయి" }, { en: "Extra units settled as per current rules [VERIFY]", te: "అదనపు యూనిట్లు ప్రస్తుత నియమాల ప్రకారం [VERIFY]" }] },
    ],
    metaEn: "How TGSPDCL net metering works in Hyderabad: import, export, your new bill and steps.",
    metaTe: "హైదరాబాద్‌లో TGSPDCL నెట్ మీటరింగ్: దిగుమతి, ఎగుమతి, కొత్త బిల్, స్టెప్స్.",
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
