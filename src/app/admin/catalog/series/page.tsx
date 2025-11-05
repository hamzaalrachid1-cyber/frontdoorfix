"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Serie {
  id: string;
  brandId: string;
  name: string;
  slug: string;
  descriptionShort: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  modelCount?: number;
}

const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
};

export default function SeriesAdmin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || 'apple';

  const [series, setSeries] = useState<Serie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSerie, setEditingSerie] = useState<Serie | null>(null);
  
  const [newSerie, setNewSerie] = useState({
    name: '',
    slug: '',
    descriptionShort: '',
    image: '',
    sortOrder: 999
  });

  const brandNames: Record<string, string> = {
    apple: 'Apple',
    samsung: 'Samsung',
    oneplus: 'OnePlus',
    huawei: 'Huawei',
    motorola: 'Motorola'
  };

  useEffect(() => {
    fetchSeries();
  }, [brand]);

  const fetchSeries = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/series?brandId=${brand}`);
      if (response.ok) {
        const data = await response.json();
        
        const seriesWithCounts = await Promise.all(
          data.map(async (s: Serie) => {
            const modelsRes = await fetch(`/api/admin/models?brand=${brand}&series=${s.slug}`);
            const models = modelsRes.ok ? await modelsRes.json() : [];
            return { ...s, modelCount: models.length };
          })
        );
        
        setSeries(seriesWithCounts.sort((a, b) => a.sortOrder - b.sortOrder));
      }
    } catch (error) {
      console.error('Error fetching series:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/admin/series', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandId: brand,
          ...newSerie,
          isActive: true
        })
      });

      if (response.ok) {
        await fetchSeries();
        setNewSerie({ name: '', slug: '', descriptionShort: '', image: '', sortOrder: 999 });
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error creating serie:', error);
    }
  };

  const handleUpdate = async () => {
    if (!editingSerie) return;

    try {
      const response = await fetch(`/api/admin/series/${editingSerie.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSerie)
      });

      if (response.ok) {
        await fetchSeries();
        setEditingSerie(null);
      }
    } catch (error) {
      console.error('Error updating serie:', error);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Er du sikker?')) return;

    try {
      const response = await fetch(`/api/admin/series?brandId=${brand}&slug=${slug}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchSeries();
      }
    } catch (error) {
      console.error('Error deleting serie:', error);
    }
  };

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/admin/catalog/brands" className="hover:text-pink-600">Brands</Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">{brandNames[brand]}</span>
      </nav>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{brandNames[brand]} Serier</h1>
          <p className="text-gray-600 mt-2">{series.length} serier</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-medium"
        >
          + Tilføj Serie
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beskrivelse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modeller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rækkefølge</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Handlinger</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {series.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{s.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{s.slug}</code>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate">{s.descriptionShort || '—'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium">{s.modelCount || 0}</span>
                  </td>
                  <td className="px-6 py-4">
                    {s.isActive ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Synlig</span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Skjult</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={s.sortOrder}
                      onChange={(e) => {
                        const updated = { ...s, sortOrder: parseInt(e.target.value) };
                        setEditingSerie(updated);
                        handleUpdate();
                      }}
                      className="w-20 px-2 py-1 border rounded text-sm"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push(`/admin/catalog/models?brand=${brand}&series=${s.slug}`)}
                        className="text-pink-600 hover:text-pink-900 font-medium"
                      >
                        Se modeller
                      </button>
                      <button
                        onClick={() => setEditingSerie(s)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Rediger
                      </button>
                      <button
                        onClick={() => handleDelete(s.slug)}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Opret ny serie</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Navn *</label>
                <input
                  type="text"
                  value={newSerie.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setNewSerie({ ...newSerie, name, slug: generateSlug(name) });
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Galaxy S Pro"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                <input
                  type="text"
                  value={newSerie.slug}
                  onChange={(e) => setNewSerie({ ...newSerie, slug: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="s-pro"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivelse</label>
                <textarea
                  value={newSerie.descriptionShort}
                  onChange={(e) => setNewSerie({ ...newSerie, descriptionShort: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billede URL</label>
                <input
                  type="text"
                  value={newSerie.image}
                  onChange={(e) => setNewSerie({ ...newSerie, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="/uploads/serie-image.png"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload billede i Media → Kopiér URL → Indsæt her
                </p>
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

      {editingSerie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Rediger serie</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Navn</label>
                <input
                  type="text"
                  value={editingSerie.name}
                  onChange={(e) => setEditingSerie({ ...editingSerie, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivelse</label>
                <textarea
                  value={editingSerie.descriptionShort}
                  onChange={(e) => setEditingSerie({ ...editingSerie, descriptionShort: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billede URL</label>
                <input
                  type="text"
                  value={editingSerie.image || ''}
                  onChange={(e) => setEditingSerie({ ...editingSerie, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="/uploads/serie-image.png"
                />
                {editingSerie.image && (
                  <img src={editingSerie.image} alt="Preview" className="mt-2 max-h-32 rounded border" />
                )}
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingSerie.isActive}
                    onChange={(e) => setEditingSerie({ ...editingSerie, isActive: e.target.checked })}
                    className="form-checkbox mr-2"
                  />
                  <span className="text-sm text-gray-700">Synlig</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingSerie(null)}
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


