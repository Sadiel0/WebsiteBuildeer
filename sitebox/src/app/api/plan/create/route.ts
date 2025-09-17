import { NextRequest, NextResponse } from "next/server";
import { openai, plannerSystem, generateMockPlan } from "@/lib/ai";
import { validatePlan } from "@/lib/validators";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const PrefsSchema = z.object({
  businessType: z.string(),
  goal: z.enum(["calls","whatsapp","bookings","foot_traffic"]),
  language: z.enum(["es","en","bilingual"]).default("es"),
  style: z.object({ vibe: z.string(), colorSeed: z.string().optional(), density: z.enum(["cozy","compact"]).optional() }),
  assets: z.array(z.object({ url: z.string(), kind: z.enum(["logo","photo"]) })).optional(),
  contact: z.object({ phone: z.string().optional(), whatsapp: z.string().optional(), hours: z.string().optional() }).optional(),
  areas: z.array(z.string()).optional(),
  services: z.array(z.object({ title: z.string(), blurb: z.string().optional() })).optional(),
});

// Initialize Supabase client only if credentials are available
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received preferences:", JSON.stringify(body, null, 2));
    
    const prefs = PrefsSchema.parse(body);
    console.log("Parsed preferences:", JSON.stringify(prefs, null, 2));
    
    let json;
    
    // Try to use OpenAI if available, otherwise use mock plan
    if (openai) {
      console.log("Using OpenAI to generate plan...");
      const userMsg = {
        role: "user" as const,
        content: JSON.stringify({ preferences: prefs, constraints: { length: { headline:60, blurb:120 } } }),
      };

      const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [{ role: "system", content: plannerSystem }, userMsg],
        response_format: { type: "json_object" },
      });

      const raw = res.choices[0]?.message?.content ?? "{}";
      json = JSON.parse(raw);
      console.log("OpenAI generated plan:", JSON.stringify(json, null, 2));
    } else {
      console.log("Using mock plan generator...");
      // Use mock plan generator
      json = generateMockPlan(prefs);
      console.log("Mock generated plan:", JSON.stringify(json, null, 2));
    }

    const valid = validatePlan(json);
    if (!valid.ok) {
      console.error("Plan validation failed:", valid.errors);
      return NextResponse.json({ ok:false, errors: valid.errors }, { status: 422 });
    }

    console.log("Plan validation successful");

    // Try to save to Supabase if available, otherwise return plan directly
    if (supabase) {
      const { data, error } = await supabase.from("plans").insert({ plan: json }).select().single();
      if (error) {
        console.error("Supabase error:", error);
        // Fall back to returning plan without saving
        return NextResponse.json({ ok:true, projectId: "mock-" + Date.now(), plan: json });
      }
      return NextResponse.json({ ok:true, projectId: data.id, plan: json });
    } else {
      // Return plan without saving to database
      return NextResponse.json({ ok:true, projectId: "mock-" + Date.now(), plan: json });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ ok:false, error: "Internal server error" }, { status: 500 });
  }
}
