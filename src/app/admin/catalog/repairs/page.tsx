"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Inline components to avoid import issues

interface Repair {
  id: string;
  title: string;           // Fritekst titel (fx "Skærmskift – Original")
  category: string;        // Kategori for filtrering (Skærm, Batteri, osv.)
  quality?: string;        // Kvalitet (original, compatible, oem, service)
  price: number | string;
  time: string;
  warranty: string;
  description: string;
  order?: number;          // Sorteringsrækkefølge (højere = øverst)
  isVisible?: boolean;
  badges?: any[];
  notes?: string | null;
  showDetailsLink?: boolean;
  type?: string;           // Legacy - mapped to quality
}

export default function RepairsAdmin() {
  const searchParams = useSearchParams();
  const modelSlug = searchParams.get('model') || '';
  const brand = searchParams.get('brand') || '';

  const [model, setModel] = useState<any>(null);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRepair, setEditingRepair] = useState<Repair | null>(null);
  const [deletingRepair, setDeletingRepair] = useState<Repair | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Skærm',
    quality: 'original',
    price: '' as number | string,
    time: '~30 min',
    warranty: '24 mdr',
    description: '',
    order: 100
  });

  useEffect(() => {
    fetchModel();
  }, [modelSlug, brand]);

  const fetchModel = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/models?brand=${brand}`);
      if (response.ok) {
        const models = await response.json();
        const foundModel = models.find((m: any) => m.slug === modelSlug);
        if (foundModel) {
          setModel(foundModel);
          setRepairs(foundModel.repairs || []);
        }
      }
    } catch (error) {
      console.error('Error fetching model:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRepair = async () => {
    // Validation
    if (!formData.title?.trim() && !editingRepair) {
      alert('Titel er påkrævet');
      return;
    }

    const repairData = editingRepair || {
      ...formData,
      id: `repair_${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category,
      quality: formData.quality,
      type: formData.quality, // Legacy compatibility
      price: formData.price === '' ? 0 : formData.price,
      time: formData.time,
      warranty: formData.warranty,
      description: formData.description.trim(),
      order: formData.order || 100,
      isVisible: true,
      badges: [],
      notes: null,
      showDetailsLink: true
    };

    let updatedRepairs: Repair[];

    if (editingRepair) {
      updatedRepairs = repairs.map(r => 
        r.id === editingRepair.id ? {...editingRepair, price: editingRepair.price === '' ? 0 : editingRepair.price} : r
      );
    } else {
      updatedRepairs = [...repairs, repairData as Repair];
    }

    // Sort by order DESC
    updatedRepairs.sort((a, b) => (b.order || 0) - (a.order || 0));

    await saveRepairs(updatedRepairs);
    setEditingRepair(null);
    setShowCreateModal(false);
    setFormData({ title: '', category: 'Skærm', quality: 'original', price: '', time: '~30 min', warranty: '24 mdr', description: '', order: 100 });
  };

  const handleDeleteRepair = async () => {
    if (!deletingRepair) return;
    const updatedRepairs = repairs.filter(r => r.id !== deletingRepair.id);
    await saveRepairs(updatedRepairs);
    setDeletingRepair(null);
  };

  const saveRepairs = async (updatedRepairs: Repair[]) => {
    try {
      const updatedModel = { ...model, repairs: updatedRepairs };

      const response = await fetch('/api/admin/models', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedModel)
      });

      if (response.ok) {
        setRepairs(updatedRepairs);
        setModel(updatedModel);
      } else {
        const error = await response.json();
        alert(`Fejl: ${error.error || 'Kunne ikke gemme'}`);
      }
    } catch (error) {
      console.error('Error saving repairs:', error);
      alert('Fejl ved gemning');
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
      <nav className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/admin/catalog/brands" className="hover:text-pink-600">Brands</Link>
        <span>›</span>
        <Link href={`/admin/catalog/models?brand=${brand}&series=${model?.series || 'iphone'}`} className="hover:text-pink-600">
          {model?.model}
        </Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">Reparationer</span>
      </nav>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reparationer</h1>
          <p className="text-gray-600 mt-2">
            {model?.model} · {repairs.length} {repairs.length === 1 ? 'reparation' : 'reparationer'}
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tilføj Reparation
        </button>
      </div>

      {repairs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-gray-500 mb-4 text-lg">Ingen reparationer endnu</p>
          <p className="text-gray-400 text-sm mb-6">Tilføj den første reparation for denne model</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-medium inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Opret første reparation
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Kvalitet</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Pris</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tid</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Garanti</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Handlinger</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {repairs.sort((a, b) => (b.order || 0) - (a.order || 0)).map((r, idx) => (
                <tr key={r.id} className={`hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{r.title || `${r.category} — ${r.type || r.quality}`}</div>
                      <div className="text-xs text-gray-500">{r.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {(r.quality || r.type) && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                        {r.quality || r.type}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 font-semibold">{r.price} kr</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{r.time}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{r.warranty}</span>
                  </td>
                  <td className="px-6 py-4">
                    {(r.badges && r.badges.length > 0) || r.showDetailsLink !== false ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        ✓ Synlig
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                        ○ Skjult
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingRepair(r)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
                      >
                        Rediger
                      </button>
                      <button
                        onClick={() => setDeletingRepair(r)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm hover:underline"
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

      {/* Edit/Create Modal */}
      {(showCreateModal || editingRepair) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-8 py-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{editingRepair ? 'Rediger' : 'Tilføj'} Reparation</h2>
                <button onClick={() => { setShowCreateModal(false); setEditingRepair(null); }} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            
            <div className="px-8 py-6 space-y-4">
              {/* Titel (fritekst) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Titel <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingRepair?.title || formData.title}
                  onChange={(e) => editingRepair ? setEditingRepair({...editingRepair, title: e.target.value}) : setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  placeholder="fx 'Skærmskift – Original' eller 'Batteriskift – Kompatibel'"
                />
                <p className="mt-1 text-xs text-gray-500">Bruger langt tankestreg (–) for konsistens</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Kategori</label>
                  <select 
                    value={editingRepair?.category || formData.category} 
                    onChange={(e) => editingRepair ? setEditingRepair({...editingRepair, category: e.target.value}) : setFormData({...formData, category: e.target.value})} 
                    className="w-full px-4 py-3 border rounded-lg"
                  >
                    <option>Skærm</option><option>Batteri</option><option>Kamera</option><option>Ladeport</option><option>Mikrofon</option><option>Højttaler</option><option>Bagcover</option><option>Bagglas</option><option>Porte</option><option>Lyd/Knapper</option><option>Software/Andet</option><option>Andet</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Til filtrering på modelsiden</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Kvalitet</label>
                  <select 
                    value={editingRepair?.quality || editingRepair?.type || formData.quality} 
                    onChange={(e) => editingRepair ? setEditingRepair({...editingRepair, quality: e.target.value, type: e.target.value}) : setFormData({...formData, quality: e.target.value})} 
                    className="w-full px-4 py-3 border rounded-lg"
                  >
                    <option value="">Ingen</option>
                    <option value="original">Original</option>
                    <option value="compatible">Kompatibel</option>
                    <option value="oem">OEM</option>
                    <option value="pulled">Pulled</option>
                    <option value="service">Service</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Valgfri</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Rækkefølge</label>
                  <input
                    type="number"
                    value={editingRepair?.order || formData.order}
                    onChange={(e) => editingRepair ? setEditingRepair({...editingRepair, order: parseInt(e.target.value) || 0}) : setFormData({...formData, order: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <p className="mt-1 text-xs text-gray-500">Højere = øverst</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Pris (kr)</label>
                  <input 
                    type="number" 
                    value={editingRepair?.price || formData.price} 
                    onChange={(e) => {
                      const value = e.target.value === '' ? '' : parseInt(e.target.value) || 0;
                      if (editingRepair) {
                        setEditingRepair({...editingRepair, price: value});
                      } else {
                        setFormData({...formData, price: value});
                      }
                    }} 
                    className="w-full px-4 py-3 border rounded-lg" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Tid</label>
                  <input type="text" value={editingRepair?.time || formData.time} onChange={(e) => editingRepair ? setEditingRepair({...editingRepair, time: e.target.value}) : setFormData({...formData, time: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Garanti</label>
                  <input type="text" value={editingRepair?.warranty || formData.warranty} onChange={(e) => editingRepair ? setEditingRepair({...editingRepair, warranty: e.target.value}) : setFormData({...formData, warranty: e.target.value})} className="w-full px-4 py-3 border rounded-lg" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Beskrivelse</label>
                <textarea value={editingRepair?.description || formData.description} onChange={(e) => editingRepair ? setEditingRepair({...editingRepair, description: e.target.value}) : setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-3 border rounded-lg" />
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-gray-50 border-t px-8 py-5 flex justify-end gap-3 rounded-b-xl">
              <button onClick={() => { setShowCreateModal(false); setEditingRepair(null); }} className="px-6 py-3 border text-gray-700 rounded-lg hover:bg-gray-50">Annuller</button>
              <button onClick={handleSaveRepair} className="px-8 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg font-semibold">Gem</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingRepair && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-5 border-b">
              <h3 className="text-lg font-bold text-gray-900">Slet reparation</h3>
              <p className="text-sm text-gray-500">Er du sikker?</p>
            </div>
            <div className="px-6 py-5">
              <div className="bg-gray-50 border rounded-lg p-4">
                <p className="text-sm font-semibold mb-2">{deletingRepair.category} — {deletingRepair.type}</p>
                <p className="text-sm text-gray-600">{deletingRepair.price} kr</p>
              </div>
            </div>
            <div className="px-6 py-5 bg-gray-50 border-t flex justify-end gap-3 rounded-b-xl">
              <button onClick={() => setDeletingRepair(null)} className="px-6 py-3 border text-gray-700 rounded-lg">Annuller</button>
              <button onClick={handleDeleteRepair} className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold">Slet</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
