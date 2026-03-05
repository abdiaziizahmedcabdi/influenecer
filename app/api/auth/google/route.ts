import { NextResponse } from "next/server";
import { getOAuthClient } from "@/lib/googleAuth";

export async function GET() {
    const oauth2 = getOAuthClient();

    const url = oauth2.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: ["https://www.googleapis.com/auth/calendar"],
    });

    return NextResponse.redirect(url);
}
