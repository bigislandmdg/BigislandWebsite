'use client';

import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';

const clientData = [
  { src: '/logos/client1.png', key: 'client1' },
  { src: '/logos/client2.png', key: 'client2' },
  { src: '/logos/client3.png', key: 'client3' },
  { src: '/logos/client4.png', key: 'client4' },
  { src: '/logos/client5.png', key: 'client5' },
  { src: '/logos/client6.png', key: 'client6' }
];

export default function ClientSection() {
  const { t } = useTranslation('common');

  return (
    <section id="clients" className="px-4 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
          {t('clients.title')}
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          {t('clients.description')}
        </p>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-10 animate-slide"
            initial={{ x: 0 }}
            animate={{ x: ['0%', '-100%'] }}
            transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          >
            {[...clientData, ...clientData].map((client, index) => (
              <div
                key={index}
                className="w-40 h-24 text-center flex flex-col items-center justify-center px-2"
              >
                <Image
                  src={client.src}
                  alt={t(`clients.list.${client.key}.name`)}
                  width={100}
                  height={50}
                  className="object-contain grayscale hover:grayscale-0 transition"
                />
                <p className="text-xs mt-2 text-gray-600">
                  {t(`clients.list.${client.key}.description`)}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
