'use client';

import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Cookie, ChevronDown, ChevronUp } from 'lucide-react';

export default function CookieScreen() {
  const { t } = useTranslation('common');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sections = [
    {
      title: t('cookiePage.sections.whatAreCookies.title'),
      content: t('cookiePage.sections.whatAreCookies.content'),
    },
    {
      title: t('cookiePage.sections.typesOfCookies.title'),
      content: t('cookiePage.sections.typesOfCookies.content'),
    },
    {
      title: t('cookiePage.sections.howWeUseCookies.title'),
      content: t('cookiePage.sections.howWeUseCookies.content'),
    },
    {
      title: t('cookiePage.sections.managingCookies.title'),
      content: t('cookiePage.sections.managingCookies.content'),
    },
    {
      title: t('cookiePage.sections.changesToPolicy.title'),
      content: t('cookiePage.sections.changesToPolicy.content'),
    },
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <section id="cookie">
      {/* ===== Hero Section ===== */}
      <div className="relative bg-gradient-to-l from-blue-50 to-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texte à gauche */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900"
            >
              {t('cookiePage.pageTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed"
            >
              {t('cookiePage.metaDescription')}
            </motion.p>
          </div>

          {/* Icône animée à droite */}
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
            <div className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
              <Cookie className="w-full h-full text-blue-600 drop-shadow-lg" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== Sections Accordéon ===== */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <button
              className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggleSection(index)}
            >
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {section.title}
              </h2>
              {expandedSection === index ? (
                <ChevronUp className="text-blue-500 w-6 h-6 transition-transform duration-300" />
              ) : (
                <ChevronDown className="text-blue-500 w-6 h-6 transition-transform duration-300" />
              )}
            </button>

            <AnimatePresence>
              {expandedSection === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 text-gray-600"
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

      {/* ===== CTA final ===== */}
      <motion.div
        className="mt-12 max-w-2xl mx-auto bg-blue-50 rounded-2xl p-8 text-center border border-blue-100 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-lg md:text-xl font-semibold text-blue-700 mb-3">
          {t('cookiePage.needHelp') || 'Need help with cookies?'}
        </h3>
        <p className="text-blue-600 mb-4">
          {t('cookiePage.contactUs') || 'Contact us at privacy@example.com'}
        </p>
        <a
          href="mailto:privacy@example.com"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
        >
          {t('cookiePage.contactButton', 'Write to us')}
        </a>
      </motion.div>
    </section>
  );
}

