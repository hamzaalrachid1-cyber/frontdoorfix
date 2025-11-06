import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt os - FrontDoorFix | Mobilreparation København',
  description: 'Kontakt FrontDoorFix for mobilreparation i København. Ring, skriv eller book online. Hurtig respons og professionel service.',
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-200 mb-6 shadow-sm">
            <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Vi er klar til at hjælpe dig</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Kontakt <span className="bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent">FrontDoorFix</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Har du spørgsmål eller brug for hjælp? Vi er her for dig. Ring, skriv eller book direkte online.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-16 px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Phone */}
            <a 
              href="tel:+4593545457"
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-pink-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Ring til os</h3>
              <p className="text-gray-600 text-center mb-4">Hurtig og personlig service</p>
              <p className="text-2xl font-bold text-center bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent">
                +45 93 54 54 57
              </p>
              <p className="text-sm text-gray-500 text-center mt-2">Alle dage 8:00-22:00</p>
            </a>

            {/* Email */}
            <a 
              href="mailto:info@frontdoorfix.dk"
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-yellow-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Send email</h3>
              <p className="text-gray-600 text-center mb-4">Svar inden for 24 timer</p>
              <p className="text-lg font-bold text-center bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent break-all">
                info@frontdoorfix.dk
              </p>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/4593545457"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-green-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">WhatsApp</h3>
              <p className="text-gray-600 text-center mb-4">Chat direkte med os</p>
              <p className="text-lg font-semibold text-center text-green-600">
                Send besked
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-16 px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Send os en besked</h2>
              <p className="text-gray-600">Udfyld formularen nedenfor, og vi vender tilbage hurtigst muligt</p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Navn *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    placeholder="Dit fulde navn"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    placeholder="+45 12 34 56 78"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                  placeholder="din@email.dk"
                />
              </div>

              <div>
                <label htmlFor="device" className="block text-sm font-semibold text-gray-700 mb-2">
                  Enhed / Model
                </label>
                <input
                  type="text"
                  id="device"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                  placeholder="fx iPhone 15 Pro Max, Samsung Galaxy S24"
                />
              </div>

              <div>
                <label htmlFor="issue" className="block text-sm font-semibold text-gray-700 mb-2">
                  Hvad kan vi hjælpe med? *
                </label>
                <textarea
                  id="issue"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none"
                  placeholder="Beskriv problemet med din enhed..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Jeg accepterer at FrontDoorFix kontakter mig vedrørende min henvendelse *
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                📩 Send besked
              </button>

              <p className="text-xs text-gray-500 text-center">
                * Påkrævede felter
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="pb-16 px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Business Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Kontaktinformation</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Telefon</h4>
                    <a href="tel:+4593545457" className="text-pink-600 hover:text-pink-700 font-medium">
                      +45 93 54 54 57
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Alle dage 8:00-22:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a href="mailto:info@frontdoorfix.dk" className="text-pink-600 hover:text-pink-700 font-medium break-all">
                      info@frontdoorfix.dk
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Svar inden for 24 timer</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                    <a href="https://wa.me/4593545457" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium">
                      Chat med os
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Hurtig respons</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Serviceområde</h4>
                    <p className="text-gray-700">København, Frederiksberg, Gentofte, Lyngby, Glostrup og omegn</p>
                    <p className="text-sm text-gray-500 mt-1">Ring for at høre om vi dækker dit område</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map / Hours */}
            <div className="space-y-8">
              {/* Opening Hours */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Åbningstider</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Mandag - Fredag</span>
                    <span className="font-bold text-gray-900">08:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Lørdag - Søndag</span>
                    <span className="font-bold text-gray-900">08:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Helligdage</span>
                    <span className="font-bold text-gray-900">08:00 - 22:00</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-yellow-50 rounded-xl border border-pink-200">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold text-gray-700">Vi har åbent alle dage</span>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-gradient-to-br from-pink-500 to-yellow-500 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ofte stillede spørgsmål</h3>
                <p className="mb-6 opacity-90">Find svar på de mest almindelige spørgsmål</p>
                
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Hvor lang tid tager en reparation?</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Hvilke garantier tilbyder I?</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Bruger I originale dele?</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Mister jeg data ved reparation?</span>
                  </li>
                </ul>

                <a 
                  href="/faq"
                  className="mt-6 inline-block bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Se alle spørgsmål →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="pb-16 px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                  2000+
                </div>
                <p className="text-gray-600 font-medium">Glade kunder</p>
              </div>
              
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                  24 mdr
                </div>
                <p className="text-gray-600 font-medium">Garanti på skærme</p>
              </div>
              
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                  4.9/5
                </div>
                <p className="text-gray-600 font-medium">Gennemsnitlig vurdering</p>
              </div>
              
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                  &lt;30 min
                </div>
                <p className="text-gray-600 font-medium">Gennemsnitlig reparationstid</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

