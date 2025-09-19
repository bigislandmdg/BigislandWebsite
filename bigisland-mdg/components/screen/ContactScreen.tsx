'use client';

import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

// TiltInput Component
function TiltInput({ children }: { children: React.ReactNode }) {
  const [style, setStyle] = useState({});
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const rotateX = ((y / offsetHeight) - 0.5) * 5;
    const rotateY = ((x / offsetWidth) - 0.5) * -5;
    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      boxShadow: `0 10px 20px rgba(59,130,246,0.2)`,
    });
  };
  const resetStyle = () => setStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)', boxShadow: 'none' });

  return (
    <motion.div
      className="rounded-md transition-all duration-300"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetStyle}
    >
      {children}
    </motion.div>
  );
}

export default function ContactScreen() {
  const { t } = useTranslation('common');
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true, amount: 0.2 });
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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-white min-h-screen">
      {/* ===== Hero Section ===== */}
      <section className="relative bg-zinc-100">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/images/banners/contact-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 py-32 min-h-[400px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-1 text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg py-4"
          >
            {t('contactPage.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed"
          >
            {t('contactPage.subtitle')}
          </motion.p>
          <motion.button
            onClick={scrollToForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 inline-flex items-center gap-2 rounded bg-blue-600 px-6 py-3 text-white font-medium shadow-lg hover:bg-blue-700 transition"
          >
            {t('contactPage.cta')}
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        </div>
      </section>

      {/* ===== Contact Section Split ===== */}
      <section className="relative bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Pattern / Illustration */}
           {/* Left Pattern / Illustration */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="relative hidden lg:flex h-full rounded-2xl overflow-hidden"
  >
    {/* Gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
    {/* Image pattern */}
    <img
      src="/images/heros/contact-patterns.jpg"
      alt="Pattern"
      className="relative z-10 object-cover w-full h-full"
    />
  </motion.div>

          {/* Right Form */}
           {/* Right Form */}
<motion.div
  ref={formRef}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="bg-gray-50 border-2 border-blue-500 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-blue-200"
>
  <h2 className="text-3xl font-bold text-blue-500 mb-6">{t('contactPage.form.title')}</h2>
  <p className="mb-8 text-gray-600">{t('contactPage.form.description')}</p>
  <form onSubmit={handleSubmit} className="space-y-6">
    {['name', 'email', 'subject', 'message'].map((field, idx) => (
      <TiltInput key={field}>
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700">
            {t(`contactPage.form.${field}`)}
          </label>
          {field !== 'message' ? (
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              required
              placeholder={t(`contactPage.form.placeholder${field.charAt(0).toUpperCase() + field.slice(1)}`)}
              className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white transition-all duration-300"
            />
          ) : (
            <textarea
              name={field}
              rows={5}
              required
              placeholder={t(`contactPage.form.placeholder${field.charAt(0).toUpperCase() + field.slice(1)}`)}
              className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white transition-all duration-300"
            ></textarea>
          )}
        </div>
      </TiltInput>
    ))}

    {formStatus.message && (
      <div
        className={`p-3 rounded-lg ${
          formStatus.success
            ? 'bg-green-50 text-green-700'
            : 'bg-red-50 text-red-700'
        }`}
      >
        {formStatus.message}
      </div>
    )}

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
      className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold transition duration-300 hover:bg-blue-700 shadow-md"
    >
      {t('contactPage.form.send')}
      <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
    </motion.button>
  </form>
</motion.div>

        </div>
      </section>
    </main>
  );
}
