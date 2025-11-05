"use client";

import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in';
  delay?: number;
}

export default function ScrollAnimation({ 
  children, 
  className = '', 
  animationType = 'fade-in',
  delay = 0 
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const animationClasses = {
    'fade-in': 'fade-in-on-scroll',
    'slide-left': 'slide-in-left-on-scroll',
    'slide-right': 'slide-in-right-on-scroll',
    'scale-in': 'scale-in-on-scroll',
  };

  return (
    <div
      ref={ref}
      className={`${animationClasses[animationType]} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

