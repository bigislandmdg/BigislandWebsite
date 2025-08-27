'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';

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

// 🔹 Tilt Card pour effet léger
function TiltCard({ children }: { children: React.ReactNode }) {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const rotateX = ((y / offsetHeight) - 0.5) * 15;
    const rotateY = ((x / offsetWidth) - 0.5) * -15;

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
    });
  };

  const resetStyle = () => {
    setStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm p-4 transition-transform duration-300"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetStyle}
      whileHover={{ boxShadow: '0px 8px 20px rgba(0,0,0,0.1)' }}
    >
      {children}
    </motion.div>
  );
}

export default function TeamSection() {
  const { t } = useTranslation('common');

  return (
    <section id="team" className="py-20 bg-gray-50">
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
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('team.subtitle')}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TiltCard>
                <div className="flex flex-col items-center space-y-3">
                  {/* Petite image ronde */}
                  <Image
                    src={member.image}
                    alt={t(member.nameKey)}
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />

                  {/* Nom & rôle */}
                  <div className="text-center">
                    <h3 className="text-md font-semibold text-gray-900">{t(member.nameKey)}</h3>
                    <p className="text-sm text-gray-500">{t(member.roleKey)}</p>
                  </div>

                  {/* LinkedIn */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaLinkedin size={22} />
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

