'use client';

import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { PlayCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import ContactModal from '../layout/ModalContact';
import VideoModal from '../layout/VideoModal';

// Composant TiltCard pour l'effet d'inclinaison
const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  );
};

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
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useTranslation('common');

  return (
    <section id="hero" className="relative -mt-10 scroll-mt-10 px-4 lg:px-10 py-3 lg:py-20">
      <div className="max-w-7xl container mx-auto flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
        {/* Texte et boutons - Positionnés plus haut */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left w-full lg:w-1/2"
        >
          {/* Titre avec effet machine à écrire amélioré */}
          <h5 className="text-2xl lg:text-2xl xl:text-4xl font-bold text-gray-800 leading-tight mb-4">
            <TypewriterText 
              text={t('hero.title')} 
              delay={0.08}
              cursor={true}
              cursorStyle="ml-1 h-8 w-1.5 bg-blue-600"
            />
          </h5>
          
          {/* Description avec effet machine à écrire */}
          <div className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed mb-6">
            <TypewriterText 
              text={t('hero.description')} 
              delay={0.03}
              cursor={false}
            />
          </div>

          {/* Boutons avec animations */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 lg:gap-6 mb-7"
            initial={{ opacity: 0, y: 5 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3 rounded-lg font-medium transition-colors text-lg shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6 inline-block mr-1" />
              {t('hero.button1')}
            </motion.button>
            
            <motion.button 
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center px-7 py-2 border-2 border-blue-600 text-blue-600 hover:text-blue-700 hover:border-blue-700 rounded-lg font-medium transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlayCircleIcon className="h-8 w-8" />
              {t('hero.button2')}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Section d'images avec animations Tilt */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ 
            duration: 1, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.3 
          }}
          className="w-full lg:w-1/2 mt-7 lg:mt-0"
        >
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {/* Première image - Services IT */}
            <TiltCard className="relative h-65 md:h-70 rounded-xl overflow-hidden shadow-lg mt-3">
              <Image
                src="/images/techs.jpg"
                alt="Services IT et Technologie"
                fill
                className="object-cover transform transition-transform duration-300 hover:scale-110"
                sizes="(max-width: 700px) 10vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm">Services IT</span>
              </div>
            </TiltCard>
            
            {/* Deuxième image - Location de Voitures */}
            <TiltCard className="relative h-65 md:h-70 rounded-xl overflow-hidden shadow-lg mt-12">
              <Image
                src="/images/rentals.jpg"
                alt="Location de Voitures"
                fill
                className="object-cover transform transition-transform duration-300 hover:scale-110"
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm">Location Voitures</span>
              </div>
            </TiltCard>
            
            {/* Troisième image - Call Center */}
            <TiltCard className="relative h-65 md:h-65 rounded-xl overflow-hidden shadow-lg mt-1">
              <Image
                src="/images/headsets.jpg"
                alt="Services Call Center"
                fill
                className="object-cover transform transition-transform duration-300 hover:scale-110"
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm">Call Center</span>
              </div>
            </TiltCard>
            
            {/* Quatrième image - Fournisseurs Produits */}
            <TiltCard className="relative h-65 md:h-65 rounded-xl overflow-hidden shadow-lg mt-10">
              <Image
                src="/images/products.jpg"
                alt="Fournisseurs de Produits"
                fill
                className="object-cover transform transition-transform duration-300 hover:scale-110"
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm">Fournisseurs Produits</span>
              </div>
            </TiltCard>
          </div>
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
