'use client';

import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonyScreen() {
  const { t, i18n } = useTranslation('common');
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  type Testimony = { name: string; message: string; avatar: string };
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);

  useEffect(() => {
    setTestimonies([
      { name: t('testimonyPage.clients.client1.name'), message: t('testimonyPage.clients.client1.message'), avatar: '/images/clients/client1.jpg' },
      { name: t('testimonyPage.clients.client2.name'), message: t('testimonyPage.clients.client2.message'), avatar: '/images/clients/client2.jpg' },
      { name: t('testimonyPage.clients.client3.name'), message: t('testimonyPage.clients.client3.message'), avatar: '/images/clients/client3.jpg' },
    ]);
    setIsLoading(false);
    controls.start("visible");
  }, [i18n.language, t, controls]);

  useEffect(() => {
    if (testimonies.length === 0) return;
    const interval = setInterval(() => goNext(), 5000);
    return () => clearInterval(interval);
  }, [activeIndex, testimonies.length]);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonies.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonies.length) % testimonies.length);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <>
      <Head>
        <title>{t('testimonyPage.pageTitle')}</title>
        <meta name="description" content={t('testimonyPage.metaDescription')} />
      </Head>

      {/* ---- Banner Header ---- */}
      <section className="relative h-64 md:h-80 w-full">
        <Image
            src="/images/banners/contact-hero.jpg"
            alt="Contact Hero"
            fill
            className="object-cover"
            priority
          />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <User className="text-white text-5xl mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {t('testimonyPage.title')}
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              {t('testimonyPage.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---- Testimony Carousel ---- */}
      <section className="pt-16 pb-16 px-4 max-w-6xl mx-auto">
        <div className="relative">
          <div ref={containerRef} className="overflow-hidden relative flex justify-center">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">{t('common.loading')}</p>
              </div>
            ) : testimonies.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600">{t('testimonyPage.noTestimonies')}</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-6"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardVariants}
                >
                  <div className="flex-shrink-0 relative w-24 h-24 md:w-32 md:h-32">
                    <Image
                      src={testimonies[activeIndex].avatar}
                      alt={testimonies[activeIndex].name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full border-2 border-white shadow"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-semibold text-blue-600">
                      {testimonies[activeIndex].name}
                    </h3>
                    <p className="mt-2 text-gray-600 italic leading-relaxed text-lg">
                      "{testimonies[activeIndex].message}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {!isLoading && testimonies.length > 0 && (
            <div className="flex justify-center gap-6 mt-10 items-center">
              <button
                onClick={goPrev}
                className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors shadow-sm hover:shadow-md"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-3">
                {testimonies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors shadow-sm hover:shadow-md"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>

        {/* ---- CTA Simple Justified ---- */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t('testimonyPage.ctaTitle') || 'Vous voulez en savoir plus ?'}
          </h2>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            {t('testimonyPage.cta')}
          </a>
        </section>
      </section>
    </>
  );
}

