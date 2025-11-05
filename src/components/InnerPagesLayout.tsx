'use client';

import { ReactNode } from 'react';

interface InnerPagesLayoutProps {
  children: ReactNode;
}

export default function InnerPagesLayout({ children }: InnerPagesLayoutProps) {
  return (
    <div className="inner-pages">
      {children}
    </div>
  );
}

