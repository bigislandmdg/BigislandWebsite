'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FournisseurScreen() {
  const { t, i18n } = useTranslation('common');

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  type Service = { src: string; title: string; desc: string };
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setServices([
      {
        src: '/images/fournisseur/selection.jpg',
        title: t('fournisseurPage.services.selection.title'),
        desc: t('fournisseurPage.services.selection.description'),
      },
      {
        src: '/images/fournisseur/evaluation.jpg',
        title: t('fournisseurPage.services.evaluation.title'),
        desc: t('fournisseurPage.services.evaluation.description'),
      },
      {
        src: '/images/fournisseur/negotiation.jpg',
        title: t('fournisseurPage.services.negotiation.title'),
        desc: t('fournisseurPage.services.negotiation.description'),
      },
      {
        src: '/images/fournisseur/contract.jpg',
        title: t('fournisseurPage.services.contract.title'),
        desc: t('fournisseurPage.services.contract.description'),
      },
      {
        src: '/images/fournisseur/performance.jpg',
        title: t('fournisseurPage.services.performance.title'),
        desc: t('fournisseurPage.services.performance.description'),
      },
      {
        src: '/images/fournisseur/relationship.jpg',
        title: t('fournisseurPage.services.relationship.title'),
        desc: t('fournisseurPage.services.relationship.description'),
      },
    ]);
  }, [i18n.language, t]);

  return (
    <>
      <Head>
        <title>{t('fournisseurPage.pageTitle')}</title>
        <meta name="description" content={t('fournisseurPage.metaDescription')} />
      </Head>

      <section id="fournisseur-solutions" className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-blue-600 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('fournisseurPage.title')}
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg mb-8 max-w-3xl text-center mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('fournisseurPage.description')}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="border rounded-lg shadow hover:shadow-md transition p-4"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Image
                src={service.src}
                alt={service.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded"
                loading="lazy"
                quality={90}
              />
              <h2 className="text-xl font-semibold text-blue-600 mt-4">{service.title}</h2>
              <p className="text-gray-600 mt-2">{service.desc}</p>
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
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            {t('fournisseurPage.cta')}
          </a>
        </motion.div>
      </section>
    </>
  );
}
