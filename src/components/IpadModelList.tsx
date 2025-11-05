"use client";

import { useState } from 'react';
import Link from 'next/link';
import ModelSearch from './ModelSearch';

interface IpadModel {
  id: string;
  model: string;
  image: string;
  year: number;
}

interface IpadModelListProps {
  models: IpadModel[];
}

export default function IpadModelList({ models }: IpadModelListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModels = models.filter(model => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    const modelLower = model.model.toLowerCase();
    const yearStr = model.year.toString();
    
    return modelLower.includes(search) || 
           yearStr.includes(search) ||
           model.id.includes(search);
  });

  return (
    <>
      <ModelSearch 
        onSearch={setSearchTerm}
        placeholder="Søg model… fx '13 Pro', 'SE', '2021'"
      />

      {filteredModels.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">Ingen modeller matchede din søgning.</p>
          <p className="text-gray-400 text-sm mb-4">Prøv uden mellemrum eller søg på årstal.</p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-pink-600 hover:text-pink-700 font-medium"
          >
            Ryd søgning
          </button>
        </div>
      ) : (
        <>
          {searchTerm && (
            <p className="text-center text-sm text-gray-600 mb-4">
              Viser {filteredModels.length} af {models.length} modeller
            </p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredModels.map((model) => (
              <div 
                key={model.id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-pink-300 transition-all duration-300 relative"
              >
                <div className="phone-card">
                  <img
                    src={model.image}
                    alt={`${model.model} – front, bagside og sideprofil`}
                    loading="lazy"
                    width={200}
                    height={200}
                    decoding="async"
                    className="phone-card__img"
                  />
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                    {model.model}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 font-medium">
                    {model.year}
                  </p>
                  
                  <Link 
                    href={`/reparationer/apple/${model.id}`}
                    className="btn-gradient px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 mt-2"
                  >
                    <span>👉</span>
                    Se priser & reparationer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

