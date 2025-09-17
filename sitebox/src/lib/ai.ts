import OpenAI from "openai";

// Initialize OpenAI client with fallback for missing API key
export const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export const plannerSystem = `
You output a JSON page plan for local service businesses. Use only these section types:
Hero, ServiceGrid, WhyUs, TestimonialStrip, Gallery, FAQ, Contact, Footer, CTA.
Headlines ≤ 60 chars. Blurbs ≤ 120 chars. One Hero max.
Primary CTA must appear in the first section.
Spanish if language=es. Return JSON only matching provided schema.
No HTML, no markdown.
`;

// Mock plan generator for development/testing
export function generateMockPlan(preferences: any) {
  // Ensure CTA type is valid
  const ctaType = preferences.goal === "whatsapp" ? "whatsapp" : 
                  preferences.goal === "bookings" ? "link" : "phone";
  
  const ctaValue = preferences.goal === "whatsapp" ? 
                   (preferences.contact?.whatsapp || "+13055551234") :
                   preferences.goal === "bookings" ? 
                   "https://booking.example.com" :
                   (preferences.contact?.phone || "+13055551234");

  return {
    templateId: "mock-template",
    language: preferences.language || "es",
    tokens: {
      primary: preferences.style?.colorSeed || "#1f8ecd",
      accent: "#ff6b35",
      radius: 8,
      fontScale: "md"
    },
    sections: [
      {
        type: "Hero",
        props: {
          headline: `${preferences.businessType || "Negocio"} profesional`,
          subhead: "Servicios de calidad con garantía total",
          cta: {
            type: ctaType,
            label: preferences.goal === "whatsapp" ? "WhatsApp" : 
                   preferences.goal === "bookings" ? "Reservar" : "Llamar ahora",
            value: ctaValue
          }
        }
      },
      {
        type: "ServiceGrid",
        props: {
          items: preferences.services?.map((service: any) => ({
            title: service.title,
            blurb: service.blurb || `Servicio de ${service.title.toLowerCase()}`
          })) || [
            { title: "Servicio 1", blurb: "Descripción del servicio" },
            { title: "Servicio 2", blurb: "Descripción del servicio" }
          ]
        }
      },
      {
        type: "WhyUs",
        props: {
          bullets: [
            "Servicio profesional",
            "Garantía total",
            "Precios justos",
            "Atención personalizada"
          ]
        }
      },
      {
        type: "Contact",
        props: {
          phone: preferences.contact?.phone,
          whatsapp: preferences.contact?.whatsapp,
          hours: preferences.contact?.hours,
          areas: preferences.areas
        }
      }
    ],
    seo: {
      title: `${preferences.businessType || "Negocio"} profesional`,
      description: `Servicios profesionales de ${preferences.businessType || "negocio"} con garantía total`
    }
  };
}
