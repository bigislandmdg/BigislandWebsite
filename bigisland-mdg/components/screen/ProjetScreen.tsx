'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

type Project = { title: string; description: string; link: string; image: string };

export default function ProjetScreen() {
  const { t, i18n } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(0);

  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  useEffect(() => {
    setProjects([
      { title: t('projectPage.projects.project1.title'), description: t('projectPage.projects.project1.description'), link: 'https://github.com/bigislandmdg', image: '/images/projects/learning-app.jpg' },
      { title: t('projectPage.projects.project2.title'), description: t('projectPage.projects.project2.description'), link: 'https://github.com/bigislandmdg', image: '/images/projects/online-course.jpg' },
      { title: t('projectPage.projects.project3.title'), description: t('projectPage.projects.project3.description'), link: 'https://github.com/bigislandmdg', image: '/images/projects/furniture.jpg' },
      { title: t('projectPage.projects.project4.title'), description: t('projectPage.projects.project4.description'), link: 'https://github.com/bigislandmdg', image: '/images/projects/fleet-management.jpg' },
      { title: t('projectPage.projects.project5.title'), description: t('projectPage.projects.project5.description'), link: 'https://github.com/bigislandmdg', image: '/images/projects/call-center.jpg' },
      { title: t('projectPage.projects.project6.title'), description: t('projectPage.projects.project6.description'), link: 'https://github.com/bigislandmdg', image: '/images/projects/marketing-crm.jpg' },
    ]);
  }, [i18n.language, t]);

  const scrollToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Slice des projets visibles
  const visibleProjects = projects.slice(
    page * projectsPerPage,
    page * projectsPerPage + projectsPerPage
  );

  return (
    <section>
      {/* ===== Hero Section ===== */}
      <div className="relative bg-zinc-50">
        <div
          className="absolute inset-0 w-full h-full z-0 py-10"
          style={{
            backgroundImage: "url('/images/heros/project-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start text-left px-6 py-34 min-h-[500px] max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg py-8"
          >
            {t('projectPage.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 text-lg md:text-xl text-zinc-200 leading-relaxed max-w-xl"
          >
            {t('projectPage.description')}
          </motion.p>
          <motion.a
            href="#projects"
            onClick={scrollToContent}
            className="mt-12 inline-flex items-center gap-2  bg-teal-700 px-6 py-3 text-white font-bold shadow-lg hover:bg-teal-800 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('projectPage.cta')}
            <motion.span
              className="inline-block"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </div>
      </div>

      {/* ===== Project Carousel ===== */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-28" ref={ref} id="projects">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={page} // clé unique pour chaque "page"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="relative w-full h-110 overflow-hidden shadow-lg  cursor-pointer group"
                  whileHover="hover"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover w-full h-full"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-sky-700 backdrop-blur-md p-6 border-t-4 text-white flex flex-col gap-3"
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0% 100%)",
                    }}
                    initial={{ y: 0 }}
                    variants={{
                      hover: { y: -20, transition: { duration: 0.5, ease: 'easeOut' } },
                    }}
                  >
                    <h5 className="text-lg font-bold text-teal-400">{project.title}</h5>
                    <p className="text-sm line-clamp-3">{project.description}</p>
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10  text-white border border-white hover:bg-white hover:text-sky-700 transition-colors"
                      variants={{
                        hover: { y: -10, transition: { duration: 0.4, ease: 'easeOut' } },
                      }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.a>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Boutons navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              className="p-3 bg-sky-900 text-white hover:bg-sky-700 disabled:opacity-40"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="text-sm text-zinc-500">
               {page + 1} / {totalPages}
            </span>
            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              className="p-3 bg-sky-900 text-white hover:bg-sky-700 disabled:opacity-40"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

