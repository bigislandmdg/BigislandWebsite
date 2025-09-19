'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
      className={`bg-stone mx-auto px-6 lg:px-8  shadow-xl overflow-hidden transition-transform duration-300 ease-in-out ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetStyle}
      whileHover={{ boxShadow: '0px 8px 30px rgba(0,0,0,0.15)' }}
    >
      {children}
    </motion.div>
  );
}

type Testimony = { name: string; message: string; avatar: string };

export default function TestimonyScreen() {
  const { t } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);

  useEffect(() => {
    setTestimonies([
      { name: t('testimonyPage.clients.client1.name'), message: t('testimonyPage.clients.client1.message'), avatar: '/images/clients/client1.jpg' },
      { name: t('testimonyPage.clients.client2.name'), message: t('testimonyPage.clients.client2.message'), avatar: '/images/clients/client2.jpg' },
      { name: t('testimonyPage.clients.client3.name'), message: t('testimonyPage.clients.client3.message'), avatar: '/images/clients/client3.jpg' },
    ]);
  }, [t]);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonies.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonies.length) % testimonies.length);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20 },
  };

  const scrollToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault(); // empêche le comportement par défaut
  ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };


  return (
    <section>
      {/* ===== Hero Section ===== */}
       <div className="relative bg-gray-50">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/images/heros/testimonials-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

   <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-36 flex flex-col justify-center items-start text-left">    
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="mt-1 text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg py-8"
  >
    {t('testimonyPage.title')}
  </motion.h1>
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.8 }}
    className="mt-4 text-lg md:text-xl text-zinc-200 leading-relaxed max-w-xl"
  >
    {t('testimonyPage.description')}
  </motion.p>
    <motion.a
  href="#"
  onClick={scrollToContent}
  className="mt-6 inline-flex items-center gap-2  bg-teal-700 px-6 py-3 text-white font-bold shadow-lg hover:bg-teal-700 transition"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  {t('testimonyPage.cta')}
  <motion.span
    className="inline-block"
    animate={{ y: [0, -6, 0] }} // monte et descend
    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
  >
    <ArrowDown className="w-5 h-5" />
  </motion.span>
</motion.a>
</div>

      </div>

      {/* ===== Testimony Carousel ===== */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20" ref={ref}>
        <div className="relative flex flex-col items-center">
          <AnimatePresence mode="wait">
            {testimonies.length > 0 && (
              <motion.div
                key={activeIndex}
                className="w-full max-w-4xl"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
              >
                <TiltCard className="p-8 flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0 relative w-24 h-24 md:w-32 md:h-32  overflow-hidden">
                    <img
                      src={testimonies[activeIndex].avatar}
                      alt={testimonies[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-semibold text-sky-700">{testimonies[activeIndex].name}</h3>
                    <p className="mt-2 text-zinc-600 italic leading-relaxed text-lg">
                      "{testimonies[activeIndex].message}"
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {testimonies.length > 1 && (
            <div className="flex justify-center gap-6 mt-10 items-center">
              <button
                onClick={goPrev}
                className="p-3  bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-3">
                {testimonies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-4 h-4  transition-all duration-300 ${
                      activeIndex === index ? 'bg-zinc-600 w-8' : 'bg-zinc-300 hover:bg-zinc-400'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="p-3 bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors shadow-sm hover:shadow-md"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

