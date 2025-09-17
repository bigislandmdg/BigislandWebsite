'use client';

import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

// Fonction pour découper les emojis correctement
function toGraphemes(input: string): string[] {
  try {
    // @ts-ignore
    const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    // @ts-ignore
    return Array.from(seg.segment(input), (s) => s.segment);
  } catch {
    return Array.from(input);
  }
}

// Machine à écrire
function TypewriterText({
  text,
  speed = 50,
  hideCursorOnDone = false,
}: {
  text?: string;
  speed?: number;
  hideCursorOnDone?: boolean;
}) {
  const safeText = typeof text === 'string' ? text : '';
  const chars = useMemo(() => toGraphemes(safeText), [safeText]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [safeText, speed]);

  useEffect(() => {
    if (index >= chars.length) return;
    const id = setTimeout(() => setIndex((i) => i + 1), speed);
    return () => clearTimeout(id);
  }, [index, chars.length, speed]);

  const displayed = chars.slice(0, index).join('');
  const done = index >= chars.length;

  return (
    <span className="text-gray-900 text-lg sm:text-xl">
      {displayed}
      <motion.span
        className="ml-1"
        style={{ visibility: hideCursorOnDone && done ? 'hidden' : 'visible' }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        |
      </motion.span>
    </span>
  );
}

export default function TestimonySection() {
  const { t } = useTranslation('common');

  return (
    <section className="bg-blue-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
          
          {/* Left Image */}
          {/* Left Image */}
<motion.div
  className="relative lg:col-span-5"
  initial={{ opacity: 0, x: -50, rotate: -5, scale: 0.9 }}
  whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  viewport={{ once: true }}
  whileHover={{ scale: 1.05, rotate: 1, boxShadow: "0px 10px 30px rgba(0,0,0,0.2)" }}
  whileTap={{ scale: 0.97 }}
>
  <Image
    src="/images/ceo.jpg"
    alt="CEO of BigIsland"
    width={700}
    height={1200}
    className="rounded-2xl object-cover shadow-lg"
  />
</motion.div>


          {/* Right Text + CTA */}
          <motion.div
            className="mt-10 lg:mt-0 lg:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('testimony.title')}
            </h2>
            <div className="mt-6 text-gray-700 text-lg sm:text-xl">
              <TypewriterText text={t('testimony.message')} speed={40} />
            </div>

            {/* 
              <Image
                src="/images/ceo.jpg"
                alt={t('testimony.name')}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
            Auteur */}
            <div className="mt-6 flex items-center gap-4">
              
              <div>
                <p className="text-gray-900 font-semibold">{t('testimony.name')}</p>
                <p className="text-gray-600 text-sm">{t('testimony.position')}</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
