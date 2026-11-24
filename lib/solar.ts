// ─────────────────────────────────────────────────────────────
//  SOLAR MATHS — one source of truth for every calculator.
//  All money/tariff/subsidy values are ESTIMATES marked [VERIFY].
//  Check them against TGSPDCL tariff orders, pmsuryaghar.gov.in
//  and your own vendor price list before launch.
// ─────────────────────────────────────────────────────────────

export type Place = "city" | "colony" | "outskirts";
export type Use = "home" | "apartment" | "shop" | "farm" | "institution";
export type Roof = "own" | "shared" | "none";
export type SystemType = "on-grid" | "hybrid" | "off-grid";

export const ASSUME = {
  /** Average ₹ per unit for a Hyderabad home bill, incl. slabs + charges [VERIFY] */
  tariffHome: 7.5,
  /** Average ₹ per unit for a shop/commercial (LT-II) bill [VERIFY] */
  tariffShop: 10,
  /** Average ₹ per unit for institutions (clinics/schools) [VERIFY] */
  tariffInstitution: 9,
  /** Units one 1 kW system makes in a month in Hyderabad (~4 units/day) */
  unitsPerKwMonth: 120,
  /** Shadow-free roof area needed per kW (sq ft) */
  roofSqftPerKw: 100,
  /** Installed price per kW, on-grid, before subsidy [VERIFY with vendor quotes] */
  pricePerKwOnGrid: 60000,
  /** Installed price per kW, hybrid with battery backup [VERIFY] */
  pricePerKwHybrid: 90000,
  /** Installed price per kW, off-grid with battery [VERIFY] */
  pricePerKwOffGrid: 95000,
  /** Part of the bill that stays (fixed / minimum charges) */
  fixedShare: 0.1,
  /** Yearly panel output drop */
  degradation: 0.005,
  /** Yearly electricity price rise used for the 25-year view (assumption) */
  tariffRise: 0.02,
  /** kg CO2 per unit of grid power (India grid average, approx) */
  co2PerUnit: 0.71,
  /** kg CO2 one grown tree absorbs per year (approx) */
  co2PerTreeYear: 21,
  /** Gruha Jyothi free-units limit per month for eligible homes [VERIFY] */
  gruhaJyothiUnits: 200,
};

/** PM Surya Ghar central subsidy for a home rooftop system [VERIFY on pmsuryaghar.gov.in]
 *  ₹30,000/kW for the first 2 kW, ₹18,000 for the 3rd kW, capped at ₹78,000. */
export function pmSuryaGharSubsidy(kw: number) {
  const first = Math.min(kw, 2) * 30000;
  const third = kw > 2 ? Math.min(kw - 2, 1) * 18000 : 0;
  return Math.round(Math.min(first + third, 78000));
}

/** Common-area solar for Group Housing Societies / RWAs: ₹18,000 per kW [VERIFY] (cap 500 kW) */
export function societySubsidy(kw: number) {
  return Math.round(Math.min(kw, 500) * 18000);
}

export function tariffFor(use: Use) {
  if (use === "shop") return ASSUME.tariffShop;
  if (use === "institution") return ASSUME.tariffInstitution;
  return ASSUME.tariffHome;
}

export function pricePerKw(type: SystemType) {
  return type === "hybrid" ? ASSUME.pricePerKwHybrid : type === "off-grid" ? ASSUME.pricePerKwOffGrid : ASSUME.pricePerKwOnGrid;
}

export type PlanInput = {
  bill: number;
  units?: number | null;
  place: Place;
  use: Use;
  powerCuts?: boolean;
  roof?: Roof;
};

export type SubsidyStatus = "yes" | "society" | "kusum" | "no" | "check";

export type Plan = {
  units: number;
  kw: number;
  type: SystemType;
  roofSqft: number;
  monthlyGen: number;
  monthlySaving: number;
  grossCost: number;
  subsidy: number;
  netCost: number;
  paybackYears: number;
  savings25: number;
  yearly: { year: number; saving: number; cumulative: number }[];
  co2TonnesYear: number;
  treesEquivalent: number;
  subsidyStatus: SubsidyStatus;
  gruhaJyothiNote: boolean;
  roofNote: "ok" | "shared" | "none";
};

function roundKw(raw: number, use: Use) {
  // Homes: whole kW (common package sizes). Bigger users: whole kW too, larger cap.
  const cap = use === "home" ? 10 : use === "farm" ? 15 : 50;
  return Math.max(1, Math.min(cap, Math.round(raw)));
}

export function systemTypeFor(i: Pick<PlanInput, "place" | "use" | "powerCuts">): SystemType {
  if (i.use === "farm" && i.place === "outskirts" && i.powerCuts) return "off-grid";
  if (i.powerCuts) return "hybrid";
  return "on-grid";
}

export function computePlan(input: PlanInput): Plan {
  const tariff = tariffFor(input.use);
  const units = input.units && input.units > 0 ? input.units : input.bill / tariff;
  const kw = roundKw(units / ASSUME.unitsPerKwMonth, input.use);
  const type = systemTypeFor(input);
  const monthlyGen = kw * ASSUME.unitsPerKwMonth;
  const bill = input.units && input.units > 0 ? input.units * tariff : input.bill;
  const monthlySaving = Math.round(Math.min(Math.min(monthlyGen, units) * tariff, bill * (1 - ASSUME.fixedShare)));
  const grossCost = Math.round(kw * pricePerKw(type));

  const roof = input.roof ?? "own";
  let subsidyStatus: SubsidyStatus = "no";
  let subsidy = 0;
  if ((input.use === "home" || input.use === "farm") && roof === "own") {
    subsidyStatus = "yes";
    subsidy = pmSuryaGharSubsidy(kw);
  } else if (input.use === "apartment") {
    subsidyStatus = roof === "own" ? "yes" : "society";
    subsidy = roof === "own" ? pmSuryaGharSubsidy(kw) : societySubsidy(kw);
  } else if (input.use === "farm") {
    subsidyStatus = "kusum";
  } else if (input.use === "home") {
    subsidyStatus = "check";
  }

  const netCost = Math.max(0, grossCost - subsidy);
  const yearly: Plan["yearly"] = [];
  let cumulative = 0;
  for (let y = 0; y < 25; y++) {
    const s = monthlySaving * 12 * Math.pow(1 - ASSUME.degradation, y) * Math.pow(1 + ASSUME.tariffRise, y);
    cumulative += s;
    yearly.push({ year: y + 1, saving: Math.round(s), cumulative: Math.round(cumulative) });
  }
  const paybackYears = monthlySaving > 0 ? netCost / (monthlySaving * 12) : 0;
  const co2Year = (Math.min(monthlyGen, units) * 12 * ASSUME.co2PerUnit) / 1000;

  return {
    units: Math.round(units),
    kw,
    type,
    roofSqft: kw * ASSUME.roofSqftPerKw,
    monthlyGen,
    monthlySaving,
    grossCost,
    subsidy,
    netCost,
    paybackYears: Math.round(paybackYears * 10) / 10,
    savings25: Math.round(cumulative - netCost),
    yearly,
    co2TonnesYear: Math.round(co2Year * 10) / 10,
    treesEquivalent: Math.round((co2Year * 1000) / ASSUME.co2PerTreeYear),
    subsidyStatus,
    gruhaJyothiNote: (input.use === "home" || input.use === "apartment") && units <= ASSUME.gruhaJyothiUnits,
    roofNote: roof === "own" ? "ok" : roof === "shared" ? "shared" : "none",
  };
}

/** EMI for a loan. rate = yearly % */
export function emi(principal: number, ratePct: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const r = ratePct / 12 / 100;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export function inr(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function lakhs(n: number) {
  if (Math.abs(n) >= 100000) return "₹" + (n / 100000).toFixed(n >= 1000000 ? 1 : 2).replace(/\.0+$/, "") + " lakh";
  return inr(n);
}
