'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { type LucideIcon, Users, Rocket, Handshake, Lightbulb, BarChart3, Settings } from 'lucide-react';
import { useRef, useState } from 'react';

// ✅ Effet tilt sur la souris
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const rotateX = ((y / offsetHeight) - 0.5) * 12;
    const rotateY = ((x / offsetWidth) - 0.5) * -12;

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
    });
  };

  const resetStyle = () => {
    setStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });
  };

  return (
    <motion.div
      className={`bg-white shadow-xl rounded-2xl p-6 transition-transform duration-300 ease-in-out ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetStyle}
      whileHover={{ boxShadow: '0px 8px 30px rgba(0,0,0,0.15)' }}
    >
      {children}
    </motion.div>
  );
}

// ✅ Carte animée principale
const AnimatedCard = ({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <TiltCard className="flex flex-col items-center text-center">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <motion.div
          whileHover={{ scale: 1.3, rotate: 10 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center items-center w-20 h-20 mb-4 rounded-full bg-blue-100 shadow-inner"
        >
          <Icon className="w-10 h-10 text-blue-600" />
        </motion.div>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    </TiltCard>
  );
};

// ✅ Page AboutScreen complète
export default function AboutScreen() {
  const { t } = useTranslation('common');

  const rawSteps = t('aboutPage.process.steps', { returnObjects: true });
  const processIcons = [Lightbulb, BarChart3, Settings];

  const processSteps = Array.isArray(rawSteps)
    ? rawSteps.map((step, index) => ({
        ...step,
        Icon: processIcons[index % processIcons.length],
      }))
    : [];

  return (
    <section>
      {/* ===== Hero Section ===== */}
      <div className="relative bg-gray-700">
        <div className="absolute inset-0">
          <Image
            src="/images/banners/about-banner.jpg"
            alt="About Banner"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            {t('aboutPage.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-3xl mx-auto text-lg text-gray-200"
          >
            {t('aboutPage.subtitle')}
          </motion.p>
        </div>
      </div>

      {/* ===== Cards principales ===== */}
      <div className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          <AnimatedCard
            title={t('aboutPage.whoWeAre.title')}
            description={t('aboutPage.whoWeAre.description')}
            Icon={Users}
          />
          <AnimatedCard
            title={t('aboutPage.mission.title')}
            description={t('aboutPage.mission.description')}
            Icon={Rocket}
          />
          <AnimatedCard
            title={t('aboutPage.offer.title')}
            description={t('aboutPage.offer.description')}
            Icon={Handshake}
          />
        </div>

       {/* ===== Process Section (2x2 offset grid) ===== */}
<section id="process" className="bg-white-50 py-16 sm:py-20">
  <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">

    {/* Colonne gauche : grille des étapes */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
    >
      {processSteps.map((step, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.03 }}
          className={`rounded-3xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col h-full
            ${idx % 2 !== 0 ? 'sm:mt-8' : ''}`}
        >
          <div className="mb-4 flex items-center gap-x-3">
            <step.Icon className="h-8 w-8 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
          </div>
          <p className="text-gray-700 text-base leading-6 flex-1">{step.description}</p>
        </motion.div>
      ))}
    </motion.div>

    {/* Colonne droite : titre + description globale */}
    <div className="max-w-xl">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        {t('aboutPage.process.title')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        className="mt-6 text-lg leading-8 text-gray-600"
      >
        {t('aboutPage.process.description')}
      </motion.p>
    </div>
  </div>
</section>
      </div>
    </section>
  );
}

