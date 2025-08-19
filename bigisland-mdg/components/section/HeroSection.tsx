'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import heroAnimation from '@/public/animations/heroanimation.json';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
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
      // Faire clignoter le curseur 3 fois puis le faire disparaître
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
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation('common');

  return (
    <section id="hero" className="relative -mt-6 scroll-mt-20 px-4 lg:px-10">
      <div className="max-w-6xl container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Texte et boutons */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left max-w-xl lg:max-w-2xl"
        >
          {/* Titre avec effet machine à écrire amélioré */}
          <h5 className="text-4xl lg:text-4xl xl:text-4xl font-bold mb-5 text-gray-800 leading-tight">
            <TypewriterText 
              text={t('hero.title')} 
              delay={0.08}
              cursor={true}
              cursorStyle="ml-1 h-8 w-1.5 bg-blue-600"
            />
          </h5>
          
          {/* Description avec effet machine à écrire */}
          <div className="text-lg lg:text-xl text-gray-600 mb-7 leading-relaxed">
            <TypewriterText 
              text={t('hero.description')} 
              delay={0.03}
              cursor={false}
            />
          </div>

          {/* Boutons avec animations */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 lg:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('hero.button1')}
            </motion.button>
            
            <motion.button 
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-blue-600 text-blue-600 hover:text-blue-700 hover:border-blue-700 rounded-lg font-medium transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlayCircleIcon className="h-6 w-6" />
              {t('hero.button2')}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Animation Lottie */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 1, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.3 
          }}
          className="w-full lg:w-1/2 mt-8 lg:mt-0"
        >
          <Lottie 
            animationData={heroAnimation} 
            loop={true} 
            className="max-w-md lg:max-w-lg mx-auto"
          />
        </motion.div>
      </div>

      {/* Modales avec AnimatePresence */}
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
