'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import AppointmentModal from '../layout/AppointmentModal';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation('common');

  return (
    <section id="about" className="px-2 py-20 lg:px-10 bg-gray-50">
      <div className="container mx-auto flex flex-col items-center justify-center text-center max-w-3xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-5 text-gray-800">
            {t('about.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {t('about.description')}
          </p>
          <button 
             onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            {t('about.button')}
          </button>
        </motion.div>
      </div>
      
       <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}

