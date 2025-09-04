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
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="clients" className="py-4 sm:py-3
    bg-gradient-to-l from-blue-50 to-blue-200  flex items-center" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Titre + description */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {t('clients.title')}
          </motion.h2>
          <motion.p
            className="mt-4 text-lg leading-7 text-gray-600"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('clients.description')}
          </motion.p>
        </div>

        {/* Carousel logos */}
        <div className="relative mt-12 overflow-hidden">
          {/* Dégradés gauche/droite */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          {/* Animation défilante */}
          <motion.div
            className="flex space-x-12"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            }}
          >
            {[...clientData, ...clientData].map((client, i) => (
              <div
                key={`${client.key}-${i}`}
                className="flex justify-center items-center flex-shrink-0 w-40"
              >
                <Image
                  src={client.src}
                  alt={t(`clients.list.${client.key}.name`)}
                  width={120}
                  height={60}
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

