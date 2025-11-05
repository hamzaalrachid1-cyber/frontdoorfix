'use client';

import { useBrandSettings } from '@/hooks/useBrandSettings';

export default function TestLogo() {
  const { brandSettings, isLoading, error } = useBrandSettings();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!brandSettings) return <div>No brand settings</div>;

  return (
    <div>
      <h1>Brand Settings Test</h1>
      <p>Name: {brandSettings.name}</p>
      <p>Tagline: {brandSettings.tagline}</p>
      <p>Logo URL: {brandSettings.logoUrl}</p>
      <p>Logo Height: {brandSettings.logoHeight}</p>
      <p>Logo Max Width: {brandSettings.logoMaxWidth}</p>
      
      {brandSettings.logoUrl && (
        <div>
          <h2>Logo Preview:</h2>
          <img 
            src={brandSettings.logoUrl} 
            alt="Logo" 
            style={{ height: `${brandSettings.logoHeight || 32}px` }}
          />
        </div>
      )}
    </div>
  );
}
