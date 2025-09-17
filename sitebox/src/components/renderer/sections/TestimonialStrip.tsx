export default function TestimonialStrip({ items, tokens }: any) {
  return (
    <section className="w-full py-16 bg-blue-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-4 italic">"{item.quote}"</p>
              <p className="font-semibold text-gray-900">- {item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
