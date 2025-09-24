import Link from "next/link";

export default function AppleRepairs() {
  const iphoneModels = [
    {
      id: "iphone-16-pro",
      name: "iPhone 16 Pro",
      image: "/images/iphone-16-pro.jpg",
      year: "2024",
      description: "Seneste Pro model med A18 Pro chip"
    },
    {
      id: "iphone-16",
      name: "iPhone 16",
      image: "/images/iphone-16.jpg", 
      year: "2024",
      description: "Seneste standard model"
    },
    {
      id: "iphone-15-pro-max",
      name: "iPhone 15 Pro Max",
      image: "/images/iphone-15-pro-max.jpg",
      year: "2023",
      description: "Største Pro model med titanium"
    },
    {
      id: "iphone-15-pro",
      name: "iPhone 15 Pro",
      image: "/images/iphone-15-pro.jpg",
      year: "2023", 
      description: "Pro model med titanium design"
    },
    {
      id: "iphone-15",
      name: "iPhone 15",
      image: "/images/iphone-15.jpg",
      year: "2023",
      description: "Standard model med Dynamic Island"
    },
    {
      id: "iphone-14-pro-max",
      name: "iPhone 14 Pro Max",
      image: "/images/iphone-14-pro-max.jpg",
      year: "2022",
      description: "Største Pro model med A16 chip"
    },
    {
      id: "iphone-14-pro",
      name: "iPhone 14 Pro",
      image: "/images/iphone-14-pro.jpg",
      year: "2022",
      description: "Pro model med Dynamic Island"
    },
    {
      id: "iphone-14",
      name: "iPhone 14",
      image: "/images/iphone-14.jpg",
      year: "2022",
      description: "Standard model med A15 chip"
    },
    {
      id: "iphone-13-pro-max",
      name: "iPhone 13 Pro Max",
      image: "/images/iphone-13-pro-max.jpg",
      year: "2021",
      description: "Største Pro model med A15 chip"
    },
    {
      id: "iphone-13-pro",
      name: "iPhone 13 Pro",
      image: "/images/iphone-13-pro.jpg",
      year: "2021",
      description: "Pro model med ProMotion"
    },
    {
      id: "iphone-13",
      name: "iPhone 13",
      image: "/images/iphone-13.jpg",
      year: "2021",
      description: "Standard model med A15 chip"
    },
    {
      id: "iphone-12-pro-max",
      name: "iPhone 12 Pro Max",
      image: "/images/iphone-12-pro-max.jpg",
      year: "2020",
      description: "Største Pro model med A14 chip"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-yellow-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                iPhone Reparationer
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vi reparerer alle iPhone-modeller med originale dele og 24 måneders garanti. 
              Hurtig service direkte på din adresse.
            </p>
          </div>
        </div>
      </section>

      {/* iPhone Models Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Vælg din iPhone-model
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {iphoneModels.map((model) => (
              <Link 
                key={model.id}
                href={`/reparationer/apple/${model.id}`}
                className="group bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-pink-300 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
                    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                  {model.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{model.year}</p>
                <p className="text-xs text-gray-600">{model.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Populære iPhone reparationer
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Skærmreparation</h3>
              <p className="text-gray-600">Udskiftning af ødelagte skærme på alle iPhone-modeller med 24 måneders garanti.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                  <path d="M15.67 4H14V2c0-.55-.45-1-1-1s-1 .45-1 1v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Batteriskift</h3>
              <p className="text-gray-600">Få nyt liv i din iPhone med et friskt batteri og 12 måneders garanti.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl text-center shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-purple-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Ladeport reparation</h3>
              <p className="text-gray-600">Reparation af opladningsproblemer på alle iPhone-modeller.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-yellow-500">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Har du ikke fundet din model?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Ring til os på +45 93 54 54 57 eller send en besked
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+4593545457"
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              📞 Ring nu
            </a>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors">
              Send besked
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
