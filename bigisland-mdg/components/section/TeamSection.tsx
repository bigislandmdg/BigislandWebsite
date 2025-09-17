'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

const teamMembers = [
  {
    nameKey: 'team.ceo.name',
    roleKey: 'team.ceo.role',
    image: '/images/ceo.jpg',
    linkedin: 'https://www.linkedin.com/in/ceo-profile',
  },
  {
    nameKey: 'team.director.name',
    roleKey: 'team.director.role',
    image: '/images/director.jpg',
    linkedin: 'https://www.linkedin.com/in/director-profile',
  },
  {
    nameKey: 'team.it.name',
    roleKey: 'team.it.role',
    image: '/images/it.jpg',
    linkedin: 'https://www.linkedin.com/in/it-profile',
  },
];

// ✅ TiltCard pour l'effet 3D
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

    const rotateX = ((y / offsetHeight) - 0.5) * 10;
    const rotateY = ((x / offsetWidth) - 0.5) * -10;

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
    });
  };

  const resetStyle = () => setStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });

  return (
    <motion.div
      className={`relative rounded-2xl shadow-lg overflow-hidden cursor-pointer ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        resetStyle();
        onHoverEnd?.();
      }}
      onMouseEnter={onHoverStart}
      whileHover={{ boxShadow: '0px 15px 35px rgba(0,0,0,0.25)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

export default function TeamSection() {
  const { t } = useTranslation('common');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section id="team" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('team.title')}
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('team.subtitle')}
        </motion.p>

       <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto justify-items-center">
  {teamMembers.map((member, idx) => (
    <TiltCard
      key={idx}
      onHoverStart={() => setHoverIndex(idx)}
      onHoverEnd={() => setHoverIndex(null)}
      className="w-72 h-72"
    >
      <div className="relative w-full h-full">
        {/* Image */}
        <Image
          src={member.image}
          alt={t(member.nameKey)}
          fill
          className="object-cover w-full h-full"
        />

        {/* Overlay Texte */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={hoverIndex === idx ? { opacity: 1 } : { opacity: 0.7 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white"
        >
          <h3 className="text-xl font-bold">{t(member.nameKey)}</h3>
          <p className="text-sm">{t(member.roleKey)}</p>

          {/* LinkedIn bouton flottant */}
          <AnimatePresence>
            {hoverIndex === idx && (
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="mt-3 inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                <FaLinkedin size={20} />
              </motion.a>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </TiltCard>
  ))}
</div>

      </div>
    </section>
  );
}
