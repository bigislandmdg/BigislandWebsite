'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { ArrowDown } from 'lucide-react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function CguScreen() {
  const { t } = useTranslation('common');
  const contentRef = useRef<HTMLDivElement>(null);

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
  ];

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-white min-h-screen">

      {/* ===== Hero Section ===== */}
      <section className="relative bg-gray-50">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/images/heros/cgu-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 py-32 min-h-[400px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-1 text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg py-4"
          >
            {t('cguPage.pageTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed"
          >
            {t('cguPage.metaDescription')}
          </motion.p>
          <motion.button
            onClick={scrollToContent}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 inline-flex items-center gap-2 rounded bg-blue-600 px-6 py-3 text-white font-medium shadow-lg hover:bg-blue-700 transition"
          >
            {t('cguPage.cta') || 'Voir les sections'}
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        </div>
      </section>

      {/* ===== Sections Tabs ===== */}
      <section className="max-w-5xl mx-auto px-6 py-20" ref={contentRef}>
        <Tab.Group>
          <Tab.List className="flex space-x-2 overflow-x-auto border-b border-gray-200 pb-2 mb-6">
            {sections.map((section, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  classNames(
                    'px-4 py-2 text-sm font-medium rounded-md focus:outline-none',
                    selected ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:bg-gray-100'
                  )
                }
              >
                {section.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {sections.map((section, idx) => (
              <Tab.Panel key={idx} className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        {/* ===== CTA Final amélioré (CGU) ===== */}
<motion.section
  className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
>
  <div className="text-center md:text-left flex-1">
    <h3 className="text-2xl font-bold text-gray-900 mb-2">
      {t('cguPage.needHelp') || 'Besoin d’aide concernant les CGU ?'}
    </h3>
    <p className="text-gray-700">
      {t('cguPage.contactUs') || 'Contactez-nous à contact@exemple.com'}
    </p>
  </div>
  <div className="flex-shrink-0">
    <a
      href="mailto:contact@exemple.com"
      className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
    >
      {t('cguPage.contactButton', 'Nous écrire')}
    </a>
  </div>
</motion.section>

      </section>
    </main>
  );
}

