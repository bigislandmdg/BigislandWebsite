'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import AppointmentModal from '../layout/AppointmentModal';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation('common');

  return (
    <section
      id="about"
      className="bg-white py-20 sm:py-10"
    >
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            {t('about.title')}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600"
          >
            {t('about.description')}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('about.button')}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Modal avec animation */}
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

