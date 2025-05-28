'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function Post3Screen() {
  const { t } = useTranslation('common');

  return (
    <main className="px-4 py-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('blog.post3.title')}
        </motion.h1>

        <motion.p
          className="text-lg text-gray-700 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {t('blog.post3.content')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-block text-blue-600 hover:underline text-sm font-medium"
          >
            ← {t('blog.backToList')}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
