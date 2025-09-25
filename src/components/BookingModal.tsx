'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useBookingModal } from '@/context/BookingModalContext';
import { BRANDS, MODELS, getModelsByBrand, type Model, type RepairItem } from '@/data/devices';

type Step = 1 | 2 | 3;

export default function BookingModal() {
  const { close, preselect } = useBookingModal();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>(1);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedRepairs, setSelectedRepairs] = useState<string[]>([]);
  const [modelSearch, setModelSearch] = useState('');

  // Initialize with preselect data
  useEffect(() => {
    if (preselect) {
      if (preselect.brand) {
        setSelectedBrand(preselect.brand);
        setStep(2);
      }
      if (preselect.model) {
        const model = MODELS.find(m => m.name === preselect.model && m.brand === preselect.brand);
        if (model) {
          setSelectedModel(model);
          setStep(3);
        }
      }
      if (preselect.repairs) {
        setSelectedRepairs(preselect.repairs);
      }
    }
  }, [preselect]);

  // Focus trap and ESC handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleFocusTrap);
    
    // Focus first element
    if (modalRef.current) {
      const firstFocusable = modalRef.current.querySelector('button, [href], input, select, textarea') as HTMLElement;
      firstFocusable?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, [close]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedRepairs([]);
    setModelSearch('');
    setStep(2);
  };

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    setSelectedRepairs([]);
    setStep(3);
  };

  const handleRepairToggle = (repairId: string) => {
    setSelectedRepairs(prev => 
      prev.includes(repairId) 
        ? prev.filter(id => id !== repairId)
        : [...prev, repairId]
    );
  };

  const handleSubmit = () => {
    if (!selectedModel || selectedRepairs.length === 0) return;

    const params = new URLSearchParams({
      brand: selectedBrand,
      model: selectedModel.name,
      repairs: selectedRepairs.join(',')
    });

    close();
    router.push(`/bestil?${params.toString()}`);
  };

  const canContinue = () => {
    switch (step) {
      case 1: return selectedBrand !== '';
      case 2: return selectedModel !== null;
      case 3: return selectedRepairs.length > 0;
      default: return false;
    }
  };

  const filteredModels = selectedBrand 
    ? getModelsByBrand(selectedBrand).filter(model => 
        model.name.toLowerCase().includes(modelSearch.toLowerCase())
      )
    : [];

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Vælg brand';
      case 2: return 'Vælg model';
      case 3: return 'Vælg reparation(er)';
      default: return '';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
              Bestil tid – vælg enhed & reparation
            </h2>
            <p className="text-sm text-gray-600 mt-1">{getStepTitle()}</p>
          </div>
          <button
            onClick={close}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            aria-label="Luk modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  stepNum === step 
                    ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white' 
                    : stepNum < step 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNum < step ? '✓' : stepNum}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  stepNum === step ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {stepNum === 1 ? 'Brand' : stepNum === 2 ? 'Model' : 'Reparation'}
                </span>
                {stepNum < 3 && <div className="w-8 h-px bg-gray-300 ml-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {step === 1 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandSelect(brand)}
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    selectedBrand === brand
                      ? 'border-pink-500 bg-pink-50 text-pink-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg font-semibold">{brand}</div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Søg model..."
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              {filteredModels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredModels.map((model) => (
                    <button
                      key={model.slug}
                      onClick={() => handleModelSelect(model)}
                      className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                        selectedModel?.slug === model.slug
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold">{model.name}</div>
                      <div className="text-sm text-gray-600">{model.repairs.length} reparationer tilgængelige</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {selectedBrand ? 'Ingen modeller fundet' : 'Vælg først et brand for at se modeller.'}
                </div>
              )}
            </div>
          )}

          {step === 3 && selectedModel && (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedModel.name}</h3>
                <p className="text-sm text-gray-600">Vælg de reparationer du har brug for</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedModel.repairs.map((repair) => (
                  <div
                    key={repair.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedRepairs.includes(repair.id)
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleRepairToggle(repair.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedRepairs.includes(repair.id)}
                            onChange={() => handleRepairToggle(repair.id)}
                            className="mr-3 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                          />
                          <div className="text-sm font-semibold text-gray-900 truncate">
                            {repair.label}
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-600">
                            {repair.time}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-600">
                            {repair.warranty}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-3 shrink-0">
                        {repair.price === 'kontakt' ? (
                          <div className="text-sm font-semibold text-gray-600">Kontakt os</div>
                        ) : (
                          <div className="text-lg font-bold text-gray-900">{repair.price} kr</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            {step > 1 && (
              <button
                onClick={() => setStep((prev) => (prev - 1) as Step)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Tilbage
              </button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={close}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Luk
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep((prev) => (prev + 1) as Step)}
                disabled={!canContinue()}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Fortsæt
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canContinue()}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Gå til bestilling
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
