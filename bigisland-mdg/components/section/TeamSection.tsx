'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
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
];

export default function TeamSection() {
  const { t } = useTranslation('common');

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src={member.image}
                    alt={t(member.nameKey)}
                    fill
                    className="rounded-full object-cover shadow-md"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">{t(member.nameKey)}</h3>
                <p className="text-sm text-gray-500 mb-3">{t(member.roleKey)}</p>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FaLinkedin size={22} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

