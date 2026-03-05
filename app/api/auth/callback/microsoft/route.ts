import { NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/microsoftAuth";
import fs from "fs";
import path from "path";

function upsertEnv(key: string, value: string) {
    // DEV-ONLY: write refresh token to .env.local
    const envPath = path.join(process.cwd(), ".env.local");
    const current = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
    const lines = current.split(/\r?\n/).filter(Boolean);

    const i = lines.findIndex((l) => l.startsWith(`${key}=`));
    if (i >= 0) lines[i] = `${key}=${value}`;
    else lines.push(`${key}=${value}`);

    fs.writeFileSync(envPath, lines.join("\n") + "\n");
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    if (!code) return NextResponse.json({ error: "Missing ?code" }, { status: 400 });

    const tok = await exchangeCodeForToken(code);

    if (tok.refresh_token) {
        upsertEnv("MS_REFRESH_TOKEN", tok.refresh_token);
    }

    // redirect back to home
    return NextResponse.redirect(new URL("/", req.url));
}