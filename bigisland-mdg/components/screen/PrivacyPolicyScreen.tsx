'use client';

import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyScreen() {
  const { t } = useTranslation('common');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sections = [
    { title: t('privacyPolicy.sections.introduction.title'), content: t('privacyPolicy.sections.introduction.content') },
    { title: t('privacyPolicy.sections.dataCollected.title'), content: t('privacyPolicy.sections.dataCollected.content') },
    { title: t('privacyPolicy.sections.dataUsage.title'), content: t('privacyPolicy.sections.dataUsage.content') },
    { title: t('privacyPolicy.sections.dataSharing.title'), content: t('privacyPolicy.sections.dataSharing.content') },
    { title: t('privacyPolicy.sections.userRights.title'), content: t('privacyPolicy.sections.userRights.content') },
    { title: t('privacyPolicy.sections.dataSecurity.title'), content: t('privacyPolicy.sections.dataSecurity.content') },
    { title: t('privacyPolicy.sections.cookies.title'), content: t('privacyPolicy.sections.cookies.content') },
    { title: t('privacyPolicy.sections.policyChanges.title'), content: t('privacyPolicy.sections.policyChanges.content') }
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>{t('privacyPolicy.pageTitle')}</title>
        <meta name="description" content={t('privacyPolicy.metaDescription')} />
      </Head>

      {/* ===== Hero Section ===== */}
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
              {t('privacyPolicy.pageTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-gray-700"
            >
              {t('privacyPolicy.intro')}
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
              <ShieldCheck className="w-40 h-40 md:w-56 md:h-56 text-blue-600" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Sections Accordéon ===== */}
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

        {/* ===== CTA Help Section ===== */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-center text-white shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            {t('privacyPolicy.needHelp') || 'Des questions concernant notre politique de confidentialité ?'}
          </h3>
          <p className="mb-4 text-base md:text-lg">
            {t('privacyPolicy.contactUs') || 'Contactez notre DPO à dpo@example.com'}
          </p>
          <a
            href="mailto:dpo@example.com"
            className="inline-block px-6 py-3 bg-white text-blue-700 font-medium rounded-xl shadow hover:bg-gray-100 transition"
          >
            {t('privacyPolicy.contactButton', 'Nous écrire')}
          </a>
        </motion.div>
      </section>
    </>
  );
}
