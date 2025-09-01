'use client';

import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp, FiFileText } from 'react-icons/fi';

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
    // 👉 Add more sections if needed
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>{t('cguPage.pageTitle')}</title>
        <meta
          name="description"
          content={t('cguPage.metaDescription')}
        />
      </Head>

      {/* ---- Banner Header ---- */}
       <section className="relative h-64 md:h-80 w-full bg-blue-600">
        <Image
            src="/images/banners/contact-hero.jpg"
            alt="Contact Hero"
            fill
            className="object-cover"
            priority
            />
         <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <FiFileText className="text-white text-5xl mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {t('cguPage.title')}
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              {t('cguPage.intro')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---- Sections ---- */}
      <section id="cgu" className="pt-16 pb-16 px-4 max-w-5xl mx-auto">
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

        {/* ---- Contact Help ---- */}
        <motion.div
          className="mt-12 bg-blue-50 rounded-lg p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-xl font-medium text-blue-700 mb-2">
            {t('cguPage.needHelp') || "Need help?"}
          </h3>
          <p className="text-blue-600">
            {t('cguPage.contactUs') || 'Contact us at contact@example.com'}
          </p>
        </motion.div>
      </section>
    </>
  );
}
