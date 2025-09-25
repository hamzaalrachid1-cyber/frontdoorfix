'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BestilContent() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const model = searchParams.get('model');
  const repairs = searchParams.get('repairs')?.split(',') || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Bestil Reparation
          </h1>
          
          <div className="bg-gradient-to-r from-pink-50 to-yellow-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Din valgte reparation:</h2>
            
            {brand && (
              <div className="mb-2">
                <span className="font-medium text-gray-700">Brand:</span> {brand}
              </div>
            )}
            
            {model && (
              <div className="mb-2">
                <span className="font-medium text-gray-700">Model:</span> {model}
              </div>
            )}
            
            {repairs.length > 0 && (
              <div className="mb-2">
                <span className="font-medium text-gray-700">Reparationer:</span>
                <ul className="list-disc list-inside ml-4 mt-1">
                  {repairs.map((repair, index) => (
                    <li key={index} className="text-gray-600">{repair}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                🚧 Under udvikling
              </h3>
              <p className="text-blue-700">
                Denne side er under udvikling. Booking-funktionaliteten vil blive implementeret snart.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                I mellemtiden kan du kontakte os direkte:
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+4593545457"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
                >
                  📞 Ring nu: +45 93 54 54 57
                </a>
                
                <a 
                  href="mailto:info@frontdoorfix.dk"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  ✉️ Send email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BestilPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Indlæser...</p>
        </div>
      </div>
    }>
      <BestilContent />
    </Suspense>
  );
}
