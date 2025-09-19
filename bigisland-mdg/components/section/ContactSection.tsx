'use client';

import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { CalendarDays } from 'lucide-react';

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

// Effet machine à écrire
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

export default function ContactSection() {
  const { t } = useTranslation('common');

  return (
    <section className="relative bg-sky-50">
      <div className="lg:grid lg:grid-cols-12 lg:gap-0 lg:items-center">

        {/* ==== Texte à gauche ==== */}
        <motion.div
          className="relative py-16 px-6 sm:px-12 lg:px-16 lg:col-span-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-teal-700 sm:text-4xl">
            {t('contact.title')}
          </h2>

          <div className="mt-6">
            <TypewriterText text={t('contact.subtitle')} speed={40} />
          </div>

          {/* CTA */}
          <div className="mt-8">
  <motion.a
    href="https://meet.google.com/new"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 bg-sky-700 px-6 py-3 text-white text-base font-medium shadow-md"
    initial={{ scale: 0.95, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.3)" }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.3 }}
    viewport={{ once: true }}
  >
    <CalendarDays className="w-5 h-5" />
    {t('contact.scheduleMeeting')}
  </motion.a>
</div>

        </motion.div>

        {/* ==== Map à droite ==== */}
        <motion.div
          className="relative lg:col-span-6 h-80 sm:h-[28rem] lg:h-full"
          initial={{ opacity: 0, x: 50, rotate: 5, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 lg:mr-[-10%] lg:skew-x-[5deg] overflow-hidden">
            <iframe
              title="Localisation"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.715308399614!2d47.5516228!3d-18.9367256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07db98002fbc3%3A0x8908c61af0aa07e8!2sPharmacie%20Hasin%27ny%20Aina!5e0!3m2!1sfr!2smg!4v1693945000000!5m2!1sfr!2smg"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="h-full w-full border-0 lg:skew-x-[-5deg] transform-gpu"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

