'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import {
  FaHandshake,
  FaRocket,
  FaUsers,
  FaRegChartBar,
  FaRegLightbulb,
  FaUsersCog,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';

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

// ✅ Carte animée
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
    <section>
      {/* 🔹 Hero Section avec bannière */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/banners/about-banner.jpg"
            alt="About Banner"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/60" /> {/* Overlay sombre */}
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

      {/* 🔹 Cards principales */}
      <div className="px-6 py-20 max-w-7xl mx-auto">
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

         {/* 🔹 Processus (Bento Grid style) */}
<motion.h3
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="text-2xl font-bold text-gray-800 mb-10 text-center"
>
  {t('aboutPage.process.title')}
</motion.h3>

<div className="grid gap-6 lg:grid-cols-6">
  {processSteps.map((step, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative bg-white shadow-md rounded-2xl p-8 flex flex-col justify-between hover:shadow-xl transition 
        ${index === 0 ? 'lg:col-span-3' : ''} 
        ${index === 1 ? 'lg:col-span-3 lg:row-span-2' : ''} 
        ${index === 2 ? 'lg:col-span-3' : ''}`}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-blue-100 mb-6">
        <step.Icon className="text-3xl text-blue-600" />
      </div>
      <h4 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h4>
      <p className="text-gray-600 leading-relaxed">{step.description}</p>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
}

