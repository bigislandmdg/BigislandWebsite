'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import {
  type LucideIcon,
  Users,
  Rocket,
  Handshake,
  Lightbulb,
  BarChart3,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { Tab } from '@headlessui/react';
import { useRef } from 'react';
import Image from 'next/image';

// ✅ Nouvelle carte avec image de fond + overlay
function BackgroundCard({
  title,
  description,
  image,
  Icon,
}: {
  title: string;
  description: string;
  image: string;
  Icon: LucideIcon;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative rounded-2xl overflow-hidden shadow-lg group"
    >
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/20"></div>
      </div>

      {/* Contenu */}
      <div className="relative p-6 flex flex-col justify-end h-64 text-white">
        <div className="mb-4 flex justify-center items-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-md">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-200">{description}</p>
      </div>
    </motion.div>
  );
}

// ✅ Page AboutScreen
export default function AboutScreen() {
  const { t } = useTranslation('common');

  const processIcons = [Lightbulb, BarChart3, Settings];

  const processSteps = t('aboutPage.process.steps', { returnObjects: true }) as
    | { title: string; description: string }[]
    | [];

  return (
    <section>
      {/* ===== Hero Section ===== */}
      <div className="relative bg-gray-50">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/images/heros/about-hero.jpg')",
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
            {t('aboutPage.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed"
          >
            {t('aboutPage.subtitle')}
          </motion.p>
          <motion.a
            href="#tabs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 inline-flex items-center gap-2 rounded bg-blue-600 px-6 py-3 text-white font-medium shadow-lg hover:bg-blue-700 transition"
          >
            {t('aboutPage.cta')}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* ===== Onglets : Ce que nous proposons / Notre approche ===== */}
      <section id="tabs" className="max-w-7xl mx-auto px-6 py-20">
        <Tab.Group>
          <Tab.List className="flex justify-center space-x-6 border-b border-gray-200">
            <Tab
              className={({ selected }) =>
                `px-4 py-2 text-lg font-medium ${
                  selected
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              {t('aboutPage.cardsSection.title')}
            </Tab>
            <Tab
              className={({ selected }) =>
                `px-4 py-2 text-lg font-medium ${
                  selected
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              {t('aboutPage.process.title')}
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-12">
            {/* Panel 1 - Ce que nous proposons */}
            <Tab.Panel>
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <BackgroundCard
                  title={t('aboutPage.whoWeAre.title')}
                  description={t('aboutPage.whoWeAre.description')}
                  image="/images/who-we-are.jpg"
                  Icon={Users}
                />
                <BackgroundCard
                  title={t('aboutPage.mission.title')}
                  description={t('aboutPage.mission.description')}
                  image="/images/mission.jpg"
                  Icon={Rocket}
                />
                <BackgroundCard
                  title={t('aboutPage.offer.title')}
                  description={t('aboutPage.offer.description')}
                  image="/images/offer.jpg"
                  Icon={Handshake}
                />
              </div>
            </Tab.Panel>

            {/* Panel 2 - Notre approche */}
            <Tab.Panel>
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {processSteps.map((step, idx) => (
                  <BackgroundCard
                    key={idx}
                    title={step.title}
                    description={step.description}
                    image={`/images/process-${idx + 1}.jpg`}
                    Icon={processIcons[idx % processIcons.length]}
                  />
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
    </section>
  );
}


