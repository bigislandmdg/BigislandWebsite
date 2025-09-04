'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlayCircle, MessageCircle } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import ContactModal from '../layout/ModalContact';
import VideoModal from '../layout/VideoModal';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  cursor?: boolean;
  cursorStyle?: string;
}

const TypewriterText = ({ 
  text, 
  className = '', 
  delay = 0.05, 
  cursor = true, 
  cursorStyle = 'ml-0.5 h-6 w-1 bg-current' 
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // 🔥 Reset quand le texte change (ex: changement de langue)
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setShowCursor(true);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    } else {
      const blinkInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);

      const stopTimeout = setTimeout(() => {
        clearInterval(blinkInterval);
        setShowCursor(false);
      }, 2000);

      return () => {
        clearInterval(blinkInterval);
        clearTimeout(stopTimeout);
      };
    }
  }, [currentIndex, text, delay]);

  return (
    <span className={`${className} inline-flex items-center`}>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {displayedText}
      </motion.span>
      {cursor && showCursor && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
          className={cursorStyle}
        />
      )}
    </span>
  );
};

export default function Hero() {
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundVideos = [
    '/videos/callcenter.mp4',
    '/videos/rentals.mp4',
    '/videos/itsolutions.mp4',
    '/videos/products.mp4'
  ];

  const [videoLoadedStates, setVideoLoadedStates] = useState<boolean[]>(
    Array(backgroundVideos.length).fill(false)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(prevIndex => 
        prevIndex === backgroundVideos.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000);

    return () => clearInterval(interval);
  }, [backgroundVideos.length]);

  const handleVideoLoad = (index: number) => {
    setVideoLoadedStates(prev => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  return (
    <section className="relative pt-[5px] py-14 bg-gradient-to-l from-blue-50 to-blue-200 min-h-screen flex items-center">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

        {/* Texte à gauche */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-5"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            <TypewriterText 
              text={t('hero.title')} 
              delay={0.08} 
              cursor={true} 
              cursorStyle="ml-1 h-6 w-1.5 bg-gray-900" 
            />
          </h2>

          <p className="text-md text-gray-700 max-w-md leading-relaxed">
            <TypewriterText 
              text={t('hero.description')} 
              delay={0.03} 
              cursor={false} 
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t('hero.button1')}
            </motion.button>

            <motion.button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlayCircle className="w-6 h-6 mr-2" />
              {t('hero.button2')}
            </motion.button>
          </div>
        </motion.div>

        {/* Card vidéo à droite */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-96 object-cover"
            onLoadedData={() => handleVideoLoad(currentBgIndex)}
          >
            <source src={backgroundVideos[currentBgIndex]} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {backgroundVideos.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-200 ${
                  index === currentBgIndex ? 'bg-blue-100 w-8' : 'bg-blue-600/40 w-2'
                }`}
                onClick={() => setCurrentBgIndex(index)}
                aria-label={`Afficher la vidéo ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

      </div>

      {/* Modales */}
      <AnimatePresence>
        {isModalOpen && (
          <ContactModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
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

