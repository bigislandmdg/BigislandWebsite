'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LocationScreen() {
  const { t, i18n } = useTranslation('common');

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 }
    }),
  };

  // Mise à jour dynamique des textes traduits à chaque changement de langue
  type Car = { src: string; title: string; desc: string };
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    setCars([
      {
        src: '/images/cars/suv.jpg',
        title: t('locationPage.cars.suv.title'),
        desc: t('locationPage.cars.suv.description')
      },
      {
        src: '/images/cars/berline.jpg',
        title: t('locationPage.cars.sedan.title'),
        desc: t('locationPage.cars.sedan.description')
      },
      {
        src: '/images/cars/van.jpg',
        title: t('locationPage.cars.van.title'),
        desc: t('locationPage.cars.van.description')
      }
    ]);
  }, [i18n.language, t]);

  return (
    <>
      <Head>
        <title>{t('locationPage.pageTitle')}</title>
        <meta
          name="description"
          content={t('locationPage.metaDescription')}
        />
      </Head>

      <section id="location" className="pt-32 pb-16 px-6 max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-4xl font-bold text-blue-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('locationPage.title')}
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg mb-8 max-w-3xl text-center mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('locationPage.description')}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, i) => (
            <motion.div
              key={i}
              className="border rounded-lg shadow hover:shadow-md transition p-4"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Image
                src={car.src}
                alt={car.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover covered rounded"
                loading="lazy"
                quality={90}
              />
              <h2 className="text-xl font-semibold text-blue-600 mt-4">{car.title}</h2>
              <p className="text-gray-600 mt-2">{car.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a
            href="/devis"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            {t('locationPage.cta')}
          </a>
        </motion.div>
      </section>
    </>
  );
}
