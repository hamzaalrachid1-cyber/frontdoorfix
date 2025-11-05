'use client';

import { useEffect } from 'react';
import { useBookingModal } from '@/context/BookingModalContext';

export default function GlobalBookNowBinder() {
  const { open } = useBookingModal();

  useEffect(() => {
    // Regex to match "Bestil tid", "Book tid", "Book repair" etc. (case insensitive)
    const bookingTextRegex = /(bestil\s*tid|book\s*(tid|repair|now)|bestil|book)/i;

    const getPreselect = (el: Element) => {
      const ds = (el as HTMLElement).dataset || {};
      
      // 1. Try to get from data attributes
      const brand = ds.brand?.trim();
      const model = ds.model?.trim();
      const repairs = ds.repairs?.split(',').map(s => s.trim()).filter(Boolean) || [];

      if (brand || model || repairs.length) {
        return { brand, model, repairs };
      }

      // 2. Try to get from URL query params (if it's a link)
      const a = el.closest('a') as HTMLAnchorElement | null;
      if (a?.href) {
        try {
          const url = new URL(a.href, location.origin);
          const urlBrand = url.searchParams.get('brand') || undefined;
          const urlModel = url.searchParams.get('model') || undefined;
          const urlRepairs = (url.searchParams.get('repairs') || '')
            .split(',').map(s => s.trim()).filter(Boolean);
          
          if (urlBrand || urlModel || urlRepairs.length) {
            return { brand: urlBrand, model: urlModel, repairs: urlRepairs };
          }
        } catch (e) {
          // Invalid URL, continue to fallback
        }
      }

      // 3. Try to get from page context (body dataset or meta tags)
      const bodyBrand = document.body.dataset.brand ||
        document.querySelector('meta[name="fd-brand"]')?.getAttribute('content') || undefined;

      const bodyModel = document.body.dataset.model ||
        document.querySelector('meta[name="fd-model"]')?.getAttribute('content') || undefined;

      if (bodyBrand || bodyModel) {
        return { brand: bodyBrand, model: bodyModel, repairs: [] };
      }

      // 4. Try to extract from current URL path (e.g., /reparationer/apple/iphone-6)
      const path = window.location.pathname;
      const pathMatch = path.match(/\/reparationer\/([^\/]+)\/([^\/]+)/);
      if (pathMatch) {
        const [, brandSlug, modelSlug] = pathMatch;
        // Convert slug to proper names
        const brandMap: Record<string, string> = {
          'apple': 'Apple',
          'samsung': 'Samsung',
          'google': 'Google',
          'oneplus': 'OnePlus',
          'huawei': 'Huawei',
          'motorola': 'Motorola'
        };
        
        const modelMap: Record<string, string> = {
          'iphone-6': 'iPhone 6',
          'iphone-6-plus': 'iPhone 6 Plus',
          'galaxy-s21': 'Galaxy S21',
          'pixel-7': 'Pixel 7'
        };

        const pathBrand = brandMap[brandSlug];
        const pathModel = modelMap[modelSlug];
        
        if (pathBrand || pathModel) {
          return { brand: pathBrand, model: pathModel, repairs: [] };
        }
      }

      return {};
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target) return;

      // Find the closest clickable element that might be a booking button
      const btn = target.closest('[data-book-now], .js-book-now');
      if (!btn) {
        // Only check for explicit booking buttons with data attributes or classes
        const clickableBtn = target.closest('button[data-book-now], a[data-book-now], button.js-book-now, a.js-book-now');
        if (clickableBtn) {
          const text = (clickableBtn as HTMLElement).innerText?.trim() || '';
          if (bookingTextRegex.test(text)) {
            // Prevent default navigation and stop propagation
            e.preventDefault();
            e.stopPropagation();

            // Get preselect data and open modal
            const preselect = getPreselect(clickableBtn);
            open(preselect);
          }
        }
        return;
      }

      // Prevent default navigation and stop propagation
      e.preventDefault();
      e.stopPropagation();

      // Get preselect data and open modal
      const preselect = getPreselect(btn);
      open(preselect);
    };

    // Add event listener with capture to catch events before they bubble
    document.addEventListener('click', onClick, { capture: true });

    // Optional: Add MutationObserver to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              // Check if the added element or its children have booking buttons
              const bookingButtons = element.querySelectorAll('[data-book-now], .js-book-now');

              if (bookingButtons.length > 0) {
                // New booking buttons were added, they'll be handled by the existing event listener
                console.log('New booking buttons detected:', bookingButtons.length);
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup
    return () => {
      document.removeEventListener('click', onClick, { capture: true });
      observer.disconnect();
    };
  }, [open]);

  return null;
}
