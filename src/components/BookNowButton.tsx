'use client';

import { useBookingModal, type Preselect } from '@/context/BookingModalContext';

interface BookNowButtonProps {
  label?: string;
  preselect?: Preselect;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function BookNowButton({ 
  label = 'Bestil tid', 
  preselect, 
  className = '',
  variant = 'primary'
}: BookNowButtonProps) {
  const { open } = useBookingModal();

  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:from-pink-600 hover:to-yellow-600 focus:ring-pink-500 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-pink-600 border-2 border-pink-500 hover:bg-pink-50 focus:ring-pink-500",
    outline: "bg-transparent text-pink-600 border border-pink-500 hover:bg-pink-50 focus:ring-pink-500"
  };

  return (
    <button 
      onClick={() => open(preselect)}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      type="button"
    >
      {label}
    </button>
  );
}
