'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { motion, useInView } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';

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

type Project = { title: string; description: string; link: string };

export default function ProjetScreen() {
  const { t, i18n } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [projects, setProjects] = useState<Project[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setProjects([
      { title: t('projectPage.projects.project1.title'), description: t('projectPage.projects.project1.description'), link: 'https://github.com/bigislandmdg' },
      { title: t('projectPage.projects.project2.title'), description: t('projectPage.projects.project2.description'), link: 'https://github.com/bigislandmdg' },
      { title: t('projectPage.projects.project3.title'), description: t('projectPage.projects.project3.description'), link: 'https://github.com/bigislandmdg' },
      { title: t('projectPage.projects.project4.title'), description: t('projectPage.projects.project4.description'), link: 'https://github.com/bigislandmdg' },
      { title: t('projectPage.projects.project5.title'), description: t('projectPage.projects.project5.description'), link: 'https://github.com/bigislandmdg' },
      { title: t('projectPage.projects.project6.title'), description: t('projectPage.projects.project6.description'), link: 'https://github.com/bigislandmdg' },
      { title: t('projectPage.projects.project7.title'), description: t('projectPage.projects.project7.description'), link: 'https://github.com/bigislandmdg' }
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
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">{t('projectPage.title')}</h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-700">{t('projectPage.description')}</p>
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
                src="/images/heros/project-hero.jpg"
                alt="It illustration"
                fill
                priority
                className="relative object-cover rounded-3xl shadow-lg"
                />
              </div>
            </motion.div>
        </div>
      </div>

      {/* ===== Project Scroller ===== */}
      <motion.div
        ref={ref}
        className="mx-auto max-w-7xl px-6 lg:px-8 py-20 overflow-hidden relative"
      >
        <motion.div
          className="flex gap-6"
          animate={{ x: paused ? 0 : ["0%", "-100%"] }}
          transition={{ repeat: paused ? 0 : Infinity, duration: 25, ease: "linear" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {[...projects, ...projects].map((project, index) => (
            <TiltCard key={index} className="min-w-[320px] max-w-sm p-6 flex-shrink-0">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="flex flex-col h-full"
              >
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">{project.title}</h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
                >
                  {t('projectPage.viewProject')}
                </a>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>

        {/* ---- CTA Simple Justified ---- */}
        <section className="mt-16 bg-gradient-to-r from-blue-500 to-blue-100 text-white rounded-xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t('projectPage.ctaTitle') || 'Want to know more?'}
          </h2>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            {t('projectPage.cta')}
          </a>
        </section>
      </motion.div>
    </section>
  );
}

