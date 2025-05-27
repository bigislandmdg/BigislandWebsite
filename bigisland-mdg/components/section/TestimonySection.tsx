'use client';

import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TestimonySection() {
  const { t } = useTranslation('common');

  return (
    <section id="testimony" className="px-4 py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('testimony.title')}
        </motion.h2>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg italic text-gray-700 mb-6">
            “{t('testimony.message')}”
          </p>

          <div className="flex items-center justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/ceo.jpg"
                alt="CEO of BigIsland"
                width={90}
                height={190}
                className="rounded-full object-cover"
              />
            </motion.div>

            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="font-semibold text-gray-900">
                {t('testimony.name')}
              </p>
              <p className="text-sm text-gray-600">
                {t('testimony.position')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
