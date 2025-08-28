'use client';

import { useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactScreen() {
  const { t } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <main className="bg-white min-h-screen">
      {/* ===== Hero Banner ===== */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Image
          src="/images/contact/contact-hero.jpg"
          alt="Contact Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {t('contactPage.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl"
          >
            {t('contactPage.subtitle')}
          </motion.p>
        </div>
      </div>

      {/* ===== Contact Section Split ===== */}
      <section className="relative isolate bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 shadow-xl rounded-2xl overflow-hidden">
          {/* Left Panel - Infos */}
          <div className="relative bg-blue-600 px-6 py-12 sm:py-16 sm:px-12 lg:px-16 flex flex-col justify-center">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-700 via-blue-600 to-blue-500 opacity-90"></div>
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {t('contactPage.title')}
              </h2>
              <p className="mt-4 text-base leading-7 text-blue-100">
                {t('contactPage.subtitle')}
              </p>

              <dl className="mt-8 space-y-6 text-base leading-7 text-blue-100">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                  </dt>
                  <dd>
                    📧 contact@exemple.com
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Phone</span>
                  </dt>
                  <dd>
                    📞 +261 34 12 345 67
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                  </dt>
                  <dd>
                    📍 Immeuble Alpha, Antananarivo, Madagascar
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Panel - Form */}
          <motion.form
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white px-6 py-12 sm:py-16 sm:px-12 lg:px-16"
          >
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  {t('contactPage.form.name')}
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  {t('contactPage.form.email')}
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  {t('contactPage.form.subject')}
                </label>
                <input
                  type="text"
                  placeholder="Objet du message"
                  className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  {t('contactPage.form.message')}
                </label>
                <textarea
                  rows={5}
                  placeholder="Votre message..."
                  className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 hover:bg-blue-700"
              >
                {t('contactPage.form.send')}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
