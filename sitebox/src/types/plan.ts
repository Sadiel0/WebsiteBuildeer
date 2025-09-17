import { z } from "zod";

export const CtaSchema = z.object({
  type: z.enum(["phone", "whatsapp", "link"]),
  label: z.string().min(1).max(24),
  value: z.string().min(3).max(64),
});

export const SectionTypeEnum = z.enum([
  "Hero",
  "ServiceGrid",
  "WhyUs",
  "TestimonialStrip",
  "Gallery",
  "FAQ",
  "Contact",
  "Footer",
  "CTA",
]);

export const TokensSchema = z.object({
  primary: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
  accent: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
  radius: z.number().min(0).max(24),
  fontScale: z.enum(["sm", "md", "lg"]),
});

export const HeroProps = z.object({
  headline: z.string().min(3).max(60),
  subhead: z.string().min(0).max(120),
  cta: CtaSchema,
  imageRef: z.string().optional(),
});
export const ServiceGridProps = z.object({
  items: z.array(
    z.object({
      title: z.string().min(2).max(40),
      blurb: z.string().min(2).max(120),
      iconRef: z.string().optional(),
    })
  ).min(1).max(8),
});
export const WhyUsProps = z.object({
  bullets: z.array(z.string().min(2).max(80)).min(3).max(6),
});
export const TestimonialStripProps = z.object({
  items: z.array(z.object({
    name: z.string().min(2).max(40),
    quote: z.string().min(2).max(160),
  })).min(1).max(5),
});
export const GalleryProps = z.object({
  imageRefs: z.array(z.string()).min(3).max(12),
});
export const FAQProps = z.object({
  items: z.array(z.object({
    q: z.string().min(2).max(100),
    a: z.string().min(2).max(200),
  })).min(2).max(6),
});
export const ContactProps = z.object({
  whatsapp: z.string().optional(),
  phone: z.string().optional(),
  hours: z.string().optional(),
  areas: z.array(z.string()).optional(),
  address: z.string().optional(),
});
export const FooterProps = z.object({
  links: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
});

export const SectionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("Hero"),     props: HeroProps }),
  z.object({ type: z.literal("ServiceGrid"), props: ServiceGridProps }),
  z.object({ type: z.literal("WhyUs"),    props: WhyUsProps }),
  z.object({ type: z.literal("TestimonialStrip"), props: TestimonialStripProps }),
  z.object({ type: z.literal("Gallery"),  props: GalleryProps }),
  z.object({ type: z.literal("FAQ"),      props: FAQProps }),
  z.object({ type: z.literal("Contact"),  props: ContactProps }),
  z.object({ type: z.literal("Footer"),   props: FooterProps }),
  z.object({ type: z.literal("CTA"),      props: CtaSchema }),
]);

export const PagePlanSchema = z.object({
  templateId: z.string(),
  language: z.enum(["es", "en", "bilingual"]),
  tokens: TokensSchema,
  sections: z.array(SectionSchema).min(3).max(12),
  seo: z.object({
    title: z.string().min(3).max(60),
    description: z.string().min(3).max(160),
    schema: z.record(z.any()).optional(),
  }),
});
export type PagePlan = z.infer<typeof PagePlanSchema>;
