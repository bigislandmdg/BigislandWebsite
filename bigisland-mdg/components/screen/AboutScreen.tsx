'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { type LucideIcon, Users, Rocket, Handshake, Lightbulb, BarChart3, Settings } from 'lucide-react';
import { useRef, useState } from 'react';
import Image from 'next/image';

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
    <TiltCard className="flex flex-col items-center text-center h-full">
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
          className="flex justify-center items-center w-20 h-20 mb-4 rounded-full bg-gray-100 shadow-inner"
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
      {/* ===== Hero Section améliorée ===== */}
      <div className="relative bg-gradient-to-l from-gray-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Texte à gauche */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900"
            >
              {t('aboutPage.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-gray-700"
            >
              {t('aboutPage.subtitle')}
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
            <div className="relative w-130 h-50 md:h-[350px] lg:h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 to-transparent rounded-3xl transform rotate-2 shadow-xl"></div>
              <Image
                src="/images/about-hero.jpg"
                alt="About illustration"
                fill
                priority
                className="relative object-cover rounded-3xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== Section 1 : Who we are / Mission / Offer ===== */}
      <div className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('aboutPage.cardsSection.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('aboutPage.cardsSection.subtitle')}
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>

      {/* ===== Section 2 : Process (With Cards) ===== */}
      <section id="process" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
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
            className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-gray-600"
          >
            {t('aboutPage.process.description')}
          </motion.p>

          {/* Grille de cartes */}
          <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <TiltCard className="flex flex-col items-center text-center h-full">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex justify-center items-center w-20 h-20 mb-4 rounded-full bg-blue-100 shadow-inner"
                  >
                    <step.Icon className="w-10 h-10 text-blue-600" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}


