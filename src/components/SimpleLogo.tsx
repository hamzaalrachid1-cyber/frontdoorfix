'use client';

import { useBrandSettings } from '@/hooks/useBrandSettings';
import Image from 'next/image';

interface SimpleLogoProps {
  className?: string;
  priority?: boolean;
}

export default function SimpleLogo({ className = '', priority = false }: SimpleLogoProps) {
  const { brandSettings, isLoading, error } = useBrandSettings();

  if (isLoading) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (error || !brandSettings) {
    // Fallback to text-only logo
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-gray-800">
            {brandSettings?.name || 'FrontDoorFix'}
          </span>
          {brandSettings?.tagline && (
            <span className="text-xs text-gray-500 -mt-1">
              {brandSettings.tagline}
            </span>
          )}
        </div>
      </div>
    );
  }

  const logoHeight = brandSettings.logoHeight || 32;
  const logoMaxWidth = brandSettings.logoMaxWidth;
  const logoStyle = {
    height: `${logoHeight}px`,
    ...(logoMaxWidth && { maxWidth: `${logoMaxWidth}px` })
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {brandSettings.logoUrl ? (
        <div style={logoStyle} className="flex items-center">
          {brandSettings.logoUrl.endsWith('.svg') ? (
            // For SVG files, use img tag directly
            <img
              src={brandSettings.logoUrl}
              alt={`${brandSettings.name} logo`}
              style={{ 
                height: `${logoHeight}px`,
                width: 'auto',
                maxWidth: logoMaxWidth ? `${logoMaxWidth}px` : 'none'
              }}
              className="object-contain"
            />
          ) : (
            // For PNG/JPG files, use Next.js Image
            <Image
              src={brandSettings.logoUrl}
              alt={`${brandSettings.name} logo`}
              width={logoHeight * 2} // For retina support
              height={logoHeight * 2}
              priority={priority}
              className="w-auto h-full object-contain"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-gray-800">
            {brandSettings.name}
          </span>
          {brandSettings.tagline && (
            <span className="text-xs text-gray-500 -mt-1">
              {brandSettings.tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
