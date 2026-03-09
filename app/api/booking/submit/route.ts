import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/microsoftAuth";
import { getGraphClient } from "@/lib/msGraph";

const DURATION_MINUTES = 120;

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

        const officeAddress = process.env.OFFICE_ADDRESS || "Our office";

        const start = new Date(startISO);
        const end = addMinutes(start, DURATION_MINUTES);

        let client;
        try {
            console.log("[BOOK] Refreshing access token...");
            const auth = await refreshAccessToken();
            console.log("[BOOK] Got access token ✓");
            client = getGraphClient(auth.access_token);
        } catch (error) {
            console.error("[BOOK] ❌ Error authenticating with MS Graph:", error);
            return NextResponse.json(
                { ok: false, error: "Failed to authenticate with calendar" },
                { status: 500 }
            );
        }

        // 1. Re-check availability to prevent race condition
        console.log("[BOOK] Checking availability for:", start.toISOString(), "to", end.toISOString());
        const calendarViewRes = await client.api('/me/calendarview')
            .query({
                startDateTime: start.toISOString(),
                endDateTime: end.toISOString()
            })
            .select('start,end')
            .get();

        const busy = calendarViewRes.value || [];
        console.log("[BOOK] Busy slots found:", busy.length);
        if (busy.length > 0) {
            return NextResponse.json(
                { ok: false, error: "Slot already taken" },
                { status: 409 }
            );
        }

        // 2. Build Event
        const eventBody: Record<string, unknown> = {
            subject: `Demo Booking — ${company}`,
            body: {
                contentType: "HTML",
                content: `
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Company:</strong> ${company}</p>
                    <p><strong>Company size:</strong> ${companySize || "-"}</p>
                    <p><strong>Role:</strong> ${role || "-"}</p>
                    <p><strong>WhatsApp:</strong> ${whatsapp}</p>
                    <p><strong>Meeting type:</strong> ${meetingType}</p>
                    <p><strong>Biggest challenge:</strong> ${challenge || "-"}</p>
                `
            },
            start: { dateTime: start.toISOString(), timeZone: "UTC" },
            end: { dateTime: end.toISOString(), timeZone: "UTC" },
            attendees: [
                // The client who booked
                {
                    emailAddress: { address: email, name: name },
                    type: "required" as const
                },
                // All team members from TEAM_EMAILS env variable
                ...(process.env.TEAM_EMAILS || "")
                    .split(",")
                    .map(e => e.trim())
                    .filter(e => e.length > 0 && e !== email)
                    .map(teamEmail => ({
                        emailAddress: { address: teamEmail, name: teamEmail.split("@")[0] },
                        type: "required" as const
                    }))
            ]
        };

        if (meetingType === "office") {
            eventBody.location = { displayName: officeAddress };
        }

        if (meetingType === "video") {
            eventBody.isOnlineMeeting = true;
            eventBody.onlineMeetingProvider = "teamsForBusiness";
        }

        // 3. Create event
        console.log("[BOOK] Creating event on MS Graph...");
        const event = await client.api('/me/events').post(eventBody);
        console.log("[BOOK] ✅ Event created! ID:", event.id);
        console.log("[BOOK] Online meeting:", JSON.stringify(event.onlineMeeting));

        let meetLink: string | undefined = undefined;
        if (meetingType === "video" && event.onlineMeeting) {
            meetLink = event.onlineMeeting.joinUrl;
            console.log("[BOOK] Teams link:", meetLink);
        }

        return NextResponse.json({
            ok: true,
            eventId: event.id,
            meetLink,
        });
    } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Server error";
        return NextResponse.json(
            { ok: false, error: errorMsg },
            { status: 500 }
        );
    }
}