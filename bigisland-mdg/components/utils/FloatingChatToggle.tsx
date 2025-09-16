'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import ContactModal from '../layout/ModalContact';
import { t } from 'i18next';

export default function FloatingChatToggle() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Affiche le bouton après un certain scroll
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 150);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed top-60 right-6 z-50 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
        >
          <MessageCircle className="h-10 w-10" />
         
        </button>
      )}

      {/* Modal Contact */}
      <AnimatePresence>
        {isModalOpen && (
          <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
