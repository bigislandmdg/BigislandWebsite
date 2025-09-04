'use client';

import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Scale } from 'lucide-react';

export default function LegalNoticeScreen() {
  const { t } = useTranslation('common');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sections = [
    {
      title: t('legalNotice.sections.editor.title'),
      content: t('legalNotice.sections.editor.content'),
    },
    {
      title: t('legalNotice.sections.hosting.title'),
      content: t('legalNotice.sections.hosting.content'),
    },
    {
      title: t('legalNotice.sections.contact.title'),
      content: t('legalNotice.sections.contact.content'),
    },
    {
      title: t('legalNotice.sections.publication.title'),
      content: t('legalNotice.sections.publication.content'),
    },
    {
      title: t('legalNotice.sections.dataProtection.title'),
      content: t('legalNotice.sections.dataProtection.content'),
    },
    {
      title: t('legalNotice.sections.intellectualProperty.title'),
      content: t('legalNotice.sections.intellectualProperty.content'),
    },
    {
      title: t('legalNotice.sections.liability.title'),
      content: t('legalNotice.sections.liability.content'),
    },
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>{t('legalNotice.pageTitle')}</title>
        <meta name="description" content={t('legalNotice.metaDescription')} />
      </Head>

      {/* 🔹 Hero Section */}
      <section className="relative bg-gradient-to-l from-blue-50 to-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Texte */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900"
            >
              {t('legalNotice.pageTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-gray-700"
            >
              {t('legalNotice.intro')}
            </motion.p>
          </div>

          {/* Icône animée */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: [1, 1.05, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex justify-center items-center"
          >
            <div className="w-50 h-50 md:w-56 md:h-56 flex items-center justify-center">
              <Scale className="w-40 h-40 md:w-56 md:h-56 text-blue-600" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔹 Sections Accordéon */}
      <section className="pt-16 pb-20 px-4 max-w-5xl mx-auto">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleSection(index)}
              >
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                {expandedSection === index ? (
                  <ChevronUp className="text-blue-600 w-6 h-6" />
                ) : (
                  <ChevronDown className="text-blue-600 w-6 h-6" />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-700"
                  >
                    <div className="border-t border-gray-200 pt-4">
                      <p className="leading-relaxed whitespace-pre-line text-base md:text-lg">
                        {section.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* 🔹 CTA final harmonisé */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-center text-white shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            {t('legalNotice.needHelp') ||
              'Besoin d’aide concernant les mentions légales ?'}
          </h3>
          <p className="mb-4 text-base md:text-lg">
            {t('legalNotice.contactUs') || 'Contactez-nous à legal@exemple.com'}
          </p>
          <a
            href="mailto:legal@exemple.com"
            className="inline-block px-6 py-3 bg-white text-blue-700 font-medium rounded-xl shadow hover:bg-gray-100 transition"
          >
            {t('legalNotice.contactButton', 'Nous écrire')}
          </a>
        </motion.div>
      </section>
    </>
  );
}

