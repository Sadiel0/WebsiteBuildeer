import { NextResponse } from "next/server";
export async function POST() {
  // TODO: call Vercel API to create alias, then write DNS if needed.
  return NextResponse.json({ ok:true, status:"stubbed" });
}
