'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ArrowUp } from 'lucide-react';

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
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 right-8 z-50 p-3  bg-sky-700 text-white shadow-lg hover:bg-stone-700 transition"
    >
      {/* Animation de bounce infini */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.div>
    </motion.button>
  ) : null;
}

