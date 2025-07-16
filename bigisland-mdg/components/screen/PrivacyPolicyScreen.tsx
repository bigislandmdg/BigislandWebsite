'use client';

import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function PrivacyPolicyScreen() {
  const { t } = useTranslation('common');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sections = [
    {
      title: t('privacyPolicy.sections.introduction.title'),
      content: t('privacyPolicy.sections.introduction.content')
    },
    {
      title: t('privacyPolicy.sections.dataCollected.title'),
      content: t('privacyPolicy.sections.dataCollected.content')
    },
    {
      title: t('privacyPolicy.sections.dataUsage.title'),
      content: t('privacyPolicy.sections.dataUsage.content')
    },
    {
      title: t('privacyPolicy.sections.dataSharing.title'),
      content: t('privacyPolicy.sections.dataSharing.content')
    },
    {
      title: t('privacyPolicy.sections.userRights.title'),
      content: t('privacyPolicy.sections.userRights.content')
    },
    {
      title: t('privacyPolicy.sections.dataSecurity.title'),
      content: t('privacyPolicy.sections.dataSecurity.content')
    },
    {
      title: t('privacyPolicy.sections.cookies.title'),
      content: t('privacyPolicy.sections.cookies.content')
    },
    {
      title: t('privacyPolicy.sections.policyChanges.title'),
      content: t('privacyPolicy.sections.policyChanges.content')
    }
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>{t('privacyPolicy.pageTitle')}</title>
        <meta
          name="description"
          content={t('privacyPolicy.metaDescription')}
        />
      </Head>

      <section id="privacy-policy" className="pt-28 pb-16 px-4 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            {t('privacyPolicy.title')}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('privacyPolicy.intro')}
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
            {t('privacyPolicy.needHelp') || 'Questions about our privacy policy?'}
          </h3>
          <p className="text-blue-600">
            {t('privacyPolicy.contactUs') || 'Contact our Data Protection Officer at dpo@example.com'}
          </p>
        </motion.div>
      </section>
    </>
  );
}