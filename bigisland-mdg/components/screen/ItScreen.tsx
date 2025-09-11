'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Code, Laptop } from 'lucide-react'; // icône pour le Hero

type Service = { src: string; title: string; desc: string };

// TiltCard générique (inchangé)
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [style, setStyle] = useState({});
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const rotateX = ((y / offsetHeight) - 0.5) * 12;
    const rotateY = ((x / offsetWidth) - 0.5) * -12;
    setStyle({ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)` });
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

export default function ItScreen() {
  const { t, i18n } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setServices([
      { src: '/images/it/software-dev.jpg', title: t('itPage.services.software.title'), desc: t('itPage.services.software.description') },
      { src: '/images/it/web-dev.jpg', title: t('itPage.services.web.title'), desc: t('itPage.services.web.description') },
      { src: '/images/it/mobile-app.jpg', title: t('itPage.services.mobile.title'), desc: t('itPage.services.mobile.description') },
      { src: '/images/it/support.jpg', title: t('itPage.services.support.title'), desc: t('itPage.services.support.description') },
      { src: '/images/it/uiux.jpg', title: t('itPage.services.uiux.title'), desc: t('itPage.services.uiux.description') },
      { src: '/images/it/devops-security.jpg', title: t('itPage.services.devops.title'), desc: t('itPage.services.devops.description') },
    ]);
  }, [i18n.language, t]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section>
      {/* ===== Hero Section ===== */}
        <div className="relative bg-gradient-to-l from-blue-50 to-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Texte à gauche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">{t('itPage.title')}</h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-700">{t('itPage.description')}</p>
          </motion.div>

          {/* Image à droite */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                opacity: 1,
                    scale: [1, 1.03, 1],
                    y: [0, -8, 0],
                }}
                transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                }}
                className="relative flex justify-center items-center"
                >
                <div className="relative w-full max-w-md h-72 md:h-[350px] lg:h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 to-transparent rounded-3xl transform rotate-2 shadow-xl"></div>
                  <Image
                    src="/images/heros/it-hero.jpg"
                    alt="It illustration"
                    fill
                    priority
                    className="relative object-cover rounded-3xl shadow-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>

      {/* ===== Section Services (TiltCards inchangées) ===== */}
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, i) => (
            <TiltCard key={i} className="p-4">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col h-full"
              >
                <div className="w-full h-48 relative overflow-hidden rounded">
                  <Image src={service.src} alt={service.title} fill className="object-cover" />
                </div>
                <h2 className="text-xl font-semibold text-blue-600 mt-4">{service.title}</h2>
                <p className="text-gray-600 mt-2">{service.desc}</p>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>

        {/* ---- CTA Gradient ---- */}
        <motion.section
          className="mt-16 bg-gradient-to-l from-blue-600 to-blue-500 text-white rounded-xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            {t('itPage.ctaTitle', 'Ready to transform your digital strategy?')}
          </h2>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            {t('itPage.cta', 'Get a Free Consultation')}
          </a>
        </motion.section>
      </div>
    </section>
  );
}

