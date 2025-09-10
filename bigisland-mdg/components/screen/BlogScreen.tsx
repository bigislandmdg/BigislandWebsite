'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useRef, useState } from 'react';

// ✅ Effet tilt sur la souris
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const rotateX = ((y / offsetHeight) - 0.5) * 12;
    const rotateY = ((x / offsetWidth) - 0.5) * -12;

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
    });
  };

  const resetStyle = () => {
    setStyle({ transform: 'rotateX(0deg) rotateY(0deg) scale(1)' });
  };

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

// ✅ Helpers
const getRelativeDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = today.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return `Il y a ${diffDays} jours`;

  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const calculateReadTime = (content: string) => {
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min`;
};

// ✅ Données articles
const blogPosts = [
  {
    titleKey: 'blog.post1.title',
    descriptionKey: 'blog.post1.description',
    excerptKey: 'blog.post1.content',
    link: '/blog/post/post-1',
    publishedDate: new Date(),
    image: '/images/blog/blog1.jpg',
  },
  {
    titleKey: 'blog.post2.title',
    descriptionKey: 'blog.post2.description',
    excerptKey: 'blog.post2.content',
    link: '/blog/post/post-2',
    publishedDate: new Date(Date.now() - 86400000),
    image: '/images/blog/blog2.jpg',
  },
  {
    titleKey: 'blog.post3.title',
    descriptionKey: 'blog.post3.description',
    excerptKey: 'blog.post3.content',
    link: '/blog/post/post-3',
    publishedDate: new Date(Date.now() - 2 * 86400000),
    image: '/images/blog/blog3.jpg',
  },
];

export default function BlogScreen({ layout = "grid" }: { layout?: "grid" | "list" }) {
  const { t } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const getFirstParagraph = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs[0].replace(/\*\*(.*?)\*\*/g, '$1');
  };

  return (
    <section id="blog">
      {/* ===== Hero Section ===== */}
      <div className="relative bg-gradient-to-l from-blue-50 to-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Texte à gauche */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900"
            >
              {t('blog.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-gray-700"
            >
              {t('blog.subtitle')}
            </motion.p>
          </div>

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
                src="/images/blog-hero.jpg"
                alt="Blog illustration"
                fill
                priority
                className="relative object-cover rounded-3xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== Liste des articles ===== */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10" : "space-y-10"}
        >
          {blogPosts.map((post, index) => {
            const content = t(post.excerptKey);
            const excerpt = getFirstParagraph(content);
            const readTime = calculateReadTime(content);
            const relativeDate = getRelativeDate(post.publishedDate);

            return (
              <TiltCard key={index} className="group hover:shadow-2xl">
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={layout === "grid" ? "flex flex-col h-full" : "grid grid-cols-1 md:grid-cols-3 gap-6"}
                >
                 {/* Image */}
                 {layout === "grid" ? (
                 <div className="relative w-full h-35 md:h-40 lg:h-60">
                 <Image
                   src={post.image}
                   alt={t(post.titleKey)}
                   fill
                   className="object-cover rounded-t-2xl"
                />
             </div>
          ) : (
          <div className="relative w-full h-56 md:h-full md:col-span-1">
           <Image
           src={post.image}
           alt={t(post.titleKey)}
      fill
      className="object-cover rounded-l-2xl"
    />
  </div>
)}


                  {/* Contenu */}
                  <div className={layout === "grid" ? "flex flex-col flex-1 p-6" : "md:col-span-2 flex flex-col p-6"}>
                    {/* Meta */}
                    <div className="flex items-center text-sm text-gray-500 mb-4 flex-wrap">
                      <div className="flex items-center mr-4">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        <span>{relativeDate}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-2 text-blue-500" />
                        <span>{readTime}</span>
                      </div>
                    </div>

                    {/* Titre */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {t(post.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3">
                      {t(post.descriptionKey)}
                    </p>

                    {/* Extrait */}
                    <p className="text-gray-700 mb-6 flex-grow line-clamp-3">
                      {excerpt}
                    </p>

                    {/* Lire plus */}
                    <Link
                      href={post.link}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-auto self-start group"
                    >
                      {t('blog.readMore')}
                      <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

