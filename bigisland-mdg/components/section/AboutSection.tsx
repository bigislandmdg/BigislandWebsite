'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import AppointmentModal from '../layout/AppointmentModal';
import { Laptop, PackagePlus, Rocket } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { t } = useTranslation('common');

  const expertises = [
    {
      title: t('about.expertises.2.title'),
      description: t('about.expertises.2.description'),
      icon: <Laptop className="h-8 w-8 text-blue-600" />,
    },
    {
      title: t('about.expertises.3.title'),
      description: t('about.expertises.3.description'),
      icon: <PackagePlus className="h-8 w-8 text-blue-600" />,
    },
  ];

  return (
    <section id="about" className="bg-white py-10 sm:py-16 lg:py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Texte centré */}
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

        {/* Cards avec hover animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {expertises.map((exp, idx) => (
            <motion.div
              key={idx}
              className="relative flex flex-col rounded-2xl bg-gray-50 p-8 shadow-sm border border-gray-50 transition-all cursor-pointer"
              whileHover={{
                scale: 1.03,
                borderColor: '#3e577eff', // bordure bleu ciel
              }}
              onHoverStart={() => setHoverIndex(idx)}
              onHoverEnd={() => setHoverIndex(null)}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], y: [0, -3, 0] }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-6"
              >
                {exp.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
              <p className="mt-3 text-base leading-6 text-gray-700">{exp.description}</p>

              {/* Bouton Lancer Projet au hover */}
               {/* Bouton Lancer Projet au hover */}
              <AnimatePresence>
               {hoverIndex === idx && (
                   <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onClick={() => setIsModalOpen(true)}
                  className="absolute top-24 right-0 -translate-x-1/2 px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all inline-flex items-end gap-3"
    >
      <Rocket className="h-5 w-5" />
      {t('about.button')}
    </motion.button>
  )}
</AnimatePresence>

            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
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

