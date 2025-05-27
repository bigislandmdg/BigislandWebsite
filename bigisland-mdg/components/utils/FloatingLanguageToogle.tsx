'use client';

import i18n from '@/i18n/init';
import { useState, useEffect } from 'react';

export default function FloatingLanguageToggle() {
  const [lang, setLang] = useState<'en' | 'fr'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lang') as 'en' | 'fr') || 'en';
    }
    return 'en';
  });

  const changeLanguage = (newLang: 'en' | 'fr') => {
    if (lang !== newLang) {
      i18n.changeLanguage(newLang);
      localStorage.setItem('lang', newLang);
      setLang(newLang);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <div className="fixed mt-5 bottom-9 left-10 z-50">
      <div className="relative w-32 h-8 bg-gray-200 rounded-full shadow-md overflow-hidden">
        <div
          className={`absolute top-0 h-8 w-1/2 bg-blue-500 rounded-full transition-all duration-300 ${
            lang === 'fr' ? 'left-1/2' : 'left-0'
          }`}
        ></div>

        <div className="relative z-10 flex justify-between items-center h-full px-3">
          <div
            onClick={() => changeLanguage('en')}
            className="flex items-center space-x-1 cursor-pointer text-gray-800"
          >
            <img src="/icons/us.svg" alt="English" className="w-4 h-4" />
            <span className="text-sm font-semibold">US</span>
          </div>
          <div
            onClick={() => changeLanguage('fr')}
            className="flex items-center space-x-1 cursor-pointer text-gray-800"
          >
            <img src="/icons/fr.svg" alt="Français" className="w-4 h-4" />
            <span className="text-sm font-semibold">FR</span>
          </div>
        </div>
      </div>
    </div>
  );
}
