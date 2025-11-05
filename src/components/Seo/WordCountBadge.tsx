'use client';

import { useContentQuality } from '@/lib/seo/contentHooks';

interface WordCountBadgeProps {
  content: string;
  className?: string;
}

export default function WordCountBadge({ content, className = '' }: WordCountBadgeProps) {
  const quality = useContentQuality(content);
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getBadgeColor = () => {
    if (quality.wordCount >= 250) return 'bg-green-100 text-green-800';
    if (quality.wordCount >= 150) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusIcon = () => {
    if (quality.wordCount >= 250) return '✅';
    if (quality.wordCount >= 150) return '⚠️';
    return '❌';
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className={`px-3 py-2 rounded-lg shadow-lg border ${getBadgeColor()}`}>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>{getStatusIcon()}</span>
          <span>{quality.wordCount} ord</span>
          {quality.isThin && <span className="text-xs">(tynd)</span>}
        </div>
        {quality.recommendations.length > 0 && (
          <div className="mt-1 text-xs">
            {quality.recommendations[0]}
          </div>
        )}
      </div>
    </div>
  );
}
