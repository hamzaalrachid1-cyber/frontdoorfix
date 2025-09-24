"use client";

import Link from "next/link";
import { useState } from "react";

export default function AppleRepairs() {
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter models based on search only
  const filteredModels = iphoneModels.filter(model => {
    return model.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <nav className="bg-gray-100 py-3 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600">Forside</Link>
            <span>→</span>
            <Link href="/reparationer" className="hover:text-pink-600">Reparationer</Link>
            <span>→</span>
            <span className="text-gray-800 font-medium">iPhone</span>
          </div>
        </div>
      </nav>

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

             {/* Search & Filter Section */}
             <section className="py-8 bg-gray-50">
               <div className="mx-auto max-w-6xl px-6">
                 <div className="text-center mb-8">
                   <p className="text-lg text-gray-600 mb-6">
                     Vi reparerer alle iPhone-modeller med originale eller kvalitetsgodkendte dele og op til 24 måneders garanti. 
                     Vi kommer direkte til din adresse—hurtigt, sikkert og professionelt.
                   </p>
                 </div>
                 
                 {/* Search Bar */}
                 <div className="max-w-md mx-auto mb-6">
                   <div className="relative">
                     <input
                       type="text"
                       placeholder="Søg model..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                     />
                     <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                     </svg>
                   </div>
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
                   {filteredModels.map((model) => {
                     // Determine badges for each model
                     const isNew = model.year === "2024";
                     const isPopular = ["iphone-13", "iphone-14", "iphone-15", "iphone-12"].includes(model.id);
                     
                     return (
              <div 
                key={model.id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-pink-300 transition-all duration-300 relative"
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                  {isNew && (
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Ny
                    </span>
                  )}
                  {isPopular && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Mest valgt
                    </span>
                  )}
                </div>
                

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
                    ) : model.id === "iphone-8" ? (
                      <img 
                        src="/images/iphones/iphone-8.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-8-plus" ? (
                      <img 
                        src="/images/iphones/iphone-8-plus.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-x" ? (
                      <img 
                        src="/images/iphones/iphone-x.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-xs" ? (
                      <img 
                        src="/images/iphones/iphone-xs.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-xr" ? (
                      <img 
                        src="/images/iphones/iphone-xr.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-xs-max" ? (
                      <img 
                        src="/images/iphones/iphone-xs-max.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-8-plus" ? (
                      <img 
                        src="/images/iphones/iphone-8-plus-new.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-xs" ? (
                      <img 
                        src="/images/iphones/iphone-xs-new.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-11" ? (
                      <img 
                        src="/images/iphones/iphone-11.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-11-pro" ? (
                      <img 
                        src="/images/iphones/iphone-11-pro.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-11-pro-max" ? (
                      <img 
                        src="/images/iphones/iphone-11-pro-max.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-12-mini" ? (
                      <img 
                        src="/images/iphones/iphone-12-mini.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-12" ? (
                      <img 
                        src="/images/iphones/iphone-12.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-12-pro" ? (
                      <img 
                        src="/images/iphones/iphone-12-pro.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-12-pro-max" ? (
                      <img 
                        src="/images/iphones/iphone-12-pro-max.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-13-mini" ? (
                      <img 
                        src="/images/iphones/iphone-13-mini.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-13" ? (
                      <img 
                        src="/images/iphones/iphone-13.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-13-pro" ? (
                      <img 
                        src="/images/iphones/iphone-13-pro.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-13-pro-max" ? (
                      <img 
                        src="/images/iphones/iphone-13-pro-max.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-14" ? (
                      <img 
                        src="/images/iphones/iphone-14.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-14-plus" ? (
                      <img 
                        src="/images/iphones/iphone-14-plus.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-14-pro" ? (
                      <img 
                        src="/images/iphones/iphone-14-pro.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-14-pro-max" ? (
                      <img 
                        src="/images/iphones/iphone-14-pro-max.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-15" ? (
                      <img 
                        src="/images/iphones/iphone-15.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-15-pro" ? (
                      <img 
                        src="/images/iphones/iphone-15-pro.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-15-plus" ? (
                      <img 
                        src="/images/iphones/iphone-15-plus.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-15-pro-max" ? (
                      <img 
                        src="/images/iphones/iphone-15-pro-max.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-16" ? (
                      <img 
                        src="/images/iphones/iphone-16.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-16-plus" ? (
                      <img 
                        src="/images/iphones/iphone-16-plus.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-16-pro" ? (
                      <img 
                        src="/images/iphones/iphone-16-pro.png" 
                        alt={model.name}
                        width="200"
                        height="200"
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : model.id === "iphone-16-pro-max" ? (
                      <img 
                        src="/images/iphones/iphone-16-pro-max.png" 
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
                     );
                   })}
                 </div>
        </div>
      </section>

             {/* Why Choose Us Section */}
             <section className="py-16 bg-white">
               <div className="mx-auto max-w-6xl px-6">
                 <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                   Hvorfor vælge os
                 </h2>
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                   <div className="text-center">
                     <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                       <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                       </svg>
                     </div>
                     <h3 className="text-lg font-semibold mb-2 text-gray-800">Reparation på din adresse</h3>
                     <p className="text-gray-600 text-sm">Ingen ventetid - vi kommer til dig</p>
                   </div>
                   <div className="text-center">
                     <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                       <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                         <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                       </svg>
                     </div>
                     <h3 className="text-lg font-semibold mb-2 text-gray-800">24 mdr. garanti</h3>
                     <p className="text-gray-600 text-sm">Skærme / 12 mdr. på batterier</p>
                   </div>
                   <div className="text-center">
                     <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                       <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                         <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                       </svg>
                     </div>
                     <h3 className="text-lg font-semibold mb-2 text-gray-800">Originale dele</h3>
                     <p className="text-gray-600 text-sm">Kvalitetsgodkendte reservedele</p>
                   </div>
                   <div className="text-center">
                     <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                       <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                         <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                       </svg>
                     </div>
                     <h3 className="text-lg font-semibold mb-2 text-gray-800">2.000+ reparationer</h3>
                     <p className="text-gray-600 text-sm">5⭐ kundeanmeldelser</p>
                   </div>
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

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Ofte stillede spørgsmål
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Hvor lang tid tager en iPhone-reparation?
              </h3>
              <p className="text-gray-600">
                De fleste reparationer er færdige på 20–30 min. på stedet. Skærmreparationer tager typisk 20-30 minutter, mens batteriskift tager 15-20 minutter.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Mister jeg data ved reparationen?
              </h3>
              <p className="text-gray-600">
                Nej, ved standardreparationer bevarer vi alt. Vi anbefaler dog backup før reparationen, da det er den sikreste måde at beskytte dine data på.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Hvilke dele bruger I?
              </h3>
              <p className="text-gray-600">
                Originale eller kvalitetsgodkendte A-kvalitetsdele med garanti. Vi bruger kun dele af højeste kvalitet, der lever op til Apple's standarder.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Giver I garanti på reparationer?
              </h3>
              <p className="text-gray-600">
                24 mdr. garanti på skærme, 12 mdr. på batterier og øvrige reservedele. Alle vores reparationer kommer med fuld garanti.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Hvor dækker I?
              </h3>
              <p className="text-gray-600">
                Vi kommer til din adresse i hele København og omegn. Skriv eller ring, hvis du er i tvivl om vi dækker dit område.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Hvad siger vores kunder
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Fantastisk service! Min iPhone 13 blev repareret på under 30 minutter direkte på min arbejdsplads. Kan varmt anbefales!"
              </p>
              <p className="text-sm text-gray-500">- Sarah M.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Professionel og hurtig service. Min skærm blev udskiftet med original kvalitet og jeg fik 24 måneders garanti. Perfekt!"
              </p>
              <p className="text-sm text-gray-500">- Michael K.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Bedste mobilreparation i København! De kom til mig og reparerede min iPhone på stedet. Meget tilfreds med resultatet."
              </p>
              <p className="text-sm text-gray-500">- Anna L.</p>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-800">5.0 på Google & Trustpilot</span>
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

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Frontdoorfix",
            "description": "iPhone reparation og mobilreparation i København. Vi kommer til din adresse med originale dele og 24 måneders garanti.",
            "url": "https://frontdoorfix.dk",
            "telephone": "+4593545457",
            "email": "info@frontdoorfix.dk",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "København",
              "addressCountry": "DK"
            },
            "openingHours": "Mo-Su 08:00-22:00",
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "2000"
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "55.6761",
                "longitude": "12.5683"
              },
              "geoRadius": "50000"
            }
          })
        }}
      />
    </div>
  );
}
