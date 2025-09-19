'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

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
  const mapRef = useRef<HTMLDivElement>(null);
  const [formHeight, setFormHeight] = useState<number>(0);
  const [formStatus, setFormStatus] = useState({ success: false, message: '' });

  // Mettre à jour la hauteur de la carte pour qu’elle corresponde au formulaire
  useEffect(() => {
    const updateHeight = () => {
      if (formRef.current) setFormHeight(formRef.current.offsetHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

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

  <div className="relative z-10 max-w-7xl mx-auto px-6 py-34 flex flex-col justify-center items-start text-left">
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-12 text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg py-8"
    >
      {t('contactPage.title')}
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="mt-8 max-w-3xl text-lg md:text-xl text-gray-200 leading-relaxed"
    >
      {t('contactPage.subtitle')}
    </motion.p>

    <motion.button
      onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-12 inline-flex items-center gap-2  bg-teal-700 px-6 py-3 text-white font-bold shadow-lg hover:bg-teal-700 transition"
    >
      <span>{t('contactPage.cta')}</span>
      <motion.span
          className="inline-block"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="w-5 h-5" />
      </motion.span>
    </motion.button>
  </div>
</section>


      {/* ===== Contact Section as Cards ===== */}
      <section className="py-20 bg-zinc">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Card: Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-50 border-2 border-sky-700 shadow-xl p-8 hover:shadow-lg hover:shadow-sky-200 transition h-full flex flex-col"
          >
            <h2 className="text-3xl font-bold text-teal-700 mb-6">{t('contactPage.form.title')}</h2>
            <p className="mb-8 text-zinc-600">{t('contactPage.form.description')}</p>
            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
              {['name', 'email', 'subject', 'message'].map((field) => (
                <TiltInput key={field}>
                  <div className="group">
                    <label className="block text-sm font-semibold text-zinc-700">
                      {t(`contactPage.form.${field}`)}
                    </label>
                    {field !== 'message' ? (
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        required
                        placeholder={t(`contactPage.form.placeholder${field.charAt(0).toUpperCase() + field.slice(1)}`)}
                        className="mt-2 block w-full border border-zinc-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700 sm:text-sm bg-white transition-all duration-300"
                      />
                    ) : (
                      <textarea
                        name={field}
                        rows={5}
                        required
                        placeholder={t(`contactPage.form.placeholder${field.charAt(0).toUpperCase() + field.slice(1)}`)}
                        className="mt-2 block w-full  border border-zinc-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-sky-700 sm:text-sm bg-white transition-all duration-300"
                      />
                    )}
                  </div>
                </TiltInput>
              ))}

              {formStatus.message && (
                <div
                  className={`p-3 ${
                    formStatus.success
                      ? 'bg-teal-50 text-teal-700'
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
                className="flex items-center justify-center gap-2 bg-sky-700 text-white py-3 px-8  font-semibold transition duration-300 hover:bg-sky-700 shadow-md mt-auto"
              >
                {t('contactPage.form.send')}
                <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </form>
          </motion.div>

          {/* Right Card: Map */}
          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full overflow-hidden shadow-xl hover:shadow-lg hover:shadow-blue-200 transition"
            style={{ height: formHeight }} // ici on applique la hauteur du formulaire
          >
            <iframe
              title="Localisation"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.715308399614!2d47.5516228!3d-18.9367256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07db98002fbc3%3A0x8908c61af0aa07e8!2sPharmacie%20Hasin%27ny%20Aina!5e0!3m2!1sfr!2smg!4v1693945000000!5m2!1sfr!2smg"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="border-0 w-full h-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

        </div>
      </section>
    </main>
  );
}
