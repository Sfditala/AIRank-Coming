import { createServerFn } from "@tanstack/react-start";

export const appendWaitlistToSheet = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; lang?: string }) => {
    const email = String(data?.email ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new Error("Invalid email");
    if (email.length > 320) throw new Error("Email too long");
    return { email, lang: String(data?.lang ?? "en") };
  })
  .handler(async ({ data }) => {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL?.trim();
    const sheetId =
      process.env.GOOGLE_SHEET_ID?.trim() ||
      "1ORW71uqKnApk1PRfeov4vXhHd17hWpaWCFZ0g7YFKV0";
    const privateKey = (process.env.GOOGLE_PRIVATE_KEY ?? "")
      .trim()
      .replace(/\\n/g, "\n");

    console.log("[Sheets] Using client_email →", clientEmail ?? "✗ UNDEFINED");
    console.log("[Sheets] Using spreadsheetId →", sheetId);

    if (!clientEmail || !privateKey) {
      console.warn("[Sheets] Missing credentials — skipping append.");
      return { ok: true };
    }

    const { google } = await import("googleapis");

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A:C",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [[new Date().toISOString(), data.email, data.lang ?? "en"]],
        },
      });
      console.log("[Sheets] ✅ Row appended successfully.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`[Sheets] Append failed — ${msg}`);
    }

    return { ok: true };
  });
