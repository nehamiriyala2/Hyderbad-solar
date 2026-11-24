import type { L } from "@/lib/i18n";
import type { IconName } from "@/components/Icon";
import type { Place, Use } from "@/lib/solar";

export type Segment = {
  slug: string;
  icon: IconName;
  title: L;
  sub: L;
  metaEn: string;
  metaTe: string;
  isThisYou: L[];
  system: { name: L; size: L; why: L[] };
  calc: { place: Place; use: Use; powerCuts?: boolean; bills: number[]; example: number };
  schemes: string[];
  extra?: { title: L; steps: { icon: IconName; title: L; text: L }[] };
  faq: { q: L; a: L }[];
  wa: string;
};

export const SEGMENTS: Segment[] = [
  {
    slug: "city-home",
    icon: "House",
    title: { en: "Solar for your independent house", te: "మీ ఇండిపెండెంట్ ఇంటికి సోలార్" },
    sub: { en: "Your terrace can make most of your power. Homes get central subsidy.", te: "మీ టెర్రస్ మీ కరెంట్‌లో ఎక్కువ భాగం తయారు చేస్తుంది. ఇళ్లకు కేంద్ర సబ్సిడీ." },
    metaEn: "Rooftop solar for independent houses in Hyderabad: size, subsidy, net metering.",
    metaTe: "హైదరాబాద్ ఇండిపెండెంట్ ఇళ్లకు రూఫ్‌టాప్ సోలార్: సైజ్, సబ్సిడీ, నెట్ మీటరింగ్.",
    isThisYou: [
      { en: "You own an independent house or villa", te: "మీకు ఇండిపెండెంట్ ఇల్లు లేదా విల్లా ఉంది" },
      { en: "Your terrace gets sun most of the day", te: "మీ టెర్రస్‌పై రోజంతా ఎండ పడుతుంది" },
      { en: "Your bill is ₹1,500 or more a month", te: "మీ బిల్ నెలకు ₹1,500 లేదా ఎక్కువ" },
      { en: "You have your own TGSPDCL meter", te: "మీకు సొంత TGSPDCL మీటర్ ఉంది" },
    ],
    system: {
      name: { en: "On-grid with net meter", te: "నెట్ మీటర్‌తో ఆన్-గ్రిడ్" },
      size: { en: "1 – 10 kW (most homes: 3 – 5 kW)", te: "1 – 10 kW (చాలా ఇళ్లు: 3 – 5 kW)" },
      why: [
        { en: "Lowest cost per unit", te: "యూనిట్‌కు తక్కువ ఖర్చు" },
        { en: "Up to ₹78,000 subsidy (PM Surya Ghar)", te: "₹78,000 వరకు సబ్సిడీ (పీఎం సూర్య ఘర్)" },
        { en: "Raised structure keeps terrace usable", te: "ఎత్తైన స్ట్రక్చర్‌తో టెర్రస్ వాడుకోవచ్చు" },
      ],
    },
    calc: { place: "city", use: "home", bills: [1500, 2500, 4000, 6000, 10000], example: 3500 },
    schemes: ["pm-surya-ghar", "net-metering", "gruha-jyothi-and-solar", "telangana-state-and-ghmc-support"],
    extra: {
      title: { en: "Can I still use my terrace?", te: "నా టెర్రస్ ఇంకా వాడుకోవచ్చా?" },
      steps: [
        { icon: "Ruler", title: { en: "Raised structure", te: "ఎత్తైన స్ట్రక్చర్" }, text: { en: "Panels sit 6–8 ft high. Walk, dry clothes below.", te: "ప్యానెల్స్ 6–8 అడుగుల ఎత్తులో. కింద నడవొచ్చు, బట్టలు ఆరేయొచ్చు." } },
        { icon: "Sun", title: { en: "Shade bonus", te: "నీడ లాభం" }, text: { en: "Panels shade the roof. Top floor feels cooler.", te: "ప్యానెల్స్ పైకప్పుకు నీడ ఇస్తాయి. పై అంతస్తు చల్లగా." } },
        { icon: "Droplets", title: { en: "Water tank stays", te: "నీటి ట్యాంక్ అలాగే" }, text: { en: "We plan around tanks and stairs.", te: "ట్యాంకులు, మెట్ల చుట్టూ ప్లాన్ చేస్తాం." } },
      ],
    },
    faq: [
      { q: { en: "How many kW for a 2BHK?", te: "2BHK కి ఎన్ని kW?" }, a: { en: "Usually 2–3 kW. Check with your bill on Find My Plan.", te: "సాధారణంగా 2–3 kW. 'నా ప్లాన్'లో మీ బిల్‌తో చూడండి." } },
      { q: { en: "Do I need GHMC permission?", te: "GHMC అనుమతి కావాలా?" }, a: { en: "Usually not for normal rooftop panels, but rules vary. We check for your building. [VERIFY]", te: "సాధారణ రూఫ్‌టాప్ ప్యానెల్స్‌కు సాధారణంగా అవసరం లేదు, కానీ నియమాలు మారవచ్చు. మీ భవనానికి మేము చూస్తాం. [VERIFY]" } },
      { q: { en: "What if I rent out a floor?", te: "ఒక అంతస్తు అద్దెకు ఇస్తే?" }, a: { en: "Solar connects to one meter. Pick the meter with the highest bill.", te: "సోలార్ ఒక మీటర్‌కు కలుస్తుంది. ఎక్కువ బిల్ ఉన్న మీటర్ ఎంచుకోండి." } },
    ],
    wa: "Hi Hyderabad Solar, I want solar for my independent house.",
  },
  {
    slug: "apartment",
    icon: "Building2",
    title: { en: "Solar for apartments & gated communities", te: "అపార్ట్‌మెంట్లు & గేటెడ్ కమ్యూనిటీలకు సోలార్" },
    sub: { en: "Cut the common-area bill (lifts, lights, pumps). Villas can go solar on their own roofs.", te: "కామన్ ఏరియా బిల్ (లిఫ్ట్, లైట్లు, పంపులు) తగ్గించండి. విల్లాలు సొంత పైకప్పుపై పెట్టొచ్చు." },
    metaEn: "Solar for Hyderabad apartments and gated communities: common-area solar, society subsidy, how to propose to the committee.",
    metaTe: "హైదరాబాద్ అపార్ట్‌మెంట్లకు సోలార్: కామన్ ఏరియా సోలార్, సొసైటీ సబ్సిడీ, కమిటీకి ఎలా ప్రతిపాదించాలి.",
    isThisYou: [
      { en: "You live in a flat or gated community", te: "మీరు ఫ్లాట్ లేదా గేటెడ్ కమ్యూనిటీలో ఉంటారు" },
      { en: "Maintenance is high because of power bills", te: "కరెంట్ బిల్లుల వల్ల మెయింటెనెన్స్ ఎక్కువ" },
      { en: "Your building has an open terrace", te: "మీ భవనానికి ఖాళీ టెర్రస్ ఉంది" },
      { en: "You are on the committee, or can talk to it", te: "మీరు కమిటీలో ఉన్నారు, లేదా మాట్లాడగలరు" },
    ],
    system: {
      name: { en: "On-grid on the common meter", te: "కామన్ మీటర్‌పై ఆన్-గ్రిడ్" },
      size: { en: "5 – 50 kW for buildings; 3 – 5 kW for villas", te: "భవనాలకు 5 – 50 kW; విల్లాలకు 3 – 5 kW" },
      why: [
        { en: "Lifts, pumps, lights run in the day", te: "లిఫ్ట్, పంపులు, లైట్లు పగలు నడుస్తాయి" },
        { en: "Society subsidy ~₹18,000 per kW [VERIFY]", te: "సొసైటీ సబ్సిడీ kW కి ~₹18,000 [VERIFY]" },
        { en: "Lower maintenance for every flat", te: "ప్రతి ఫ్లాట్‌కు తక్కువ మెయింటెనెన్స్" },
      ],
    },
    calc: { place: "colony", use: "apartment", bills: [5000, 10000, 15000, 20000], example: 12000 },
    schemes: ["pm-surya-ghar", "net-metering", "telangana-state-and-ghmc-support"],
    extra: {
      title: { en: "How to propose it to your committee (4 steps)", te: "కమిటీకి ఎలా ప్రతిపాదించాలి (4 స్టెప్స్)" },
      steps: [
        { icon: "Receipt", title: { en: "Collect 3 bills", te: "3 బిల్లులు సేకరించండి" }, text: { en: "Last 3 months of common-meter bills.", te: "కామన్ మీటర్ గత 3 నెలల బిల్లులు." } },
        { icon: "Calculator", title: { en: "Get a plan", te: "ప్లాన్ తీసుకోండి" }, text: { en: "We send size, cost and saving per flat.", te: "సైజ్, ఖర్చు, ఫ్లాట్‌కు ఆదా మేము పంపుతాం." } },
        { icon: "Users", title: { en: "Share in AGM / group", te: "AGM / గ్రూప్‌లో పంచుకోండి" }, text: { en: "Show the one-page summary to members.", te: "ఒక పేజీ సారాంశం సభ్యులకు చూపించండి." } },
        { icon: "FileCheck", title: { en: "Pass a resolution", te: "తీర్మానం చేయండి" }, text: { en: "Committee approves. We do the paperwork.", te: "కమిటీ ఆమోదిస్తుంది. పేపర్ వర్క్ మేము చేస్తాం." } },
      ],
    },
    faq: [
      { q: { en: "Can one flat owner put solar alone?", te: "ఒక్క ఫ్లాట్ యజమాని ఒంటరిగా పెట్టొచ్చా?" }, a: { en: "Only with association permission and roof space. Common-area solar is usually simpler.", te: "అసోసియేషన్ అనుమతి, పైకప్పు స్థలం ఉంటేనే. కామన్ ఏరియా సోలార్ సాధారణంగా సులభం." } },
      { q: { en: "How much will maintenance drop?", te: "మెయింటెనెన్స్ ఎంత తగ్గుతుంది?" }, a: { en: "Depends on your common bill. Share it with us and we show per-flat saving.", te: "మీ కామన్ బిల్ మీద ఆధారపడుతుంది. పంపండి, ఫ్లాట్‌కు ఆదా చూపిస్తాం." } },
      { q: { en: "Who maintains it?", te: "ఎవరు మెయింటెయిన్ చేస్తారు?" }, a: { en: "Your security/housekeeping can wash panels. We do yearly checks.", te: "మీ సెక్యూరిటీ/హౌస్‌కీపింగ్ ప్యానెల్స్ కడగొచ్చు. ఏటా చెకప్ మేము చేస్తాం." } },
    ],
    wa: "Hi Hyderabad Solar, I want solar for our apartment / gated community.",
  },
  {
    slug: "outskirts",
    icon: "Tractor",
    title: { en: "Solar for outskirts plots & farmhouses", te: "శివారు ప్లాట్లు & ఫామ్‌హౌస్‌లకు సోలార్" },
    sub: { en: "More space, more power cuts. Hybrid backup and solar pumps make sense here.", te: "ఎక్కువ స్థలం, ఎక్కువ కరెంట్ కోతలు. ఇక్కడ హైబ్రిడ్ బ్యాకప్, సోలార్ పంపులు సరైనవి." },
    metaEn: "Solar for farmhouses, plots and rural-side Hyderabad: hybrid, off-grid, solar water pumps, PM-KUSUM.",
    metaTe: "ఫామ్‌హౌస్‌లు, ప్లాట్లు, హైదరాబాద్ గ్రామీణ ప్రాంతాలకు సోలార్: హైబ్రిడ్, ఆఫ్-గ్రిడ్, సోలార్ పంపులు, కుసుమ్.",
    isThisYou: [
      { en: "You have a farmhouse, plot or village home", te: "మీకు ఫామ్‌హౌస్, ప్లాట్ లేదా గ్రామంలో ఇల్లు ఉంది" },
      { en: "Power cuts are common", te: "కరెంట్ కోతలు తరచూ ఉంటాయి" },
      { en: "You run a borewell motor or pump", te: "మీరు బోర్‌వెల్ మోటార్ లేదా పంపు నడుపుతారు" },
      { en: "You have open land or a big roof", te: "మీకు ఖాళీ భూమి లేదా పెద్ద పైకప్పు ఉంది" },
    ],
    system: {
      name: { en: "Hybrid (with battery) or off-grid", te: "హైబ్రిడ్ (బ్యాటరీతో) లేదా ఆఫ్-గ్రిడ్" },
      size: { en: "3 – 15 kW + solar pump if needed", te: "3 – 15 kW + అవసరమైతే సోలార్ పంపు" },
      why: [
        { en: "Lights and fans run during power cuts", te: "కరెంట్ కోతల్లో లైట్లు, ఫ్యాన్లు నడుస్తాయి" },
        { en: "Ground-mount if roof is small", te: "పైకప్పు చిన్నదైతే నేలపై అమర్చవచ్చు" },
        { en: "Solar pumps: PM-KUSUM where eligible [VERIFY]", te: "సోలార్ పంపులు: అర్హత ఉంటే కుసుమ్ [VERIFY]" },
      ],
    },
    calc: { place: "outskirts", use: "farm", powerCuts: true, bills: [1500, 3000, 5000, 8000], example: 3000 },
    schemes: ["pm-kusum", "pm-surya-ghar", "net-metering", "telangana-state-and-ghmc-support"],
    extra: {
      title: { en: "Solar water pump in 3 points", te: "3 పాయింట్లలో సోలార్ నీటి పంపు" },
      steps: [
        { icon: "Sun", title: { en: "Runs on sun", te: "ఎండతో నడుస్తుంది" }, text: { en: "Pumps water all day. No diesel, no bill.", te: "రోజంతా నీళ్లు తోడుతుంది. డీజిల్ లేదు, బిల్ లేదు." } },
        { icon: "Droplets", title: { en: "Sized to your borewell", te: "మీ బోర్‌వెల్‌కు తగిన సైజ్" }, text: { en: "3 HP – 7.5 HP based on depth.", te: "లోతు బట్టి 3 HP – 7.5 HP." } },
        { icon: "BadgeCheck", title: { en: "Scheme support", te: "స్కీమ్ సహాయం" }, text: { en: "PM-KUSUM may cover part of the cost. [VERIFY]", te: "కుసుమ్ ఖర్చులో కొంత భరించవచ్చు. [VERIFY]" } },
      ],
    },
    faq: [
      { q: { en: "No grid line at my plot. Can I still use solar?", te: "నా ప్లాట్‌కు గ్రిడ్ లైన్ లేదు. సోలార్ వాడొచ్చా?" }, a: { en: "Yes, with an off-grid system and batteries.", te: "అవును, బ్యాటరీలతో ఆఫ్-గ్రిడ్ సిస్టమ్‌తో." } },
      { q: { en: "How long does the battery last?", te: "బ్యాటరీ ఎంత కాలం వస్తుంది?" }, a: { en: "Lithium batteries usually 8–10 years; lead-acid 3–5 years. [VERIFY with brand]", te: "లిథియం సాధారణంగా 8–10 ఏళ్లు; లెడ్-యాసిడ్ 3–5 ఏళ్లు. [VERIFY]" } },
      { q: { en: "Is the plot safe from theft?", te: "దొంగతనం భయం?" }, a: { en: "We use anti-theft bolts and can add a camera on solar.", te: "యాంటీ-థెఫ్ట్ బోల్టులు వాడతాం, సోలార్‌పై కెమెరా పెట్టొచ్చు." } },
    ],
    wa: "Hi Hyderabad Solar, I want solar for my plot / farmhouse on the outskirts.",
  },
  {
    slug: "nri-landlord",
    icon: "Plane",
    title: { en: "Solar for NRIs & landlords", te: "NRI లు & ఇంటి యజమానులకు సోలార్" },
    sub: { en: "Your Hyderabad property makes its own power while you're away.", te: "మీరు దూరంగా ఉన్నా, మీ హైదరాబాద్ ఆస్తి తన కరెంట్ తానే తయారు చేస్తుంది." },
    metaEn: "Rooftop solar for NRIs and landlords in Hyderabad: remote install, photo updates, monitoring, maintenance.",
    metaTe: "హైదరాబాద్‌లో NRI లు, యజమానులకు రూఫ్‌టాప్ సోలార్: దూరం నుంచి ఇన్‌స్టాల్, ఫోటో అప్‌డేట్స్, మానిటరింగ్.",
    isThisYou: [
      { en: "You live abroad or in another city", te: "మీరు విదేశంలో లేదా వేరే నగరంలో ఉంటారు" },
      { en: "Your parents or tenants live in the house", te: "మీ తల్లిదండ్రులు లేదా అద్దెదారులు ఇంట్లో ఉంటారు" },
      { en: "You want to add value to the property", te: "ఆస్తి విలువ పెంచాలనుకుంటున్నారు" },
      { en: "You prefer WhatsApp / video updates", te: "మీకు వాట్సాప్ / వీడియో అప్‌డేట్స్ ఇష్టం" },
    ],
    system: {
      name: { en: "On-grid with online monitoring", te: "ఆన్‌లైన్ మానిటరింగ్‌తో ఆన్-గ్రిడ్" },
      size: { en: "3 – 10 kW", te: "3 – 10 kW" },
      why: [
        { en: "See daily units on your phone app", te: "రోజువారీ యూనిట్లు ఫోన్ యాప్‌లో చూడండి" },
        { en: "Lower bills for parents / tenants", te: "తల్లిదండ్రులు / అద్దెదారులకు తక్కువ బిల్లులు" },
        { en: "Home subsidy if in the owner's name [VERIFY]", te: "యజమాని పేరుపై ఉంటే ఇంటి సబ్సిడీ [VERIFY]" },
      ],
    },
    calc: { place: "city", use: "home", bills: [2000, 4000, 6000, 10000], example: 5000 },
    schemes: ["pm-surya-ghar", "net-metering"],
    extra: {
      title: { en: "How remote install works", te: "దూరం నుంచి ఇన్‌స్టాల్ ఎలా" },
      steps: [
        { icon: "MessageCircle", title: { en: "Chat on WhatsApp", te: "వాట్సాప్‌లో మాట్లాడండి" }, text: { en: "Share bill + roof photos (family can send).", te: "బిల్ + పైకప్పు ఫోటోలు పంపండి (కుటుంబం పంపొచ్చు)." } },
        { icon: "FileText", title: { en: "Sign online", te: "ఆన్‌లైన్‌లో సంతకం" }, text: { en: "Quote, agreement and payment online.", te: "కొటేషన్, ఒప్పందం, చెల్లింపు ఆన్‌లైన్." } },
        { icon: "Camera", title: { en: "Photo updates", te: "ఫోటో అప్‌డేట్స్" }, text: { en: "Photos/video at each stage of work.", te: "ప్రతి దశలో ఫోటోలు/వీడియో." } },
        { icon: "Monitor", title: { en: "Monitor anywhere", te: "ఎక్కడి నుంచైనా చూడండి" }, text: { en: "App shows units made every day.", te: "రోజూ తయారైన యూనిట్లు యాప్‌లో." } },
        { icon: "Wrench", title: { en: "Maintenance plan", te: "మెయింటెనెన్స్ ప్లాన్" }, text: { en: "Cleaning and checks on schedule. [EDIT]", te: "షెడ్యూల్ ప్రకారం క్లీనింగ్, చెకప్. [EDIT]" } },
      ],
    },
    faq: [
      { q: { en: "Can I apply for subsidy from abroad?", te: "విదేశం నుంచి సబ్సిడీకి దరఖాస్తు చేయొచ్చా?" }, a: { en: "The connection holder applies on the portal; family can help with OTP. We guide each step. [VERIFY]", te: "కనెక్షన్ ఉన్నవారు పోర్టల్‌లో దరఖాస్తు చేస్తారు; OTP కి కుటుంబం సాయపడొచ్చు. ప్రతి స్టెప్ చెబుతాం. [VERIFY]" } },
      { q: { en: "Who benefits if tenants pay the bill?", te: "అద్దెదారులు బిల్ కడితే లాభం ఎవరికి?" }, a: { en: "Tenants pay less; you can set rent accordingly. It also makes the house easier to rent.", te: "అద్దెదారులు తక్కువ కడతారు; అద్దె అలా నిర్ణయించొచ్చు. ఇల్లు సులభంగా అద్దెకు పోతుంది." } },
    ],
    wa: "Hi Hyderabad Solar, I am an NRI / landlord and want solar for my Hyderabad property.",
  },
  {
    slug: "institution",
    icon: "Stethoscope",
    title: { en: "Solar for clinics, schools & institutions", te: "క్లినిక్‌లు, స్కూళ్లు & సంస్థలకు సోలార్" },
    sub: { en: "You work in the day. Solar works in the day. Big roofs, steady savings.", te: "మీరు పగలు పని చేస్తారు. సోలార్ పగలు పని చేస్తుంది. పెద్ద పైకప్పులు, స్థిరమైన ఆదా." },
    metaEn: "Solar for clinics, hospitals, schools, colleges, temples and hostels in Hyderabad.",
    metaTe: "హైదరాబాద్‌లో క్లినిక్‌లు, ఆసుపత్రులు, స్కూళ్లు, గుళ్లు, హాస్టళ్లకు సోలార్.",
    isThisYou: [
      { en: "You run a clinic, school, temple or hostel", te: "మీరు క్లినిక్, స్కూల్, గుడి లేదా హాస్టల్ నడుపుతారు" },
      { en: "Most power is used 9 AM – 5 PM", te: "ఎక్కువ కరెంట్ ఉదయం 9 – సాయంత్రం 5 మధ్య" },
      { en: "Your bill is ₹5,000 or more", te: "మీ బిల్ ₹5,000 లేదా ఎక్కువ" },
      { en: "Backup matters (clinic equipment, labs)", te: "బ్యాకప్ ముఖ్యం (క్లినిక్ పరికరాలు, ల్యాబ్‌లు)" },
    ],
    system: {
      name: { en: "On-grid, or hybrid for critical loads", te: "ఆన్-గ్రిడ్, లేదా ముఖ్య లోడ్లకు హైబ్రిడ్" },
      size: { en: "5 – 50 kW", te: "5 – 50 kW" },
      why: [
        { en: "Daytime use = most solar used directly", te: "పగటి వాడకం = సోలార్ ఎక్కువగా నేరుగా వాడతారు" },
        { en: "Higher tariff, so each unit saves more [VERIFY]", te: "ఎక్కువ టారిఫ్, ప్రతి యూనిట్‌కు ఎక్కువ ఆదా [VERIFY]" },
        { en: "Shows care for the environment", te: "పర్యావరణంపై శ్రద్ధ చూపిస్తుంది" },
      ],
    },
    calc: { place: "city", use: "institution", bills: [5000, 10000, 15000, 20000], example: 10000 },
    schemes: ["commercial-benefits", "net-metering", "telangana-state-and-ghmc-support"],
    faq: [
      { q: { en: "Do schools get subsidy?", te: "స్కూళ్లకు సబ్సిడీ ఉందా?" }, a: { en: "PM Surya Ghar is for homes. Institutions may get other support or tax benefits. [VERIFY]", te: "పీఎం సూర్య ఘర్ ఇళ్లకు. సంస్థలకు వేరే సహాయం లేదా పన్ను లాభాలు ఉండొచ్చు. [VERIFY]" } },
      { q: { en: "Will work stop during install?", te: "ఇన్‌స్టాల్ సమయంలో పని ఆగుతుందా?" }, a: { en: "No. Roof work happens without shutting down; switch-over takes a short time.", te: "లేదు. పైకప్పు పని ఆపకుండా జరుగుతుంది; స్విచ్-ఓవర్ కొంచెం సేపే." } },
    ],
    wa: "Hi Hyderabad Solar, I want solar for our clinic / school / institution.",
  },
];

export const getSegment = (slug: string) => SEGMENTS.find((s) => s.slug === slug);
