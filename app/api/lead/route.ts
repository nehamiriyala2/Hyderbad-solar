import { NextResponse } from "next/server";

// Saves a lead to Google Sheets (via an Apps Script web app) and optionally
// sends a WhatsApp auto-reply through the WhatsApp Cloud API.
// Configure in .env.local — see .env.example and docs/SETUP.md.

const ALLOWED = [
  "source", "name", "phone", "area", "place", "use", "bill", "units", "powerCuts", "roof",
  "kw", "systemType", "monthlySaving", "schemes", "message", "lang", "page",
] as const;

function clean(v: unknown) {
  // Prevent spreadsheet formula injection and cap length.
  let s = String(v ?? "").slice(0, 1000).trim();
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function normalisePhone(p: string) {
  const d = p.replace(/\D/g, "");
  if (d.length === 10) return "91" + d;
  if (d.length === 12 && d.startsWith("91")) return d;
  return null;
}

async function sendWhatsAppReply(lead: Record<string, string>) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const template = process.env.WHATSAPP_TEMPLATE_NAME;
  const to = normalisePhone(lead.phone || "");
  if (!token || !phoneId || !template || !to) return;
  // Business-initiated messages MUST use an approved template.
  // Suggested template body (create in Meta Business Manager):
  //   "Hi {{1}}, thanks for checking solar with Hyderabad Solar. Your suggested plan: {{2}}.
  //    Next step: reply with a photo of your roof and your latest bill. We will confirm price and scheme."
  const plan = lead.kw ? `${lead.kw} kW ${lead.systemType || ""}`.trim() : "we will suggest after a quick chat";
  await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: template,
        language: { code: lead.lang === "te" ? "te" : process.env.WHATSAPP_TEMPLATE_LANG || "en" },
        components: [{ type: "body", parameters: [{ type: "text", text: lead.name || "there" }, { type: "text", text: plan }] }],
      },
    }),
  }).catch(() => {});
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const lead: Record<string, string> = { timestamp: new Date().toISOString() };
  for (const k of ALLOWED) lead[k] = clean(body[k]);

  const url = process.env.LEADS_WEBHOOK_URL;
  let saved = false;
  if (url) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, secret: process.env.LEADS_WEBHOOK_SECRET || "" }),
      });
      saved = r.ok;
    } catch {
      saved = false;
    }
  } else {
    console.log("[lead] LEADS_WEBHOOK_URL not set. Lead:", lead);
  }

  await sendWhatsAppReply(lead);
  return NextResponse.json({ ok: true, saved });
}
