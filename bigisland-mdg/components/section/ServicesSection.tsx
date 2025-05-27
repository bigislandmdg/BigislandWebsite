'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FaCar, FaHeadset, FaLaptopCode, FaBoxOpen } from 'react-icons/fa';

const services = [
  {
    icon: <FaCar size={40} />,
    titleKey: 'services.rental.title',
    descKey: 'services.rental.description',
    link: '/services/location',
  },
  {
    icon: <FaHeadset size={40} />,
    titleKey: 'services.callcenter.title',
    descKey: 'services.callcenter.description',
    link: '/services/callcenter',
  },
  {
    icon: <FaLaptopCode size={40} />,
    titleKey: 'services.it.title',
    descKey: 'services.it.description',
    link: '/services/it',
  },
  {
    icon: <FaBoxOpen size={40} />,
    titleKey: 'services.supply.title',
    descKey: 'services.supply.description',
    link: '/services/fourniture',
  },
];

export default function ServicesSection() {
  const { t } = useTranslation('common');

  return (
    <section id="services" className="px-4 py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-gray-800">
          {t('services.title')}
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group w-full max-w-sm md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition duration-300 cursor-pointer px-6 py-6"
            >
              <motion.div className="flex justify-center text-blue-600 mb-4 transition-transform duration-500 ease-in-out group-hover:rotate-12">
                {service.icon}
              </motion.div>

              <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                {t(service.titleKey)}
              </h3>

              <p className="text-sm text-gray-600 mb-4">{t(service.descKey)}</p>

              <Link
                href={service.link}
                className="inline-block bg-blue-600 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                aria-label={`${t(service.titleKey)} - ${t('services.button')}`}
              >
                {t('services.button')}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
