'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'next-i18next';

const blogPosts = [
  {
    titleKey: 'blog.post1.title',
    descriptionKey: 'blog.post1.description',
    image: '/images/blog/blog1.jpg',
    link: '/blog/post/post-1',
  },
  {
    titleKey: 'blog.post2.title',
    descriptionKey: 'blog.post2.description',
    image: '/images/blog/blog2.jpg',
    link: '/blog/post/post-2',
  },
  {
    titleKey: 'blog.post3.title',
    descriptionKey: 'blog.post3.description',
    image: '/images/blog/blog3.jpg',
    link: '/blog/post/post-3',
  },
];

export default function BlogSection() {
  const { t } = useTranslation('common');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section id="blog" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Titre */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('blog.title')}
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('blog.subtitle')}
        </motion.p>

        {/* Cartes articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={idx}
              className="relative w-75 h-110 overflow-hidden shadow-lg cursor-pointer group"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Image */}
              <Image
                src={post.image}
                alt={t(post.titleKey)}
                fill
                className="object-cover w-full h-full"
              />

              {/* Overlay texte animé */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-sky-800 backdrop-blur-md p-6 flex flex-col gap-3 border-t-4 border-teal-400 text-white"
                initial={{ y: 0 }}
                whileHover={{ y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)',
                }}
              >
                <h3 className="text-lg font-bold text-teal-400">
                  {t(post.titleKey)}
                </h3>
                <p className="text-sm line-clamp-3">{t(post.descriptionKey)}</p>

                {/* Bouton "Lire la suite" */}
                <div className="mt-2">
                  <Link
                    href={post.link}
                    className="inline-flex items-center justify-center w-10 h-10 text-white border border-white hover:bg-white hover:text-sky-700 transition-colors"
                  >
                    <motion.div whileHover={{ y: -5, scale: 1.1 }}>
                      <ArrowRight size={18} />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

