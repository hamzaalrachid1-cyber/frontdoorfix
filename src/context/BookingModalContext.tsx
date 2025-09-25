'use client';

import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the modal component
const BookingModal = dynamic(() => import('@/components/BookingModal'), {
  ssr: false,
});

export type Preselect = {
  brand?: string;
  model?: string;
  repairs?: string[];
};

type BookingModalContextType = {
  isOpen: boolean;
  preselect: Preselect | null;
  open: (preselect?: Preselect) => void;
  close: () => void;
};

const BookingModalContext = createContext<BookingModalContextType | null>(null);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselect, setPreselect] = useState<Preselect | null>(null);

  const api = useMemo(() => ({
    isOpen,
    preselect,
    open: (p?: Preselect) => {
      setPreselect(p ?? null);
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
      // Clear preselect after a short delay to allow for smooth closing animation
      setTimeout(() => setPreselect(null), 300);
    },
  }), [isOpen, preselect]);

  return (
    <BookingModalContext.Provider value={api}>
      {children}
      {isOpen && <BookingModal />}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error('useBookingModal must be used within a BookingModalProvider');
  }
  return context;
}
