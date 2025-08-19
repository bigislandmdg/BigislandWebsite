'use client';

import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

// 🔹 Utilitaire: découpe en graphèmes (fallback compatible emoji)
function toGraphemes(input: string): string[] {
  try {
    // @ts-ignore: Intl.Segmenter may not exist in all TS libs
    const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    // @ts-ignore
    return Array.from(seg.segment(input), (s) => s.segment);
  } catch {
    // Fallback raisonnable
    return Array.from(input);
  }
}

// 🔹 Composant typewriter avec curseur clignotant (safe contre undefined)
function TypewriterText({
  text,
  speed = 50,
  hideCursorOnDone = false,
}: {
  text?: string;           // <- text peut être undefined selon i18n
  speed?: number;
  hideCursorOnDone?: boolean;
}) {
  // Assure une chaîne propre (évite "undefined" / null)
  const safeText = typeof text === 'string' ? text : '';
  const chars = useMemo(() => toGraphemes(safeText), [safeText]);

  const [index, setIndex] = useState(0);

  // Reset quand le texte change (ex: changement de langue)
  useEffect(() => {
    setIndex(0);
  }, [safeText, speed]);

  // Avance caractère par caractère
  useEffect(() => {
    if (index >= chars.length) return;
    const id = setTimeout(() => setIndex((i) => i + 1), speed);
    return () => clearTimeout(id);
  }, [index, chars.length, speed]);

  const displayed = chars.slice(0, index).join('');
  const done = index >= chars.length;

  return (
    <motion.p
      className="text-lg italic text-gray-700 mb-6 min-h-[60px] flex justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      “{displayed}
      {/* Curseur clignotant */}
      <motion.span
        className="ml-1 text-gray-900"
        style={{ visibility: hideCursorOnDone && done ? 'hidden' : 'visible' }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        |
      </motion.span>
      ”
    </motion.p>
  );
}

export default function TestimonySection() {
  const { t } = useTranslation('common');

  return (
    <section id="testimony" className="px-4 py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('testimony.title')}
        </motion.h2>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* 💡 Texte avec machine à écrire + curseur (safe) */}
          <TypewriterText text={t('testimony.message')} speed={40} hideCursorOnDone={false} />

          <div className="flex items-center justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/ceo.jpg"
                alt="CEO of BigIsland"
                width={90}
                height={190}
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
        </motion.div>
      </div>
    </section>
  );
}
