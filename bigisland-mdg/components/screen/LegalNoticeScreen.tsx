'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

type LegalSection = {
  title: string;
  content: string;
  image?: string;
};

export default function LegalNoticeScreen() {
  const { t, i18n } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);

  const [sections, setSections] = useState<LegalSection[]>([]);

  useEffect(() => {
    setSections([
      {
        title: t('legalNotice.sections.editor.title'),
        content: t('legalNotice.sections.editor.content'),
        image: '/images/legal/publisher-legal.jpg',
      },
      {
        title: t('legalNotice.sections.hosting.title'),
        content: t('legalNotice.sections.hosting.content'),
        image: '/images/legal/hosting-legal.jpg',
      },
      {
        title: t('legalNotice.sections.contact.title'),
        content: t('legalNotice.sections.contact.content'),
        image: '/images/legal/information-legal.jpg',
      },
      {
        title: t('legalNotice.sections.publication.title'),
        content: t('legalNotice.sections.publication.content'),
        image: '/images/legal/legal-notis.jpg',
      },
      {
        title: t('legalNotice.sections.dataProtection.title'),
        content: t('legalNotice.sections.dataProtection.content'),
        image: '/images/legal/data-protection.jpg',
      },
      {
        title: t('legalNotice.sections.intellectualProperty.title'),
        content: t('legalNotice.sections.intellectualProperty.content'),
        image: '/images/legal/intellectual-legal.jpg',
      },
      {
        title: t('legalNotice.sections.liability.title'),
        content: t('legalNotice.sections.liability.content'),
        image: '/images/legal/liability-legal.jpg',
      },
    ]);
  }, [i18n.language, t]);

  const scrollToContent = () => ref.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="bg-white min-h-screen">
      {/* ===== Hero Section ===== */}
      <section className="relative bg-gray-50">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/images/heros/legal-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6  py-34 flex flex-col justify-center items-start text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg py-8"
          >
            {t('legalNotice.pageTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 max-w-3xl text-lg md:text-xl text-gray-200 leading-relaxed"
          >
            {t('legalNotice.intro')}
          </motion.p>
          <motion.button
            onClick={scrollToContent}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 inline-flex items-center gap-2  bg-teal-700 px-6 py-3 text-white font-bold shadow-lg hover:bg-teal-700 transition"
          >
            {t('legalNotice.cta') || 'Voir les sections'}
            <motion.span
              className="inline-block"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.span>
          </motion.button>
        </div>
      </section>

      {/* ===== Sections as Cards ===== */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20" ref={ref}>
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                className="relative w-full h-110 overflow-hidden  shadow-lg cursor-pointer group"
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                {section.image && (
                  <img
                    src={section.image}
                    alt={section.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-sky-700 backdrop-blur-md p-6 border-t-4 text-white flex flex-col gap-3"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0% 100%)' }}
                  initial={{ y: 0 }}
                  whileHover={{ y: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <h5 className="text-lg font-bold text-teal-500">{section.title}</h5>
                  <p className="text-sm line-clamp-4">{section.content}</p>
                  <motion.a
                    href="#"
                    className="inline-flex items-center justify-center w-10 h-10 text-white border border-white hover:bg-white hover:text-sky-700 transition-colors"
                    whileHover={{ y: -10 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ===== CTA Final ===== */}
        <motion.section
          className="max-w-7xl mx-auto bg-white border border-zinc-200 shadow-lg p-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center md:text-left flex-1">
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">
              {t('legalNotice.needHelp') || 'Besoin d’aide concernant les mentions légales ?'}
            </h3>
            <p className="text-zinc-700">
              {t('legalNotice.contactUs') || 'Contactez-nous à legal@exemple.com'}
            </p>
          </div>
          
           <div className="flex-shrink-0">
           <motion.a
               href="mailto:legal@example.com"
               className="inline-flex items-center gap-2 px-6 py-3 bg-teal-700 text-white font-bold shadow hover:bg-teal-800 transition"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
            >
            {t('legalNotice.contactButton', 'Nous écrire')}
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }} // léger mouvement gauche-droite
              transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
            >
      <ArrowRight className="w-5 h-5" />
    </motion.span>
  </motion.a>
</div>
        </motion.section>
      </section>
    </main>
  );
}
