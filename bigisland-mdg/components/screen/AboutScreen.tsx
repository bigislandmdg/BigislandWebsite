'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
  Users,
  Rocket,
  Handshake,
  Lightbulb,
  BarChart3,
  Settings,
} from 'lucide-react';

type AboutCard = { title: string; description: string; image: string; Icon: LucideIcon };

export default function AboutScreen() {
  const { t, i18n } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [cards, setCards] = useState<AboutCard[]>([]);
  const [page, setPage] = useState(0);
  const cardsPerPage = 3;

  useEffect(() => {
    const processIcons = [Lightbulb, BarChart3, Settings];

    const proposalCards = [
      {
        title: t('aboutPage.whoWeAre.title'),
        description: t('aboutPage.whoWeAre.description'),
        image: '/images/identity.jpg',
        Icon: Users,
      },
      {
        title: t('aboutPage.mission.title'),
        description: t('aboutPage.mission.description'),
        image: '/images/vision.jpg',
        Icon: Rocket,
      },
      {
        title: t('aboutPage.offer.title'),
        description: t('aboutPage.offer.description'),
        image: '/images/offer.jpg',
        Icon: Handshake,
      },
    ];

    // Process avec images personnalisées
    const processImages = [
      '/images/ecoute.jpg',       // étape 1
      '/images/conception.jpg',   // étape 2
      '/images/deploiement.jpg',  // étape 3
    ];

    const processSteps = (t('aboutPage.process.steps', { returnObjects: true }) as { title: string; description: string }[]).map(
      (step, idx) => ({
        title: step.title,
        description: step.description,
        image: processImages[idx] || '/images/default.jpg',
        Icon: processIcons[idx % processIcons.length],
      })
    );

    setCards([...proposalCards, ...processSteps]);
  }, [i18n.language, t]);

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const visibleCards = cards.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage);

  const scrollToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section>
      {/* ===== Hero Section ===== */}
      <div className="relative bg-gray-50">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/images/heros/about-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        {/* Wrapper central */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-34 flex flex-col justify-center items-start text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg py-8"
          >
            {t('aboutPage.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 text-lg md:text-xl text-zinc-200 leading-relaxed max-w-xl"
          >
            {t('aboutPage.subtitle')}
          </motion.p>
          <motion.a
            href="#about-cards"
            onClick={scrollToContent}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 inline-flex items-center gap-2 bg-teal-700 px-6 py-3 text-white font-medium shadow-lg hover:bg-teal-700 transition"
          >
            {t('aboutPage.cta')}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* ===== Cards Carousel ===== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28" ref={ref} id="about-cards">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              {visibleCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  className="relative w-full h-110 overflow-hidden shadow-lg cursor-pointer group"
                  whileHover="hover"
                >
                  <Image src={card.image} alt={card.title} fill className="object-cover w-full h-full" />
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
                    <h5 className="text-lg font-bold text-teal-400">{card.title}</h5>
                    <p className="text-sm line-clamp-3">{card.description}</p>
                    <motion.div
                      className="inline-flex items-center justify-center w-10 h-10 text-white border border-white hover:bg-white hover:text-sky-700 transition-colors"
                      variants={{
                        hover: { y: -10, transition: { duration: 0.4, ease: 'easeOut' } },
                      }}
                    >
                      <card.Icon className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation boutons */}
          <div className="flex justify-between items-center mt-8">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              className="p-3 bg-sky-900 text-white hover:bg-sky-700 disabled:opacity-40"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-sm text-zinc-500">
              {page + 1} / {totalPages}
            </span>
            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              className="p-3 bg-sky-900 text-white hover:bg-sky-700 disabled:opacity-40"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

