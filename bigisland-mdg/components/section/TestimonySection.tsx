'use client';

import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

// 🔹 Découpage graphemes (sécurité emojis)
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

// 🔹 Machine à écrire + curseur clignotant
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
    <motion.blockquote
      className="mt-10 text-xl font-medium leading-8 text-gray-900 sm:text-2xl sm:leading-9"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      “{displayed}
      <motion.span
        className="ml-1 text-gray-900"
        style={{ visibility: hideCursorOnDone && done ? 'hidden' : 'visible' }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        |
      </motion.span>
      ”
    </motion.blockquote>
  );
}

export default function TestimonySection() {
  const { t } = useTranslation('common');

  return (
    <section id="testimony" className="bg-gray-100 py-20 sm:py-12">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        {/* 🔹 Titre */}
        <motion.h2
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('testimony.title')}
        </motion.h2>

        {/* 🔹 Message typewriter */}
        <TypewriterText text={t('testimony.message')} speed={40} />

        {/* 🔹 Auteur */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/ceo.jpg"
              alt="CEO of BigIsland"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </motion.div>

          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="font-semibold text-gray-900">{t('testimony.name')}</p>
            <p className="text-sm text-gray-600">{t('testimony.position')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

