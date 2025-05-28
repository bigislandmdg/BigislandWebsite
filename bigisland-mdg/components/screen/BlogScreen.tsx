'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';

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

export default function BlogScreen() {
  const { t } = useTranslation('common');

  return (
    <main className="px-4 py-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('blog.title')}
        </motion.h1>
        <p className="text-lg text-gray-600 mb-12">{t('blog.subtitle')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src={post.image}
                alt={t(post.titleKey)}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t(post.titleKey)}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t(post.descriptionKey)}
                </p>
                <Link
                  href={post.link}
                  className="text-blue-600 hover:underline text-sm font-medium inline-flex items-center gap-1"
                >
                  {t('blog.readMore')} <FaArrowRight className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
