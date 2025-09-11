'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// TiltCard générique
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const rotateX = ((y / offsetHeight) - 0.5) * 12;
    const rotateY = ((x / offsetWidth) - 0.5) * -12;
    setStyle({ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)` });
  };

  const resetStyle = () => setStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });

  return (
    <motion.div
      className={`bg-white shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 ease-in-out ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetStyle}
      whileHover={{ boxShadow: '0px 8px 30px rgba(0,0,0,0.15)' }}
    >
      {children}
    </motion.div>
  );
}

type Testimony = { name: string; message: string; avatar: string };

export default function TestimonyScreen() {
  const { t } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);

  useEffect(() => {
    setTestimonies([
      { name: t('testimonyPage.clients.client1.name'), message: t('testimonyPage.clients.client1.message'), avatar: '/images/clients/client1.jpg' },
      { name: t('testimonyPage.clients.client2.name'), message: t('testimonyPage.clients.client2.message'), avatar: '/images/clients/client2.jpg' },
      { name: t('testimonyPage.clients.client3.name'), message: t('testimonyPage.clients.client3.message'), avatar: '/images/clients/client3.jpg' },
    ]);
  }, [t]);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonies.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonies.length) % testimonies.length);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section>
      {/* ===== Hero Section ===== */}
      <div className="relative bg-gradient-to-l from-blue-50 to-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Texte à gauche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">{t('testimonyPage.title')}</h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-700">{t('testimonyPage.description')}</p>
          </motion.div>

           {/* Image à droite */}
                       <motion.div
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{
                           opacity: 1,
                               scale: [1, 1.03, 1],
                               y: [0, -8, 0],
                           }}
                           transition={{
                           duration: 3,
                           repeat: Infinity,
                           ease: 'easeInOut',
                           }}
                           className="relative flex justify-center items-center"
                           >
                           <div className="relative w-full max-w-md h-72 md:h-[350px] lg:h-[400px]">
                           <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 to-transparent rounded-3xl transform rotate-2 shadow-xl"></div>
                          <Image
                            src="/images/heros/testimonials-hero.jpg"
                          alt="It illustration"
                          fill
                        priority
                      className="relative object-cover rounded-3xl shadow-lg"
                    />
                </div>
              </motion.div>
        </div>
      </div>

      {/* ===== Testimony Carousel ===== */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20" ref={ref}>
        <div className="relative flex flex-col items-center">
          <AnimatePresence mode="wait">
            {testimonies.length > 0 && (
              <motion.div
                key={activeIndex}
                className="w-full max-w-4xl"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
              >
                <TiltCard className="p-8 flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0 relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                    <img
                      src={testimonies[activeIndex].avatar}
                      alt={testimonies[activeIndex].name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-semibold text-blue-600">{testimonies[activeIndex].name}</h3>
                    <p className="mt-2 text-gray-600 italic leading-relaxed text-lg">
                      "{testimonies[activeIndex].message}"
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {testimonies.length > 1 && (
            <div className="flex justify-center gap-6 mt-10 items-center">
              <button
                onClick={goPrev}
                className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors shadow-sm hover:shadow-md"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-3">
                {testimonies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      activeIndex === index ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors shadow-sm hover:shadow-md"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

