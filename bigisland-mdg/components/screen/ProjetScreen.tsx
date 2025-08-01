'use client';

import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function ProjetScreen() {
  const { t, i18n } = useTranslation('common');
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  type Project = {
    title: string;
    description: string;
    link: string;
  };

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects([
      {
        title: t('projetPage.projects.project1.title'),
        description: t('projetPage.projects.project1.description'),
        link: 'https://github.com/bigislandmdg'
      },
      {
        title: t('projetPage.projects.project2.title'),
        description: t('projetPage.projects.project2.description'),
        link: 'https://github.com/bigislandmdg'
      },
      {
        title: t('projetPage.projects.project3.title'),
        description: t('projetPage.projects.project3.description'),
        link: 'https://github.com/bigislandmdg'
      },
      {
        title: t('projetPage.projects.project4.title'),
        description: t('projetPage.projects.project4.description'),
        link: 'https://github.com/bigislandmdg'
      },
      {
        title: t('projetPage.projects.project5.title'),
        description: t('projetPage.projects.project5.description'),
        link: 'https://github.com/bigislandmdg'
      },
      {
        title: t('projetPage.projects.project6.title'),
        description: t('projetPage.projects.project6.description'),
        link: 'https://github.com/bigislandmdg'
      },
      {
        title: t('projetPage.projects.project7.title'),
        description: t('projetPage.projects.project7.description'),
        link:  'https://github.com/bigislandmdg'
      }   
    ]);
  }, [i18n.language, t]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projects]);

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "backOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const tickerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <Head>
        <title>{t('projetPage.pageTitle')}</title>
        <meta name="description" content={t('projetPage.metaDescription')} />
      </Head>

      <motion.section 
        id="projects" 
        className="pt-32 pb-16 px-6 max-w-6xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <motion.h1
            className="text-4xl font-bold text-blue-600 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                type: "spring",
                stiffness: 100,
                damping: 10
              }
            }}
          >
            {t('projetPage.title')}
          </motion.h1>

          <motion.p
            className="text-gray-700 text-lg mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.3 }
            }}
          >
            {t('projetPage.description')}
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <div ref={containerRef} className="overflow-hidden relative h-[400px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => (
                activeIndex === index && (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={tickerVariants}
                  >
                    <motion.div
                      className="border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all p-8 bg-white mx-auto"
                      variants={cardVariants}
                      whileHover={{ 
                        y: -5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.h2 
                        className="text-2xl font-semibold text-blue-600 mb-4"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ 
                          x: 0, 
                          opacity: 1,
                          transition: { delay: 0.3 }
                        }}
                      >
                        {project.title}
                      </motion.h2>
                      <motion.p 
                        className="text-gray-600 mb-6 text-lg leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: 1,
                          transition: { delay: 0.4 }
                        }}
                      >
                        {project.description}
                      </motion.p>
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: 1,
                          transition: { delay: 0.5 }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('projetPage.viewProject')}
                      </motion.a>
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          {projects.length > 1 && (
            <div className="flex justify-center gap-6 mt-10 items-center">
              <motion.button
                onClick={goPrev}
                className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors shadow-sm hover:shadow-md"
                aria-label="Previous project"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              {/* Indicators */}
              <div className="flex items-center gap-3">
                {projects.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
                    aria-label={`Go to project ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={goNext}
                className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors shadow-sm hover:shadow-md"
                aria-label="Next project"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          )}
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.8 }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
          >
            {t('projetPage.cta')}
          </a>
        </motion.div>
      </motion.section>
    </>
  );
}
