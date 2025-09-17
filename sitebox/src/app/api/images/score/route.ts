import { NextResponse } from "next/server";
export async function POST() {
  // TODO: implement ONNX/TF scoring. For now return simple roles.
  return NextResponse.json({ roles: { hero: null, cards: [], background: null }});
}
