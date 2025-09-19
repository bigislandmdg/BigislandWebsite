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
    <span className="text-zinc-900 text-lg sm:text-xl leading-relaxed">
      {displayed}
      <motion.span
        className="ml-1 text-teal-700"
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
    <section className="relative bg-sky-100">
      <div className="lg:grid lg:grid-cols-12 lg:gap-0 lg:items-center">
        
        {/* ==== Image gauche en diagonale ==== */}
        <motion.div
          className="relative lg:col-span-5 h-80 sm:h-[28rem] lg:h-full"
          initial={{ opacity: 0, x: -50, rotate: -5, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 lg:ml-[-10%] lg:skew-x-[-5deg] overflow-hidden">
            <Image
              src="/images/ceo.jpg"
              alt="CEO of BigIsland"
              fill
              priority
              className="object-cover object-center lg:skew-x-[6deg] transform-gpu"
            />
          </div>
        </motion.div>

        {/* ==== Texte à droite ==== */}
        <motion.div
          className="relative py-16 px-6 sm:px-12 lg:px-16 lg:col-span-7"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-teal-700 sm:text-4xl">
            {t('testimony.title')}
          </h2>

          <div className="mt-6 p-6">
            <TypewriterText text={t('testimony.message')} speed={40} />
          </div>

          {/* Auteur */}
          <div className="mt-8 flex items-center gap-4">
            
            <div>
              <p className="text-zinc-900 font-semibold">{t('testimony.name')}</p>
              <p className="text-sky-700 text-medium">{t('testimony.position')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

