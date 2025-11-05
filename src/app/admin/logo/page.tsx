'use client';

import { useState, useEffect, useRef } from 'react';

interface LogoConfig {
  iconColor: string;
  textColor: string;
  text: string;
  subtitle: string;
  subtitleColor: string;
  customIcon?: string;
  useCustomIcon?: boolean;
}

export default function LogoAdmin() {
  const [logoConfig, setLogoConfig] = useState<LogoConfig>({
    iconColor: '#FF6B35',
    textColor: '#0d9488',
    text: 'FrontDoorFix',
    subtitle: 'Udkørende Værksted',
    subtitleColor: '#FF6B35',
    customIcon: '',
    useCustomIcon: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load saved config from localStorage
    const saved = localStorage.getItem('logoConfig');
    if (saved) {
      try {
        setLogoConfig(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing logo config:', error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('logoConfig', JSON.stringify(logoConfig));
    setSuccess('Logo gemt!');
    setTimeout(() => setSuccess(''), 3000);
    // Force page refresh to see changes
    window.location.reload();
  };

  const resetToDefault = () => {
    const defaultConfig = {
      iconColor: '#FF6B35',
      textColor: '#0d9488',
      text: 'FrontDoorFix',
      subtitle: 'Udkørende Værksted',
      subtitleColor: '#FF6B35',
      customIcon: '',
      useCustomIcon: false
    };
    setLogoConfig(defaultConfig);
    localStorage.setItem('logoConfig', JSON.stringify(defaultConfig));
    window.location.reload();
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Vælg venligst en billedfil (PNG, SVG, JPG, etc.)');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Filen er for stor. Maksimal størrelse er 5MB.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload fejlede');
      }

      const data = await response.json();
      
      setLogoConfig(prev => ({
        ...prev,
        customIcon: data.url,
        useCustomIcon: true
      }));

      setSuccess('Logo uploadet succesfuldt!');
      setTimeout(() => setSuccess(''), 3000);

    } catch (error) {
      console.error('Upload error:', error);
      setError('Der opstod en fejl under upload. Prøv igen.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const removeCustomIcon = () => {
    setLogoConfig(prev => ({
      ...prev,
      customIcon: '',
      useCustomIcon: false
    }));
    setSuccess('Custom icon fjernet!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Logo Editor</h1>
              <p className="text-gray-600 mt-2">Tilpas dit logo med tekst og farver</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isEditing 
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isEditing ? 'Annuller' : 'Rediger'}
              </button>
              <button
                onClick={resetToDefault}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Nulstil
              </button>
            </div>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700">{success}</p>
            </div>
          )}
          
          {/* Preview */}
          <div className="mb-8 p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Live Preview</h2>
            <div className="flex items-center gap-4">
              {/* Icon - Kun custom icon, ingen standard telefon */}
              {logoConfig.useCustomIcon && logoConfig.customIcon && (
                <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm border">
                  <img 
                    src={logoConfig.customIcon} 
                    alt="Custom logo" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
              )}
              {/* FrontDoorFix Text med farver som i billedet - ingen tagline */}
              <div className="flex flex-col">
                <div className="text-2xl font-bold">
                  <span style={{ color: '#374151' }}>Front</span>
                  <span style={{ color: '#FFD700' }}>D</span>
                  <span style={{ color: '#374151' }}>oor</span>
                  <span style={{ color: '#EC4899' }}>Fix</span>
                </div>
                <div className="text-sm font-medium" style={{ color: '#FF6B35' }}>
                  Tekniker til døren
                </div>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Custom Icon Upload</h2>
            
            {/* Drag & Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
              
              {uploading ? (
                <div className="space-y-4">
                  <div className="w-12 h-12 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600">Uploader...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Træk og slip din logo her, eller klik for at vælge
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      PNG, SVG, JPG op til 5MB
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      Vælg fil
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Current Icon Display */}
            {logoConfig.customIcon && (
              <div className="mt-6 p-4 bg-white border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={logoConfig.customIcon} 
                      alt="Current icon" 
                      className="w-12 h-12 object-contain border border-gray-200 rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-700">Nuværende icon</p>
                      <p className="text-sm text-gray-500">Uploadet og aktivt</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCustomIcon}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Fjern
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Text Editor */}
          {isEditing && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Tekst Indstillinger</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tekst
                  </label>
                  <input
                    type="text"
                    value={logoConfig.text}
                    onChange={(e) => setLogoConfig({...logoConfig, text: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={logoConfig.subtitle}
                    onChange={(e) => setLogoConfig({...logoConfig, subtitle: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon Farve
                  </label>
                  <input
                    type="color"
                    value={logoConfig.iconColor}
                    onChange={(e) => setLogoConfig({...logoConfig, iconColor: e.target.value})}
                    className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tekst Farve
                  </label>
                  <input
                    type="color"
                    value={logoConfig.textColor}
                    onChange={(e) => setLogoConfig({...logoConfig, textColor: e.target.value})}
                    className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline Farve
                  </label>
                  <input
                    type="color"
                    value={logoConfig.subtitleColor}
                    onChange={(e) => setLogoConfig({...logoConfig, subtitleColor: e.target.value})}
                    className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Gem Ændringer
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Annuller
                </button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Instruktioner</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Upload PNG, SVG eller JPG filer op til 5MB</li>
              <li>• Træk og slip filer direkte i upload-området</li>
              <li>• Logoet gemmes automatisk og vises på hele hjemmesiden</li>
              <li>• Klik "Rediger" for at tilpasse tekst og farver</li>
              <li>• "Nulstil" gendanner standardindstillingerne</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}