import { NextResponse } from "next/server";

export async function GET() {
    const clientId = process.env.GOOGLE_CLIENT_ID || "";
    const redirect = process.env.GOOGLE_REDIRECT_URI || "";

    return NextResponse.json({
        hasClientId: Boolean(clientId),
        clientIdEndsWithGoogleusercontent: clientId.endsWith(".apps.googleusercontent.com"),
        redirectUri: redirect,
        hasClientSecret: Boolean(process.env.GOOGLE_CLIENT_SECRET),
        envLoaded: true,
    });
}