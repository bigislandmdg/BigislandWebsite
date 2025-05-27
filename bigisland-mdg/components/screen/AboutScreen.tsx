'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { FaBullseye, FaHandshake, FaRegChartBar, FaRegLightbulb, FaRocket, FaUsers, FaUsersCog } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { FaHand } from 'react-icons/fa6';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

// 🔹 Nouveau composant Card avec icône React
const Card = ({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: IconType;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white shadow-xl rounded-2xl p-6 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
    >
      <div className="flex justify-center mb-4">
        <Icon className="text-5xl text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// 🔹 Composant ProcessStep avec icône React
const ProcessStep = ({ step }: { step: { title: string; description: string; Icon: IconType } }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { Icon } = step;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      <Icon className="text-5xl text-blue-600 mb-4" />
      <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
      <p className="text-gray-600">{step.description}</p>
    </motion.div>
  );
};

// 🔹 Page principale
export default function AboutScreen() {
  const { t } = useTranslation('common');

  const rawSteps = t('aboutPage.process.steps', { returnObjects: true });

  const icons = [FaRegLightbulb, FaRegChartBar, FaUsersCog];

  const processSteps = Array.isArray(rawSteps)
    ? rawSteps.map((step, index) => ({
        ...step,
        Icon: icons[index],
      }))
    : [];

  return (
    <section className="px-4 py-20 bg-gray-100">
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

        {/* 🔹 Trois cards avec images */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          <Card
            title={t('aboutPage.whoWeAre.title')}
            description={t('aboutPage.whoWeAre.description')}
             Icon={FaUsers}
          />
          <Card
            title={t('aboutPage.mission.title')}
            description={t('aboutPage.mission.description')}
            Icon={FaRocket}
          />
          <Card
            title={t('aboutPage.offer.title')}
            description={t('aboutPage.offer.description')}
            Icon={FaHandshake}
          />
        </div>

        {/* 🔹 Processus dynamique avec icônes */}
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
            <ProcessStep key={index} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
