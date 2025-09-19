'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowDown, ArrowRight, Code, Laptop } from 'lucide-react';

type Service = { title: string; description: string; image: string; link?: string };

export default function ItScreen() {
  const { t, i18n } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setServices([
      { title: t('itPage.services.software.title'), description: t('itPage.services.software.description'), image: '/images/it/software-dev.jpg', link: '/contact' },
      { title: t('itPage.services.web.title'), description: t('itPage.services.web.description'), image: '/images/it/web-dev.jpg', link: '/contact' },
      { title: t('itPage.services.mobile.title'), description: t('itPage.services.mobile.description'), image: '/images/it/mobile-app.jpg', link: '/contact' },
      { title: t('itPage.services.support.title'), description: t('itPage.services.support.description'), image: '/images/it/support.jpg', link: '/contact' },
      { title: t('itPage.services.uiux.title'), description: t('itPage.services.uiux.description'), image: '/images/it/uiux.jpg', link: '/contact' },
      { title: t('itPage.services.devops.title'), description: t('itPage.services.devops.description'), image: '/images/it/devops-security.jpg', link: '/contact' },
    ]);
  }, [i18n.language, t]);

  const scrollToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section>
      {/* ===== Hero Section ===== */}
      <div className="relative bg-zinc-50">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/images/heros/it-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start text-left px-6 py-32 min-h-[500px] max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg max-w-2xl"
          >
            {t('itPage.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-lg md:text-xl text-zinc-200 leading-relaxed max-w-xl"
          >
            {t('itPage.description')}
          </motion.p>
          <motion.a
            href="#services"
            onClick={scrollToContent}
            className="mt-6 inline-flex items-center gap-2 bg-teal-700 px-6 py-3 text-white font-bold shadow-lg hover:bg-teal-800 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('itPage.cta')}
            <motion.span
              className="inline-block"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </div>
      </div>

      {/* ===== Services Grid (même style que projets) ===== */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-28" ref={ref} id="services">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="relative w-full h-96 overflow-hidden shadow-lg cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover="hover"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover w-full h-full"
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-sky-800 backdrop-blur-md p-6 border-t-4 text-white flex flex-col gap-3"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0% 100%)',
                }}
                initial={{ y: 0 }}
                variants={{
                  hover: { y: -20, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
              >
                <h5 className="text-lg font-bold text-teal-400">{service.title}</h5>
                <p className="text-sm line-clamp-3">{service.description}</p>
                {service.link && (
                  <motion.a
                    href={service.link}
                    className="inline-flex items-center justify-center w-10 h-10 text-white border border-white hover:bg-white hover:text-sky-700 transition-colors"
                    variants={{
                      hover: { y: -10, transition: { duration: 0.4, ease: 'easeOut' } },
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

