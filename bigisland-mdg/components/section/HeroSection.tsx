'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlayCircle, MessageCircle } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import ContactModal from '../layout/ModalContact';
import VideoModal from '../layout/VideoModal';
import TypewriterText from '../section/TypewriterText';

export default function Hero() {
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundVideos = [
  //  '/videos/callcenter.mp4',
    '/videos/rentals.mp4',
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
        {/* Overlay sombre/bleu pour lisibilité */}
        <div className="absolute inset-0 bg-blue/50" />
      </div>

      {/* Contenu texte aligné à gauche */}
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

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-start">
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-blue-500 hover:bg-blue-700 flex items-center transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {t('hero.button1')}
          </motion.button>

          <motion.button
            onClick={() => setIsVideoModalOpen(true)}
            className="flex items-center px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/20 shadow-md transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlayCircle className="w-8 h-8 mr-2" />
            {t('hero.button2')}
          </motion.button>
        </div>
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

      {/* Modales */}
      <AnimatePresence>
        {isModalOpen && (
          <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVideoModalOpen && (
          <VideoModal
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            videoUrl="https://www.youtube.com/embed/votre-video-id"
          />
        )}
      </AnimatePresence>
    </section>
  );
}

