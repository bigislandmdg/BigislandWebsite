'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const teamMembers = [
  {
    nameKey: 'team.ceo.name',
    roleKey: 'team.ceo.role',
    image: '/images/ceo.jpg',
  },
  {
    nameKey: 'team.director.name',
    roleKey: 'team.director.role',
    image: '/images/director.jpg',
  },
  {
    nameKey: 'team.it.name',
    roleKey: 'team.it.role',
    image: '/images/it.jpg',
  },
  {
    nameKey: 'team.logistics.name',
    roleKey: 'team.logistics.role',
    image: '/images/logistics.jpg',
  },
  {
    nameKey: 'team.callcenter.name',
    roleKey: 'team.callcenter.role',
    image: '/images/callcenter.jpg',
  },
  {
    nameKey: 'team.supply.name',
    roleKey: 'team.supply.role',
    image: '/images/supply.jpg',
  },
];

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
        <p className="text-lg text-gray-600 mb-12">
          {t('team.subtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center">
                <Image
                  src={member.image}
                  alt={t(member.nameKey)}
                  width={100}
                  height={120}
                  className="rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {t(member.nameKey)}
                </h3>
                <p className="text-sm text-gray-600">{t(member.roleKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
