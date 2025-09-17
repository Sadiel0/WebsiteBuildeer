export default function ServiceGrid({ items, tokens }: any) {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
