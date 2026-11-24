"use client";

import { T, type L } from "@/lib/i18n";
import { MARKET_AREAS } from "@/lib/site";
import { SHOP_PACKAGES } from "@/content/packages";
import { ShopCalculator } from "../Calculators";
import { PackageCards } from "../Packages";
import { Icon, type IconName } from "../Icon";
import { Band, CTABand, Card, Chips, FAQ, Heading, IconBubble, IdeaCard, PageHero, VerifyNote, WhatsAppBtn } from "../ui";

const WHY: { icon: IconName; title: L; text: L }[] = [
  { icon: "Sun", title: { en: "Daytime load = solar time", te: "పగటి వాడకం = సోలార్ సమయం" }, text: { en: "You use power exactly when panels make it.", te: "ప్యానెల్స్ కరెంట్ తయారు చేసే సమయంలోనే మీరు వాడతారు." } },
  { icon: "IndianRupee", title: { en: "Each unit is worth more", te: "ప్రతి యూనిట్ విలువ ఎక్కువ" }, text: { en: "Commercial tariff is higher than home tariff. [VERIFY tariff]", te: "వ్యాపార టారిఫ్ ఇంటి టారిఫ్ కంటే ఎక్కువ. [VERIFY tariff]" } },
  { icon: "Wallet", title: { en: "Lower fixed expense", te: "తక్కువ స్థిర ఖర్చు" }, text: { en: "Smaller bill every month = better margin.", te: "ప్రతి నెల తక్కువ బిల్ = మంచి లాభం." } },
  { icon: "HeartHandshake", title: { en: "Customers notice", te: "కస్టమర్లు గమనిస్తారు" }, text: { en: "A solar shop looks modern and responsible.", te: "సోలార్ షాప్ ఆధునికంగా, బాధ్యతగా కనిపిస్తుంది." } },
];

type Shop = { icon: IconName; name: L; load: L; size: string; runs: L; saving: string };
const SHOPS: Shop[] = [
  { icon: "ShoppingCart", name: { en: "Kirana / supermarket", te: "కిరాణా / సూపర్‌మార్కెట్" }, load: { en: "Fridges, lights, billing", te: "ఫ్రిజ్‌లు, లైట్లు, బిల్లింగ్" }, size: "3 – 15 kW", runs: { en: "Fridges, freezers, lights", te: "ఫ్రిజ్‌లు, ఫ్రీజర్లు, లైట్లు" }, saving: "₹2,500 – ₹12,000" },
  { icon: "Pill", name: { en: "Medical shop & clinic", te: "మెడికల్ షాప్ & క్లినిక్" }, load: { en: "Medicine fridge, AC, lights", te: "మందుల ఫ్రిజ్, ఏసీ, లైట్లు" }, size: "2 – 5 kW", runs: { en: "Medicine fridge, AC", te: "మందుల ఫ్రిజ్, ఏసీ" }, saving: "₹2,000 – ₹5,000" },
  { icon: "UtensilsCrossed", name: { en: "Restaurant / tiffin centre", te: "రెస్టారెంట్ / టిఫిన్ సెంటర్" }, load: { en: "Grinders, fridges, fans, AC", te: "గ్రైండర్లు, ఫ్రిజ్‌లు, ఫ్యాన్లు, ఏసీ" }, size: "5 – 15 kW", runs: { en: "Grinders, chillers, fans", te: "గ్రైండర్లు, చిల్లర్లు, ఫ్యాన్లు" }, saving: "₹5,000 – ₹14,000" },
  { icon: "Scissors", name: { en: "Tailoring / boutique", te: "టైలరింగ్ / బొటీక్" }, load: { en: "Machines, iron, lights", te: "మెషీన్లు, ఐరన్, లైట్లు" }, size: "1 – 3 kW", runs: { en: "Machines, steam iron", te: "మెషీన్లు, స్టీమ్ ఐరన్" }, saving: "₹1,000 – ₹3,000" },
  { icon: "Dumbbell", name: { en: "Salon / gym", te: "సెలూన్ / జిమ్" }, load: { en: "AC, dryers, treadmills", te: "ఏసీ, డ్రయర్లు, ట్రెడ్‌మిల్లు" }, size: "3 – 10 kW", runs: { en: "AC, dryers, music, lights", te: "ఏసీ, డ్రయర్లు, మ్యూజిక్, లైట్లు" }, saving: "₹3,000 – ₹9,000" },
  { icon: "Smartphone", name: { en: "Mobile / electronics showroom", te: "మొబైల్ / ఎలక్ట్రానిక్స్ షోరూమ్" }, load: { en: "Display lights, AC, demo units", te: "డిస్‌ప్లే లైట్లు, ఏసీ, డెమో" }, size: "3 – 8 kW", runs: { en: "Lights, AC, chargers", te: "లైట్లు, ఏసీ, ఛార్జర్లు" }, saving: "₹3,000 – ₹8,000" },
  { icon: "Milk", name: { en: "Cold storage / dairy", te: "కోల్డ్ స్టోరేజ్ / డెయిరీ" }, load: { en: "Chillers run all day", te: "చిల్లర్లు రోజంతా నడుస్తాయి" }, size: "10 – 50 kW", runs: { en: "Chillers, freezers (day)", te: "చిల్లర్లు, ఫ్రీజర్లు (పగలు)" }, saving: "₹10,000+" },
  { icon: "Printer", name: { en: "Printing / xerox", te: "ప్రింటింగ్ / జిరాక్స్" }, load: { en: "Copiers, computers, AC", te: "కాపియర్లు, కంప్యూటర్లు, ఏసీ" }, size: "2 – 5 kW", runs: { en: "Copiers, PCs, lights", te: "కాపియర్లు, కంప్యూటర్లు, లైట్లు" }, saving: "₹2,000 – ₹5,000" },
  { icon: "Hammer", name: { en: "Small workshop", te: "చిన్న వర్క్‌షాప్" }, load: { en: "Motors, welding, tools", te: "మోటార్లు, వెల్డింగ్, టూల్స్" }, size: "5 – 20 kW", runs: { en: "Machines, tools (day shift)", te: "మెషీన్లు, టూల్స్ (పగటి షిఫ్ట్)" }, saving: "₹5,000 – ₹18,000" },
];

export function ShopsView() {
  return (
    <>
      <PageHero icon="Store" kicker={{ en: "For shops & small business", te: "షాపులు & చిన్న వ్యాపారాలకు" }} title={{ en: "Your shop runs in the day. Solar runs in the day.", te: "మీ షాప్ పగలు నడుస్తుంది. సోలార్ కూడా పగలే పని చేస్తుంది." }} sub={{ en: "The best match for solar in Hyderabad is a busy daytime shop.", te: "హైదరాబాద్‌లో సోలార్‌కు బెస్ట్ మ్యాచ్ పగలు బిజీగా ఉండే షాప్." }}>
        <WhatsAppBtn variant="light" text="Hi Hyderabad Solar, I want a solar plan for my shop." label={{ en: "Get my shop plan on WhatsApp", te: "నా షాప్ ప్లాన్ వాట్సాప్‌లో పొందండి" }} />
      </PageHero>

      <Band tone="cream">
        <Heading title={{ en: "Why shops benefit most", te: "షాపులకే ఎక్కువ లాభం ఎందుకు" }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => <IdeaCard key={i} icon={w.icon} title={w.title} text={w.text} tone={i === 0 ? "teal" : "white"} />)}
        </div>
      </Band>

      <Band tone="pearl">
        <Heading title={{ en: "Find your shop type", te: "మీ షాప్ రకం చూడండి" }} sub={{ en: "Typical numbers. Your shop may differ.", te: "సాధారణ అంకెలు. మీ షాప్‌కు మారవచ్చు." }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHOPS.map((s, i) => (
            <Card key={i} className="h-full">
              <div className="flex items-center gap-3">
                <IconBubble name={s.icon} />
                <h3 className="font-display text-xl font-bold leading-snug"><T {...s.name} /></h3>
              </div>
              <dl className="mt-4 grid gap-2 text-[15px]">
                <div className="flex gap-2"><dt className="flex items-center gap-1.5 font-semibold text-ink/60"><Icon name="Zap" size={16} /><T en="Load:" te="లోడ్:" /></dt><dd><T {...s.load} /></dd></div>
                <div className="flex gap-2"><dt className="flex items-center gap-1.5 font-semibold text-ink/60"><Icon name="Sun" size={16} /><T en="Size:" te="సైజ్:" /></dt><dd className="font-bold">{s.size}</dd></div>
                <div className="flex gap-2"><dt className="flex items-center gap-1.5 font-semibold text-ink/60"><Icon name="PlugZap" size={16} /><T en="Runs:" te="నడిచేవి:" /></dt><dd><T {...s.runs} /></dd></div>
              </dl>
              <p className="mt-3 rounded-xl bg-leaf-soft px-3 py-2 text-[15px]"><T en="Saving / month:" te="నెల ఆదా:" /> <b>{s.saving}</b> <span className="ml-1 inline-block rounded-md bg-amber-200 px-1.5 py-0.5 text-[11px] font-extrabold text-amber-900">[VERIFY]</span></p>
            </Card>
          ))}
        </div>
      </Band>

      <Band tone="teal">
        <Heading light title={{ en: "Shop bill → solar size", te: "షాప్ బిల్ → సోలార్ సైజ్" }} />
        <ShopCalculator />
      </Band>

      <Band tone="cream">
        <Heading title={{ en: "Business benefits", te: "వ్యాపార లాభాలు" }} />
        <div className="grid gap-4 md:grid-cols-3">
          <IdeaCard icon="Receipt" title={{ en: "Tax / depreciation benefit", te: "పన్ను / తరుగుదల లాభం" }} text={{ en: "Solar can be claimed as a business asset. [VERIFY with CA]", te: "సోలార్‌ను వ్యాపార ఆస్తిగా చూపొచ్చు. [VERIFY with CA]" }} href="/schemes/commercial-benefits" />
          <IdeaCard icon="Banknote" title={{ en: "Loan options", te: "లోన్ ఎంపికలు" }} text={{ en: "Bank and MSME solar loans with EMI. [VERIFY]", te: "బ్యాంక్, MSME సోలార్ లోన్లు EMI తో. [VERIFY]" }} href="/subsidy-loans" />
          <IdeaCard icon="Gauge" title={{ en: "Net metering for shops", te: "షాపులకు నెట్ మీటరింగ్" }} text={{ en: "Commercial connections can also get net meters.", te: "వ్యాపార కనెక్షన్లకు కూడా నెట్ మీటర్ వస్తుంది." }} href="/schemes/net-metering" />
        </div>
        <VerifyNote />
      </Band>

      <Band tone="pearl">
        <Heading title={{ en: "Shop packages", te: "షాప్ ప్యాకేజీలు" }} />
        <PackageCards items={SHOP_PACKAGES} kind="shop" />
      </Band>

      <Band tone="cream" className="!py-12">
        <Heading title={{ en: "Hyderabad market areas", te: "హైదరాబాద్ మార్కెట్ ప్రాంతాలు" }} />
        <Chips items={MARKET_AREAS} icon="Store" />
      </Band>

      <Band tone="pearl">
        <Heading title={{ en: "Shop questions", te: "షాప్ ప్రశ్నలు" }} />
        <FAQ
          items={[
            { q: { en: "My shop is rented. Can I still go solar?", te: "నా షాప్ అద్దెది. సోలార్ పెట్టొచ్చా?" }, a: { en: "Yes, with the owner's written OK for roof use. Panels can be moved if you shift.", te: "అవును, పైకప్పు వాడకానికి యజమాని రాతపూర్వక అనుమతితో. మారితే ప్యానెల్స్ తీసుకెళ్లొచ్చు." } },
            { q: { en: "Is there a subsidy for shops?", te: "షాపులకు సబ్సిడీ ఉందా?" }, a: { en: "PM Surya Ghar is only for homes. Shops save through tax benefits and higher tariff savings. [VERIFY]", te: "పీఎం సూర్య ఘర్ ఇళ్లకే. షాపులకు పన్ను లాభాలు, ఎక్కువ టారిఫ్ ఆదా. [VERIFY]" } },
            { q: { en: "My shop runs till 10 PM. Is solar still worth it?", te: "నా షాప్ రాత్రి 10 వరకు. సోలార్ విలువైనదేనా?" }, a: { en: "Yes. Day units are used directly, extra units are credited through the net meter for evening use.", te: "అవును. పగటి యూనిట్లు నేరుగా వాడతారు, అదనపువి నెట్ మీటర్‌లో జమ అయి సాయంత్రం సర్దుబాటు." } },
          ]}
        />
      </Band>

      <CTABand title={{ en: "Get my shop plan on WhatsApp", te: "నా షాప్ ప్లాన్ వాట్సాప్‌లో పొందండి" }} waText="Hi Hyderabad Solar, I want a solar plan for my shop." />
    </>
  );
}
