'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function ItScreen() {
  const { t, i18n } = useTranslation('common');
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [refTitle, titleInView] = useInView({ threshold: 0.5 });

  // Split text animation
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 300
      }
    })
  };

  // Tilt animation
  const tiltVariants = {
    hidden: { opacity: 0, rotateX: 15, rotateY: -15 },
    visible: {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    },
    hover: {
      scale: 1.03,
      rotateX: 5,
      rotateY: 5,
      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    tap: { scale: 0.95, transition: { duration: 0.1 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  type Service = { src: string; title: string; desc: string };
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  useEffect(() => {
    setServices([
      {
        src: '/images/it/software-dev.jpg',
        title: t('itPage.services.software.title'),
        desc: t('itPage.services.software.description'),
      },
      {
        src: '/images/it/web-dev.jpg',
        title: t('itPage.services.web.title'),
        desc: t('itPage.services.web.description'),
      },
      {
        src: '/images/it/mobile-app.jpg',
        title: t('itPage.services.mobile.title'),
        desc: t('itPage.services.mobile.description'),
      },
      {
        src: '/images/it/support.jpg',
        title: t('itPage.services.support.title'),
        desc: t('itPage.services.support.description'),
      },
      {
        src: '/images/it/uiux.jpg',
        title: t('itPage.services.uiux.title'),
        desc: t('itPage.services.uiux.description'),
      },
      {
        src: '/images/it/devops-security.jpg',
        title: t('itPage.services.devops.title'),
        desc: t('itPage.services.devops.description'),
      },
    ]);
  }, [i18n.language, t]);

  // Split text component
  const SplitText = ({ text, className }: { text: string; className: string }) => (
    <div className={`overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );

  return (
    <>
      <Head>
        <title>{t('itPage.pageTitle')}</title>
        <meta name="description" content={t('itPage.metaDescription')} />
      </Head>

      {/* 🔹 Header Banner */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/images/banners/it-banner.jpg"
          alt="IT Services"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('itPage.title')}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            {t('itPage.description')}
          </p>
        </motion.div>
      </section>

      {/* 🔹 Section Services */}
      <section ref={ref} id="it-services" className="pt-16 pb-16 px-6 max-w-6xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="border rounded-lg shadow hover:shadow-md p-4 bg-white"
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover="hover"
              variants={tiltVariants}
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="w-full h-48 relative overflow-hidden rounded"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={service.src}
                  alt={service.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  quality={90}
                />
              </motion.div>
              <h2 className="text-xl font-semibold text-blue-600 mt-4">{service.title}</h2>
              <p className="text-gray-600 mt-2">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 🔹 Call-to-action amélioré */}
        <motion.section
          className="relative mt-16 rounded-xl bg-gradient-to-r from-white to-gray-100 px-6 py-10 shadow-lg max-w-5xl mx-auto overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Texte accrocheur */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {t('itPage.ctaTitle', 'Ready to transform your digital strategy?')}
              </h2>
              <p className="mt-2 text-gray-600 max-w-md mx-auto md:mx-0">
                {t('itPage.ctaSubtitle', 'Explore our IT solutions and get a personalized consultation.')}
              </p>
            </div>

            {/* Bouton */}
            <motion.a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {t('itPage.cta', 'Get a Free Consultation')}
            </motion.a>
          </div>

          {/* Décoration gradient */}
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-blue-100 via-blue-200 to-transparent rounded-full blur-3xl opacity-40"
          />
        </motion.section>
      </section>
    </>
  );
}

