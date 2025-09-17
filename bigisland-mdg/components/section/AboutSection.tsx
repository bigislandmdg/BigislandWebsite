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

  // Variants pour stagger
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="about" className="bg-gray-50 py-10 sm:py-16 lg:py-20">
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
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {expertises.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="relative flex flex-col bg-gray-50 p-8 shadow-sm border border-gray-50 rounded-2xl cursor-pointer transition-all"
              whileHover={{
                scale: 1.03,
                borderColor: "#3b82f6",
                boxShadow: "0px 12px 40px rgba(59,130,246,0.25)",
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onHoverStart={() => setHoverIndex(idx)}
              onHoverEnd={() => setHoverIndex(null)}
            >
              {/* Icone animée */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], y: [0, -3, 0], scale: 1.1 }}
                transition={{ type: 'tween', duration: 0.6, ease: 'easeInOut' }}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-6"
              >
                {exp.icon}
              </motion.div>

              <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
              <p className="mt-3 text-base leading-6 text-gray-700">{exp.description}</p>

              {/* Bouton Lancer Projet au hover */}
              <AnimatePresence>
                {hoverIndex === idx && (
                  <motion.button
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                    onClick={() => setIsModalOpen(true)}
                    className="absolute bottom-6 right-6 px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:shadow-xl transition-all flex items-center gap-2"
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
