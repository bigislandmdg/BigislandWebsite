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

      {/* ===== Header with Banner ===== */}
      <div className="relative h-90 bg-blue-500">
        <img
          src="/images/privacy-banner.jpg"
          alt="Privacy Policy Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <ShieldCheck className="w-12 h-12 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold">
            {t('privacyPolicy.title')}
          </h1>
          <p className="mt-2 text-lg max-w-2xl">
            {t('privacyPolicy.intro')}
          </p>
        </div>
      </div>

      {/* ===== Content Sections ===== */}
      <section
        id="privacy-policy"
        className="pt-16 pb-20 px-4 max-w-5xl mx-auto"
      >
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleSection(index)}
              >
                <h2 className="text-xl md:text-2xl font-semibold text-blue-700">
                  {section.title}
                </h2>
                {expandedSection === index ? (
                  <ChevronUp className="text-blue-500 w-6 h-6" />
                ) : (
                  <ChevronDown className="text-blue-500 w-6 h-6" />
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
                      <p className="leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* ===== Help Section ===== */}
        <motion.div
          className="mt-12 bg-blue-50 rounded-2xl p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            {t('privacyPolicy.needHelp') ||
              'Questions about our privacy policy?'}
          </h3>
          <p className="text-blue-600">
            {t('privacyPolicy.contactUs') ||
              'Contact our Data Protection Officer at dpo@example.com'}
          </p>
        </motion.div>
      </section>
    </>
  );
}

