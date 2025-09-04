'use client';

import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaFileAlt } from 'react-icons/fa';

export default function CguScreen() {
  const { t } = useTranslation('common');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sections = [
    {
      title: t('cguPage.sections.section1.title'),
      content: t('cguPage.sections.section1.content'),
    },
    {
      title: t('cguPage.sections.section2.title'),
      content: t('cguPage.sections.section2.content'),
    },
    {
      title: t('cguPage.sections.section3.title'),
      content: t('cguPage.sections.section3.content'),
    },
    // 👉 Ajouter plus de sections si nécessaire
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <section id="cgu">
      {/* ===== Hero Section ===== */}
      <div className="relative bg-gradient-to-l from-blue-50 to-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texte à gauche */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900"
            >
              {t('cguPage.pageTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed"
            >
              {t('cguPage.metaDescription')}
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
              <FaFileAlt className="w-full h-full text-blue-600 drop-shadow-lg" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== CGU Sections ===== */}
      <div className="max-w-4xl mx-auto px-6 py-13 space-y-6">
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
                <FiChevronUp className="text-blue-500 text-2xl" />
              ) : (
                <FiChevronDown className="text-blue-500 text-2xl" />
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

      {/* ===== Contact aide ===== */}
      <motion.div
        className="mt-2 max-w-2xl mx-auto bg-blue-50 rounded-2xl p-2 text-center border border-blue-100 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-lg md:text-xl font-semibold text-blue-700 mb-1">
          {t('cguPage.needHelp') || 'Besoin d’aide ?'}
        </h3>
        <p className="text-blue-600">
          {t('cguPage.contactUs') || 'Contactez-nous à contact@example.com'}
        </p>
      </motion.div>
    </section>
  );
}

