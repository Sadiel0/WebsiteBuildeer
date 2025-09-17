export default function FAQ({ items, tokens }: any) {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Preguntas frecuentes</h2>
        <div className="space-y-6">
          {items.map((item: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">{item.q}</h3>
              <p className="text-gray-700">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
