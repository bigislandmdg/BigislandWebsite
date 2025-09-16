'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react'; // <-- lucide-react
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import TypewriterText from '../section/TypewriterText';
import ContactModal from '../layout/ModalContact';

export default function Hero() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundVideos = [
    '/videos/itsolutions.mp4',
    '/videos/products.mp4',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) =>
        prevIndex === backgroundVideos.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000);
    return () => clearInterval(interval);
  }, [backgroundVideos.length]);

  return (
    <section className="relative isolate overflow-hidden min-h-screen flex items-center justify-center">
      {/* Vidéo en background */}
      <div className="absolute inset-0 z-0">
        <video
          key={currentBgIndex}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src={backgroundVideos[currentBgIndex]} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        <div className="absolute inset-0 bg-blue/50" />
      </div>

      {/* Contenu texte */}
      <div className="relative z-12 mx-0 max-w-3xl px-2 lg:px-8 py-24 text-left text-white mr-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          <TypewriterText
            text={t('hero.title')}
            delay={0.08}
            cursor
            cursorStyle="ml-1 h-6 w-2 bg-white"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-6 text-lg leading-8 max-w-2xl"
        >
          <TypewriterText text={t('hero.description')} delay={0.03} cursor={false} />
        </motion.p>

        {/* === Bouton principal === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-6"
        >
          <motion.button
            onClick={() => router.push('/services/it')}
            className="flex items-center px-6 py-3 rounded-xl font-semibold shadow-md transition bg-blue-600 text-white hover:bg-white hover:text-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('hero.button2')}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6 ml-3" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Indicateurs vidéos */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {backgroundVideos.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentBgIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
            }`}
            onClick={() => setCurrentBgIndex(index)}
            aria-label={`Afficher la vidéo ${index + 1}`}
          />
        ))}
      </div>

      {/* Modale contact */}
      <AnimatePresence>
        {isModalOpen && (
          <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

