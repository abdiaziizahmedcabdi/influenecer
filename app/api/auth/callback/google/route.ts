import { NextResponse } from "next/server";
import { getOAuthClient } from "@/lib/googleAuth";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing ?code from Google" }, { status: 400 });
    }

    const oauth2 = getOAuthClient();
    const { tokens } = await oauth2.getToken(code);

    return NextResponse.json({
        ok: true,
        gotAccessToken: Boolean(tokens.access_token),
        gotRefreshToken: Boolean(tokens.refresh_token),
        refreshToken: tokens.refresh_token || null,
        note: "Copy refreshToken into .env.local as GOOGLE_REFRESH_TOKEN, then restart server.",
    });
}
