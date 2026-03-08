import { NextResponse } from "next/server";

export async function GET() {
    const clientId = process.env.AZURE_CLIENT_ID || "";
    const tenantId = process.env.AZURE_TENANT_ID || "";
    const redirect = process.env.AZURE_REDIRECT_URI || "";

    return NextResponse.json({
        hasClientId: Boolean(clientId),
        hasTenantId: Boolean(tenantId),
        redirectUri: redirect,
        hasClientSecret: Boolean(process.env.AZURE_CLIENT_SECRET),
        envLoaded: true,
    });
}