'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function TestimonyScreen() {
  const { t, i18n } = useTranslation('common');

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 }
    }),
  };

  type Testimony = {
    name: string;
    message: string;
    avatar: string;
  };

  const [testimonies, setTestimonies] = useState<Testimony[]>([]);

  useEffect(() => {
    setTestimonies([
      {
        name: t('testimonyPage.clients.client1.name'),
        message: t('testimonyPage.clients.client1.message'),
        avatar: '/images/clients/client1.jpg',
      },
      {
        name: t('testimonyPage.clients.client2.name'),
        message: t('testimonyPage.clients.client2.message'),
        avatar: '/images/clients/client2.jpg',
      },
      {
        name: t('testimonyPage.clients.client3.name'),
        message: t('testimonyPage.clients.client3.message'),
        avatar: '/images/clients/client3.jpg',
      }
    ]);
  }, [i18n.language, t]);

  return (
    <>
      <Head>
        <title>{t('testimonyPage.pageTitle')}</title>
        <meta
          name="description"
          content={t('testimonyPage.metaDescription')}
        />
      </Head>

      <section id="testimonies" className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-blue-600 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('testimonyPage.title')}
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg mb-12 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('testimonyPage.description')}
        </motion.p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="pb-10"
        >
          {testimonies.map((testimony, i) => (
            <SwiperSlide key={i}>
              <motion.div
                className="border rounded-lg shadow hover:shadow-md transition p-6 bg-white max-w-xl mx-auto"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={testimony.avatar}
                    alt={testimony.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <h2 className="text-lg font-semibold text-blue-600">{testimony.name}</h2>
                </div>
                <p className="text-gray-600 mt-4 italic">"{testimony.message}"</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            {t('testimonyPage.cta')}
          </a>
        </motion.div>
      </section>
    </>
  );
}
