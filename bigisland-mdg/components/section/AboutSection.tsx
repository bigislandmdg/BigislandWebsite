'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { JSX, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import AppointmentModal from '../layout/AppointmentModal';
import { Laptop, Car, PackagePlus, Rocket } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation('common');

  // ✅ Trois expertises seulement
  const expertises = [
    {
      title: t('about.expertises.0.title'),
      description: t('about.expertises.0.description'),
      icon: <Car className="h-8 w-8 text-blue-600" />,
    },
    {
      title: t('about.expertises.1.title'),
      description: t('about.expertises.1.description'),
      icon: <Laptop className="h-8 w-8 text-blue-600" />,
    },
    {
      title: t('about.expertises.2.title'),
      description: t('about.expertises.2.description'),
      icon: <PackagePlus className="h-8 w-8 text-blue-600" />,
    },
  ];

  return (
    <section id="about" className="bg-white py-16 sm:py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---- Titre + intro ---- */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            {t('about.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            {t('about.description')}
          </motion.p>
        </div>

        {/* ---- Grille Feature Cards ---- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {expertises.map((exp, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col rounded-2xl bg-blue-50 p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], y: [0, -3, 0] }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-6"
              >
                {exp.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900">
                {exp.title}
              </h3>
              <p className="mt-3 text-base leading-6 text-gray-700">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ---- CTA ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md hover:from-blue-700 hover:to-blue-800 transition-transform transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Rocket className="h-5 w-5" />
            {t('about.button')}
          </button>
        </motion.div>
      </div>

      {/* ---- Modal ---- */}
      <AnimatePresence>
        {isModalOpen && (
          <AppointmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

