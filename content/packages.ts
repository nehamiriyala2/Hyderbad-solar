import type { L } from "@/lib/i18n";
import type { IconName } from "@/components/Icon";

export type Pkg = { kw: string; bill: string; units: string; roof: string; best: L; icon: IconName; price: string };

// [EDIT] Set your real "starting from" prices. Keep bill/units ranges as guidance.
export const HOME_PACKAGES: Pkg[] = [
  { kw: "3 kW", bill: "₹2,000 – ₹3,500", units: "~360", roof: "~300 sq ft", best: { en: "2–3 BHK home, fans, lights, fridge, TV, 1 AC", te: "2–3 BHK ఇల్లు, ఫ్యాన్లు, లైట్లు, ఫ్రిజ్, టీవీ, 1 ఏసీ" }, icon: "House", price: "₹[EDIT]" },
  { kw: "5 kW", bill: "₹3,500 – ₹6,000", units: "~600", roof: "~500 sq ft", best: { en: "Bigger home, 2 ACs, motor, geyser", te: "పెద్ద ఇల్లు, 2 ఏసీలు, మోటార్, గీజర్" }, icon: "House", price: "₹[EDIT]" },
  { kw: "10 kW", bill: "₹7,000 – ₹12,000+", units: "~1,200", roof: "~1,000 sq ft", best: { en: "Duplex / villa, 3+ ACs, many appliances", te: "డూప్లెక్స్ / విల్లా, 3+ ఏసీలు, ఎక్కువ ఉపకరణాలు" }, icon: "Building2", price: "₹[EDIT]" },
];

export const SHOP_PACKAGES: Pkg[] = [
  { kw: "2 kW", bill: "₹2,500 – ₹4,000", units: "~240", roof: "~200 sq ft", best: { en: "Small kirana, xerox, tailoring", te: "చిన్న కిరాణా, జిరాక్స్, టైలరింగ్" }, icon: "Store", price: "₹[EDIT]" },
  { kw: "5 kW", bill: "₹5,000 – ₹8,000", units: "~600", roof: "~500 sq ft", best: { en: "Medical shop, salon, showroom", te: "మెడికల్ షాప్, సెలూన్, షోరూమ్" }, icon: "Store", price: "₹[EDIT]" },
  { kw: "10 kW", bill: "₹10,000 – ₹16,000", units: "~1,200", roof: "~1,000 sq ft", best: { en: "Supermarket, restaurant, gym", te: "సూపర్‌మార్కెట్, రెస్టారెంట్, జిమ్" }, icon: "ShoppingCart", price: "₹[EDIT]" },
];
