import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/microsoftAuth";
import { getGraphClient } from "@/lib/msGraph";

export async function GET() {
    try {
        const auth = await refreshAccessToken();
        const client = getGraphClient(auth.access_token);

        // 1. Check which user this token belongs to
        const me = await client.api('/me').select('displayName,mail,userPrincipalName').get();

        // 2. List ALL calendars (including shared ones)
        const calendars = await client.api('/me/calendars')
            .select('id,name,isDefaultCalendar,canEdit,owner')
            .get();

        return NextResponse.json({
            account: me,
            calendars: calendars.value,
        });
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
