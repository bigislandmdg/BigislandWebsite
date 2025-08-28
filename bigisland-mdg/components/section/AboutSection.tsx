'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { JSX, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import AppointmentModal from '../layout/AppointmentModal';
import { Cpu, Server, Code, Laptop, Car, Headset } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation('common');

  const expertises = t('about.expertises', { returnObjects: true }) as { title: string; description: string; icon?: JSX.Element }[];
  expertises[0].icon = <Car className="h-12 w-12 text-blue-600" />;
  expertises[1].icon = <Headset className="h-12 w-12 text-blue-600" />;
  expertises[2].icon = <Laptop className="h-12 w-12 text-blue-600" />;

  return (
    <section id="about" className="bg-gray-50 py-20 sm:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* ---- Title and Description ---- */}
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
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600"
        >
          {t('about.description')}
        </motion.p>

        {/* ---- CTA Button ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 flex justify-center"
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

        {/* ---- Cards for Expertises ---- */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {expertises.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
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

