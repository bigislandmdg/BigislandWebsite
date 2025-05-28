'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ItScreen() {
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
        src: '/images/it/software-dev.jpg',
        title: t('itPage.services.software.title'),
        desc: t('itPage.services.software.description'),
      },
      {
        src: '/images/it/web-dev.jpg',
        title: t('itPage.services.web.title'),
        desc: t('itPage.services.web.description'),
      },
      {
        src: '/images/it/mobile-app.jpg',
        title: t('itPage.services.mobile.title'),
        desc: t('itPage.services.mobile.description'),
      },
      {
        src: '/images/it/support.jpg',
        title: t('itPage.services.support.title'),
        desc: t('itPage.services.support.description'),
      },
      {
        src: '/images/it/uiux.jpg',
        title: t('itPage.services.uiux.title'),
        desc: t('itPage.services.uiux.description'),
      },
      {
        src: '/images/it/devops-security.jpg',
        title: t('itPage.services.devops.title'),
        desc: t('itPage.services.devops.description'),
      },
    ]);
  }, [i18n.language, t]);

  return (
    <>
      <Head>
        <title>{t('itPage.pageTitle')}</title>
        <meta name="description" content={t('itPage.metaDescription')} />
      </Head>

      <section id="it-solutions" className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-blue-600 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('itPage.title')}
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg mb-8 max-w-3xl text-center mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('itPage.description')}
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
            {t('itPage.cta')}
          </a>
        </motion.div>
      </section>
    </>
  );
}
