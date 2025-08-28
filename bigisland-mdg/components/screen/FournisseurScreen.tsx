'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function FournisseurScreen() {
  const { t, i18n } = useTranslation('common');
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [services, setServices] = useState<
    { src: string; title: string; desc: string }[]
  >([]);

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, type: 'spring', stiffness: 80 },
    }),
    hover: {
      scale: 1.05,
      boxShadow:
        '0 15px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)',
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

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
        <meta
          name="description"
          content={t('fournisseurPage.metaDescription')}
        />
      </Head>

      {/* Header Banner */}
      <section className="relative h-[60vh] flex items-center justify-center mb-16">
        <Image
          src="/images/banners/fournisseur-banner.jpg"
          alt="Fournisseur Solutions"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('fournisseurPage.title')}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            {t('fournisseurPage.description')}
          </p>
        </motion.div>
      </section>

      {/* Services Cards */}
      <section
        ref={ref}
        id="fournisseur-solutions"
        className="px-6 max-w-6xl mx-auto text-center pb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="border rounded-xl shadow bg-white p-5 flex flex-col items-center text-center"
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover="hover"
              variants={cardVariants}
            >
              <div className="w-full h-44 relative overflow-hidden rounded-lg mb-4">
                <Image
                  src={service.src}
                  alt={service.title}
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
              <h2 className="text-xl font-semibold text-blue-600">
                {service.title}
              </h2>
              <p className="text-gray-600 mt-2">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl shadow hover:bg-blue-700 transition"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {t('fournisseurPage.cta')}
          </motion.a>
        </motion.div>
      </section>
    </>
  );
}

