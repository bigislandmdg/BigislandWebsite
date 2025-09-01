'use client';

import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { FolderGit2 } from 'lucide-react';

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

      {/* ---- Banner Header ---- */}
      <section className="relative h-64 md:h-80 w-full bg-blue-600">
        <Image
                    src="/images/banners/contact-hero.jpg"
                    alt="Contact Hero"
                    fill
                    className="object-cover"
                    priority
                  />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <FolderGit2 className="text-white text-5xl mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {t('projectPage.title')}
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              {t('projectPage.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---- Project Scroller ---- */}
      <motion.section
        id="projects"
        className="pt-16 pb-16 px-6 max-w-6xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div
          ref={containerRef}
          className="overflow-hidden relative w-full h-[420px] cursor-pointer"
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
                  boxShadow:
                    "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
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

        {/* ---- CTA Simple Justified ---- */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t('projectPage.ctaTitle') || 'Vous voulez en savoir plus ?'}
          </h2>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            {t('projectPage.cta')}
          </a>
        </section>
      </motion.section>
    </>
  );
}

