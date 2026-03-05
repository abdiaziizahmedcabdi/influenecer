import { NextResponse } from "next/server";
import { google } from "googleapis";
import { getAuthedOAuthClient } from "@/lib/googleAuth";
import { BOOKING_CONFIG } from "@/lib/constants";

const SLOT_MINUTES = 60;

function addMinutes(d: Date, mins: number) {
    return new Date(d.getTime() + mins * 60_000);
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
    return aStart < bEnd && bStart < aEnd;
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date"); // YYYY-MM-DD
    if (!dateStr) {
        return NextResponse.json({ error: "Missing date (YYYY-MM-DD)" }, { status: 400 });
    }

    const calendarId = process.env.BOOKING_CALENDAR_ID;
    if (!calendarId) {
        return NextResponse.json(
            { error: "Missing BOOKING_CALENDAR_ID in .env.local" },
            { status: 500 }
        );
    }

    const timeZone = process.env.TIMEZONE || "Africa/Mogadishu";

    /* ---- Date-level restrictions ---- */
    const now = new Date();
    const requestedDay = new Date(`${dateStr}T00:00:00`);
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // 1. Reject past dates
    if (requestedDay < todayStart) {
        return NextResponse.json({ ok: true, date: dateStr, timeZone, slots: [] });
    }

    // 2. Reject dates beyond MAX_ADVANCE_DAYS
    const maxDate = new Date(todayStart);
    maxDate.setDate(maxDate.getDate() + BOOKING_CONFIG.MAX_ADVANCE_DAYS);
    if (requestedDay > maxDate) {
        return NextResponse.json({ ok: true, date: dateStr, timeZone, slots: [] });
    }

    /* ---- Build work-hour window ---- */
    const dayStart = new Date(requestedDay);
    dayStart.setHours(BOOKING_CONFIG.WORK_START_HOUR, 0, 0, 0);
    const dayEnd = new Date(requestedDay);
    dayEnd.setHours(BOOKING_CONFIG.WORK_END_HOUR, 0, 0, 0);

    /* ---- Earliest bookable time (now + MIN_LEAD_MINUTES) ---- */
    const earliest = addMinutes(now, BOOKING_CONFIG.MIN_LEAD_MINUTES);

    const auth = getAuthedOAuthClient();
    const cal = google.calendar({ version: "v3", auth });

    const fb = await cal.freebusy.query({
        requestBody: {
            timeMin: dayStart.toISOString(),
            timeMax: dayEnd.toISOString(),
            timeZone,
            items: [{ id: calendarId }],
        },
    });
    console.log("Using calendar:", calendarId);

    // Google sometimes returns the calendar under a resolved key (like your email), not "primary"
    const calendarsMap = fb.data.calendars || {};
    const resolvedKey =
        calendarsMap[calendarId] ? calendarId : Object.keys(calendarsMap)[0];

    const busy = (resolvedKey ? calendarsMap[resolvedKey]?.busy : []) || [];

    const slots: string[] = [];
    for (let t = new Date(dayStart); t < dayEnd; t = addMinutes(t, SLOT_MINUTES)) {
        const end = addMinutes(t, SLOT_MINUTES);

        // Skip slots that start before the minimum lead time
        if (t < earliest) continue;

        // Skip slots that conflict with existing calendar events (double-booking prevention)
        const conflict = busy.some((b) => overlaps(t, end, new Date(b.start!), new Date(b.end!)));
        if (!conflict) slots.push(t.toISOString());
    }

    return NextResponse.json({ ok: true, date: dateStr, timeZone, slots });
}
