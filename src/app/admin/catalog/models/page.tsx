"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Model {
  id: string;
  brand: string;
  series: string;
  model: string;
  slug: string;
  year: number;
  sortOrder: number;
  isVisible: boolean;
  comingSoon: boolean;
  image?: string;
  repairs: Array<{ id: string; name: string; price: number; [key: string]: unknown }>;
}

const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
};

export default function ModelsAdmin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || 'apple';
  const series = searchParams.get('series') || 'iphone';

  const [models, setModels] = useState<Model[]>([]);
  const [allSeries, setAllSeries] = useState<Array<{ id: string; name: string; slug: string; [key: string]: unknown }>>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [newModel, setNewModel] = useState({
    brand,
    series,
    model: '',
    slug: '',
    year: new Date().getFullYear(),
    sortOrder: 100,
    isVisible: true,
    comingSoon: false,
    image: '',
    repairs: []
  });

  const brandNames: Record<string, string> = {
    apple: 'Apple',
    samsung: 'Samsung',
    oneplus: 'OnePlus',
    huawei: 'Huawei',
    motorola: 'Motorola'
  };

  useEffect(() => {
    fetchModels();
    fetchAllSeries();
  }, [brand, series]);

  const fetchModels = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/models?brand=${brand}&series=${series}`);
      if (response.ok) {
        const data = await response.json();
        setModels(data);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSeries = async () => {
    try {
      const response = await fetch(`/api/admin/series?brandId=${brand}`);
      if (response.ok) {
        const data = await response.json();
        setAllSeries(data);
      }
    } catch (error) {
      console.error('Error fetching series:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingModel) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', `${editingModel.model} image`);

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setEditingModel({ ...editingModel, image: data.media.url });
      } else {
        alert('Upload fejlede');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Upload fejlede');
    } finally {
      setUploading(false);
    }
  };

  const handleNewModelImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', `${newModel.model} image`);

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setNewModel({ ...newModel, image: data.media.url });
      } else {
        alert('Upload fejlede');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Upload fejlede');
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/admin/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newModel)
      });

      if (response.ok) {
        await fetchModels();
        setNewModel({
          brand,
          series,
          model: '',
          slug: '',
          year: new Date().getFullYear(),
          sortOrder: 100,
          isVisible: true,
          comingSoon: false,
          image: '',
          repairs: []
        });
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error creating model:', error);
    }
  };

  const handleUpdate = async () => {
    if (!editingModel) return;

    try {
      const response = await fetch('/api/admin/models', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingModel)
      });

      if (response.ok) {
        await fetchModels();
        setEditingModel(null);
      }
    } catch (error) {
      console.error('Error updating model:', error);
    }
  };

  const [savingSort, setSavingSort] = useState<string | null>(null);
  const [sortDebounceTimeout, setSortDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleUpdateSortOrder = async (model: Model, newSortOrder: number) => {
    // Clear any existing timeout
    if (sortDebounceTimeout) {
      clearTimeout(sortDebounceTimeout);
    }

    // Optimistically update UI
    const updatedModels = models.map(m => 
      m.id === model.id ? { ...m, sortOrder: newSortOrder } : m
    );
    setModels(updatedModels.sort((a, b) => (b.sortOrder || 0) - (a.sortOrder || 0)));

    // Debounce the API call
    const timeout = setTimeout(async () => {
      setSavingSort(model.id);
      try {
        const response = await fetch('/api/admin/models', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            brand: model.brand,
            slug: model.slug,
            sortOrder: parseInt(newSortOrder.toString(), 10)
          })
        });

        if (response.ok) {
          // Show success toast
          const toast = document.createElement('div');
          toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
          toast.textContent = '✓ Gemt';
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 2000);
        } else {
          // Revert on error
          setModels(models);
          alert('Kunne ikke gemme rækkefølge');
        }
      } catch (error) {
        setModels(models);
        console.error('Error updating sort order:', error);
      } finally {
        setSavingSort(null);
      }
    }, 500);

    setSortDebounceTimeout(timeout);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Er du sikker?')) return;

    try {
      const response = await fetch(`/api/admin/models?brand=${brand}&slug=${slug}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchModels();
      }
    } catch (error) {
      console.error('Error deleting model:', error);
    }
  };

  const filteredModels = models.filter(m =>
    searchTerm === '' || 
    m.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.slug.includes(searchTerm.toLowerCase())
  );

  // Sort models by family for iPad and MacBook
  const sortedModels = brand === 'apple' && (series === 'ipad' || series === 'macbook')
    ? [...filteredModels].sort((a, b) => (b.sortOrder || 0) - (a.sortOrder || 0))
    : filteredModels;

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/admin/catalog/brands" className="hover:text-pink-600">Brands</Link>
        <span>›</span>
        <Link href={`/admin/catalog/series?brand=${brand}`} className="hover:text-pink-600">{brandNames[brand]}</Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">{allSeries.find(s => s.slug === series)?.name || series}</span>
      </nav>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modeller</h1>
          <p className="text-gray-600 mt-2">{filteredModels.length} modeller i {allSeries.find(s => s.slug === series)?.name || series}</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-medium"
        >
          + Tilføj Model
        </button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Søg efter model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
        />
      </div>


      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      ) : filteredModels.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">Ingen modeller fundet</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            + Opret første model
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">År</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reparationer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rækkefølge</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Handlinger</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedModels.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{m.model}</div>
                      <div className="text-sm text-gray-500">/{m.slug}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{m.year}</td>
                  <td className="px-6 py-4">
                    {m.isVisible ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Synlig</span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Skjult</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{m.repairs?.length || 0}</span>
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={m.sortOrder}
                        disabled={savingSort === m.id}
                        onChange={(e) => {
                          const newValue = parseInt(e.target.value) || 0;
                          setModels(models.map(model => 
                            model.id === m.id ? { ...model, sortOrder: newValue } : model
                          ));
                        }}
                        onBlur={(e) => {
                          const newValue = parseInt(e.target.value) || 0;
                          handleUpdateSortOrder(m, newValue);
                        }}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === 'Enter') {
                            e.currentTarget.blur();
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onFocus={(e) => e.stopPropagation()}
                        className={`w-20 px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-pink-500 ${
                          savingSort === m.id ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      />
                      {savingSort === m.id && (
                        <div className="animate-spin h-4 w-4 border-2 border-pink-500 border-t-transparent rounded-full"></div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push(`/admin/catalog/repairs?model=${m.slug}&brand=${brand}`)}
                        className="text-pink-600 hover:text-pink-900 font-medium"
                      >
                        Reparationer
                      </button>
                      <button
                        onClick={() => setEditingModel(m)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Rediger
                      </button>
                      <button
                        onClick={() => handleDelete(m.slug)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Slet
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Opret ny model</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model navn *</label>
                  <input
                    type="text"
                    value={newModel.model}
                    onChange={(e) => {
                      const name = e.target.value;
                      setNewModel({ ...newModel, model: name, slug: generateSlug(name) });
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Galaxy S25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                  <input
                    type="text"
                    value={newModel.slug}
                    onChange={(e) => setNewModel({ ...newModel, slug: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">År</label>
                  <input
                    type="number"
                    value={newModel.year}
                    onChange={(e) => setNewModel({ ...newModel, year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sortering (højere tal = øverst)
                  </label>
                  <input
                    type="number"
                    value={newModel.sortOrder}
                    onChange={(e) => setNewModel({ ...newModel, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">iPhone 16 Pro Max = 350, iPhone 6 = 10</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billede</label>
                
                {/* Upload button */}
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => document.getElementById('new-model-image-upload')?.click()}
                    disabled={uploading}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {uploading ? 'Uploader...' : '📁 Vælg billede fra Mac'}
                  </button>
                </div>
                <input
                  id="new-model-image-upload"
                  type="file"
                  accept="image/*,image/svg+xml,.svg"
                  onChange={handleNewModelImageUpload}
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
                  value={newModel.image}
                  onChange={(e) => setNewModel({ ...newModel, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg mt-3"
                  placeholder="/images/model.png"
                />
              </div>


              {newModel.image && (
                <img src={newModel.image} alt="Preview" className="mt-2 max-h-32 border rounded" />
              )}

              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newModel.isVisible}
                    onChange={(e) => setNewModel({ ...newModel, isVisible: e.target.checked })}
                    className="form-checkbox mr-2"
                  />
                  <span className="text-sm">Synlig</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newModel.comingSoon}
                    onChange={(e) => setNewModel({ ...newModel, comingSoon: e.target.checked })}
                    className="form-checkbox mr-2"
                  />
                  <span className="text-sm">Kommer snart</span>
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
                Opret
              </button>
            </div>
          </div>
        </div>
      )}

      {editingModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Rediger model</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model navn</label>
                  <input
                    type="text"
                    value={editingModel.model}
                    onChange={(e) => setEditingModel({ ...editingModel, model: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">År</label>
                  <input
                    type="number"
                    value={editingModel.year}
                    onChange={(e) => setEditingModel({ ...editingModel, year: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billede</label>
                
                {/* Upload button */}
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => document.getElementById('model-image-upload')?.click()}
                    disabled={uploading}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {uploading ? 'Uploader...' : '📁 Vælg billede fra Mac'}
                  </button>
                </div>
                <input
                  id="model-image-upload"
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
                  value={editingModel.image || ''}
                  onChange={(e) => setEditingModel({ ...editingModel, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg mt-3"
                  placeholder="/images/model.png"
                />
              </div>


              {editingModel.image && (
                <img src={editingModel.image} alt="Preview" className="mt-2 max-h-32 border rounded" />
              )}

              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingModel.isVisible}
                    onChange={(e) => setEditingModel({ ...editingModel, isVisible: e.target.checked })}
                    className="form-checkbox mr-2"
                  />
                  <span className="text-sm">Synlig</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingModel(null)}
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
    </div>
  );
}

