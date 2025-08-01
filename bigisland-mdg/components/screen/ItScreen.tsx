'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export default function ItScreen() {
  const { t, i18n } = useTranslation('common');
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [refTitle, titleInView] = useInView({ threshold: 0.5 });
  const [refDesc, descInView] = useInView({ threshold: 0.5 });

  // Split text animation variants
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

  // Tilt animation for cards
  const tiltVariants = {
    hidden: { opacity: 0, rotateX: 15, rotateY: -15 },
    visible: {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.03,
      rotateX: 5,
      rotateY: 5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };

  // iOS-style button animation
  const buttonVariants = {
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  type Service = { src: string; title: string; desc: string };
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
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

      <section ref={ref} id="it-solutions" className="pt-32 pb-16 px-6 max-w-6xl mx-auto text-center">
        <div ref={refTitle}>
          <motion.h1
            className="text-4xl font-bold text-blue-600 mb-6"
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
          >
            <SplitText text={t('itPage.title')} className="text-4xl font-bold" />
          </motion.h1>
        </div>

        <div ref={refDesc}>
          <motion.p
            className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={descInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t('itPage.description')}
          </motion.p>
        </div>

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

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {t('itPage.cta')}
          </motion.a>
        </motion.div>
      </section>
    </>
  );
}
