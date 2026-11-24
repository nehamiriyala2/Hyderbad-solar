/**
 * Hyderabad Solar — lead catcher for Google Sheets
 * 1. Create a Google Sheet. Extensions → Apps Script. Paste this file.
 * 2. Set SECRET below (same value as LEADS_WEBHOOK_SECRET in .env.local).
 * 3. Deploy → New deployment → Web app → Execute as: Me, Access: Anyone.
 * 4. Copy the Web app URL into LEADS_WEBHOOK_URL in .env.local (and on your host).
 */
const SECRET = "change-me";
const COLUMNS = ["timestamp", "source", "name", "phone", "area", "place", "use", "bill", "units",
  "powerCuts", "roof", "kw", "systemType", "monthlySaving", "schemes", "message", "lang", "page"];

function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");
  if (SECRET && data.secret !== SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads")
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");
  if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS);
  sheet.appendRow(COLUMNS.map((c) => data[c] || ""));
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
