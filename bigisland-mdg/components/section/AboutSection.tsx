'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { JSX, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import AppointmentModal from '../layout/AppointmentModal';
import { Laptop, Car, Headset, PackagePlus, Rocket } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation('common');

  const expertises = t('about.expertises', {
    returnObjects: true,
  }) as { title: string; description: string; icon?: JSX.Element }[];

  // assign icons with motion wrapper for animations
  const iconClass = "h-10 w-10 text-blue-600";

  expertises[0].icon = <Car className={iconClass} />;
  expertises[1].icon = <Headset className={iconClass} />;
  expertises[2].icon = <Laptop className={iconClass} />;
  expertises[3].icon = <PackagePlus className={iconClass} />;

  return (
    <section id="about" className="bg-white py-16 sm:py-20">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start"
      >
        {/* ---- Colonne gauche ---- */}
        <div className="max-w-xl">
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

          {/* ---- CTA ---- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md hover:from-blue-700 hover:to-blue-800 transition-transform transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Rocket className="h-5 w-5" /> {/* 🚀 Icône sur bouton */}
              {t('about.button')}
            </button>
          </motion.div>
        </div>

        {/* ---- Colonne droite : Panels en grille ---- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {expertises.map((exp, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              className="rounded-3xl bg-blue-50 p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="mb-4 flex items-center gap-x-3">
                {/* ✅ Icône animée */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], y: [0, -3, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  {exp.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {exp.title}
                </h3>
              </div>
              <p className="text-gray-700 text-base leading-6">
                {exp.description}
              </p>
            </motion.div>
          ))}
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

