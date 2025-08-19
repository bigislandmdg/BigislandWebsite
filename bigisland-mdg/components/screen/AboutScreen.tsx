'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  FaHandshake,
  FaRegChartBar,
  FaRegLightbulb,
  FaRocket,
  FaUsers,
  FaUsersCog,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

// ✅ Effet tilt sur la souris
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const rotateX = ((y / offsetHeight) - 0.5) * 12; // 12° max
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

// ✅ Carte animée générique (pour Card et ProcessStep)
const AnimatedCard = ({ title, description, Icon }: { title: string; description: string; Icon: IconType }) => {
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
        {/* Icône centrée avec cercle bleu et animation */}
        <motion.div
          whileHover={{ scale: 1.3, rotate: 10 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center items-center w-20 h-20 mb-4 rounded-full bg-blue-100 shadow-inner"
        >
          <Icon className="text-4xl text-blue-600" />
        </motion.div>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    </TiltCard>
  );
};

// ✅ Page principale AboutScreen
export default function AboutScreen() {
  const { t } = useTranslation('common');

  const rawSteps = t('aboutPage.process.steps', { returnObjects: true });
  const processIcons = [FaRegLightbulb, FaRegChartBar, FaUsersCog];

  const processSteps = Array.isArray(rawSteps)
    ? rawSteps.map((step, index) => ({
        ...step,
        Icon: processIcons[index],
      }))
    : [];

  return (
    <section className="px-4 py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
        >
          {t('aboutPage.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-600 mb-12"
        >
          {t('aboutPage.subtitle')}
        </motion.p>

        {/* 🔹 Cards principales */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          <AnimatedCard
            title={t('aboutPage.whoWeAre.title')}
            description={t('aboutPage.whoWeAre.description')}
            Icon={FaUsers}
          />
          <AnimatedCard
            title={t('aboutPage.mission.title')}
            description={t('aboutPage.mission.description')}
            Icon={FaRocket}
          />
          <AnimatedCard
            title={t('aboutPage.offer.title')}
            description={t('aboutPage.offer.description')}
            Icon={FaHandshake}
          />
        </div>

        {/* 🔹 Processus */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl font-bold text-gray-800 mb-10"
        >
          {t('aboutPage.process.title')}
        </motion.h3>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <AnimatedCard
              key={index}
              title={step.title}
              description={step.description}
              Icon={step.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
