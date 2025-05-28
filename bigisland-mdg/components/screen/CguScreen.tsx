'use client';

import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function CguScreen() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('cguPage.pageTitle')}</title>
        <meta
          name="description"
          content={t('cguPage.metaDescription')}
        />
      </Head>

      <section id="cgu" className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-blue-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('cguPage.title')}
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('cguPage.intro')}
        </motion.p>

        <div className="space-y-6 text-gray-800">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">{t('cguPage.sections.section1.title')}</h2>
            <p>{t('cguPage.sections.section1.content')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">{t('cguPage.sections.section2.title')}</h2>
            <p>{t('cguPage.sections.section2.content')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">{t('cguPage.sections.section3.title')}</h2>
            <p>{t('cguPage.sections.section3.content')}</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
