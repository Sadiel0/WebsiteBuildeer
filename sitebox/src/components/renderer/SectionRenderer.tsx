"use client";
import { PagePlan, SectionSchema } from "@/types/plan";
import Hero from "./sections/Hero";
import ServiceGrid from "./sections/ServiceGrid";
import WhyUs from "./sections/WhyUs";
import TestimonialStrip from "./sections/TestimonialStrip";
import Gallery from "./sections/Gallery";
import FAQ from "./sections/FAQ";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import CTA from "./sections/CTA";

export default function SectionRenderer({ plan }: { plan: PagePlan }) {
  return (
    <div>
      {plan.sections.map((s, i) => {
        switch (s.type) {
          case "Hero": return <Hero key={i} {...s.props as any} tokens={plan.tokens} />;
          case "ServiceGrid": return <ServiceGrid key={i} {...s.props as any} tokens={plan.tokens} />;
          case "WhyUs": return <WhyUs key={i} {...s.props as any} tokens={plan.tokens} />;
          case "TestimonialStrip": return <TestimonialStrip key={i} {...s.props as any} tokens={plan.tokens} />;
          case "Gallery": return <Gallery key={i} {...s.props as any} tokens={plan.tokens} />;
          case "FAQ": return <FAQ key={i} {...s.props as any} tokens={plan.tokens} />;
          case "Contact": return <Contact key={i} {...s.props as any} tokens={plan.tokens} />;
          case "Footer": return <Footer key={i} {...s.props as any} tokens={plan.tokens} />;
          case "CTA": return <CTA key={i} {...s.props as any} tokens={plan.tokens} />;
          default: return null;
        }
      })}
    </div>
  );
}
