export default function WhyUs({ bullets, tokens }: any) {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {bullets.map((bullet: string, index: number) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <p className="text-gray-700">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
