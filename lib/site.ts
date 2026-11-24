// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS — edit everything marked [EDIT] before launch
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "Hyderabad Solar",
  nameTe: "హైదరాబాద్ సోలార్",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.hyderabadsolar.in", // [EDIT]
  // WhatsApp number in international format, digits only (91 + 10-digit mobile)
  whatsapp: "917569954054",
  phone: "+91 75699 54054",
  phoneHref: "tel:+917569954054",
  email: "hello@hyderabadsolar.in", // [EDIT]
  address: "HITEC City, Hyderabad, Telangana",
  hours: "Mon–Sat, 9:30 AM – 7:00 PM", // [EDIT]
  mapEmbedUrl: "", // [EDIT] Google Maps embed URL, e.g. https://www.google.com/maps/embed?pb=...
  social: {
    instagram: "", // [EDIT]
    facebook: "", // [EDIT]
    youtube: "", // [EDIT]
  },
};

export const AREAS = [
  "Kukatpally", "Secunderabad", "Ameerpet", "Gachibowli", "LB Nagar", "Dilsukhnagar",
  "Uppal", "Miyapur", "Shamshabad", "Medchal", "Kondapur", "Madhapur", "Banjara Hills",
  "Jubilee Hills", "Begumpet", "Tarnaka", "Malkajgiri", "ECIL", "Kompally", "Nizampet",
  "Chandanagar", "Manikonda", "Attapur", "Mehdipatnam", "Hayathnagar", "Ghatkesar",
  "Shankarpally", "Patancheru", "Bachupally", "Narsingi",
];

export const MARKET_AREAS = [
  "Begum Bazaar", "Koti", "Abids", "Secunderabad (RP Road)", "Ameerpet", "Dilsukhnagar",
  "Kukatpally", "Charminar / Laad Bazaar", "Malakpet", "Moosapet", "Chikkadpally", "Mehdipatnam",
];

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
