'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface LogoMinimalProps {
  withLink?: boolean;
  className?: string;
  slogan?: string;
}

export default function LogoMinimal({
  withLink = true,
  className,
  slogan = "Innovation & Simplicité",
}: LogoMinimalProps) {
  const logoContent = (
    <motion.div
      className={`flex flex-col items-center text-center select-none ${className || ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Bloc rectangulaire stylisé */}
      <motion.div
        className="px-7 py-0"
        whileHover={{
          scale: 1.05,
        
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-2xl font-extrabold text-sky-700 tracking-tight">BigIsland</span>
        <span className="text-2xl font-extrabold text-zinc-700 ml-1 tracking-tight">MDG</span>
      </motion.div>

      {/* Slogan */}
      {slogan && (
        <motion.span
          className="mt-2 text-sm text-gray-600 font-medium"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {slogan}
        </motion.span>
      )}
    </motion.div>
  );

  return withLink ? (
    <Link href="/" className="flex items-center">
      {logoContent}
    </Link>
  ) : (
    logoContent
  );
}
