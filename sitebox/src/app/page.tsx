import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Crea tu sitio web profesional en 3 minutos
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Generador de sitios web bilingües para pequeñas empresas con IA. 
            Diseño automático, dominio incluido, publicación instantánea.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/wizard"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Comenzar Gratis
            </Link>
            <Link 
              href="#features"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Ver Características
            </Link>
          </div>
        </div>

        <div id="features" className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">IA Inteligente</h3>
            <p className="text-gray-600">
              Nuestra IA analiza tu negocio y crea contenido optimizado automáticamente.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🌐</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Bilingüe</h3>
            <p className="text-gray-600">
              Sitios web en español e inglés para llegar a más clientes.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Rápido</h3>
            <p className="text-gray-600">
              Desde la idea hasta el sitio web publicado en menos de 3 minutos.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
