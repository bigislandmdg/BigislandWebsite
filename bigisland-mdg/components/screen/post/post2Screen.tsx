'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaShareAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Post2Screen() {
  const { t } = useTranslation('common');
  const content = t('blog.post2.content');
  const paragraphs = content.split('\n\n');
  const readTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

  // Fonction pour obtenir la date relative traduite
  const getRelativeDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t('blog.today');
    if (diffDays === 1) return t('blog.yesterday');
    if (diffDays < 7) return t('blog.daysAgo', { count: diffDays });
    
    return format(
      date,
      'PPP',
     
    );
  };

  return (
    <main className="px-4 py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header avec bouton retour */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
          >
            <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            {t('blog.backToList')}
          </Link>
        </motion.div>

        {/* Carte principale */}
        <motion.article 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* En-tête de l'article */}
          <div className="p-6 border-b border-gray-100">
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t('blog.post2.title')}
            </motion.h1>

            <motion.div 
              className="flex flex-wrap items-center text-sm text-gray-500 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                  {getRelativeDate(new Date())}
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2" />
                 {t('blog.readTime', { count: readTime })}
              </div>
              <button className="flex items-center text-blue-600 hover:text-blue-800 ml-auto">
                <FaShareAlt className="mr-2" />
                   {t('blog.share')}
              </button>
            </motion.div>
          </div>

          {/* Contenu de l'article avec cartes animées */}
          <div className="p-6 md:p-8">
            {paragraphs.map((paragraph, index) => (
              <motion.div
                key={index}
                className="mb-6 last:mb-0 bg-gray-50 p-5 rounded-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3 + index * 0.15,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <p 
                  className="text-gray-700 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ 
                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Pied de page */}
          <motion.div 
            className="p-6 border-t border-gray-100 bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
            >
              <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
              {t('blog.backToList')}
            </Link>
          </motion.div>
        </motion.article>
      </div>
    </main>
  );
}
