'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { ArrowRight } from 'lucide-react';

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

  return (
    <section id="blog" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {t('blog.title')}
        </h2>
        <p className="text-lg text-gray-600 mb-16">{t('blog.subtitle')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-56">
                <Image
                  src={post.image}
                  alt={t(post.titleKey)}
                  fill
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t(post.titleKey)}
                </h3>
                <p className="text-gray-600 mb-4">{t(post.descriptionKey)}</p>
                <Link
                  href={post.link}
                  className="inline-flex items-center gap-1 text-blue-600 font-medium hover:underline"
                >
                  {t('blog.readMore')} <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}

