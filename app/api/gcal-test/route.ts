import { NextResponse } from "next/server";
import { google } from "googleapis";
import { getAuthedOAuthClient } from "@/lib/googleAuth";

export async function GET() {
  const auth = getAuthedOAuthClient();
  const cal = google.calendar({ version: "v3", auth });

  const res = await cal.calendarList.list({ maxResults: 20 });

  return NextResponse.json({
    ok: true,
    calendars: (res.data.items || []).map((c) => ({
      id: c.id,
      summary: c.summary,
      primary: c.primary,
    })),
  });
}
