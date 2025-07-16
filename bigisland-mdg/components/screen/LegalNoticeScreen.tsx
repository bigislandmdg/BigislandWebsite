'use client';

import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function LegalNoticeScreen() {
  const { t } = useTranslation('common');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sections = [
    {
      title: t('legalNotice.sections.editor.title'),
      content: t('legalNotice.sections.editor.content')
    },
    {
      title: t('legalNotice.sections.hosting.title'),
      content: t('legalNotice.sections.hosting.content')
    },
    {
      title: t('legalNotice.sections.contact.title'),
      content: t('legalNotice.sections.contact.content')
    },
    {
      title: t('legalNotice.sections.publication.title'),
      content: t('legalNotice.sections.publication.content')
    },
    {
      title: t('legalNotice.sections.dataProtection.title'),
      content: t('legalNotice.sections.dataProtection.content')
    },
    {
      title: t('legalNotice.sections.intellectualProperty.title'),
      content: t('legalNotice.sections.intellectualProperty.content')
    },
    {
      title: t('legalNotice.sections.liability.title'),
      content: t('legalNotice.sections.liability.content')
    }
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>{t('legalNotice.pageTitle')}</title>
        <meta
          name="description"
          content={t('legalNotice.metaDescription')}
        />
      </Head>

      <section id="legal-notice" className="pt-28 pb-16 px-4 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            {t('legalNotice.title')}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('legalNotice.intro')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleSection(index)}
              >
                <h2 className="text-xl md:text-2xl font-semibold text-blue-600">
                  {section.title}
                </h2>
                {expandedSection === index ? (
                  <FiChevronUp className="text-blue-500 text-xl" />
                ) : (
                  <FiChevronDown className="text-blue-500 text-xl" />
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
                      <p className="leading-relaxed whitespace-pre-line">{section.content}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 bg-blue-50 rounded-lg p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-xl font-medium text-blue-700 mb-2">
            {t('legalNotice.needHelp') || 'Besoin d\'aide concernant les mentions légales ?'}
          </h3>
          <p className="text-blue-600">
            {t('legalNotice.contactUs') || 'Contactez-nous à legal@exemple.com'}
          </p>
        </motion.div>
      </section>
    </>
  );
}