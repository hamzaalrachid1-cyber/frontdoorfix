"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  brandsCount: number;
  seriesCount: number;
  modelsCount: number;
  repairsCount: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    brandsCount: 5,
    seriesCount: 0,
    modelsCount: 0,
    repairsCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Fetch series
      const seriesRes = await fetch('/api/admin/series');
      const series = seriesRes.ok ? await seriesRes.json() : [];

      // Fetch models
      const modelsRes = await fetch('/api/admin/models');
      const models = modelsRes.ok ? await modelsRes.json() : [];

      // Calculate repairs count
      const repairsCount = models.reduce((sum: number, m: any) => sum + (m.repairs?.length || 0), 0);

      setStats({
        brandsCount: 5,
        seriesCount: series.length,
        modelsCount: models.length,
        repairsCount
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Velkommen til FrontDoorFix Admin</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/admin/catalog/brands"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Brands</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.brandsCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏷️</span>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/catalog/brands"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Serier</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.seriesCount}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/catalog/brands"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Modeller</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.modelsCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>
          </div>
        </Link>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reparationer</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.repairsCount}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔧</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hurtige handlinger</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/catalog/brands"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-pink-500 transition-colors"
          >
            <h3 className="font-medium text-gray-900 mb-1">Administrer Katalog</h3>
            <p className="text-sm text-gray-600">Brands, serier og modeller</p>
          </Link>

          <Link
            href="/admin/media"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-pink-500 transition-colors"
          >
            <h3 className="font-medium text-gray-900 mb-1">Upload Billeder</h3>
            <p className="text-sm text-gray-600">Media bibliotek</p>
          </Link>

          <Link
            href="/admin/seo"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-pink-500 transition-colors"
          >
            <h3 className="font-medium text-gray-900 mb-1">SEO Oversigt</h3>
            <p className="text-sm text-gray-600">Titles, descriptions, schema</p>
          </Link>
        </div>
      </div>

      {/* Help */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Kom i gang</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
          <li>Gå til <strong>Katalog</strong> for at administrere brands og modeller</li>
          <li>Alle ændringer vises live på websitet efter gemning</li>
          <li>Brug søgning og filtre til hurtigt at finde indhold</li>
        </ul>
      </div>
    </div>
  );
}
