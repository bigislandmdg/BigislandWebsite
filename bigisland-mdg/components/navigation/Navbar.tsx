'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Languages, Laptop, Truck, Linkedin, Twitter, Facebook, Mail, Phone, MessageCircle } from "lucide-react";
import { useTranslation } from 'next-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import i18n from '@/i18n/init';
import { FaLinkedin } from 'react-icons/fa';
import LogoMinimal from '../utils/LogoMinimal';

export default function Navbar() {
  const { t } = useTranslation('common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [heroVisible, setHeroVisible] = useState(true); // ✅ nouveau state
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const storedLang = (localStorage.getItem('lang') as 'en' | 'fr') || 'en';
    setLang(storedLang);
    i18n.changeLanguage(storedLang);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (newLang: 'en' | 'fr') => {
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
    setLang(newLang);
    setLangOpen(false);
  };

  // ✅ Raccourci clavier Ctrl+K (ouvrir) et Esc (fermer)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }

      if (e.key === 'Escape') {
        setSearchOpen(false);
        if (openDropdown) setOpenDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openDropdown]);

  // 📌 Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 📌 IntersectionObserver pour section active
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Fonction pour class des liens
  const navLinkClass = (id: string) =>
    `relative pb-1 transition-colors duration-200 ${
      activeSection === id
        ? 'text-sky-900 font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-sky-900'
        : 'text-zinc-700 hover:text-sky-900'
    }`;

  // Fermer les dropdowns en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: any[] = [];
    const searchTerm = query.toLowerCase();

    expertisesLinks.forEach((link) => {
      const label = t(link.label);
      if (label.toLowerCase().includes(searchTerm)) {
        results.push({
          text: label,
          href: link.href,
          category: t('navbar.expertises'),
        });
      }
    });

    const searchInObject = (obj: any, path: string[] = []) => {
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = [...path, key];

        if (typeof value === 'string') {
          if (value.toLowerCase().includes(searchTerm)) {
            results.push({
              path: currentPath.join('.'),
              text: value,
              href: determineHref(currentPath),
              category: determineCategory(currentPath),
            });
          }
        } else if (typeof value === 'object' && value !== null) {
          searchInObject(value, currentPath);
        }
      });
    };

    const determineCategory = (path: string[]): string => {
      if (path.includes('blog')) return t('search.categories.blog');
      if (path.includes('services')) return t('search.categories.services');
      if (path.includes('team')) return t('search.categories.team');
      if (path.includes('clients')) return t('search.categories.clients');
      return '';
    };

    const determineHref = (path: string[]): string => {
      if (path.includes('blog')) return '/blog';
      if (path.includes('services')) {
        if (path.includes('location')) return '/services/location';
        if (path.includes('it')) return '/services/it';
       // if (path.includes('call-center')) return '/services/call-center';
        if (path.includes('supplier')) return '/services/fournisseur';
        return '/services';
      }
      //  if (path.includes('contact')) return '/contact';
      if (path.includes('about')) return '/about';
      return '';
    };

    if (i18n && i18n.language && typeof i18n.getResourceBundle === 'function') {
      searchInObject(i18n.getResourceBundle(i18n.language, 'common'));
    }

    setSearchResults(results);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const expertisesLinks = [
    /*{ href: "/services/location", label: "navbar.location", icon: Car, description: "navbar.locationDesc" },*/
    { href: "/services/it", label: "navbar.itSolutions", icon: Laptop, description: "navbar.itSolutionsDesc" },
    /*{ href: "/services/call-center", label: "navbar.callCenter", icon: Phone, description: "navbar.callCenterDesc" },*/
    { href: "/services/fournisseur", label: "navbar.supplier", icon: Truck, description: "navbar.supplierDesc" },
  ];
  

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-l from-zinc-50 to-zinc-50 shadow border-b border-zinc-300'
          : 'bg-gradient-to-l from-zinc-50 to-zinc-50 shadow-none border-none'
      }`}
    >
     {/* Top Bar */}
     <div className="bg-gray-50 border-b border-gray-200 text-sm">
     <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 flex justify-end items-center h-10 gap-6">
    
    {/* Numéro de téléphone */}
    {/* Numéro de téléphone / WhatsApp */}
    <a
      href="https://wa.me/261330000000"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-gray-700 hover:text-sky-900 transition-colors"
     >
     <Phone className="w-4 h-4" />
      +261 33 00 000 00
    </a>

    {/* Social Links */}
     <Link href="https://facebook.com" target="_blank" className="text-zinc-500 hover:text-sky-900">
      <Facebook className="w-4 h-4" />
    </Link>
    <Link href="https://linkedin.com/in/big-island-mdg" target="_blank" className="text-zinc-500 hover:text-sky-900">
      <Linkedin className="w-4 h-4" />
    </Link>
    <Link href="mailto:contact@bigisland.com" className="text-zinc-500 hover:text-sky-900">
      <Mail className="w-4 h-4" />
    </Link>
   

    {/* Sélecteur de langue */}
    <div className="relative">
      <button
        onClick={() => setLangOpen(!langOpen)}
        className="flex items-center gap-1 px-2 py-1 text-zinc-700 hover:text-sky-900 rounded-md hover:bg-gray-100 transition-colors"
      >
        <Languages className="w-5 h-5" />
        <span className="uppercase text-sm">{lang}</span>
      </button>

      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-32 bg-white border border-zinc-200 rounded-lg shadow-lg z-50"
          >
            {['en', 'fr'].map((lng) => (
              <button
                key={lng}
                onClick={() => changeLanguage(lng as 'en' | 'fr')}
                className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${
                  lang === lng ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <img
                  src={`/icons/${lng === 'en' ? 'us' : 'fr'}.svg`}
                  alt={lng === 'en' ? 'English' : 'Français'}
                  className="w-3 h-3"
                />
                {lng.toUpperCase()}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
</div>

      <nav className="mx-auto max-w-7xl px-6 sm:px-5 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <LogoMinimal />
            </div>
          
          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-500 hover:text-sky-900 rounded-md hover:bg-zinc-600 transition-colors"
              aria-label={t('navbar.search')}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="-m-1.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-600 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">{t('navbar.openMenu')}</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-9 lg:items-center">
            <Link href="/" className={`text-sm font-bold leading-6 ${navLinkClass('home')}`} onClick={handleLinkClick}>
              {t('navbar.home')}
            </Link>
            
            <Link href="/about" className={`text-sm font-bold leading-6 ${navLinkClass('about')}`} onClick={handleLinkClick}>
              {t('navbar.about')}
            </Link>

            {/* Expertises Dropdown */}
            <div
                 className="relative"
                 ref={dropdownRef}
                 onMouseEnter={() => setOpenDropdown('expertises')}
                 onMouseLeave={() => setOpenDropdown(null)}
            >
            <button 
               type="button"
               className={`flex items-center gap-x-1 text-sm font-bold leading-6 ${navLinkClass('')} ${openDropdown === 'expertises' ? 'text-blue-600' : ''}`}
               aria-expanded={openDropdown === 'expertises'}
            >
             {t('navbar.expertises')}
            
            </button>

           <AnimatePresence>
           {openDropdown === 'expertises' && (
           <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute -left-4 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-zinc-900/5"
          >
          <div className="p-4">
          {expertisesLinks.map((item) => (
            <div
              key={item.label}
              className="group relative flex items-center gap-x-3 rounded-lg p-4 text-sm leading-6 hover:bg-zinc-50 transition-colors"
            >
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-zinc-50 group-hover:bg-white text-sky-900">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="flex-auto">
                <Link
                  href={item.href}
                  className="block font-semibold text-gray-900"
                  onClick={handleLinkClick}
                >
                  {t(item.label)}
                  <span className="absolute inset-0" />
                </Link>
                <p className="mt-1 text-gray-600">{t(item.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

            <Link href="/projet" className={`text-sm font-semibold leading-6 ${navLinkClass('blog')}`} onClick={handleLinkClick}>
              {t('navbar.projects')}
            </Link>
            <Link href="/blog" className={`text-sm font-semibold leading-6 ${navLinkClass('blog')}`} onClick={handleLinkClick}>
              {t('navbar.blog')}
            </Link>
            
          </div>
          
          {/* Desktop Right Actions */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-1.5">
            {/* Bouton Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-zinc-500 hover:text-sky-800 transition-colors duration-200 flex items-end gap-1 rounded-md hover:bg-gray-100"
              aria-label={t('navbar.search')}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span className="text-xs text-gray-400">CTRL+K</span>
            </button>


            {/* Bouton Devis */}  
            <motion.div
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               transition={{ type: "spring", stiffness: 300 }}
            >
         <Link
              href="/contact"
              onClick={handleLinkClick}
               className="inline-flex items-center gap-2 bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md  hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
         >
         <motion.span
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center"
          >
         <MessageCircle className="w-4 h-4" />
    </motion.span>
    {t("navbar.requestQuote")}
  </Link>
</motion.div>

          </div>
        </div>

        {/* Mobile menu with motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-50 bg-white"
            >
              <div className="fixed inset-0 bg-white px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <Link href="/" className="-m-1.5 p-1.5 flex items-center" onClick={handleLinkClick}>
                    <span className="text-2xl font-bold text-blue-600">BigIsland</span>
                    <span className="text-2xl font-bold text-gray-900">MDG</span>
                  </Link>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">{t('navbar.closeMenu')}</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      <Link
                        href="/"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors"
                        onClick={handleLinkClick}
                      >
                        {t('navbar.home')}
                      </Link>
                      <Link
                        href="/about"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors"
                        onClick={handleLinkClick}
                      >
                        {t('navbar.about')}
                      </Link>
                      <div className="-mx-3">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors"
                          aria-expanded="false"
                          onClick={() => toggleDropdown('mobile-expertises')}
                        >
                          {t('navbar.expertises')}
                          <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${openDropdown === 'mobile-expertises' ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </button>
                        <AnimatePresence>
                          {openDropdown === 'mobile-expertises' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 space-y-2 pl-6"
                            >
                              {expertisesLinks.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-x-2"
                                  onClick={handleLinkClick}
                                >
                                  <item.icon className="h-5 w-5 text-blue-600" />
                                  {t(item.label)}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <Link
                        href="/blog"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors"
                        onClick={handleLinkClick}
                      >
                        {t('navbar.blog')}
                      </Link>
                     
                    </div>
                    <div className="py-6">
                      <Link
                        href="/contact"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-blue-50 text-blue-600 hover:bg-blue-100 text-center transition-colors"
                        onClick={handleLinkClick}
                      >
                        {t('navbar.requestQuote')}
                      </Link>
                    </div>

                    {/* Switcher langue (mobile) */}
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">{t('navbar.language')}</p>
                      <div className="flex gap-2">
                        {['en', 'fr'].map((lng) => (
                          <button
                            key={lng}
                            onClick={() => {
                              changeLanguage(lng as 'en' | 'fr');
                              setMobileMenuOpen(false);
                            }}
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                              lang === lng
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <img
                              src={`/icons/${lng === 'en' ? 'us' : 'fr'}.svg`}
                              alt={lng === 'en' ? 'English' : 'Français'}
                              className="w-2 h-2"
                            />
                            {lng.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search modal (Radix + Motion) */}
      <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
        <AnimatePresence>
          {searchOpen && (
            <Dialog.Portal>
              {/* Overlay */}
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                />
              </Dialog.Overlay>

              {/* Content */}
              <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
                <Dialog.Content asChild>
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden"
                  >
                    <Dialog.Title className="sr-only">
                      {t('navbar.searchTitle')}
                    </Dialog.Title>
                    
                    <div className="relative">
                      <div className="flex items-center border-b border-gray-200">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 ml-4" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={t('navbar.searchPlaceholder')}
                          className="w-full border-0 py-4 pl-3 pr-12 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                          autoFocus
                        />
                        <Dialog.Close asChild>
                          <button
                            onClick={() => setSearchOpen(false)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-md transition-colors"
                            aria-label={t('navbar.closeSearch')}
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </Dialog.Close>
                      </div>

                      <div className="p-4 max-h-96 overflow-y-auto">
                        {searchQuery && (
                          <>
                            <h3 className="font-medium text-gray-900 mb-2 text-sm">
                              {t('navbar.searchResults')} ({searchResults.length})
                            </h3>
                            {searchResults.length > 0 ? (
                              <div className="space-y-2">
                                {searchResults.map((result, index) => (
                                  <div
                                    key={index}
                                    className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                                  >
                                    <div className="text-xs font-medium text-blue-600 mb-1 uppercase tracking-wide">
                                      {result.category}
                                    </div>
                                    {result.href ? (
                                      <Link
                                        href={result.href}
                                        className="block"
                                        onClick={() => setSearchOpen(false)}
                                      >
                                        <div className="text-gray-800 hover:text-blue-600 font-medium">
                                          {highlightMatches(result.text, searchQuery)}
                                        </div>
                                      </Link>
                                    ) : (
                                      <div className="text-gray-800">
                                        {highlightMatches(result.text, searchQuery)}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm py-4 text-center">
                                {t('navbar.noResults')} "<span className="font-medium">{searchQuery}</span>"
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </div>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </header>
  );
}

function highlightMatches(text: string, query: string) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="bg-yellow-100 text-gray-900 font-medium">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}