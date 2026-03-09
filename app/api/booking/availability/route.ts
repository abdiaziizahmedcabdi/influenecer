import { NextResponse } from "next/server";
import { BOOKING_CONFIG } from "@/lib/constants";
import { refreshAccessToken } from "@/lib/microsoftAuth";
import { getGraphClient } from "@/lib/msGraph";

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
    dayStart.setHours(1, 0, 0, 0);
    const dayEnd = new Date(requestedDay);
    dayEnd.setHours(6, 0, 0, 0);

    /* ---- Earliest bookable time (now + MIN_LEAD_MINUTES) ---- */
    const earliest = addMinutes(now, BOOKING_CONFIG.MIN_LEAD_MINUTES);

    interface BusySlot {
        start: { dateTime: string };
        end: { dateTime: string };
    }
    let busy: BusySlot[] = [];
    try {
        const auth = await refreshAccessToken();
        const client = getGraphClient(auth.access_token);

        const response = await client.api('/me/calendarview')
            .query({
                startDateTime: dayStart.toISOString(),
                endDateTime: dayEnd.toISOString()
            })
            .select('start,end')
            .get();

        busy = response.value || [];
    } catch (error) {
        console.error("Error fetching MS Graph schedule:", error);
        return NextResponse.json({ error: "Failed to fetch availability. Have you connected your Microsoft account?" }, { status: 500 });
    }

    const slots: string[] = [];
    const DURATION_MINUTES = 120; // 2 hours

    // We only want 1:00 AM and 4:00 AM slots directly
    const possibleStartTimes = [
        new Date(requestedDay.getFullYear(), requestedDay.getMonth(), requestedDay.getDate(), 1, 0, 0, 0),
        new Date(requestedDay.getFullYear(), requestedDay.getMonth(), requestedDay.getDate(), 4, 0, 0, 0)
    ];

    for (const t of possibleStartTimes) {
        const end = addMinutes(t, DURATION_MINUTES);

        // Skip slots that start before the minimum lead time
        if (t < earliest) continue;

        // Skip slots that conflict with existing calendar events (double-booking prevention)
        const conflict = busy.some((b) => {
            // MS Graph returns format like "2024-05-18T10:00:00.0000000" and timeZone "UTC"
            // We append "Z" to parse it as UTC correctly in JS Date if it's not present
            const bStart = new Date(b.start.dateTime.endsWith("Z") ? b.start.dateTime : b.start.dateTime + "Z");
            const bEnd = new Date(b.end.dateTime.endsWith("Z") ? b.end.dateTime : b.end.dateTime + "Z");
            return overlaps(t, end, bStart, bEnd);
        });
        if (!conflict) slots.push(t.toISOString());
    }

    return NextResponse.json({ ok: true, date: dateStr, timeZone, slots });
}
