'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
      <div className="relative bg-gray-50">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/images/heros/blog-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 py-32 min-h-[400px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-1 text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg py-4"
          >
            {t('blog.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed"
          >
            {t('blog.subtitle')}
          </motion.p>
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 inline-flex items-center gap-2 rounded bg-blue-600 px-6 py-3 text-white font-medium shadow-lg hover:bg-blue-700 transition"
          >
            {t('blog.cta')}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
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
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
        >
          {/* Image avec overlay */}
          <div className="relative w-full h-56">
            <Image
              src={post.image}
              alt={t(post.titleKey)}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>

          {/* Contenu */}
          <div className="flex flex-col p-6 relative">
            {/* Meta */}
            <div className="flex items-center text-xs text-gray-400 mb-3">
              <FaCalendarAlt className="mr-2 text-blue-500" />
              <span className="mr-4">{relativeDate}</span>
              <FaClock className="mr-2 text-blue-500" />
              <span>{readTime}</span>
            </div>

            {/* Titre */}
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">
              {t(post.titleKey)}
            </h3>

            {/* Extrait */}
            <p className="text-gray-600 text-sm mb-16 line-clamp-3">{excerpt}</p>

            {/* Bouton flottant */}
            <motion.div
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 right-4"
            >
              <Link
                href={post.link}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              >
                {t('blog.readMore')}
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      );
    })}
  </motion.div>
</div>

    </section>
  );
}

