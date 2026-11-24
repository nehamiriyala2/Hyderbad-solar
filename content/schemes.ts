import type { L } from "@/lib/i18n";
import type { IconName } from "@/components/Icon";

// Every scheme page uses the SAME template:
// What is it → Who can apply → Benefit in numbers → Documents → Steps → How it helps in Hyderabad → Common mistakes → FAQ → CTA
// All amounts/rules are marked [VERIFY]. Check official sources before launch.

export type Scheme = {
  slug: string;
  icon: IconName;
  name: L;
  short: L; // card line
  what: L; // 1 line
  who: L[];
  benefits: { label: L; value: L }[];
  docs: L[];
  steps: { icon: IconName; title: L; text: L }[];
  helps: L[];
  mistakes: L[];
  faq: { q: L; a: L }[];
  official?: { label: string; url: string };
  metaEn: string;
  metaTe: string;
};

const BILL: L = { en: "Latest electricity bill", te: "తాజా కరెంట్ బిల్" };
const AADHAAR: L = { en: "Aadhaar card", te: "ఆధార్ కార్డ్" };
const BANK: L = { en: "Bank passbook / cancelled cheque", te: "బ్యాంక్ పాస్‌బుక్ / క్యాన్సిల్ చెక్" };

export const SCHEMES: Scheme[] = [
  {
    slug: "pm-surya-ghar",
    icon: "BadgeCheck",
    name: { en: "PM Surya Ghar", te: "పీఎం సూర్య ఘర్" },
    short: { en: "Central subsidy for home rooftop solar.", te: "ఇంటి రూఫ్‌టాప్ సోలార్‌కు కేంద్ర సబ్సిడీ." },
    what: { en: "A central government scheme that pays part of the cost of rooftop solar on homes.", te: "ఇళ్లపై రూఫ్‌టాప్ సోలార్ ఖర్చులో కొంత భాగం కేంద్ర ప్రభుత్వం చెల్లించే స్కీమ్." },
    who: [
      { en: "Home (domestic) electricity connection in your name", te: "మీ పేరుపై ఇంటి (డొమెస్టిక్) కరెంట్ కనెక్షన్" },
      { en: "Your own roof with space for panels", te: "ప్యానెల్స్‌కు స్థలం ఉన్న సొంత పైకప్పు" },
      { en: "No earlier solar subsidy on this connection", te: "ఈ కనెక్షన్‌పై ఇంతకుముందు సోలార్ సబ్సిడీ తీసుకోలేదు" },
      { en: "Housing societies (RWA) for common areas", te: "కామన్ ఏరియాకు హౌసింగ్ సొసైటీలు (RWA)" },
    ],
    benefits: [
      { label: { en: "1 kW", te: "1 kW" }, value: { en: "₹30,000 [VERIFY]", te: "₹30,000 [VERIFY]" } },
      { label: { en: "2 kW", te: "2 kW" }, value: { en: "₹60,000 [VERIFY]", te: "₹60,000 [VERIFY]" } },
      { label: { en: "3 kW or more", te: "3 kW లేదా ఎక్కువ" }, value: { en: "₹78,000 max [VERIFY]", te: "గరిష్టం ₹78,000 [VERIFY]" } },
      { label: { en: "Society common area", te: "సొసైటీ కామన్ ఏరియా" }, value: { en: "₹18,000 per kW [VERIFY]", te: "kW కి ₹18,000 [VERIFY]" } },
    ],
    docs: [BILL, AADHAAR, BANK, { en: "Property tax receipt / ownership proof", te: "ఆస్తి పన్ను రసీదు / యాజమాన్య ఆధారం" }, { en: "Roof photo", te: "పైకప్పు ఫోటో" }, { en: "Mobile number linked to Aadhaar", te: "ఆధార్‌కు లింక్ అయిన మొబైల్ నంబర్" }],
    steps: [
      { icon: "Globe", title: { en: "Register on the portal", te: "పోర్టల్‌లో రిజిస్టర్" }, text: { en: "pmsuryaghar.gov.in with your consumer number.", te: "మీ కన్స్యూమర్ నంబర్‌తో pmsuryaghar.gov.in లో." } },
      { icon: "FileCheck", title: { en: "DISCOM approval", te: "డిస్కమ్ ఆమోదం" }, text: { en: "TGSPDCL checks feasibility.", te: "TGSPDCL సాధ్యాసాధ్యాలు చూస్తుంది." } },
      { icon: "Wrench", title: { en: "Install by registered vendor", te: "రిజిస్టర్డ్ వెండర్ ఇన్‌స్టాల్" }, text: { en: "Approved panels and inverter.", te: "ఆమోదిత ప్యానెల్స్, ఇన్వర్టర్." } },
      { icon: "Gauge", title: { en: "Net meter + inspection", te: "నెట్ మీటర్ + తనిఖీ" }, text: { en: "DISCOM fits meter and inspects.", te: "డిస్కమ్ మీటర్ పెట్టి తనిఖీ చేస్తుంది." } },
      { icon: "Banknote", title: { en: "Subsidy to your bank", te: "మీ బ్యాంక్‌లో సబ్సిడీ" }, text: { en: "Paid after commissioning. [VERIFY timeline]", te: "కమిషనింగ్ తర్వాత జమ. [VERIFY timeline]" } },
    ],
    helps: [
      { en: "Cuts the cost of a 3 kW home system by about a third or more [VERIFY]", te: "3 kW ఇంటి సిస్టమ్ ఖర్చు సుమారు మూడో వంతు లేదా ఎక్కువ తగ్గుతుంది [VERIFY]" },
      { en: "Works with TGSPDCL net metering, so extra units cut your bill", te: "TGSPDCL నెట్ మీటరింగ్‌తో పని చేస్తుంది, అదనపు యూనిట్లు బిల్ తగ్గిస్తాయి" },
      { en: "Low-interest loans may be available for small systems [VERIFY]", te: "చిన్న సిస్టమ్‌లకు తక్కువ వడ్డీ లోన్లు ఉండొచ్చు [VERIFY]" },
    ],
    mistakes: [
      { en: "Installing first, applying later (subsidy may be lost)", te: "ముందు ఇన్‌స్టాల్, తర్వాత దరఖాస్తు (సబ్సిడీ పోవచ్చు)" },
      { en: "Using a vendor not registered on the portal", te: "పోర్టల్‌లో రిజిస్టర్ కాని వెండర్‌ను వాడటం" },
      { en: "Name on bill ≠ name on bank account", te: "బిల్‌పై పేరు ≠ బ్యాంక్ ఖాతాలో పేరు" },
      { en: "Choosing a size above your sanctioned load", te: "శాంక్షన్డ్ లోడ్ కంటే పెద్ద సైజ్ ఎంచుకోవడం" },
    ],
    faq: [
      { q: { en: "Is there subsidy above 3 kW?", te: "3 kW పైన సబ్సిడీ ఉందా?" }, a: { en: "Subsidy stops growing at 3 kW (₹78,000 max). You can still install more. [VERIFY]", te: "3 kW వద్ద సబ్సిడీ ఆగిపోతుంది (గరిష్టం ₹78,000). ఎక్కువ పెట్టుకోవచ్చు. [VERIFY]" } },
      { q: { en: "Can tenants apply?", te: "అద్దెదారులు దరఖాస్తు చేయొచ్చా?" }, a: { en: "The connection and roof belong to the owner, so usually the owner applies.", te: "కనెక్షన్, పైకప్పు యజమానివి, కాబట్టి సాధారణంగా యజమాని దరఖాస్తు చేస్తారు." } },
      { q: { en: "How long does the subsidy take?", te: "సబ్సిడీ ఎంత కాలంలో వస్తుంది?" }, a: { en: "Usually a few weeks after commissioning. We track it with you. [VERIFY]", te: "సాధారణంగా కమిషనింగ్ తర్వాత కొన్ని వారాల్లో. మేము ట్రాక్ చేస్తాం. [VERIFY]" } },
    ],
    official: { label: "pmsuryaghar.gov.in", url: "https://pmsuryaghar.gov.in" },
    metaEn: "PM Surya Ghar subsidy in Hyderabad explained simply: who can apply, how much (up to ₹78,000), documents and steps.",
    metaTe: "హైదరాబాద్‌లో పీఎం సూర్య ఘర్ సబ్సిడీ: ఎవరు, ఎంత, పత్రాలు, స్టెప్స్.",
  },
  {
    slug: "net-metering",
    icon: "Gauge",
    name: { en: "Net metering (TGSPDCL)", te: "నెట్ మీటరింగ్ (TGSPDCL)" },
    short: { en: "Extra solar units reduce your bill.", te: "అదనపు సోలార్ యూనిట్లు మీ బిల్ తగ్గిస్తాయి." },
    what: { en: "A two-way meter from TGSPDCL that subtracts the units you send to the grid from the units you take.", te: "మీరు గ్రిడ్‌కు ఇచ్చిన యూనిట్లను తీసుకున్న యూనిట్ల నుంచి తీసేసే TGSPDCL రెండు వైపుల మీటర్." },
    who: [
      { en: "Any TGSPDCL consumer: home, shop, institution", te: "ఏ TGSPDCL వినియోగదారుడైనా: ఇల్లు, షాప్, సంస్థ" },
      { en: "Solar size within your sanctioned load [VERIFY limit]", te: "మీ శాంక్షన్డ్ లోడ్‌లోపు సోలార్ సైజ్ [VERIFY limit]" },
      { en: "Grid-connected (on-grid or hybrid) system", te: "గ్రిడ్‌కు కలిపిన (ఆన్-గ్రిడ్ లేదా హైబ్రిడ్) సిస్టమ్" },
    ],
    benefits: [
      { label: { en: "Example: solar made", te: "ఉదాహరణ: సోలార్ తయారీ" }, value: { en: "360 units", te: "360 యూనిట్లు" } },
      { label: { en: "You used", te: "మీరు వాడింది" }, value: { en: "400 units", te: "400 యూనిట్లు" } },
      { label: { en: "You pay for", te: "మీరు చెల్లించేది" }, value: { en: "only 40 units*", te: "40 యూనిట్లకే*" } },
      { label: { en: "Extra units", te: "అదనపు యూనిట్లు" }, value: { en: "Carried / settled as per TGSPDCL rules [VERIFY]", te: "TGSPDCL నియమాల ప్రకారం సర్దుబాటు [VERIFY]" } },
    ],
    docs: [BILL, AADHAAR, { en: "Solar system details from vendor", te: "వెండర్ నుంచి సోలార్ సిస్టమ్ వివరాలు" }, { en: "Application form + fee [VERIFY]", te: "దరఖాస్తు ఫారం + ఫీజు [VERIFY]" }],
    steps: [
      { icon: "FileText", title: { en: "Apply to TGSPDCL", te: "TGSPDCL కి దరఖాస్తు" }, text: { en: "Online or via your vendor.", te: "ఆన్‌లైన్ లేదా వెండర్ ద్వారా." } },
      { icon: "ClipboardCheck", title: { en: "Feasibility check", te: "సాధ్యాసాధ్యాల చెక్" }, text: { en: "DISCOM checks your line and transformer.", te: "డిస్కమ్ మీ లైన్, ట్రాన్స్‌ఫార్మర్ చెక్ చేస్తుంది." } },
      { icon: "Wrench", title: { en: "Install solar", te: "సోలార్ ఇన్‌స్టాల్" }, text: { en: "As per approved design.", te: "ఆమోదిత డిజైన్ ప్రకారం." } },
      { icon: "Gauge", title: { en: "Meter fixed", te: "మీటర్ పెడతారు" }, text: { en: "Bi-directional meter + inspection.", te: "రెండు వైపుల మీటర్ + తనిఖీ." } },
      { icon: "Receipt", title: { en: "New bill", te: "కొత్త బిల్" }, text: { en: "Shows import, export and net units.", te: "దిగుమతి, ఎగుమతి, నికర యూనిట్లు చూపిస్తుంది." } },
    ],
    helps: [
      { en: "No battery needed: the grid works like your 'free battery'", te: "బ్యాటరీ అక్కర్లేదు: గ్రిడ్ మీ 'ఉచిత బ్యాటరీ' లాగా" },
      { en: "Day units credited against night use", te: "పగటి యూనిట్లు రాత్రి వాడకానికి జమ" },
      { en: "Needed to get PM Surya Ghar subsidy", te: "పీఎం సూర్య ఘర్ సబ్సిడీకి అవసరం" },
    ],
    mistakes: [
      { en: "Putting solar bigger than sanctioned load without upgrading load", te: "లోడ్ పెంచకుండా శాంక్షన్డ్ లోడ్ కంటే పెద్ద సోలార్" },
      { en: "Switching on solar before the net meter is fixed", te: "నెట్ మీటర్ పెట్టకముందే సోలార్ ఆన్ చేయడం" },
      { en: "Not checking export units on the bill each month", te: "ప్రతి నెల బిల్‌పై ఎగుమతి యూనిట్లు చూడకపోవడం" },
    ],
    faq: [
      { q: { en: "How long does net metering take in Hyderabad?", te: "హైదరాబాద్‌లో నెట్ మీటరింగ్‌కు ఎంత సమయం?" }, a: { en: "Often a few weeks from application to meter. Timelines vary by division. [VERIFY]", te: "దరఖాస్తు నుంచి మీటర్ వరకు సాధారణంగా కొన్ని వారాలు. డివిజన్ బట్టి మారుతుంది. [VERIFY]" } },
      { q: { en: "Do I get money for extra units?", te: "అదనపు యూనిట్లకు డబ్బు వస్తుందా?" }, a: { en: "Extra units are adjusted/settled as per TGSPDCL and TGERC rules. We explain the current rule. [VERIFY]", te: "అదనపు యూనిట్లు TGSPDCL, TGERC నియమాల ప్రకారం సర్దుబాటు అవుతాయి. ప్రస్తుత నియమం చెబుతాం. [VERIFY]" } },
      { q: { en: "* Why do I still pay something?", te: "* ఇంకా ఎందుకు కొంత చెల్లించాలి?" }, a: { en: "Fixed / customer charges stay on the bill even with solar.", te: "సోలార్ ఉన్నా ఫిక్స్‌డ్ / కస్టమర్ చార్జీలు బిల్‌లో ఉంటాయి." } },
    ],
    official: { label: "tgsouthernpower.org", url: "https://tgsouthernpower.org" },
    metaEn: "Net metering in Hyderabad (TGSPDCL) explained: how extra solar units cut your bill, approvals, meter and timeline.",
    metaTe: "హైదరాబాద్ నెట్ మీటరింగ్ (TGSPDCL): అదనపు యూనిట్లు బిల్ ఎలా తగ్గిస్తాయి, అనుమతులు, మీటర్.",
  },
  {
    slug: "pm-kusum",
    icon: "Droplets",
    name: { en: "PM-KUSUM", te: "పీఎం-కుసుమ్" },
    short: { en: "Solar pumps and farm solar.", te: "సోలార్ పంపులు, వ్యవసాయ సోలార్." },
    what: { en: "A central scheme that supports solar water pumps and solar on farm land.", te: "సోలార్ నీటి పంపులు, వ్యవసాయ భూమిపై సోలార్‌కు సహాయం చేసే కేంద్ర స్కీమ్." },
    who: [
      { en: "Farmers with agricultural land", te: "వ్యవసాయ భూమి ఉన్న రైతులు" },
      { en: "Borewell / pump users (diesel or grid)", te: "బోర్‌వెల్ / పంపు వాడేవారు (డీజిల్ లేదా గ్రిడ్)" },
      { en: "Farmer groups, cooperatives, FPOs", te: "రైతు గ్రూపులు, సహకార సంఘాలు, FPO లు" },
    ],
    benefits: [
      { label: { en: "Standalone solar pump", te: "స్వతంత్ర సోలార్ పంపు" }, value: { en: "Central + state share part of cost [VERIFY]", te: "కేంద్రం + రాష్ట్రం ఖర్చులో భాగం [VERIFY]" } },
      { label: { en: "Pump size", te: "పంపు సైజ్" }, value: { en: "Up to 7.5 HP [VERIFY]", te: "7.5 HP వరకు [VERIFY]" } },
      { label: { en: "Grid pump solarisation", te: "గ్రిడ్ పంపు సోలరైజేషన్" }, value: { en: "Sell extra power to DISCOM [VERIFY]", te: "అదనపు కరెంట్ డిస్కమ్‌కు అమ్మడం [VERIFY]" } },
      { label: { en: "Telangana status", te: "తెలంగాణ స్థితి" }, value: { en: "Check current state rollout [VERIFY]", te: "ప్రస్తుత రాష్ట్ర అమలు చూడాలి [VERIFY]" } },
    ],
    docs: [AADHAAR, BANK, { en: "Pattadar passbook / land records", te: "పట్టాదార్ పాస్‌బుక్ / భూమి రికార్డులు" }, { en: "Borewell / water source details", te: "బోర్‌వెల్ / నీటి వనరు వివరాలు" }, { en: "Passport photo", te: "పాస్‌పోర్ట్ ఫోటో" }],
    steps: [
      { icon: "Search", title: { en: "Check if open", te: "తెరిచి ఉందో చూడండి" }, text: { en: "State agency (TGREDCO) announces slots.", te: "రాష్ట్ర సంస్థ (TGREDCO) స్లాట్లు ప్రకటిస్తుంది." } },
      { icon: "FileText", title: { en: "Apply", te: "దరఖాస్తు" }, text: { en: "With land and bank documents.", te: "భూమి, బ్యాంక్ పత్రాలతో." } },
      { icon: "Wallet", title: { en: "Pay farmer share", te: "రైతు వాటా చెల్లింపు" }, text: { en: "After selection. [VERIFY]", te: "ఎంపిక తర్వాత. [VERIFY]" } },
      { icon: "Wrench", title: { en: "Pump installed", te: "పంపు ఇన్‌స్టాల్" }, text: { en: "By empanelled vendor.", te: "ఎంపానెల్డ్ వెండర్ ద్వారా." } },
      { icon: "Droplets", title: { en: "Free daytime water", te: "పగలు ఉచిత నీళ్లు" }, text: { en: "No diesel, no pump bill.", te: "డీజిల్ లేదు, పంపు బిల్ లేదు." } },
    ],
    helps: [
      { en: "Outskirts farms around Hyderabad (Shamshabad, Medchal, Shankarpally side) can pump water without power cuts", te: "హైదరాబాద్ చుట్టూ శివారు పొలాలు (శంషాబాద్, మేడ్చల్, శంకర్‌పల్లి వైపు) కరెంట్ కోతలు లేకుండా నీళ్లు తోడుకోవచ్చు" },
      { en: "Cuts diesel cost to almost zero", te: "డీజిల్ ఖర్చు దాదాపు సున్నా" },
      { en: "Farmhouse owners: pair pump with hybrid home system", te: "ఫామ్‌హౌస్ యజమానులు: పంపుతో పాటు హైబ్రిడ్ ఇంటి సిస్టమ్" },
    ],
    mistakes: [
      { en: "Paying agents who promise 'guaranteed' selection", te: "'గ్యారంటీ' ఎంపిక అని చెప్పే ఏజెంట్లకు డబ్బు ఇవ్వడం" },
      { en: "Wrong pump size for borewell depth", te: "బోర్‌వెల్ లోతుకు తప్పు పంపు సైజ్" },
      { en: "Land records not updated in your name", te: "భూమి రికార్డులు మీ పేరుపై అప్‌డేట్ కాకపోవడం" },
    ],
    faq: [
      { q: { en: "Is PM-KUSUM open in Telangana now?", te: "ఇప్పుడు తెలంగాణలో కుసుమ్ తెరిచి ఉందా?" }, a: { en: "It depends on the current state rollout. Message us and we check the latest. [VERIFY]", te: "ప్రస్తుత రాష్ట్ర అమలుపై ఆధారపడుతుంది. మెసేజ్ చేయండి, తాజా సమాచారం చూస్తాం. [VERIFY]" } },
      { q: { en: "Not eligible? Any other option?", te: "అర్హత లేదా? వేరే మార్గం?" }, a: { en: "Yes, a self-funded solar pump or hybrid system with a bank loan.", te: "అవును, బ్యాంక్ లోన్‌తో సొంత ఖర్చుతో సోలార్ పంపు లేదా హైబ్రిడ్ సిస్టమ్." } },
    ],
    official: { label: "pmkusum.mnre.gov.in", url: "https://pmkusum.mnre.gov.in" },
    metaEn: "PM-KUSUM solar pumps for farms around Hyderabad: who qualifies, benefits, documents and steps.",
    metaTe: "హైదరాబాద్ చుట్టూ పొలాలకు పీఎం-కుసుమ్ సోలార్ పంపులు: అర్హత, లాభాలు, పత్రాలు.",
  },
  {
    slug: "gruha-jyothi-and-solar",
    icon: "Lightbulb",
    name: { en: "Gruha Jyothi & solar", te: "గృహ జ్యోతి & సోలార్" },
    short: { en: "Get free units? Here is when solar still makes sense.", te: "ఉచిత యూనిట్లు వస్తున్నాయా? సోలార్ ఎప్పుడు అర్థవంతమో చూడండి." },
    what: { en: "An honest guide: if you get Telangana's free-units benefit, should you still go solar?", te: "నిజాయితీ గైడ్: తెలంగాణ ఉచిత యూనిట్ల లాభం వస్తుంటే, సోలార్ ఇంకా అవసరమా?" },
    who: [
      { en: "Homes getting Gruha Jyothi free units (up to 200/month) [VERIFY rules]", te: "గృహ జ్యోతి ఉచిత యూనిట్లు (నెలకు 200 వరకు) పొందే ఇళ్లు [VERIFY rules]" },
      { en: "Homes near or above 200 units in summer", te: "వేసవిలో 200 యూనిట్లకు దగ్గరగా లేదా పైన వాడే ఇళ్లు" },
      { en: "Families planning an AC, EV or more members", te: "ఏసీ, EV లేదా ఎక్కువ మంది సభ్యులు ప్లాన్ చేస్తున్న కుటుంబాలు" },
    ],
    benefits: [
      { label: { en: "Always under 200 units", te: "ఎప్పుడూ 200 లోపు" }, value: { en: "Solar may not be needed yet", te: "సోలార్ ఇప్పుడే అవసరం లేకపోవచ్చు" } },
      { label: { en: "Above 200 in summer", te: "వేసవిలో 200 పైన" }, value: { en: "Solar can protect you from big bills [VERIFY]", te: "పెద్ద బిల్లుల నుంచి సోలార్ కాపాడుతుంది [VERIFY]" } },
      { label: { en: "Always 300+ units", te: "ఎప్పుడూ 300+" }, value: { en: "Solar usually worth it", te: "సోలార్ సాధారణంగా విలువైనది" } },
      { label: { en: "Solar + scheme together", te: "సోలార్ + స్కీమ్ కలిసి" }, value: { en: "Check how net units affect eligibility [VERIFY]", te: "నికర యూనిట్లు అర్హతపై ఎలా ప్రభావం చూపుతాయో చూడాలి [VERIFY]" } },
    ],
    docs: [BILL, { en: "Last 12 months' unit usage (from bills / TGSPDCL app)", te: "గత 12 నెలల యూనిట్ వాడకం (బిల్లులు / TGSPDCL యాప్)" }, { en: "Gruha Jyothi status (if applicable)", te: "గృహ జ్యోతి స్థితి (ఉంటే)" }],
    steps: [
      { icon: "Receipt", title: { en: "Check 12 months", te: "12 నెలలు చూడండి" }, text: { en: "Note your highest-unit months.", te: "ఎక్కువ యూనిట్ల నెలలు గుర్తించండి." } },
      { icon: "Calculator", title: { en: "Find the gap", te: "తేడా కనుగొనండి" }, text: { en: "How many months go above 200?", te: "ఎన్ని నెలలు 200 దాటుతాయి?" } },
      { icon: "MessageCircle", title: { en: "Ask us honestly", te: "మమ్మల్ని అడగండి" }, text: { en: "We tell you if solar is worth it now.", te: "సోలార్ ఇప్పుడు విలువైనదా నిజంగా చెబుతాం." } },
      { icon: "Sun", title: { en: "Right-size solar", te: "సరైన సైజ్ సోలార్" }, text: { en: "Small system for summer peaks.", te: "వేసవి పీక్‌కు చిన్న సిస్టమ్." } },
    ],
    helps: [
      { en: "Summer AC use often pushes Hyderabad homes past 200 units", te: "వేసవిలో ఏసీ వాడకం హైదరాబాద్ ఇళ్లను 200 యూనిట్లు దాటిస్తుంది" },
      { en: "Solar protects you if scheme rules change in future", te: "భవిష్యత్తులో స్కీమ్ నియమాలు మారినా సోలార్ కాపాడుతుంది" },
      { en: "We will tell you if you don't need solar yet", te: "మీకు ఇప్పుడు సోలార్ అవసరం లేకపోతే చెబుతాం" },
    ],
    mistakes: [
      { en: "Buying a big system when bill is already near zero", te: "బిల్ దాదాపు సున్నా ఉన్నప్పుడు పెద్ద సిస్టమ్ కొనడం" },
      { en: "Not checking summer months (look at all 12)", te: "వేసవి నెలలు చూడకపోవడం (12 నెలలూ చూడండి)" },
      { en: "Assuming scheme rules stay the same forever", te: "స్కీమ్ నియమాలు ఎప్పుడూ అలాగే ఉంటాయనుకోవడం" },
    ],
    faq: [
      { q: { en: "Will I lose Gruha Jyothi if I install solar?", te: "సోలార్ పెడితే గృహ జ్యోతి పోతుందా?" }, a: { en: "This depends on current state rules. Please check before installing; we help you confirm. [VERIFY]", te: "ఇది ప్రస్తుత రాష్ట్ర నియమాలపై ఆధారపడుతుంది. ఇన్‌స్టాల్ ముందు చెక్ చేయండి; మేము సాయం చేస్తాం. [VERIFY]" } },
      { q: { en: "What happens above 200 units?", te: "200 యూనిట్లు దాటితే ఏమవుతుంది?" }, a: { en: "Check how your bill is charged when you cross the limit; it can be a big jump. [VERIFY]", te: "పరిమితి దాటితే బిల్ ఎలా వేస్తారో చూడండి; పెద్ద తేడా ఉండొచ్చు. [VERIFY]" } },
    ],
    metaEn: "Gruha Jyothi free electricity and rooftop solar in Hyderabad: an honest guide to who benefits and who may not need solar yet.",
    metaTe: "గృహ జ్యోతి ఉచిత కరెంట్, సోలార్: ఎవరికి లాభం, ఎవరికి ఇప్పుడే అవసరం లేదు — నిజాయితీ గైడ్.",
  },
  {
    slug: "telangana-state-and-ghmc-support",
    icon: "Landmark",
    name: { en: "Telangana & GHMC support", te: "తెలంగాణ & GHMC సహాయం" },
    short: { en: "State programmes and building permissions.", te: "రాష్ట్ర కార్యక్రమాలు, భవన అనుమతులు." },
    what: { en: "State renewable energy programmes (TGREDCO) and the city rules (GHMC/HMDA) that matter for rooftop solar.", te: "రూఫ్‌టాప్ సోలార్‌కు ముఖ్యమైన రాష్ట్ర కార్యక్రమాలు (TGREDCO), నగర నియమాలు (GHMC/HMDA)." },
    who: [
      { en: "All Hyderabad homes, apartments and businesses", te: "హైదరాబాద్‌లో అన్ని ఇళ్లు, అపార్ట్‌మెంట్లు, వ్యాపారాలు" },
      { en: "New buildings planning solar at construction", te: "నిర్మాణ సమయంలోనే సోలార్ ప్లాన్ చేసే కొత్త భవనాలు" },
      { en: "Government / public buildings via TGREDCO", te: "TGREDCO ద్వారా ప్రభుత్వ / ప్రజా భవనాలు" },
    ],
    benefits: [
      { label: { en: "TGREDCO", te: "TGREDCO" }, value: { en: "State nodal agency for solar programmes [EDIT after checking]", te: "సోలార్ కార్యక్రమాలకు రాష్ట్ర నోడల్ సంస్థ [EDIT]" } },
      { label: { en: "Rooftop permission", te: "రూఫ్‌టాప్ అనుమతి" }, value: { en: "Usually no separate building permit for normal panels [VERIFY]", te: "సాధారణ ప్యానెల్స్‌కు సాధారణంగా ప్రత్యేక అనుమతి అక్కర్లేదు [VERIFY]" } },
      { label: { en: "State incentives", te: "రాష్ట్ర ప్రోత్సాహకాలు" }, value: { en: "Any current state top-up [EDIT after checking]", te: "ప్రస్తుత రాష్ట్ర అదనపు సహాయం [EDIT]" } },
    ],
    docs: [BILL, { en: "Building approval / plan (for raised structures)", te: "భవన అనుమతి / ప్లాన్ (ఎత్తైన స్ట్రక్చర్లకు)" }, { en: "Association NOC (apartments)", te: "అసోసియేషన్ NOC (అపార్ట్‌మెంట్లు)" }],
    steps: [
      { icon: "Search", title: { en: "Check building type", te: "భవన రకం చూడండి" }, text: { en: "House, apartment or commercial.", te: "ఇల్లు, అపార్ట్‌మెంట్ లేదా వ్యాపారం." } },
      { icon: "Ruler", title: { en: "Structure safety", te: "స్ట్రక్చర్ భద్రత" }, text: { en: "Roof load and wind design checked.", te: "పైకప్పు బరువు, గాలి డిజైన్ చెక్." } },
      { icon: "FileCheck", title: { en: "NOCs if needed", te: "అవసరమైతే NOC లు" }, text: { en: "Association / owner consent.", te: "అసోసియేషన్ / యజమాని అనుమతి." } },
      { icon: "Gauge", title: { en: "DISCOM process", te: "డిస్కమ్ ప్రక్రియ" }, text: { en: "Net metering with TGSPDCL.", te: "TGSPDCL తో నెట్ మీటరింగ్." } },
    ],
    helps: [
      { en: "Avoids trouble with raised structures on tall buildings", te: "ఎత్తైన భవనాలపై స్ట్రక్చర్లతో ఇబ్బందులు తప్పుతాయి" },
      { en: "New construction can plan conduits and roof space early", te: "కొత్త నిర్మాణంలో ముందే వైరింగ్, పైకప్పు స్థలం ప్లాన్ చేయొచ్చు" },
      { en: "We track state announcements so you don't miss them", te: "రాష్ట్ర ప్రకటనలు మేము చూస్తాం, మీరు మిస్ అవ్వరు" },
    ],
    mistakes: [
      { en: "Very tall structures without checking rules", te: "నియమాలు చూడకుండా చాలా ఎత్తైన స్ట్రక్చర్లు" },
      { en: "Ignoring wind load (Hyderabad gets strong pre-monsoon winds)", te: "గాలి బరువు పట్టించుకోకపోవడం (హైదరాబాద్‌లో వర్షాకాలం ముందు బలమైన గాలులు)" },
      { en: "No written consent from co-owners", te: "సహ-యజమానుల రాతపూర్వక అనుమతి లేకపోవడం" },
    ],
    faq: [
      { q: { en: "Do I need GHMC approval for rooftop solar?", te: "రూఫ్‌టాప్ సోలార్‌కు GHMC అనుమతి కావాలా?" }, a: { en: "Normal rooftop panels usually don't, but rules can differ for high structures. We check. [VERIFY]", te: "సాధారణ ప్యానెల్స్‌కు సాధారణంగా అక్కర్లేదు, ఎత్తైన స్ట్రక్చర్లకు నియమాలు వేరు. మేము చూస్తాం. [VERIFY]" } },
      { q: { en: "Is there extra state subsidy on top of central?", te: "కేంద్రానికి అదనంగా రాష్ట్ర సబ్సిడీ ఉందా?" }, a: { en: "Not that we can confirm right now. We update this page when it changes. [EDIT]", te: "ఇప్పుడు మేము నిర్ధారించగలిగింది లేదు. మారితే అప్‌డేట్ చేస్తాం. [EDIT]" } },
    ],
    official: { label: "tgredco.telangana.gov.in [VERIFY URL]", url: "https://tgredco.telangana.gov.in" },
    metaEn: "Telangana (TGREDCO) solar programmes and GHMC/HMDA rooftop rules for Hyderabad, explained simply.",
    metaTe: "తెలంగాణ (TGREDCO) సోలార్ కార్యక్రమాలు, GHMC/HMDA రూఫ్‌టాప్ నియమాలు.",
  },
  {
    slug: "commercial-benefits",
    icon: "HandCoins",
    name: { en: "Business benefits (shops & MSME)", te: "వ్యాపార లాభాలు (షాపులు & MSME)" },
    short: { en: "Tax benefits and loans for shops.", te: "షాపులకు పన్ను లాభాలు, లోన్లు." },
    what: { en: "Shops and businesses don't get the home subsidy, but can save through tax benefits and solar loans.", te: "షాపులు, వ్యాపారాలకు ఇంటి సబ్సిడీ రాదు, కానీ పన్ను లాభాలు, సోలార్ లోన్లతో ఆదా చేయొచ్చు." },
    who: [
      { en: "Shops, offices, clinics, restaurants", te: "షాపులు, ఆఫీసులు, క్లినిక్‌లు, రెస్టారెంట్లు" },
      { en: "MSMEs and small factories", te: "MSME లు, చిన్న ఫ్యాక్టరీలు" },
      { en: "Businesses that file income tax / GST", te: "ఆదాయ పన్ను / GST ఫైల్ చేసే వ్యాపారాలు" },
    ],
    benefits: [
      { label: { en: "Depreciation", te: "తరుగుదల" }, value: { en: "Higher depreciation rate for solar [VERIFY with CA]", te: "సోలార్‌కు ఎక్కువ తరుగుదల రేటు [VERIFY with CA]" } },
      { label: { en: "GST", te: "GST" }, value: { en: "Input tax credit may apply [VERIFY with CA]", te: "ఇన్‌పుట్ ట్యాక్స్ క్రెడిట్ ఉండొచ్చు [VERIFY with CA]" } },
      { label: { en: "Loans", te: "లోన్లు" }, value: { en: "Bank / MSME solar loans [VERIFY]", te: "బ్యాంక్ / MSME సోలార్ లోన్లు [VERIFY]" } },
      { label: { en: "Tariff saving", te: "టారిఫ్ ఆదా" }, value: { en: "Commercial units cost more, so each saved unit is worth more [VERIFY]", te: "వ్యాపార యూనిట్ ధర ఎక్కువ, ప్రతి ఆదా యూనిట్ విలువ ఎక్కువ [VERIFY]" } },
    ],
    docs: [BILL, { en: "PAN + GST certificate", te: "పాన్ + GST సర్టిఫికెట్" }, { en: "Trade licence", te: "ట్రేడ్ లైసెన్స్" }, { en: "Last 2 years' ITR / bank statement (for loans)", te: "గత 2 ఏళ్ల ITR / బ్యాంక్ స్టేట్‌మెంట్ (లోన్లకు)" }, { en: "Owner consent if rented", te: "అద్దె అయితే యజమాని అనుమతి" }],
    steps: [
      { icon: "Calculator", title: { en: "Size from bill", te: "బిల్ నుంచి సైజ్" }, text: { en: "Use our shop calculator.", te: "మా షాప్ కాలిక్యులేటర్ వాడండి." } },
      { icon: "Scale", title: { en: "Talk to your CA", te: "మీ CA తో మాట్లాడండి" }, text: { en: "Confirm tax benefit for you.", te: "మీకు పన్ను లాభం నిర్ధారించండి." } },
      { icon: "Banknote", title: { en: "Pick finance", te: "ఫైనాన్స్ ఎంచుకోండి" }, text: { en: "Cash, bank loan or MSME loan.", te: "నగదు, బ్యాంక్ లోన్ లేదా MSME లోన్." } },
      { icon: "Wrench", title: { en: "Install + net meter", te: "ఇన్‌స్టాల్ + నెట్ మీటర్" }, text: { en: "On your commercial connection.", te: "మీ వ్యాపార కనెక్షన్‌పై." } },
    ],
    helps: [
      { en: "Busy markets like Begum Bazaar, Koti, Ameerpet run mostly in daytime", te: "బేగం బజార్, కోఠి, అమీర్‌పేట్ వంటి మార్కెట్లు ఎక్కువగా పగలు నడుస్తాయి" },
      { en: "Payback is often faster than homes [VERIFY]", te: "పెట్టుబడి తరచూ ఇళ్ల కంటే వేగంగా తిరిగి వస్తుంది [VERIFY]" },
      { en: "EMI can be close to monthly saving", te: "EMI నెల ఆదాకు దగ్గరగా ఉండొచ్చు" },
    ],
    mistakes: [
      { en: "Claiming tax benefits without a CA's advice", te: "CA సలహా లేకుండా పన్ను లాభాలు క్లెయిమ్ చేయడం" },
      { en: "No written OK from the building owner", te: "భవన యజమాని రాతపూర్వక అనుమతి లేకపోవడం" },
      { en: "Sizing for night load (solar works in the day)", te: "రాత్రి లోడ్‌కు సైజ్ చేయడం (సోలార్ పగలు పని చేస్తుంది)" },
    ],
    faq: [
      { q: { en: "Is there any subsidy for shops?", te: "షాపులకు ఏదైనా సబ్సిడీ ఉందా?" }, a: { en: "The central home subsidy does not apply. Some state or bank offers may exist. [VERIFY]", te: "కేంద్ర ఇంటి సబ్సిడీ వర్తించదు. కొన్ని రాష్ట్ర లేదా బ్యాంక్ ఆఫర్లు ఉండొచ్చు. [VERIFY]" } },
      { q: { en: "Which banks give solar loans?", te: "ఏ బ్యాంకులు సోలార్ లోన్లు ఇస్తాయి?" }, a: { en: "Many public and private banks have solar or MSME loans. Ask your own bank first. [VERIFY]", te: "చాలా ప్రభుత్వ, ప్రైవేట్ బ్యాంకులకు సోలార్ లేదా MSME లోన్లు ఉన్నాయి. ముందు మీ బ్యాంక్‌ను అడగండి. [VERIFY]" } },
    ],
    metaEn: "Solar business benefits for Hyderabad shops and MSMEs: depreciation, GST, loans and net metering.",
    metaTe: "హైదరాబాద్ షాపులు, MSME లకు సోలార్ వ్యాపార లాభాలు: తరుగుదల, GST, లోన్లు.",
  },
];

export const getScheme = (slug: string) => SCHEMES.find((s) => s.slug === slug);
