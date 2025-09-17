'use client';

import { useEffect, useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ContactModal from '../layout/ModalContact';
import { useTranslation } from 'react-i18next';

export default function FloatingChatToggle() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation('common');

  // Affiche le bouton après un certain scroll
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 10);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsModalOpen(true)}
            className="fixed top-60 right-0 z-50 flex items-center gap-2 px-2 py-5 
                        bg-blue-600 text-white shadow-lg 
                       hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icône animée */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Mail className="h-6 w-6" />
            </motion.div>

            {/* Texte qui apparaît */}
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="overflow-hidden whitespace-nowrap font-semibold"
            >
              {t('contactButton') || 'Contactez-nous'}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal Contact */}
      <AnimatePresence>
        {isModalOpen && (
          <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
