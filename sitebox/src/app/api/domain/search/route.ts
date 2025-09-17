import { NextRequest, NextResponse } from "next/server";
const BASE = "https://api.godaddy.com/v1";

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams.get("q");
  if (!q) return NextResponse.json({ ok:false, error:"missing q" }, { status: 400 });
  const r = await fetch(`${BASE}/domains/available?domain=${encodeURIComponent(q)}`, {
    headers: {
      Authorization: `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_API_SECRET}`
    }
  });
  const data = await r.json();
  return NextResponse.json({ ok:true, data });
}
