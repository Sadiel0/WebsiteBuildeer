"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Wizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: '',
    goal: 'calls' as 'calls' | 'whatsapp' | 'bookings' | 'foot_traffic',
    language: 'es' as 'es' | 'en' | 'bilingual',
    vibe: '',
    colorSeed: '',
    density: 'cozy' as 'cozy' | 'compact',
    phone: '',
    whatsapp: '',
    hours: '',
    areas: [] as string[],
    services: [] as { title: string; blurb: string }[],
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/plan/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType: formData.businessType,
          goal: formData.goal,
          language: formData.language,
          style: {
            vibe: formData.vibe,
            colorSeed: formData.colorSeed,
            density: formData.density,
          },
          contact: {
            phone: formData.phone,
            whatsapp: formData.whatsapp,
            hours: formData.hours,
          },
          areas: formData.areas,
          services: formData.services,
        }),
      });

      const result = await response.json();
      if (result.ok) {
        router.push(`/s/${result.projectId}`);
      } else {
        console.error('Error creating plan:', result.errors);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Configuración de tu sitio web</h1>
              <span className="text-sm text-gray-500">Paso {step} de 4</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Información básica</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de negocio</label>
                <input
                  type="text"
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  placeholder="ej. plomero, restaurante, consultoría"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Objetivo principal</label>
                <select
                  value={formData.goal}
                  onChange={(e) => handleInputChange('goal', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="calls">Recibir llamadas</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="bookings">Reservas</option>
                  <option value="foot_traffic">Tráfico físico</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Idioma</label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                  <option value="bilingual">Bilingüe</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Estilo y diseño</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Estilo visual</label>
                <input
                  type="text"
                  value={formData.vibe}
                  onChange={(e) => handleInputChange('vibe', e.target.value)}
                  placeholder="ej. moderno, clásico, minimalista"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Color principal (opcional)</label>
                <input
                  type="color"
                  value={formData.colorSeed || '#1f8ecd'}
                  onChange={(e) => handleInputChange('colorSeed', e.target.value)}
                  className="w-full h-12 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Densidad del contenido</label>
                <select
                  value={formData.density}
                  onChange={(e) => handleInputChange('density', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="cozy">Cómodo</option>
                  <option value="compact">Compacto</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Información de contacto</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 305 555 1234"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp</label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  placeholder="+1 305 555 1234"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Horarios</label>
                <input
                  type="text"
                  value={formData.hours}
                  onChange={(e) => handleInputChange('hours', e.target.value)}
                  placeholder="L–S 8:00–18:00"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Servicios y áreas</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Servicios principales</label>
                <div className="space-y-2">
                  {formData.services.map((service, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => {
                          const newServices = [...formData.services];
                          newServices[index] = { ...service, title: e.target.value };
                          handleInputChange('services', newServices);
                        }}
                        placeholder="Nombre del servicio"
                        className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => {
                          const newServices = formData.services.filter((_, i) => i !== index);
                          handleInputChange('services', newServices);
                        }}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newServices = [...formData.services, { title: '', blurb: '' }];
                      handleInputChange('services', newServices);
                    }}
                    className="w-full p-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-gray-400"
                  >
                    + Agregar servicio
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Anterior
            </button>
            
            {step < 4 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Generando...' : 'Crear sitio web'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
