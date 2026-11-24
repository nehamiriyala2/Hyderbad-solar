"use client";

import { waLink } from "./site";

export type Lead = {
  source: string; // which form / tool
  name?: string;
  phone?: string;
  area?: string;
  place?: string;
  use?: string;
  bill?: number | string;
  units?: number | string;
  powerCuts?: string;
  roof?: string;
  kw?: number | string;
  systemType?: string;
  monthlySaving?: number | string;
  schemes?: string;
  message?: string;
  lang?: string;
  page?: string;
};

/**
 * Save the lead (fire-and-forget, survives page navigation via keepalive)
 * and open WhatsApp with a prefilled summary.
 * Must be called directly from a click/submit handler so the popup is not blocked.
 */
export function sendLeadAndOpenWhatsApp(lead: Lead, whatsappText: string) {
  const payload: Lead = { ...lead, page: typeof window !== "undefined" ? window.location.pathname : "" };
  try {
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {}
  const url = waLink(whatsappText);
  const w = window.open(url, "_blank", "noopener,noreferrer");
  if (!w) window.location.href = url;
}
