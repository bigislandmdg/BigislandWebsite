'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import AppointmentModal from '../layout/AppointmentModal';
import { Rocket, Laptop, PackagePlus } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation('common');

  const expertises = [
    {
      title: t('about.expertises.2.title'),
      description: t('about.expertises.2.description'),
      image: '/images/it/it-solutions.jpg',
      Icon: Laptop,
    },
    {
      title: t('about.expertises.3.title'),
      description: t('about.expertises.3.description'),
      image: '/images/fournisseur/supply-packs.jpg',
      Icon: PackagePlus,
    },
  ];

  return (
    <section id="about" className="bg-zinc-50 py-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl font-bold tracking-tight text-teal-700 sm:text-4xl"
        >
          {t('about.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          className="mt-6 text-lg leading-8 text-zinc-600 max-w-2xl mx-auto"
        >
          {t('about.description')}
        </motion.p>
      </div>

      <div ref={ref}  className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-12 justify-center">
        {expertises.map((exp, idx) => (
          <motion.div
            key={idx}
            className="relative w-100 h-120  overflow-hidden shadow-lg cursor-pointer group"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={() => setIsModalOpen(true)}
          >
            {/* Image background */}
            <Image
              src={exp.image}
              alt={exp.title}
              fill
              className="object-cover w-full h-full"
            />

            {/* Overlay bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-sky-800 backdrop-blur-md p-6 flex flex-col gap-3 border-t-4 border-teal-400 text-white"
              initial={{ y: 0 }}
              whileHover={{ y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)',
              }}
            >
              <h3 className="text-lg font-bold text-teal-400">{exp.title}</h3>
              <p className="text-sm line-clamp-3">{exp.description}</p>

              <motion.div
                className="inline-flex items-center justify-center w-10 h-10  text-white border border-white hover:bg-white hover:text-sky-700 transition-colors cursor-pointer mt-2"
                whileHover={{ y: -10, scale: 1.1 }}
              >
                <exp.Icon className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
