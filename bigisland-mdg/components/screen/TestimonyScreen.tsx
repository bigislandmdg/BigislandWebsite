'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function TestimonyScreen() {
  const { t, i18n } = useTranslation('common');
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  type Testimony = {
    name: string;
    message: string;
    avatar: string;
  };

  const [testimonies, setTestimonies] = useState<Testimony[]>([]);

  useEffect(() => {
    const loadTestimonies = () => {
      try {
        setTestimonies([
          {
            name: t('testimonyPage.clients.client1.name'),
            message: t('testimonyPage.clients.client1.message'),
            avatar: '/images/clients/client1.jpg',
          },
          {
            name: t('testimonyPage.clients.client2.name'),
            message: t('testimonyPage.clients.client2.message'),
            avatar: '/images/clients/client2.jpg',
          },
          {
            name: t('testimonyPage.clients.client3.name'),
            message: t('testimonyPage.clients.client3.message'),
            avatar: '/images/clients/client3.jpg',
          }
        ]);
        setIsLoading(false);
        // Déclencher l'animation après le chargement
        controls.start("visible");
      } catch (error) {
        console.error("Error loading testimonies:", error);
        setIsLoading(false);
      }
    };

    loadTestimonies();
  }, [i18n.language, t, controls]);

  // Auto-rotation effect
  useEffect(() => {
    if (testimonies.length === 0) return;
    
    const interval = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, testimonies.length]);

  const goNext = () => {
    if (testimonies.length === 0) return;
    
    controls.start("exit").then(() => {
      setActiveIndex((prev) => (prev + 1) % testimonies.length);
      controls.start("visible");
    });
  };

  const goPrev = () => {
    if (testimonies.length === 0) return;
    
    controls.start("exit").then(() => {
      setActiveIndex((prev) => (prev - 1 + testimonies.length) % testimonies.length);
      controls.start("visible");
    });
  };

  // Animation variants - Simplifiées pour une meilleure visibilité
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <>
      <Head>
        <title>{t('testimonyPage.pageTitle')}</title>
        <meta name="description" content={t('testimonyPage.metaDescription')} />
      </Head>

      <motion.section 
        id="testimonies"
        className="pt-32 pb-16 px-6 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl font-bold text-blue-600 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('testimonyPage.title')}
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg mb-12 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {t('testimonyPage.description')}
        </motion.p>

        <div className="relative">
          <div ref={containerRef} className="overflow-hidden relative h-[400px] flex items-center justify-center">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">{t('common.loading')}</p>
              </div>
            ) : testimonies.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600">{t('testimonyPage.noTestimonies')}</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="w-full max-w-xl"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardVariants}
                >
                  <div className="border border-gray-200 rounded-lg shadow-lg p-8 bg-white">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-100 rounded-full blur-md opacity-50"></div>
                        <Image
                          src={testimonies[activeIndex].avatar}
                          alt={testimonies[activeIndex].name}
                          width={80}
                          height={80}
                          className="rounded-full object-cover relative z-10 border-2 border-white"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/images/default-avatar.jpg';
                          }}
                        />
                      </div>
                      <h2 className="text-xl font-semibold text-blue-600">
                        {testimonies[activeIndex].name}
                      </h2>
                    </div>
                    <p className="text-gray-600 mt-6 italic text-lg leading-relaxed">
                      "{testimonies[activeIndex].message}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {!isLoading && testimonies.length > 0 && (
            <div className="flex justify-center gap-6 mt-10 items-center">
              <button
                onClick={goPrev}
                className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors shadow-sm hover:shadow-md"
                aria-label="Previous testimony"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center gap-3">
                {testimonies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`Go to testimony ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors shadow-sm hover:shadow-md"
                aria-label="Next testimony"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
          >
            {t('testimonyPage.cta')}
          </a>
        </div>
      </motion.section>
    </>
  );
}