'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useRef } from 'react';

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

const blogPosts = [
  {
    titleKey: 'blog.post1.title',
    descriptionKey: 'blog.post1.description',
    excerptKey: 'blog.post1.content',
    image: '/images/blog/blog1.jpg',
    link: '/blog/post/post-1',
    publishedDate: new Date(),
  },
  {
    titleKey: 'blog.post2.title',
    descriptionKey: 'blog.post2.description',
    excerptKey: 'blog.post2.content',
    image: '/images/blog/blog2.jpg',
    link: '/blog/post/post-2',
    publishedDate: new Date(Date.now() - 86400000),
  },
  {
    titleKey: 'blog.post3.title',
    descriptionKey: 'blog.post3.description',
    excerptKey: 'blog.post3.content',
    image: '/images/blog/blog3.jpg',
    link: '/blog/post/post-3',
    publishedDate: new Date(Date.now() - 2 * 86400000),
  },
];

export default function BlogScreen() {
  const { t } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const getFirstParagraph = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs[0].replace(/\*\*(.*?)\*\*/g, '$1');
  };

  return (
    <section id="blog" className="bg-white" ref={ref}>
      {/* 🔹 Hero Section avec bannière et texte centré */}
      <div className="relative bg-gray-900 h-[60vh] flex items-center justify-center">
        <Image
          src="/images/banners/contact-hero.jpg"
          alt="Blog Banner"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-black/50" /> {/* overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {t('blog.title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Grille des posts */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-10">

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => {
            const content = t(post.excerptKey);
            const excerpt = getFirstParagraph(content);
            const readTime = calculateReadTime(content);
            const relativeDate = getRelativeDate(post.publishedDate);

            return (
              <motion.article
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={post.image}
                    alt={t(post.titleKey)}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-500 mb-3 flex-wrap">
                    <div className="flex items-center mr-4">
                      <FaCalendarAlt className="mr-2" />
                      <span>{relativeDate}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2" />
                      <span>{readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t(post.titleKey)}
                  </h3>

                  <p className="text-sm text-gray-600 mb-2">
                    {t(post.descriptionKey)}
                  </p>

                  <p className="text-gray-700 mb-5 flex-grow line-clamp-3">
                    {excerpt}
                  </p>

                  <Link
                    href={post.link}
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-auto self-start group"
                  >
                    {t('blog.readMore')}
                    <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

