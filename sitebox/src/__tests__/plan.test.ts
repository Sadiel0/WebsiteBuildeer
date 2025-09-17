import { describe, it, expect } from 'vitest';
import { PagePlanSchema } from '@/types/plan';
import { validatePlan } from '@/lib/validators';

const samplePlan = {
  templateId: "plumber-template",
  language: "es",
  tokens: {
    primary: "#1f8ecd",
    accent: "#ff6b35",
    radius: 8,
    fontScale: "md"
  },
  sections: [
    {
      type: "Hero",
      props: {
        headline: "Plomería profesional en Miami",
        subhead: "Servicios de plomería 24/7 con garantía total",
        cta: {
          type: "phone",
          label: "Llamar ahora",
          value: "+13055551234"
        }
      }
    },
    {
      type: "ServiceGrid",
      props: {
        items: [
          {
            title: "Destapes",
            blurb: "Destapamos cualquier tipo de tubería"
          },
          {
            title: "Fugas",
            blurb: "Reparación de fugas de agua"
          },
          {
            title: "Calentadores",
            blurb: "Instalación y reparación de calentadores"
          }
        ]
      }
    },
    {
      type: "WhyUs",
      props: {
        bullets: [
          "Servicio 24/7",
          "Garantía total",
          "Precios justos",
          "Técnicos certificados"
        ]
      }
    }
  ],
  seo: {
    title: "Plomería Miami - Servicios profesionales",
    description: "Servicios de plomería profesionales en Miami con garantía total"
  }
};

describe('Plan Validation', () => {
  it('should validate a correct plan', () => {
    const result = validatePlan(samplePlan);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.templateId).toBe("plumber-template");
      expect(result.data.sections).toHaveLength(3);
    }
  });

  it('should reject invalid plan', () => {
    const invalidPlan = { ...samplePlan, language: "invalid" };
    const result = validatePlan(invalidPlan);
    expect(result.ok).toBe(false);
  });

  it('should validate with Zod schema directly', () => {
    const parsed = PagePlanSchema.safeParse(samplePlan);
    expect(parsed.success).toBe(true);
  });
});
