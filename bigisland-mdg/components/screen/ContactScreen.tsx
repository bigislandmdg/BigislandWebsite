'use client';

import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

// TiltCard générique
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [style, setStyle] = useState({});
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const rotateX = ((y / offsetHeight) - 0.5) * 10;
    const rotateY = ((x / offsetWidth) - 0.5) * -10;

    setStyle({ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)` });
  };
  const resetStyle = () => setStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });

  return (
    <motion.div
      className={`bg-white shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 ease-in-out ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetStyle}
      whileHover={{ boxShadow: '0px 8px 30px rgba(0,0,0,0.15)' }}
    >
      {children}
    </motion.div>
  );
}

export default function ContactScreen() {
  const { t } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formStatus, setFormStatus] = useState({ success: false, message: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { name, email, subject, message } = Object.fromEntries(formData.entries());

    try {
      const mailtoLink = `mailto:contact@exemple.com?subject=${encodeURIComponent(
        subject as string
      )}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
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
      {/* ===== Hero Section ===== */}
      <section className="relative bg-gradient-to-l from-blue-50 to-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900"
            >
              {t('contactPage.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-gray-700"
            >
              {t('contactPage.subtitle')}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [1, 1.05, 1], y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex justify-center items-center"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
              <Mail className="w-32 h-32 md:w-40 md:h-40 text-blue-600" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Contact Form & Info ===== */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div
          ref={ref}
          className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Info Card */}
          <TiltCard className="lg:col-span-1 p-8 bg-blue-500 text-white">
            <h2 className="text-3xl font-bold mb-4">{t('contactPage.title')}</h2>
            <p className="text-base text-blue-100 mb-6">{t('contactPage.subtitle')}</p>
            <dl className="space-y-4 text-blue-100 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <dd>contact@exemple.com</dd>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <dd>+261 34 12 345 67</dd>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <dd>
                  Lot 111 Cité Villa DELICE Mandroseza,
                  <br />
                  Antananarivo, Madagascar
                </dd>
              </div>
            </dl>
          </TiltCard>

          {/* Form Card */}
          <TiltCard className="lg:col-span-2 p-8">
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    {t('contactPage.form.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t('contactPage.form.placeholderName')}
                    className="mt-2 block w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    {t('contactPage.form.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t('contactPage.form.placeholderEmail')}
                    className="mt-2 block w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    {t('contactPage.form.subject')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder={t('contactPage.form.placeholderSubject')}
                    className="mt-2 block w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    {t('contactPage.form.message')}
                  </label>
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
                  className={`p-3 rounded-lg ${
                    formStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold transition duration-300 hover:bg-blue-700"
                >
                  {t('contactPage.form.send')}
                </motion.button>
              </div>
            </motion.form>
          </TiltCard>
        </div>
      </section>
    </main>
  );
}

