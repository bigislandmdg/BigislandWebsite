'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    titleKey: 'blog.post1.title',
    excerptKey: 'blog.post1.content',
    link: '/blog/post/post-1',
    publishedDate: new Date(),
    image: '/images/blog/blog1.jpg',
  },
  {
    titleKey: 'blog.post2.title',
    excerptKey: 'blog.post2.content',
    link: '/blog/post/post-2',
    publishedDate: new Date(Date.now() - 86400000),
    image: '/images/blog/blog2.jpg',
  },
  {
    titleKey: 'blog.post3.title',
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

  // Scroll to blog cards section
  const scrollToContent = () => {
    if (ref.current) {
      (ref.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getFirstParagraph = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs[0].replace(/\*\*(.*?)\*\*/g, '$1');
  };

  const calculateReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min`;
  };

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

<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-36 flex flex-col justify-center items-start text-left">
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="mt-1 text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg py-4"
  >
    {t('blog.title')}
  </motion.h1>
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.8 }}
    className="mt-4 text-lg md:text-xl text-zinc-200 leading-relaxed max-w-xl"
  >
    {t('blog.subtitle')}
  </motion.p>

 
    
    <motion.span
      className="mt-6 inline-flex items-center gap-2 bg-teal-700 px-6 py-3 text-white font-medium shadow-lg hover:bg-teal-700 transition"
      onClick={scrollToContent}
      whileHover={{ x: 5 }}  // Déplacement horizontal au survol
      whileTap={{ scale: 0.9 }} // Légère compression au clic
      animate={{ x: [0, 3, 0] }} // Animation de petit bounce horizontal en boucle
      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
    > {t('blog.cta')}
      <ArrowRight className="w-4 h-4" />
    </motion.span>
 
</div>

      </div>

      {/* ===== Blog Cards ===== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
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
                className="relative w-full h-130 overflow-hidden shadow-lg group cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={post.image}
                    alt={t(post.titleKey)}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>

                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 bg-sky-800 backdrop-blur-md p-12 border-t-3 flex flex-col gap-3 text-white"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0% 100%)' }}
                >
                  <div className="flex items-center text-xs text-gray-200 mb-1">
                    <FaCalendarAlt className="mr-2 text-blue-400" />
                    <span className="mr-4">{relativeDate}</span>
                    <FaClock className="mr-2 text-blue-400" />
                    <span>{readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-teal-400">{t(post.titleKey)}</h3>
                  <p className="text-sm line-clamp-3">{excerpt}</p>
                   <motion.div
                     whileHover={{ y: -10, transition: { duration: 0.4, ease: 'easeOut' } }}
                      className="absolute bottom-4 right-4 inline-flex items-center justify-center w-10 h-10  text-white border border-white hover:bg-white hover:text-sky-700 transition-colors cursor-pointer"
                  >
                 <Link href={post.link} className="flex items-center justify-center w-full h-full">
                     <FaArrowRight className="w-5 h-5" />
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

