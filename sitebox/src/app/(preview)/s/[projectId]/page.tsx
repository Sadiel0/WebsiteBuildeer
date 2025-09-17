import { createClient } from "@supabase/supabase-js";
import SectionRenderer from "@/components/renderer/SectionRenderer";
import { PagePlan } from "@/types/plan";

// Initialize Supabase client only if credentials are available
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  : null;

// Mock plan for development/testing
const mockPlan: PagePlan = {
  templateId: "mock-template",
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
        headline: "Plumber profesional",
        subhead: "Servicios de calidad con garantía total",
        cta: {
          type: "phone",
          label: "Llamar ahora",
          value: "305 305 305"
        }
      }
    },
    {
      type: "ServiceGrid",
      props: {
        items: [
          {
            title: "Plumbing",
            blurb: "Servicio de plumbing"
          },
          {
            title: "Locksmith",
            blurb: "Servicio de locksmith"
          },
          {
            title: "Painting",
            blurb: "Servicio de painting"
          }
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
        phone: "305 305 305",
        whatsapp: "305 305 305",
        hours: "24/7",
        areas: []
      }
    }
  ],
  seo: {
    title: "Plumber profesional",
    description: "Servicios profesionales de Plumber con garantía total"
  }
};

export default async function PreviewPage({ params }: { params: { projectId: string } }) {
  // If Supabase is not configured, show mock plan
  if (!supabase) {
    return (
      <div className="min-h-screen">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Modo de desarrollo:</strong> Mostrando sitio de ejemplo. Configure Supabase para ver sitios reales.
              </p>
            </div>
          </div>
        </div>
        <SectionRenderer plan={mockPlan} />
      </div>
    );
  }

  const { data, error } = await supabase
    .from("plans")
    .select("plan")
    .eq("id", params.projectId)
    .single();

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sitio no encontrado</h1>
          <p className="text-gray-600">El proyecto que buscas no existe o ha sido eliminado.</p>
          <div className="mt-8">
            <a href="/wizard" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Crear nuevo sitio
            </a>
          </div>
        </div>
      </div>
    );
  }

  const plan = data.plan as PagePlan;

  return (
    <div className="min-h-screen">
      <SectionRenderer plan={plan} />
    </div>
  );
}
