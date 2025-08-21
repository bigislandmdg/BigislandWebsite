'use client';

import { useTranslation } from 'next-i18next';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const clientData = [
  { src: '/logos/client1.png', key: 'client1' },
  { src: '/logos/client2.png', key: 'client2' },
  { src: '/logos/client3.png', key: 'client3' },
  { src: '/logos/client4.png', key: 'client4' },
  { src: '/logos/client5.png', key: 'client5' },
  { src: '/logos/client6.png', key: 'client6' }
];

export default function ClientSection() {
  const { t } = useTranslation('common');
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Animation infinie du ticker
  useEffect(() => {
  if (isInView) {
    controls.start({
      x: ['0%', '-100%'],
      transition: {
        duration: 30,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  }
}, [controls, isInView]);


  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        controls.start({ x: '-=10%', transition: { duration: 0.5 } });
      } else if (e.key === 'ArrowRight') {
        controls.start({ x: '+=10%', transition: { duration: 0.5 } });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [controls]);

  return (
    <section id="clients" className="px-4 py-16 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t('clients.title')}
        </motion.h2>

        <motion.p
          className="text-gray-600 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('clients.description')}
        </motion.p>

       {/* Wrapper du ticker */}
<div className="relative overflow-hidden py-4">
  {/* Masque gradient */}
  <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
  <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />

  {/* ✅ Une seule animation appliquée au container */}
  <motion.div
    className="flex space-x-10"
    animate={controls}
    initial={{ x: 0 }}
  >
    {[...clientData, ...clientData].map((client, index) => (
      <div
        key={`${client.key}-${index}`}
        className="w-40 h-24 text-center flex flex-col items-center justify-center px-2 shrink-0"
      >
        <Image
          src={client.src}
          alt={t(`clients.list.${client.key}.name`)}
          width={100}
          height={50}
          className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
        />
        <motion.p 
          className="text-xs mt-2 text-gray-600"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, y: -5 }}
        >
          {t(`clients.list.${client.key}.description`)}
        </motion.p>
      </div>
    ))}
  </motion.div>
</div>


      </div>
    </section>
  );
}