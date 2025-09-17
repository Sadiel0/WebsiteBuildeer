import { PagePlanSchema } from "@/types/plan";
export function validatePlan(json: unknown) {
  const parsed = PagePlanSchema.safeParse(json);
  if (!parsed.success) {
    const errors = parsed.error.flatten();
    return { ok: false as const, errors };
  }
  return { ok: true as const, data: parsed.data };
}
