'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion, useInView } from 'framer-motion';
import { Package, ChevronRight } from 'lucide-react';

type Service = { src: string; title: string; desc: string };

// TiltCard générique
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

export default function FournisseurScreen() {
  const { t } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setServices([
      { 
        src: '/images/fournisseur/selection.jpg', 
        title: t('fournisseurPage.services.selection.title'), 
        desc: t('fournisseurPage.services.selection.description') 
      },
      { 
        src: '/images/fournisseur/evaluation.jpg', 
        title: t('fournisseurPage.services.evaluation.title'), 
        desc: t('fournisseurPage.services.evaluation.description') 
      },
      { 
        src: '/images/fournisseur/negotiation.jpg', 
        title: t('fournisseurPage.services.negotiation.title'), 
        desc: t('fournisseurPage.services.negotiation.description') 
      },
      { 
        src: '/images/fournisseur/contract.jpg', 
        title: t('fournisseurPage.services.contract.title'), 
        desc: t('fournisseurPage.services.contract.description') 
      },
      { 
        src: '/images/fournisseur/performance.jpg', 
        title: t('fournisseurPage.services.performance.title'), 
        desc: t('fournisseurPage.services.performance.description') 
      },
      { 
        src: '/images/fournisseur/relationship.jpg', 
        title: t('fournisseurPage.services.relationship.title'), 
        desc: t('fournisseurPage.services.relationship.description') 
      },
    ]);
  }, [t]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  return (
    <>
      <Head>
        <title>{t('fournisseurPage.pageTitle')}</title>
        <meta name="description" content={t('fournisseurPage.metaDescription')} />
      </Head>

      {/* ===== Hero Section ===== */}
      <div className="relative bg-gradient-to-l from-blue-50 to-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Texte à gauche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">{t('fournisseurPage.title')}</h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-700">{t('fournisseurPage.description')}</p>
          </motion.div>

          {/* Icône Fournisseur à droite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: [1, 1.05, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex justify-center items-center text-blue-600"
          >
            <Package size={280} />
          </motion.div>
        </div>
      </div>

      {/* ===== Section Services ===== */}
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
                <div className="w-full h-48 relative overflow-hidden rounded-lg">
                  <Image 
                    src={service.src} 
                    alt={service.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <h2 className="text-xl font-semibold text-blue-600 mt-4">{service.title}</h2>
                <p className="text-gray-600 mt-2 flex-grow">{service.desc}</p>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="mt-4 flex items-center justify-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  {t('services.button', 'En savoir plus')}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </motion.button>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>

        {/* ===== CTA Gradient ===== */}
        <motion.section
          className="mt-16 bg-gradient-to-l from-blue-600 to-blue-500 text-white rounded-xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold">
              {t('fournisseurPage.ctaTitle')}
            </h2>
            <p className="mt-2 text-blue-100 max-w-md">
              {t('fournisseurPage.ctaSubtitle')}
            </p>
          </div>
          <motion.a
            href="/devis"
            className="inline-block bg-white text-blue-600 font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {t('fournisseurPage.cta')}
          </motion.a>
        </motion.section>
      </div>
    </>
  );
}

