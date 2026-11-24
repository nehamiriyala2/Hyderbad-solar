// Photo slots for /solar-guide. Drop a matching .webp into /public/guide/ and rebuild:
// the page picks it up automatically (see public/guide/IMAGES-NEEDED.md).

export type GuideSlot =
  | "hero" | "panel-closeup" | "inverter" | "net-meter"
  | "day-roof" | "evening-home" | "battery"
  | "on-grid" | "hybrid" | "off-grid-pump"
  | "skyline" | "technician-cleaning";

export const GUIDE_SLOTS: Record<GuideSlot, { file: string; label: string; alt: string; altTe: string }> = {
  hero: { file: "hero.webp", label: "Hero: golden-hour Indian rooftop with solar panels", alt: "Modern Indian home with rooftop solar panels at golden hour", altTe: "సాయంత్రపు ఎండలో పైకప్పుపై సోలార్ ప్యానెల్స్ ఉన్న ఇల్లు" },
  "panel-closeup": { file: "panel-closeup.webp", label: "Solar panel close-up", alt: "Close-up of a solar panel's cells and frame", altTe: "సోలార్ ప్యానెల్ దగ్గరి చిత్రం" },
  inverter: { file: "inverter.webp", label: "Wall-mounted solar inverter", alt: "Solar inverter mounted on a wall with display", altTe: "గోడపై అమర్చిన సోలార్ ఇన్వర్టర్" },
  "net-meter": { file: "net-meter.webp", label: "Bi-directional (net) meter", alt: "Bi-directional electricity net meter", altTe: "రెండు వైపుల నెట్ మీటర్" },
  "day-roof": { file: "day-roof.webp", label: "Sunny roof with panels (daytime)", alt: "Solar panels on a tiled roof in bright midday sun", altTe: "పగటి ఎండలో పైకప్పుపై సోలార్ ప్యానెల్స్" },
  "evening-home": { file: "evening-home.webp", label: "Home lit up in the evening", alt: "Family outside their solar home with lights on in the evening", altTe: "సాయంత్రం లైట్లు వెలుగుతున్న ఇల్లు" },
  battery: { file: "battery.webp", label: "Home battery / hybrid inverter unit", alt: "Home solar battery storage unit", altTe: "ఇంటి సోలార్ బ్యాటరీ యూనిట్" },
  "on-grid": { file: "on-grid.webp", label: "On-grid rooftop system on a city home", alt: "Grid-connected rooftop solar on a city house", altTe: "సిటీ ఇంటిపై ఆన్-గ్రిడ్ సోలార్" },
  hybrid: { file: "hybrid.webp", label: "Hybrid system (panels + battery)", alt: "Hybrid solar system with battery backup", altTe: "బ్యాటరీతో హైబ్రిడ్ సోలార్ సిస్టమ్" },
  "off-grid-pump": { file: "off-grid-pump.webp", label: "Off-grid solar water pump on a farm", alt: "Solar panels powering a water pump on a farm", altTe: "పొలంలో సోలార్ నీటి పంపు" },
  skyline: { file: "skyline.webp", label: "Hyderabad skyline (real photo)", alt: "Rooftop solar panels at sunset with Charminar and the Hyderabad skyline", altTe: "హైదరాబాద్ నగర దృశ్యం" },
  "technician-cleaning": { file: "technician-cleaning.webp", label: "Technician cleaning solar panels", alt: "Technician cleaning rooftop solar panels with water", altTe: "సోలార్ ప్యానెల్స్ శుభ్రం చేస్తున్న టెక్నీషియన్" },
};

/** Map of slot → public URL, or null when the photo hasn't been added yet. */
export type GuidePhotos = Partial<Record<GuideSlot, string | null>>;
