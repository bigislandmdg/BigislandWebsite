'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa'; // Icône LinkedIn

// 🔹 Données des membres avec lien LinkedIn
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
  {
    nameKey: 'team.logistics.name',
    roleKey: 'team.logistics.role',
    image: '/images/logistics.jpg',
    linkedin: 'https://www.linkedin.com/in/logistics-profile',
  },
  {
    nameKey: 'team.callcenter.name',
    roleKey: 'team.callcenter.role',
    image: '/images/callcenter.jpg',
    linkedin: 'https://www.linkedin.com/in/callcenter-profile',
  },
  {
    nameKey: 'team.supply.name',
    roleKey: 'team.supply.role',
    image: '/images/supply.jpg',
    linkedin: 'https://www.linkedin.com/in/supply-profile',
  },
];

// 🔹 Composant Tilt Card
function TiltCard({ children }: { children: React.ReactNode }) {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const rotateX = ((y / offsetHeight) - 0.5) * 20;
    const rotateY = ((x / offsetWidth) - 0.5) * -20;

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
    });
  };

  const resetStyle = () => {
    setStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetStyle}
      whileHover={{ boxShadow: '0px 8px 30px rgba(0,0,0,0.15)' }}
    >
      {children}
    </motion.div>
  );
}

export default function TeamSection() {
  const { t } = useTranslation('common');

  return (
    <section id="team" className="px-4 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold mb-10 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('team.title')}
        </motion.h2>

        <p className="text-lg text-gray-600 mb-12">{t('team.subtitle')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TiltCard>
                <div className="flex flex-col items-center">
                  {/* Image */}
                  <Image
                    src={member.image}
                    alt={t(member.nameKey)}
                    width={150}
                    height={120}
                    className="rounded-full object-cover mb-4"
                  />

                  {/* Icône LinkedIn */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 mb-2 transition-colors"
                  >
                    <FaLinkedin size={28} />
                  </a>

                  {/* Nom & rôle */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {t(member.nameKey)}
                  </h3>
                  <p className="text-sm text-gray-600">{t(member.roleKey)}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
