'use client';

import { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactScreen() {
  const { t } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formStatus, setFormStatus] = useState({ success: false, message: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { name, email, subject, message } = Object.fromEntries(formData.entries());

    try {
      const mailtoLink = `mailto:contact@exemple.com?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoLink;

      setFormStatus({ success: true, message: t('contactPage.form.successMessage') });
      e.currentTarget.reset();

      setTimeout(() => setFormStatus({ success: false, message: '' }), 5000);
    } catch {
      setFormStatus({ success: false, message: t('contactPage.form.errorMessage') });
    }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* ===== Hero Banner ===== */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Image
          src="/images/banners/contact-hero.jpg"
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
            className="text-3xl md:text-5xl font-bold text-white mb-2"
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
      <section className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12 shadow-2xl rounded-2xl overflow-hidden">
          {/* Left Panel - Infos */}
          <div className="bg-blue-500 px-6 py-12 sm:px-12 lg:px-16 flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">{t('contactPage.title')}</h2>
            <p className="mt-4 text-base leading-7 text-blue-100">{t('contactPage.subtitle')}</p>

            <dl className="mt-10 space-y-6 text-base leading-7 text-blue-100">
              <div className="flex gap-x-3 items-center">
                <Mail className="h-6 w-6 flex-none text-blue-200" />
                <dd>contact@exemple.com</dd>
              </div>
              <div className="flex gap-x-3 items-center">
                <Phone className="h-6 w-6 flex-none text-blue-200" />
                <dd>+261 34 12 345 67</dd>
              </div>
              <div className="flex gap-x-3 items-center">
                <MapPin className="h-6 w-6 flex-none text-blue-200" />
                <dd>
                  Lot 111 Cité Villa DELICE Mandroseza,
                  <br />
                  Antananarivo, Madagascar
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Panel - Form */}
          <motion.form
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-2 bg-white px-6 py-12 sm:px-12 lg:px-16"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-900">{t('contactPage.form.name')}</label>
                <input
                  type="text"
                  name="name"
                  placeholder={t('contactPage.form.placeholderName')}
                  className="mt-2 block w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">{t('contactPage.form.email')}</label>
                <input
                  type="email"
                  name="email"
                  placeholder={t('contactPage.form.placeholderEmail')}
                  className="mt-2 block w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900">{t('contactPage.form.subject')}</label>
                <input
                  type="text"
                  name="subject"
                  placeholder={t('contactPage.form.placeholderSubject')}
                  className="mt-2 block w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900">{t('contactPage.form.message')}</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder={t('contactPage.form.placeholderMessage')}
                  className="mt-2 block w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  required
                ></textarea>
              </div>
            </div>

            {formStatus.message && (
              <div
                className={`mt-4 p-3 rounded-lg ${
                  formStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}
              >
                {formStatus.message}
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold transition duration-300 hover:bg-blue-700"
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

