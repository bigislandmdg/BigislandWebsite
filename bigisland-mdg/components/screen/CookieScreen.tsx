'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';

export default function CookieScreen() {
  const { t } = useTranslation('common');

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

  // Fonction tilt card
  const calcTilt = (e: MouseEvent<HTMLDivElement>, intensity = 15) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * intensity;
    const rotateY = (x / rect.width) * intensity;
    return { rotateX, rotateY };
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

          {/* Image à droite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: [1, 1.03, 1],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md h-72 md:h-[350px] lg:h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 to-transparent rounded-3xl transform rotate-2 shadow-xl"></div>
              <Image
                src="/images/heros/cookie-hero.jpg"
                alt="It illustration"
                fill
                priority
                className="relative object-cover rounded-3xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== Sections en Tilt Cards ===== */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => {
          const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

          return (
            <motion.div
              key={index}
              className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 cursor-pointer"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseMove={(e) => setTilt(calcTilt(e))}
              onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* ===== CTA final ===== */}
        {/* ===== CTA final aligné avec les cartes ===== */}
  <motion.div
    className="relative bg-blue-50  shadow-lg border border-blue-100 p-3 flex flex-col justify-center items-center text-center"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
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
      {t('cookiePage.contactButton', )}
    </a>
  </motion.div>
    </section>
  );
}

