import { createServerFn } from "@tanstack/react-start";

/**
 * Appends a feedback row to the sheet with the full 5-column schema:
 *   A: Timestamp  B: "(feedback)"  C: Language  D: Rating  E: Feedback text
 *
 * Waitlist rows (sheets.functions.ts) write A–C; columns D–E remain empty.
 * Feedback rows write all five so the sheet stays one unified matrix.
 */
export const appendFeedbackToSheet = createServerFn({ method: "POST" })
  .inputValidator((data: { lang?: string; rating: number; feedback?: string }) => {
    const rating = Number(data?.rating ?? 0);
    if (rating < 1 || rating > 5) throw new Error("Rating must be 1–5");
    return {
      lang:     String(data?.lang     ?? "en"),
      rating,
      feedback: String(data?.feedback ?? "").trim().slice(0, 2000),
    };
  })
  .handler(async ({ data }) => {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL?.trim();
    const sheetId     =
      process.env.GOOGLE_SHEET_ID?.trim() ||
      "1ORW71uqKnApk1PRfeov4vXhHd17hWpaWCFZ0g7YFKV0";
    const privateKey  = (process.env.GOOGLE_PRIVATE_KEY ?? "")
      .trim()
      .replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      console.warn("[Sheets/Feedback] Missing credentials — skipping.");
      return { ok: true };
    }

    const { google } = await import("googleapis");

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    console.log("[Sheets/Feedback] Appending →", {
      spreadsheetId: sheetId,
      rating: data.rating,
      lang:   data.lang,
    });

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range:         "Sheet1!A:E",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [[
            new Date().toISOString(), // A — Timestamp
            "(feedback)",             // B — Email column: marked as feedback row
            data.lang,                // C — Language
            data.rating,              // D — Rating (1–5)
            data.feedback ?? "",      // E — Feedback text
          ]],
        },
      });
      console.log("[Sheets/Feedback] ✅ Row appended.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`[Sheets/Feedback] Append failed — ${msg}`);
    }

    return { ok: true };
  });
