export default function Contact({ whatsapp, phone, hours, areas, address, tokens }: any) {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contáctanos</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Información de contacto</h3>
            {phone && (
              <div className="mb-3">
                <span className="font-medium">Teléfono: </span>
                <a href={`tel:${phone}`} className="text-blue-600 hover:underline">{phone}</a>
              </div>
            )}
            {whatsapp && (
              <div className="mb-3">
                <span className="font-medium">WhatsApp: </span>
                <a href={`https://wa.me/${whatsapp}`} className="text-green-600 hover:underline">{whatsapp}</a>
              </div>
            )}
            {hours && (
              <div className="mb-3">
                <span className="font-medium">Horarios: </span>
                <span>{hours}</span>
              </div>
            )}
            {address && (
              <div className="mb-3">
                <span className="font-medium">Dirección: </span>
                <span>{address}</span>
              </div>
            )}
          </div>
          {areas && areas.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Áreas de servicio</h3>
              <div className="flex flex-wrap gap-2">
                {areas.map((area: string, index: number) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
