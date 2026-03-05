import "server-only";

const TENANT = process.env.MS_TENANT_ID!;
const CLIENT_ID = process.env.MS_CLIENT_ID!;
const CLIENT_SECRET = process.env.MS_CLIENT_SECRET!;
const REDIRECT_URI = process.env.MS_REDIRECT_URI!;
const SCOPES = (process.env.MS_SCOPES || "offline_access openid profile email Calendars.ReadWrite")
    .split(" ")
    .join(" ");

function tokenUrl() {
    return `https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/token`;
}

export async function exchangeCodeForToken(code: string) {
    const body = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        scope: SCOPES,
    });

    const res = await fetch(tokenUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error_description || "Failed to exchange code");

    return data as {
        access_token: string;
        refresh_token?: string;
        expires_in: number;
    };
}

export async function refreshAccessToken() {
    const refreshToken = process.env.MS_REFRESH_TOKEN;
    if (!refreshToken) {
        throw new Error("Missing MS_REFRESH_TOKEN. Visit /api/auth/microsoft to connect once.");
    }

    const body = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        scope: SCOPES,
    });

    const res = await fetch(tokenUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error_description || "Failed to refresh token");

    return data as {
        access_token: string;
        refresh_token?: string;
        expires_in: number;
    };
}