import Link from "next/link";

export default function AppleRepairs() {
  const iphoneModels = [
    // iPhone 16 Series (2024)
    {
      id: "iphone-16-pro-max",
      name: "iPhone 16 Pro Max",
      image: "/images/iphone-16-pro-max.jpg",
      year: "2024",
      description: "Største Pro model med A18 Pro chip"
    },
    {
      id: "iphone-16-pro",
      name: "iPhone 16 Pro",
      image: "/images/iphone-16-pro.jpg",
      year: "2024",
      description: "Pro model med A18 Pro chip"
    },
    {
      id: "iphone-16-plus",
      name: "iPhone 16 Plus",
      image: "/images/iphone-16-plus.jpg",
      year: "2024",
      description: "Større standard model"
    },
    {
      id: "iphone-16",
      name: "iPhone 16",
      image: "/images/iphone-16.jpg", 
      year: "2024",
      description: "Standard model med A18 chip"
    },
    
    // iPhone 15 Series (2023)
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
      id: "iphone-15-plus",
      name: "iPhone 15 Plus",
      image: "/images/iphone-15-plus.jpg",
      year: "2023",
      description: "Større standard model"
    },
    {
      id: "iphone-15",
      name: "iPhone 15",
      image: "/images/iphone-15.jpg",
      year: "2023",
      description: "Standard model med Dynamic Island"
    },
    
    // iPhone 14 Series (2022)
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
      id: "iphone-14-plus",
      name: "iPhone 14 Plus",
      image: "/images/iphone-14-plus.jpg",
      year: "2022",
      description: "Større standard model"
    },
    {
      id: "iphone-14",
      name: "iPhone 14",
      image: "/images/iphone-14.jpg",
      year: "2022",
      description: "Standard model med A15 chip"
    },
    
    // iPhone 13 Series (2021)
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
      id: "iphone-13-mini",
      name: "iPhone 13 mini",
      image: "/images/iphone-13-mini.jpg",
      year: "2021",
      description: "Kompakt model med A15 chip"
    },
    {
      id: "iphone-13",
      name: "iPhone 13",
      image: "/images/iphone-13.jpg",
      year: "2021",
      description: "Standard model med A15 chip"
    },
    
    // iPhone 12 Series (2020)
    {
      id: "iphone-12-pro-max",
      name: "iPhone 12 Pro Max",
      image: "/images/iphone-12-pro-max.jpg",
      year: "2020",
      description: "Største Pro model med A14 chip"
    },
    {
      id: "iphone-12-pro",
      name: "iPhone 12 Pro",
      image: "/images/iphone-12-pro.jpg",
      year: "2020",
      description: "Pro model med A14 chip"
    },
    {
      id: "iphone-12-mini",
      name: "iPhone 12 mini",
      image: "/images/iphone-12-mini.jpg",
      year: "2020",
      description: "Kompakt model med A14 chip"
    },
    {
      id: "iphone-12",
      name: "iPhone 12",
      image: "/images/iphone-12.jpg",
      year: "2020",
      description: "Standard model med A14 chip"
    },
    
    // iPhone 11 Series (2019)
    {
      id: "iphone-11-pro-max",
      name: "iPhone 11 Pro Max",
      image: "/images/iphone-11-pro-max.jpg",
      year: "2019",
      description: "Største Pro model med A13 chip"
    },
    {
      id: "iphone-11-pro",
      name: "iPhone 11 Pro",
      image: "/images/iphone-11-pro.jpg",
      year: "2019",
      description: "Pro model med A13 chip"
    },
    {
      id: "iphone-11",
      name: "iPhone 11",
      image: "/images/iphone-11.jpg",
      year: "2019",
      description: "Standard model med A13 chip"
    },
    
    // iPhone XS Series (2018)
    {
      id: "iphone-xs-max",
      name: "iPhone XS Max",
      image: "/images/iphone-xs-max.jpg",
      year: "2018",
      description: "Største model med A12 chip"
    },
    {
      id: "iphone-xs",
      name: "iPhone XS",
      image: "/images/iphone-xs.jpg",
      year: "2018",
      description: "Premium model med A12 chip"
    },
    {
      id: "iphone-xr",
      name: "iPhone XR",
      image: "/images/iphone-xr.jpg",
      year: "2018",
      description: "Budget model med A12 chip"
    },
    
    // iPhone X (2017)
    {
      id: "iphone-x",
      name: "iPhone X",
      image: "/images/iphone-x.jpg",
      year: "2017",
      description: "Revolutionær model med Face ID"
    },
    
    // iPhone 8 Series (2017)
    {
      id: "iphone-8-plus",
      name: "iPhone 8 Plus",
      image: "/images/iphone-8-plus.jpg",
      year: "2017",
      description: "Større model med A11 chip"
    },
    {
      id: "iphone-8",
      name: "iPhone 8",
      image: "/images/iphone-8.jpg",
      year: "2017",
      description: "Standard model med A11 chip"
    },
    
    // iPhone 7 Series (2016)
    {
      id: "iphone-7-plus",
      name: "iPhone 7 Plus",
      image: "/images/iphone-7-plus.jpg",
      year: "2016",
      description: "Større model med A10 chip"
    },
    {
      id: "iphone-7",
      name: "iPhone 7",
      image: "/images/iphone-7.jpg",
      year: "2016",
      description: "Standard model med A10 chip"
    },
    
    // iPhone 6S Series (2015)
    {
      id: "iphone-6s-plus",
      name: "iPhone 6s Plus",
      image: "/images/iphone-6s-plus.jpg",
      year: "2015",
      description: "Større model med A9 chip"
    },
    {
      id: "iphone-6s",
      name: "iPhone 6s",
      image: "/images/iphone-6s.jpg",
      year: "2015",
      description: "Standard model med A9 chip"
    },
    
    // iPhone 6 Series (2014)
    {
      id: "iphone-6-plus",
      name: "iPhone 6 Plus",
      image: "/images/iphone-6-plus.jpg",
      year: "2014",
      description: "Større model med A8 chip"
    },
    {
      id: "iphone-6",
      name: "iPhone 6",
      image: "/images/iphone-6.jpg",
      year: "2014",
      description: "Standard model med A8 chip"
    },
    
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {iphoneModels.map((model) => (
              <div 
                key={model.id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-pink-300 transition-all duration-300"
              >
                {/* Phone Image */}
                <div className="h-48 bg-white flex items-center justify-center p-6">
                  <div className="card__media w-full h-full flex items-center justify-center">
                    {(model.id === "iphone-6" || model.id === "iphone-6-plus") ? (
                      <img 
                        src="/images/iphones/iphone-6.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-6s" ? (
                      <img 
                        src="/images/iphones/iphone-6s.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-6s-plus" ? (
                      <img 
                        src="/images/iphones/iphone-6s-plus.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-7" ? (
                      <img 
                        src="/images/iphones/iphone-7.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-7-plus" ? (
                      <img 
                        src="/images/iphones/iphone-7-plus.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="relative">
                        {/* Front View */}
                        <div className="absolute left-0 top-0 w-16 h-32 bg-gray-800 rounded-xl border border-gray-600 shadow-lg">
                          <div className="w-full h-full bg-black rounded-lg flex flex-col">
                            {/* Status Bar */}
                            <div className="h-4 bg-black rounded-t-lg flex items-center justify-between px-1 text-white text-xs">
                              <span>9:41</span>
                              <span>100%</span>
                            </div>
                            {/* Screen Content */}
                            <div className="flex-1 bg-gradient-to-b from-blue-200 to-blue-300 rounded-b-lg p-1">
                              <div className="grid grid-cols-3 gap-0.5 h-full">
                                <div className="bg-blue-500 rounded-sm"></div>
                                <div className="bg-green-500 rounded-sm"></div>
                                <div className="bg-red-500 rounded-sm"></div>
                                <div className="bg-yellow-500 rounded-sm"></div>
                                <div className="bg-purple-500 rounded-sm"></div>
                                <div className="bg-pink-500 rounded-sm"></div>
                              </div>
                            </div>
                            {/* Home Button */}
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-600 rounded-full border border-gray-500"></div>
                          </div>
                        </div>
                        
                        {/* Back View */}
                        <div className="absolute left-12 top-0 w-16 h-32 bg-gray-300 rounded-xl border border-gray-400 shadow-lg">
                          <div className="w-full h-full bg-gray-200 rounded-lg flex flex-col items-center justify-center">
                            {/* Apple Logo */}
                            <div className="w-6 h-6 bg-gray-600 rounded mb-1"></div>
                            {/* iPhone Text */}
                            <div className="text-xs text-gray-600 font-semibold">iPhone</div>
                            {/* Camera */}
                            <div className="absolute top-3 left-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                    {model.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 font-medium">{model.year}</p>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">{model.description}</p>
                  <Link 
                    href={`/reparationer/apple/${model.id}`}
                    className="btn-gradient px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                  >
                    <span>👉</span>
                    Se priser & reparationer
                  </Link>
                </div>
              </div>
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
