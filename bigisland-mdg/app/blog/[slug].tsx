// pages/blog/[slug].tsx
'use client';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const blogContent = {
  'post-1': {
    image: '/images/blog1.jpg',
    titleKey: 'blog.post1.title',
    contentKey: 'blog.post1.content',
  },
  'post-2': {
    image: '/images/blog2.jpg',
    titleKey: 'blog.post2.title',
    contentKey: 'blog.post2.content',
  },
  'post-3': {
    image: '/images/blog3.jpg',
    titleKey: 'blog.post3.title',
    contentKey: 'blog.post3.content',
  },
};

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useTranslation('common');

  const validSlugs = Object.keys(blogContent) as Array<keyof typeof blogContent>;
  if (!slug || typeof slug !== 'string' || !validSlugs.includes(slug as keyof typeof blogContent)) {
    return <p className="text-center mt-20">Article introuvable.</p>;
  }

  const post = blogContent[slug as keyof typeof blogContent];

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline flex items-center gap-2 mb-6"
      >
        <FaArrowLeft />
        {t('blog.backToList')}
      </Link>

      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t(post.titleKey)}
      </motion.h1>

      <Image
        src={post.image}
        alt={t(post.titleKey)}
        width={800}
        height={400}
        className="w-full h-64 object-cover rounded-lg mb-8"
      />

      <motion.p
        className="text-lg text-gray-700 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {t(post.contentKey)}
      </motion.p>
    </section>
  );
}

// Traduction SSR
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

// Permet à Next.js de pré-construire les pages
export async function getStaticPaths() {
  const slugs = ['post-1', 'post-2', 'post-3'];
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
}
