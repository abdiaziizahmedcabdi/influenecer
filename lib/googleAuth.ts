import { google } from "googleapis";

export function getOAuthClient() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    if (!clientId) throw new Error("Missing GOOGLE_CLIENT_ID");
    if (!clientSecret) throw new Error("Missing GOOGLE_CLIENT_SECRET");
    if (!redirectUri) throw new Error("Missing GOOGLE_REDIRECT_URI");

    return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

export function getAuthedOAuthClient() {
    const oauth2 = getOAuthClient();
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!refreshToken) {
        throw new Error(
            "Missing GOOGLE_REFRESH_TOKEN. Visit /api/auth/google to connect Google once."
        );
    }

    oauth2.setCredentials({ refresh_token: refreshToken });
    return oauth2;
}
