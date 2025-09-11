'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  cursor?: boolean;
  cursorStyle?: string;
}

const TypewriterText = ({
  text,
  className = '',
  delay = 0.05,
  cursor = true,
  cursorStyle = 'ml-0.5 h-6 w-1 bg-current',
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setShowCursor(true);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    } else {
      const blinkInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);

      const stopTimeout = setTimeout(() => {
        clearInterval(blinkInterval);
        setShowCursor(false);
      }, 2000);

      return () => {
        clearInterval(blinkInterval);
        clearTimeout(stopTimeout);
      };
    }
  }, [currentIndex, text, delay]);

  return (
    <span className={`${className} inline-flex items-center`}>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {displayedText}
      </motion.span>
      {cursor && showCursor && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
          className={cursorStyle}
        />
      )}
    </span>
  );
};

export default TypewriterText;
