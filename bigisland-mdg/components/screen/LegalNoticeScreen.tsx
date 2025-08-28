'use client';

import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Scale } from 'lucide-react'; // ✅ ajout icône

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

      {/* 🔹 Header banner avec image + icône */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <img
          src="/images/legal-banner.jpg"
          alt="Legal Notice Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
          {/* ✅ Icône au-dessus du titre */}
          <Scale className="w-12 h-12 text-white mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t('legalNotice.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl">
            {t('legalNotice.intro')}
          </p>
        </div>
      </div>

      {/* 🔹 Sections */}
      <section className="pt-16 pb-20 px-4 max-w-5xl mx-auto">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleSection(index)}
              >
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                {expandedSection === index ? (
                  <ChevronUp className="text-blue-600 w-5 h-5" />
                ) : (
                  <ChevronDown className="text-blue-600 w-5 h-5" />
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

        {/* 🔹 CTA final Tailwind UI style */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-2xl font-bold mb-3">
            {t('legalNotice.needHelp') ||
              'Besoin d’aide concernant les mentions légales ?'}
          </h3>
          <p className="mb-4">
            {t('legalNotice.contactUs') || 'Contactez-nous à legal@exemple.com'}
          </p>
          <a
            href="mailto:legal@exemple.com"
            className="inline-block px-6 py-3 bg-white text-blue-700 font-medium rounded-lg shadow hover:bg-gray-100 transition"
          >
            {t('legalNotice.contactButton', 'Nous écrire')}
          </a>
        </motion.div>
      </section>
    </>
  );
}
