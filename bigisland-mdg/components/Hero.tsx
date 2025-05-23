'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Lottie from 'lottie-react';
import heroAnimation from '@/public/animations/heroanimation.json';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Hook de traduction
  const { t } = useTranslation('common');

  return (
    <section id="hero" className="relative -mt-8 scroll-mt-20 px-2 lg:px-10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Texte et boutons */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center lg:text-left max-w-xl"
        >
          <h2 className="text-4xl lg:text-4xl font-bold mb-5 text-gray-800">
            {t('hero.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-6">{t('hero.description')}</p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              {t('hero.button1')}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100">
              <PlayCircleIcon className="h-5 w-5" />
              {t('hero.button2')}
            </button>
          </div>
        </motion.div>

        {/* Animation Lottie */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full lg:w-1/2"
        >
          <Lottie animationData={heroAnimation} loop={true} />
        </motion.div>
      </div>
    </section>
  );
}
