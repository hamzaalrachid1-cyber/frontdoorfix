"use client";

import { useState, useEffect } from 'react';

interface GlobalContent {
  siteSettings: {
    siteName: string;
    siteTagline: string;
    siteDescription: string;
    contactPhone: string;
    contactEmail: string;
    contactAddress: string;
    openingHours: string;
  };
  seoSettings: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string[];
  };
  footerContent: {
    companyInfo: string;
    openingHours: string;
    socialLinks: Array<{
      id: string;
      platform: string;
      url: string;
      icon: string;
    }>;
  };
  commonTexts: {
    ctaButton: string;
    readMore: string;
    contactUs: string;
    getQuote: string;
    learnMore: string;
    bookAppointment: string;
    viewAll: string;
    showMore: string;
    showLess: string;
    loading: string;
    error: string;
    success: string;
  };
  pageTitles: {
    [key: string]: string;
  };
}

export function useGlobalContent() {
  const [content, setContent] = useState<GlobalContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/content/global');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        throw new Error('Failed to fetch content');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching global content:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshContent = () => {
    fetchContent();
  };

  return {
    content,
    loading,
    error,
    refreshContent
  };
}

