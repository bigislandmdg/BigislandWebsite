'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRef, useState } from 'react';
import { FaCar, FaHeadset, FaLaptopCode, FaBoxOpen, FaArrowRight } from 'react-icons/fa';
import { t } from 'i18next';

// ✅ TiltCard générique
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
      className={`bg-gray-50 border border-gray-200 rounded-xl shadow-md p-6 transition-transform duration-300 ease-in-out ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetStyle}
      whileHover={{ boxShadow: '0px 10px 30px rgba(0,0,0,0.15)' }}
    >
      {children}
    </motion.div>
  );
}

// ✅ Carte Service avec animation et tilt
const ServiceCard = ({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
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
        {/* Icône animée dans un cercle */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center items-center w-20 h-20 mb-4 rounded bg-blue-100 shadow-inner"
        >
          <div className="text-blue-600 text-4xl">{icon}</div>
        </motion.div>

        <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-4">{description}</p>

        {/* ✅ Nouveau bouton icône flèche */}
         {/* ✅ Nouveau bouton icône flèche */} 
<Link
  href={link}
  className="flex items-center justify-center w-40 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
>
  <motion.div
    whileHover={{ x: 3 }} // effet translation flèche
    transition={{ duration: 0.3 }}
    className="flex items-center gap-2" // <-- Alignement texte + icône
  >
    <span>{t('services.button')}</span>
    <FaArrowRight className="text-lg" />
  </motion.div>
</Link>
      </motion.div>
    </TiltCard>
  );
};

export default function ServicesSection() {
  const { t } = useTranslation('common');

  const services = [
    {
      icon: <FaCar />,
      title: t('services.rental.title'),
      description: t('services.rental.description'),
      link: '/services/location',
    },
    {
      icon: <FaHeadset />,
      title: t('services.callcenter.title'),
      description: t('services.callcenter.description'),
      link: '/services/call-center',
    },
    {
      icon: <FaLaptopCode />,
      title: t('services.it.title'),
      description: t('services.it.description'),
      link: '/services/it',
    },
    {
      icon: <FaBoxOpen />,
      title: t('services.supply.title'),
      description: t('services.supply.description'),
      link: '/services/fournisseur',
    },
  ];

  return (
    <section id="services" className="px-4 py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl lg:text-4xl font-bold mb-10 text-gray-800"
        >
          {t('services.title')}
        </motion.h2>

         {/* ✅ Nouvelle description globale */}
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-gray-600 text-base lg:text-lg max-w-3xl mx-auto mb-10"
    >
      {t('services.description')}
    </motion.p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
