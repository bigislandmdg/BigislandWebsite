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

      {/* ===== Header Banner ===== */}
      <section className="relative h-64 md:h-96 w-full bg-blue-600">
        <img
          src="/images/banners/contact-hero.jpg"
          alt="Privacy Policy Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <ShieldCheck className="w-16 h-16 text-white mb-4 drop-shadow-lg" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t('privacyPolicy.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl">
            {t('privacyPolicy.intro')}
          </p>
        </div>
      </section>

      {/* ===== Sections ===== */}
      <section className="pt-16 pb-20 px-4 max-w-5xl mx-auto">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
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
          <p className="mb-4 text-lg">
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
