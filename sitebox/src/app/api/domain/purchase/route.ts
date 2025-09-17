import { NextRequest, NextResponse } from "next/server";
const BASE = "https://api.godaddy.com/v1";
export async function POST(req: NextRequest) {
  const body = await req.json();
  // Expect { domain, contact, consent }
  // TODO: validate and call GoDaddy purchase endpoint.
  return NextResponse.json({ ok:true, status:"stubbed" });
}
