'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function LocationScreen() {
  const { t, i18n } = useTranslation('common');
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [refTitle, titleInView] = useInView({ threshold: 0.5 });
  const [refDesc, descInView] = useInView({ threshold: 0.5 });

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

  type Car = { src: string; title: string; desc: string };
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  useEffect(() => {
    setCars([
      {
        src: '/images/cars/suv.jpg',
        title: t('locationPage.cars.suv.title'),
        desc: t('locationPage.cars.suv.description')
      },
      {
        src: '/images/cars/berline.jpg',
        title: t('locationPage.cars.sedan.title'),
        desc: t('locationPage.cars.sedan.description')
      },
      {
        src: '/images/cars/van.jpg',
        title: t('locationPage.cars.van.title'),
        desc: t('locationPage.cars.van.description')
      }
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
        <title>{t('locationPage.pageTitle')}</title>
        <meta name="description" content={t('locationPage.metaDescription')} />
      </Head>

      {/* 🔹 Header Banner */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/images/banners/location-banner.jpg" // mets ton image ici
          alt="Location de voiture"
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
            {t('locationPage.title')}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            {t('locationPage.description')}
          </p>
        </motion.div>
      </section>

      {/* 🔹 Section Voitures */}
      <section ref={ref} id="location" className="pt-16 pb-16 px-6 max-w-6xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, i) => (
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
                  src={car.src}
                  alt={car.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  quality={90}
                />
              </motion.div>
              <h2 className="text-xl font-semibold text-blue-600 mt-4">{car.title}</h2>
              <p className="text-gray-600 mt-2">{car.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 🔹 Call-to-action amélioré (CTA Section avec gradient) */}
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
        {t('locationPage.ctaTitle', 'Prêt à louer votre véhicule idéal ?')}
      </h2>
      <p className="mt-2 text-gray-600 max-w-md mx-auto md:mx-0">
        {t('locationPage.ctaSubtitle', 'Choisissez parmi nos voitures et obtenez un devis instantané en ligne.')}
      </p>
    </div>

    {/* Bouton */}
    <motion.a
      href="/devis"
      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition"
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      {t('locationPage.cta', 'Demander un devis')}
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

