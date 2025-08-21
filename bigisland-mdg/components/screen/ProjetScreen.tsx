'use client';

import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function ProjetScreen() {
  const { t, i18n } = useTranslation('common');
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  type Project = {
    title: string;
    description: string;
    link: string;
  };

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects([
      {
        title: t('projectPage.projects.project1.title'),
        description: t('projectPage.projects.project1.description'),
        link: 'https://github.com/bigislandmdg'
      },
      {
        title: t('projectPage.projects.project2.title'),
        description: t('projectPage.projects.project2.description'),
        link: 'https://github.com/bigislandmdg'
      },
      {
        title: t('projectPage.projects.project3.title'),
        description: t('projectPage.projects.project3.description'),
        link: 'https://github.com/bigislandmdg'
      },
      {
        title: t('projectPage.projects.project4.title'),
        description: t('projectPage.projects.project4.description'),
        link: 'https://github.com/bigislandmdg'
      },
      {
        title: t('projectPage.projects.project5.title'),
        description: t('projectPage.projects.project5.description'),
        link: 'https://github.com/bigislandmdg'
      },
      {
        title: t('projectPage.projects.project6.title'),
        description: t('projectPage.projects.project6.description'),
        link: 'https://github.com/bigislandmdg'
      },
      {
        title: t('projectPage.projects.project7.title'),
        description: t('projectPage.projects.project7.description'),
        link: 'https://github.com/bigislandmdg'
      }
    ]);
  }, [i18n.language, t]);

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

  return (
    <>
      <Head>
        <title>{t('projectPage.pageTitle')}</title>
        <meta name="description" content={t('projectPage.metaDescription')} />
      </Head>

      <motion.section 
        id="projects" 
        className="pt-32 pb-16 px-6 max-w-6xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* ---- Titre + Description ---- */}
        <motion.h1
          className="text-4xl font-bold text-blue-600 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          {t('projectPage.title')}
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t('projectPage.description')}
        </motion.p>

        {/* ---- Ticker horizontal ---- */}
        <div 
          ref={containerRef} 
          className="overflow-hidden relative w-full h-[400px] cursor-pointer"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="flex gap-6 absolute top-1/2 left-0 -translate-y-1/2"
            animate={{ x: paused ? 0 : ["0%", "-100%"] }}
            transition={{
              repeat: paused ? 0 : Infinity,
              duration: 25,
              ease: "linear"
            }}
          >
            {[...projects, ...projects].map((project, index) => (
              <motion.div
                key={index}
                className="min-w-[320px] max-w-sm border border-gray-200 rounded-lg shadow-lg bg-white p-6 flex-shrink-0"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                  transition: { duration: 0.2 }
                }}
              >
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  {project.title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
                >
                  {t('projectPage.viewProject')}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ---- CTA ---- */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
          >
            {t('projectPage.cta')}
          </a>
        </motion.div>
      </motion.section>
    </>
  );
}
