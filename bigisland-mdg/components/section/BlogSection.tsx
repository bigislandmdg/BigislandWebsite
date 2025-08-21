'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';

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
  const [selectedPost, setSelectedPost] = useState<any>(null);

  return (
    <section id="blog" className="px-4 py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('blog.title')}
        </motion.h2>

        <p className="text-lg text-gray-600 mb-12">{t('blog.subtitle')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ rotateX: 8, rotateY: -8, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedPost(post)}
              layoutId={`card-${index}`} // Shared Layout ID
            >
              <motion.div layoutId={`image-${index}`}>
                <Image
                  src={post.image}
                  alt={t(post.titleKey)}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </motion.div>

              <div className="p-6 text-left">
                <motion.h3
                  className="text-lg font-semibold text-gray-800 mb-2"
                  layoutId={`title-${index}`}
                >
                  {t(post.titleKey)}
                </motion.h3>
                <motion.p
                  className="text-sm text-gray-600 mb-4"
                  layoutId={`desc-${index}`}
                >
                  {t(post.descriptionKey)}
                </motion.p>
                <Link
                  href={post.link}
                  className="text-blue-600 hover:underline text-sm font-medium inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t('blog.readMore')} <FaArrowRight className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🔥 Modal avec Shared Layout */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden"
              layoutId={`card-${blogPosts.indexOf(selectedPost)}`}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div layoutId={`image-${blogPosts.indexOf(selectedPost)}`}>
                <Image
                  src={selectedPost.image}
                  alt={t(selectedPost.titleKey)}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              </motion.div>

              <div className="p-8 text-left">
                <motion.h3
                  className="text-2xl font-bold text-gray-800 mb-4"
                  layoutId={`title-${blogPosts.indexOf(selectedPost)}`}
                >
                  {t(selectedPost.titleKey)}
                </motion.h3>
                <motion.p
                  className="text-gray-600 mb-6"
                  layoutId={`desc-${blogPosts.indexOf(selectedPost)}`}
                >
                  {t(selectedPost.descriptionKey)}
                </motion.p>
                <Link
                  href={selectedPost.link}
                  className="text-blue-600 font-medium hover:underline"
                >
                  {t('blog.readMore')}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
