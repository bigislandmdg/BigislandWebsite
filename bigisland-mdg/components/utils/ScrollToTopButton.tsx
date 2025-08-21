'use client';

import { useEffect, useState } from 'react';
import { ArrowLongUpIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
    >
      <ChevronUpIcon className="h-4 w-4" />
     
    </button>
  ) : null;
}
