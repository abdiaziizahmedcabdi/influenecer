import { NextResponse } from "next/server";
import { google } from "googleapis";
import { getAuthedOAuthClient } from "@/lib/googleAuth";

const DURATION_MINUTES = 30;

function addMinutes(d: Date, mins: number) {
    return new Date(d.getTime() + mins * 60_000);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            startISO,
            meetingType, // "office" | "video"
            name,
            email,
            company,
            companySize,
            role,
            whatsapp,
            challenge,
        } = body || {};

        if (!startISO || !meetingType || !name || !email || !company || !whatsapp) {
            return NextResponse.json(
                { ok: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const calendarId = process.env.BOOKING_CALENDAR_ID || "primary";
        const timeZone = process.env.TIMEZONE || "Africa/Mogadishu";
        const officeAddress = process.env.OFFICE_ADDRESS || "Our office";

        const auth = await getAuthedOAuthClient();
        const cal = google.calendar({ version: "v3", auth });

        const start = new Date(startISO);
        const end = addMinutes(start, DURATION_MINUTES);

        // 1) re-check free/busy for conflict (race condition protection)
        const fb = await cal.freebusy.query({
            requestBody: {
                timeMin: start.toISOString(),
                timeMax: end.toISOString(),
                timeZone,
                items: [{ id: calendarId }],
            },
        });

        const busy = fb.data.calendars?.[calendarId]?.busy || [];
        if (busy.length > 0) {
            return NextResponse.json(
                { ok: false, error: "Slot already taken" },
                { status: 409 }
            );
        }

        // 2) build event
        const eventBody: any = {
            summary: `Demo Booking — ${company}`,
            description: [
                `Name: ${name}`,
                `Email: ${email}`,
                `Company: ${company}`,
                `Company size: ${companySize || "-"}`,
                `Role: ${role || "-"}`,
                `WhatsApp: ${whatsapp}`,
                `Meeting type: ${meetingType}`,
                `Biggest challenge: ${challenge || "-"}`,
            ].join("\n"),
            start: { dateTime: start.toISOString(), timeZone },
            end: { dateTime: end.toISOString(), timeZone },
            attendees: [{ email }],
        };

        if (meetingType === "office") {
            eventBody.location = officeAddress; // no Google Meet
        }

        if (meetingType === "video") {
            eventBody.conferenceData = {
                createRequest: {
                    requestId: `meet-${Date.now()}`,
                    conferenceSolutionKey: { type: "hangoutsMeet" },
                },
            };
        }

        // 3) create event
        const event = await cal.events.insert({
            calendarId,
            conferenceDataVersion: meetingType === "video" ? 1 : 0,
            requestBody: eventBody,
        }) as unknown as { data: any };

        let meetLink: string | undefined = undefined;

        if (meetingType === "video" && event.data.id) {
            // Sometimes meet link isn't attached immediately in insert response,
            // so we re-fetch the event.
            const fetched = await cal.events.get({
                calendarId,
                eventId: event.data.id,
            }) as unknown as { data: any };

            meetLink =
                fetched.data.hangoutLink ||
                fetched.data.conferenceData?.entryPoints?.find(
                    (e: any) => e.entryPointType === "video"
                )?.uri ||
                undefined;
        }

        return NextResponse.json({
            ok: true,
            eventId: event.data.id,
            meetLink,
        });
    } catch (err: any) {
        return NextResponse.json(
            { ok: false, error: err?.message || "Server error" },
            { status: 500 }
        );
    }
}