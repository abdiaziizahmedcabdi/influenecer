import { NextResponse } from "next/server";

export async function GET() {
    const tenant = process.env.MS_TENANT_ID!;
    const clientId = process.env.MS_CLIENT_ID!;
    const redirectUri = process.env.MS_REDIRECT_URI!;
    const scopes = (process.env.MS_SCOPES || "offline_access openid profile email Calendars.ReadWrite")
        .split(" ")
        .join(" ");

    const url = new URL(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`);
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_mode", "query");
    url.searchParams.set("scope", scopes);
    url.searchParams.set("prompt", "consent"); // important to get refresh token

    return NextResponse.redirect(url.toString());
}