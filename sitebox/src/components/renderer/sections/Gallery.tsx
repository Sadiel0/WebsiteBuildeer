export default function Gallery({ imageRefs, tokens }: any) {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestro trabajo</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {imageRefs.map((imageRef: string, index: number) => (
            <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Imagen {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
