'use client';

import { useTranslation } from 'next-i18next';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const clientData = [
  { src: '/logos/client1.png', key: 'client1' },
  { src: '/logos/client2.png', key: 'client2' },
  { src: '/logos/client3.png', key: 'client3' },
  { src: '/logos/client4.png', key: 'client4' },
  { src: '/logos/client5.png', key: 'client5' },
  { src: '/logos/client6.png', key: 'client6' },
];

export default function ClientSection() {
  const { t } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="clients"
      className="py-20 bg-gradient-to-b from-sky-50 to-sky-100 relative overflow-hidden"
      ref={ref}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* ===== Titre & Description ===== */}
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-teal-700 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t('clients.title')}
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl mx-auto text-lg text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('clients.description')}
        </motion.p>

        {/* ===== Carousel logos ===== */}
        <div className="relative mt-16">
          {/* Dégradés gauche/droite */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-sky-100 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-sky-100 to-transparent z-20" />

          <motion.div
            className="flex space-x-12"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, repeatType: 'loop', duration: 25, ease: 'linear' }}
          >
            {[...clientData, ...clientData].map((client, i) => (
              <motion.div
                key={`${client.key}-${i}`}
                className="flex justify-center items-center flex-shrink-0 w-40 p-4 bg-white  shadow hover:shadow-lg cursor-pointer transition-all duration-300"
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <Image
                  src={client.src}
                  alt={t(`clients.list.${client.key}.name`)}
                  width={140}
                  height={70}
                  className="w-auto h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
