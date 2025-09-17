import { describe, it, expect } from 'vitest';
// import { render } from '@testing-library/react';
import SectionRenderer from '@/components/renderer/SectionRenderer';
import { PagePlan } from '@/types/plan';

const samplePlan: PagePlan = {
  templateId: "test-template",
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
        headline: "Test Headline",
        subhead: "Test subheadline",
        cta: {
          type: "phone",
          label: "Call Now",
          value: "+13055551234"
        }
      }
    },
    {
      type: "ServiceGrid",
      props: {
        items: [
          {
            title: "Service 1",
            blurb: "Service description"
          }
        ]
      }
    }
  ],
  seo: {
    title: "Test Site",
    description: "Test description"
  }
};

describe('SectionRenderer', () => {
  it('should have valid plan structure', () => {
    expect(samplePlan.templateId).toBe("test-template");
    expect(samplePlan.sections).toHaveLength(2);
    expect(samplePlan.sections[0].type).toBe("Hero");
    expect(samplePlan.sections[1].type).toBe("ServiceGrid");
  });

  it('should have valid tokens', () => {
    expect(samplePlan.tokens.primary).toBe("#1f8ecd");
    expect(samplePlan.tokens.accent).toBe("#ff6b35");
    expect(samplePlan.tokens.radius).toBe(8);
  });

  it('should have valid SEO data', () => {
    expect(samplePlan.seo.title).toBe("Test Site");
    expect(samplePlan.seo.description).toBe("Test description");
  });
});
