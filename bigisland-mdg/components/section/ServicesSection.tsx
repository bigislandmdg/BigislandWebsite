'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, JSX } from 'react';
import { useTranslation } from 'next-i18next';
import AppointmentModal from '../layout/AppointmentModal';
import { Laptop, PackagePlus, Rocket } from 'lucide-react';
import Link from 'next/link';

// ✅ TiltCard : effet 3D au mouvement de la souris
function TiltCard({
  children,
  className = '',
  onHoverStart,
  onHoverEnd,
}: {
  children: React.ReactNode;
  className?: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
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

  const resetStyle = () => setStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });

  return (
    <motion.div
      className={`bg-blue-50 shadow-sm rounded-2xl p-8 border border-gray-50 transition-all cursor-pointer ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        resetStyle();
        onHoverEnd?.();
      }}
      onMouseEnter={onHoverStart}
      whileHover={{ boxShadow: '0px 10px 30px rgba(0,0,0,0.15)', borderColor: '#3e577eff' }}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { t } = useTranslation('common');

  const services: { title: string; description: string; icon: JSX.Element; link?: string }[] = [
    {
      title: t('services.it.title'),
      description: t('services.it.description'),
      icon: <Laptop className="h-8 w-8 text-blue-600" />,
      link: '/services/it',
    },
    {
      title: t('services.supply.title'),
      description: t('services.supply.description'),
      icon: <PackagePlus className="h-8 w-8 text-blue-600" />,
      link: '/services/fournisseurs',
    },
  ];

  return (
    <section id="services" className="bg-white py-10 sm:py-16 lg:py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Titre + description */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            {t('services.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            {t('services.description')}
          </motion.p>
        </div>

        {/* Grille des services avec TiltCard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {services.map((service, idx) => (
            <TiltCard
              key={idx}
              onHoverStart={() => setHoverIndex(idx)}
              onHoverEnd={() => setHoverIndex(null)}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], y: [0, -3, 0] }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-6"
              >
                {service.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
              <p className="mt-3 text-base leading-6 text-gray-700 flex-1">{service.description}</p>

              {/* Bouton Lancer Projet flottant */}
              <AnimatePresence>
  {hoverIndex === idx && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute top-24 right-0 -translate-x-1/2"
    >
      <Link
        href={service.link ?? '#'}
        className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all inline-flex items-center gap-2"
      >
        <Rocket className="h-5 w-5" />
        {t('services.button')}
      </Link>
    </motion.div>
  )}
</AnimatePresence>

            </TiltCard>
          ))}
        </motion.div>

        {/* CTA principal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md hover:from-blue-700 hover:to-blue-800 transition-transform transform hover:scale-105"
          >
            <Rocket className="h-5 w-5" />
            {t('services.buttonCta')}
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <AppointmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
