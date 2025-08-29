'use client';

import { motion, useInView } from 'framer-motion';
import { JSX, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Car, Headset, Laptop, PackagePlus } from 'lucide-react';

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation('common');

  const services: { title: string; description: string; icon: JSX.Element; link: string }[] = [
    {
      title: t('services.rental.title'),
      description: t('services.rental.description'),
      icon: <Car className="h-8 w-12 text-blue-600" />,
      link: '/services/location',
    },
    {
      title: t('services.callcenter.title'),
      description: t('services.callcenter.description'),
      icon: <Headset className="h-8 w-12 text-blue-600" />,
      link: '/services/call-center',
    },
    {
      title: t('services.it.title'),
      description: t('services.it.description'),
      icon: <Laptop className="h-8 w-12 text-blue-600" />,
      link: '/services/it',
    },
    {
      title: t('services.supply.title'),
      description: t('services.supply.description'),
      icon: <PackagePlus className="h-8 w-12 text-blue-600" />,
      link: '/services/fournisseur',
    },
  ];

  return (
    <section id="services" className="bg-white py-16 sm:py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">

        {/* Colonne gauche : grille des services */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="rounded-3xl bg-blue-50 p-6 shadow-sm border border-gray-100 flex flex-col h-full"
            >
              <div className="mb-4 flex items-center gap-x-3">
                {service.icon}
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
              </div>
              <p className="text-gray-700 text-base leading-6 flex-1">{service.description}</p>
              <Link
                href={service.link}
                className="mt-4 inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
              >
                {t('services.button')} <PackagePlus className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Colonne droite : titre + description globale */}
        <div className="max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            {t('services.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            {t('services.description')}
          </motion.p>
        </div>

      </div>
    </section>
  );
}

