"use client";

import { useState, useEffect, useRef } from 'react';

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt: string;
  type: 'image' | 'svg';
  size: number;
  uploadedAt: string;
  usedBy: string[];
}

export default function MediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, [searchTerm]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/media?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setMedia(data);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', '');

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        await fetchMedia();
      } else {
        alert('Upload fejlede');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload fejlede');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUpdateAlt = async (id: string, alt: string) => {
    try {
      const response = await fetch('/api/admin/media', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, alt })
      });

      if (response.ok) {
        await fetchMedia();
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error updating media:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Er du sikker på at du vil slette denne fil?')) return;

    try {
      const response = await fetch(`/api/admin/media?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchMedia();
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL kopieret til udklipsholder!');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Bibliotek</h1>
          <p className="text-gray-600 mt-2">{media.length} filer</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {viewMode === 'grid' ? '📋 Liste' : '🎴 Grid'}
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-medium"
            disabled={uploading}
          >
            {uploading ? 'Uploader...' : '+ Upload Fil'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,image/svg+xml,.svg"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Søg efter filnavn eller alt-tekst..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      ) : media.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen filer endnu</h3>
          <p className="text-gray-600 mb-4">Upload din første fil for at komme i gang</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            Upload Fil
          </button>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {media.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-pink-500 cursor-pointer transition-all group"
                >
                  <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                    {item.type === 'svg' ? (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        SVG
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {item.filename}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatFileSize(item.size)}
                    </div>
                    {item.alt && (
                      <div className="text-xs text-gray-600 mt-1 truncate" title={item.alt}>
                        Alt: {item.alt}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Filnavn</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alt-tekst</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Størrelse</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploadet</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Handlinger</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {media.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 bg-gray-50 rounded flex items-center justify-center">
                          {item.type === 'svg' ? (
                            <span className="text-xs text-gray-400">SVG</span>
                          ) : (
                            <img src={item.url} alt={item.alt} className="max-w-full max-h-full object-contain" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.filename}</div>
                        <div className="text-xs text-gray-500">{item.url}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs truncate">{item.alt || '—'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatFileSize(item.size)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(item.uploadedAt).toLocaleDateString('da-DK')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Detaljer
                          </button>
                          <button
                            onClick={() => copyUrl(item.url)}
                            className="text-pink-600 hover:text-pink-900"
                          >
                            Kopiér URL
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Media Detaljer</h2>
            
            <div className="space-y-4">
              {/* Preview */}
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center" style={{ minHeight: '200px' }}>
                {selectedItem.type === 'svg' ? (
                  <div className="text-gray-400">SVG Preview</div>
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.alt}
                    className="max-h-64 max-w-full object-contain"
                  />
                )}
              </div>

              {/* File Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Filnavn:</span>
                  <div className="font-medium">{selectedItem.filename}</div>
                </div>
                <div>
                  <span className="text-gray-600">Type:</span>
                  <div className="font-medium">{selectedItem.type}</div>
                </div>
                <div>
                  <span className="text-gray-600">Størrelse:</span>
                  <div className="font-medium">{formatFileSize(selectedItem.size)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Uploadet:</span>
                  <div className="font-medium">
                    {new Date(selectedItem.uploadedAt).toLocaleString('da-DK')}
                  </div>
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedItem.url}
                    readOnly
                    className="flex-1 px-3 py-2 border rounded-lg bg-gray-50"
                  />
                  <button
                    onClick={() => copyUrl(selectedItem.url)}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                  >
                    Kopiér
                  </button>
                </div>
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alt-tekst (SEO)</label>
                <input
                  type="text"
                  value={selectedItem.alt}
                  onChange={(e) => setSelectedItem({ ...selectedItem, alt: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Beskriv billedet for SEO og tilgængelighed"
                />
              </div>

              {/* Used By */}
              {selectedItem.usedBy && selectedItem.usedBy.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bruges af:</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.usedBy.map((ref, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {ref}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedItem(null)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Luk
              </button>
              <button
                onClick={() => handleUpdateAlt(selectedItem.id, selectedItem.alt)}
                className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
              >
                Gem Alt-tekst
              </button>
              <button
                onClick={() => handleDelete(selectedItem.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Slet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Instructions */}
      {!loading && media.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tips til billeder:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
            <li>Upload JPG, PNG eller SVG filer</li>
            <li>Maksimal filstørrelse: 5 MB</li>
            <li>Tilføj altid alt-tekst for SEO</li>
            <li>Kopiér URL og indsæt i model-billede feltet</li>
            <li>Filer gemmes i <code className="bg-blue-100 px-1 rounded">/public/uploads/</code></li>
          </ul>
        </div>
      )}
    </div>
  );
}
