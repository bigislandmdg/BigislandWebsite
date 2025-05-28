'use client';

import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ProjetScreen() {
  const { t, i18n } = useTranslation('common');

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 }
    }),
  };

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
        link: 'https://github.com/votre-utilisateur/projet1'
      },
      {
        title: t('projetPage.projects.project2.title'),
        description: t('projetPage.projects.project2.description'),
        link: 'https://github.com/votre-utilisateur/projet2'
      },
      
        {
            title: t('projetPage.projects.project3.title'),
            description: t('projetPage.projects.project3.description'),
            link: 'https://github.com/votre-utilisateur/projet3'
        }
    ]);
  }, [i18n.language, t]);

  return (
    <>
      <Head>
        <title>{t('projetPage.pageTitle')}</title>
        <meta
          name="description"
          content={t('projetPage.metaDescription')}
        />
      </Head>

      <section id="projects" className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-blue-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('projetPage.title')}
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg mb-8 max-w-3xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('projetPage.description')}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="border rounded-lg shadow hover:shadow-md transition p-4 bg-white"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <h2 className="text-xl font-semibold text-blue-600">{project.title}</h2>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-4 inline-block"
              >
                {t('projetPage.viewProject')}
              </a>
            </motion.div>
          ))}
        </div>

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
            {t('projetPage.cta')}
          </a>
        </motion.div>
      </section>
    </>
  );
}
