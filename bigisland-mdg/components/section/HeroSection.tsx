'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { PlayCircle, MessageCircle } from 'lucide-react'; // ✅ Lucide React
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
    <div className={`${className} inline-flex items-center`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {displayedText}
      </motion.span>
      
      {cursor && showCursor && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 0.8,
            ease: "easeInOut"
          }}
          className={cursorStyle}
        />
      )}
    </div>
  );
};

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const { t } = useTranslation('common');

  const backgroundVideos = [
    '/videos/callcenter.mp4',
    '/videos/rentals.mp4',
    '/videos/itsolutions.mp4',
    '/videos/products.mp4'
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [videoLoadedStates, setVideoLoadedStates] = useState<boolean[]>(
    Array(backgroundVideos.length).fill(false)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
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
    <section id="hero" className="relative -mt-7 scroll-mt-10 px-4 lg:px-7 py-3 lg:py-20 overflow-hidden min-h-screen flex items-center">
      {/* Vidéos d'arrière-plan */}
      {backgroundVideos.map((video, index) => (
        <motion.div
          key={video}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index === currentBgIndex ? 1 : 0 
          }}
          transition={{ duration: 1.5 }}
          style={{ 
            display: index === currentBgIndex ? 'block' : 'none' 
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="object-cover w-full h-full"
            onLoadedData={() => handleVideoLoad(index)}
            style={{ 
              opacity: videoLoadedStates[index] ? 1 : 0, 
              transition: 'opacity 0.8s ease-in',
              filter: 'brightness(0.7)'
            }}
          >
            <source src={video} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/80 to-blue-100/70 mix-blend-multiply"></div>
        </motion.div>
      ))}

      {/* Indicateurs de progression */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {backgroundVideos.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentBgIndex 
                ? 'bg-white w-8' 
                : 'bg-white/40 w-2'
            }`}
            onClick={() => setCurrentBgIndex(index)}
            aria-label={`Afficher la vidéo ${index + 1}`}
          />
        ))}
      </div>

      <div className="max-w-4xl container mx-auto relative z-10 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          {/* Titre */}
          <h5 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6">
            <TypewriterText 
              text={t('hero.title')} 
              delay={0.08}
              cursor={true}
              cursorStyle="ml-1 h-8 w-1.5 bg-white"
            />
          </h5>
          
          {/* Description */}
          <div className="text-xl md:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto">
            <TypewriterText 
              text={t('hero.description')} 
              delay={0.03}
              cursor={false}
            />
          </div>

          {/* Boutons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 lg:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-medium transition-colors text-lg shadow-lg hover:shadow-xl flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="h-6 w-6 mr-2" /> {/* ✅ remplacé */}
              {t('hero.button1')}
            </motion.button>
            
            <motion.button 
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white/10 rounded-lg font-medium transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlayCircle className="h-7 w-7 mr-2" /> {/* ✅ remplacé */}
              {t('hero.button2')}
            </motion.button>
          </motion.div>
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

