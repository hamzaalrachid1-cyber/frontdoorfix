"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Brand {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  icon: string;
  image?: string;
  link: string;
  order: number;
  isVisible: boolean;
  seriesCount: number;
  modelsCount: number;
}

export default function BrandsAdmin() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBrand, setNewBrand] = useState({
    name: '',
    slug: '',
    subtitle: '',
    icon: '📱',
    image: '',
    order: brands.length + 1,
    isVisible: true
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      console.log('Fetching brands...');
      const brandsRes = await fetch('/api/admin/brands');
      
      if (!brandsRes.ok) {
        console.error('Failed to fetch brands:', brandsRes.status);
        setLoading(false);
        return;
      }
      
      const brandsData = await brandsRes.json();
      console.log('Brands data:', brandsData);

      const brandsWithStats = await Promise.all(
        brandsData.map(async (brand: any) => {
          try {
            const seriesRes = await fetch(`/api/admin/series?brandId=${brand.slug}`);
            const series = seriesRes.ok ? await seriesRes.json() : [];
            
            const modelsRes = await fetch(`/api/admin/models?brand=${brand.slug}`);
            const models = modelsRes.ok ? await modelsRes.json() : [];

            return {
              ...brand,
              seriesCount: series.length,
              modelsCount: models.length
            };
          } catch (err) {
            console.error(`Error fetching stats for ${brand.name}:`, err);
            return {
              ...brand,
              seriesCount: 0,
              modelsCount: 0
            };
          }
        })
      );

      console.log('Brands with stats:', brandsWithStats);
      setBrands(brandsWithStats);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingBrand) return;

    try {
      const response = await fetch('/api/admin/brands', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBrand)
      });

      if (response.ok) {
        await fetchBrands();
        setEditingBrand(null);
      }
    } catch (error) {
      console.error('Error updating brand:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingBrand) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', `${editingBrand.name} logo`);

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setEditingBrand({ ...editingBrand, image: data.media.url });
      } else {
        alert('Upload fejlede');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload fejlede');
    } finally {
      setUploading(false);
    }
  };

  const handleNewBrandImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', `${newBrand.name} logo`);

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setNewBrand({ ...newBrand, image: data.media.url });
      } else {
        alert('Upload fejlede');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload fejlede');
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async () => {
    if (!newBrand.name || !newBrand.slug) {
      alert('Udfyld navn og slug');
      return;
    }

    try {
      const response = await fetch('/api/admin/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newBrand.slug,
          ...newBrand,
          link: `/reparationer/${newBrand.slug}`
        })
      });

      if (response.ok) {
        await fetchBrands();
        setNewBrand({
          name: '',
          slug: '',
          subtitle: '',
          icon: '📱',
          image: '',
          order: brands.length + 2,
          isVisible: true
        });
        setShowCreateModal(false);
      } else {
        alert('Kunne ikke oprette brand');
      }
    } catch (error) {
      console.error('Error creating brand:', error);
      alert('Kunne ikke oprette brand');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brands</h1>
          <p className="text-gray-600 mt-2">Administrer alle device brands</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-medium"
        >
          + Tilføj Brand
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id || brand.slug}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-pink-500 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              {brand.image ? (
                <div className="w-14 h-14 flex items-center justify-center">
                  <img src={brand.image} alt={brand.name} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center text-3xl">
                  {brand.icon}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {brand.name}
                  </h3>
                  {!brand.isVisible && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                      Skjult
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">/{brand.slug}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-900">{brand.seriesCount}</div>
                <div className="text-xs text-gray-600">Serier</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-gray-900">{brand.modelsCount}</div>
                <div className="text-xs text-gray-600">Modeller</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/admin/catalog/series?brand=${brand.slug}`)}
                className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium"
              >
                Se serier →
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingBrand(brand);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Rediger
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Rediger {editingBrand.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
                
                {/* Upload button */}
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => document.getElementById('brand-image-upload')?.click()}
                    disabled={uploading}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {uploading ? 'Uploader...' : '📁 Vælg billede fra Mac'}
                  </button>
                </div>
                <input
                  id="brand-image-upload"
                  type="file"
                  accept="image/*,image/svg+xml,.svg"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Or manual URL input */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-500">eller indsæt URL</span>
                  </div>
                </div>
                
                <input
                  type="text"
                  value={editingBrand.image || ''}
                  onChange={(e) => setEditingBrand({ ...editingBrand, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg mt-2"
                  placeholder="/uploads/brand-logo.png"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Accepterer: PNG, JPG, SVG
                </p>
                {editingBrand.image && (
                  <div className="mt-2 flex items-center justify-center p-4 bg-gray-50 rounded border">
                    {editingBrand.image.endsWith('.svg') ? (
                      <img src={editingBrand.image} alt="Preview" className="max-h-24 w-auto" />
                    ) : (
                      <img src={editingBrand.image} alt="Preview" className="max-h-24" />
                    )}
                  </div>
                )}
              </div>

              {/* Visibility Toggle */}
              <div className="border-t pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingBrand.isVisible}
                    onChange={(e) => setEditingBrand({ ...editingBrand, isVisible: e.target.checked })}
                    className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Synlig på hjemmesiden
                    </span>
                    <p className="text-xs text-gray-500">
                      {editingBrand.isVisible 
                        ? '✅ Brandet vises på /reparationer siden' 
                        : '❌ Brandet er skjult for besøgende'}
                    </p>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingBrand(null)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Annuller
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
              >
                Gem
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Tilføj Nyt Brand</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand Navn *</label>
                <input
                  type="text"
                  value={newBrand.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                    setNewBrand({ ...newBrand, name, slug });
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="f.eks. Xiaomi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                <input
                  type="text"
                  value={newBrand.slug}
                  onChange={(e) => setNewBrand({ ...newBrand, slug: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="xiaomi"
                />
                <p className="text-xs text-gray-500 mt-1">Bruges i URL: /reparationer/{newBrand.slug}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Undertekst</label>
                <input
                  type="text"
                  value={newBrand.subtitle}
                  onChange={(e) => setNewBrand({ ...newBrand, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Redmi, Mi, POCO"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
                
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => document.getElementById('new-brand-image-upload')?.click()}
                    disabled={uploading}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 text-sm font-medium"
                  >
                    {uploading ? 'Uploader...' : '📁 Vælg billede'}
                  </button>
                </div>
                <input
                  id="new-brand-image-upload"
                  type="file"
                  accept="image/*,image/svg+xml,.svg"
                  onChange={handleNewBrandImageUpload}
                  className="hidden"
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-500">eller indsæt URL</span>
                  </div>
                </div>

                <input
                  type="text"
                  value={newBrand.image}
                  onChange={(e) => setNewBrand({ ...newBrand, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg mt-2"
                  placeholder="/uploads/brand-logo.png"
                />

                {newBrand.image && (
                  <div className="mt-2 flex items-center justify-center p-4 bg-gray-50 rounded border">
                    <img src={newBrand.image} alt="Preview" className="max-h-24" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rækkefølge</label>
                <input
                  type="number"
                  value={newBrand.order}
                  onChange={(e) => setNewBrand({ ...newBrand, order: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">Lavere tal vises først</p>
              </div>

              <div className="border-t pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newBrand.isVisible}
                    onChange={(e) => setNewBrand({ ...newBrand, isVisible: e.target.checked })}
                    className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Synlig på hjemmesiden</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Annuller
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Opret Brand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
