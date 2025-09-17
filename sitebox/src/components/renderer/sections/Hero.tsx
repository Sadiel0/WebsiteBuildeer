import { TokensSchema } from "@/types/plan";

export default function Hero({ headline, subhead, cta, imageRef, tokens }: any) {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-semibold">{headline}</h1>
          {subhead && <p className="mt-3 text-muted-foreground">{subhead}</p>}
          <a href={cta.type === "phone" ? `tel:${cta.value}` : cta.type === "whatsapp" ? `https://wa.me/${cta.value}` : cta.value}
             className="inline-block mt-6 rounded-2xl px-5 py-3 text-white"
             style={{ backgroundColor: tokens.primary }}>
            {cta.label}
          </a>
        </div>
        <div className="aspect-[16/10] bg-gray-100 rounded-2xl" />
      </div>
    </section>
  );
}
