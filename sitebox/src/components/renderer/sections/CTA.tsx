export default function CTA({ type, label, value, tokens }: any) {
  return (
    <section className="w-full py-16 bg-blue-600">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">¿Listo para comenzar?</h2>
        <a href={type === "phone" ? `tel:${value}` : type === "whatsapp" ? `https://wa.me/${value}` : value}
           className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors">
          {label}
        </a>
      </div>
    </section>
  );
}
