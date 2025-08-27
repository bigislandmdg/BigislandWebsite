'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Car, Laptop, Phone, Truck } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { i18n } from 'next-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';

export default function Navbar() {
  const { t } = useTranslation('common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        if (path.includes('call-center')) return '/services/call-center';
        if (path.includes('supplier')) return '/services/fournisseur';
        return '/services';
      }
      if (path.includes('contact')) return '/contact';
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

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinkClass = (id: string) =>
    `relative pb-1 transition-colors duration-200 ${
      activeSection === id
        ? 'text-blue-600 font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-600'
        : 'text-gray-700 hover:text-blue-600'
    }`;

  const expertisesLinks = [
  {
    href: "/services/location",
    label: "navbar.location",
    icon: Car,
    description: "navbar.locationDesc",
  },
  {
    href: "/services/it",
    label: "navbar.itSolutions",
    icon: Laptop,
    description: "navbar.itSolutionsDesc",
  },
  {
    href: "/services/call-center",
    label: "navbar.callCenter",
    icon: Phone,
    description: "navbar.callCenterDesc",
  },
  {
    href: "/services/fournisseur",
    label: "navbar.supplier",
    icon: Truck,
    description: "navbar.supplierDesc",
  },
];


  return (
    <header className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-200 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center" onClick={handleLinkClick}>
              <span className="text-2xl font-bold text-blue-600">BigIsland</span>
              <span className="text-2xl font-bold text-gray-900">MDG</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-500 hover:text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
              aria-label={t('navbar.search')}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">{t('navbar.openMenu')}</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
            <Link href="/" className={`text-sm font-semibold leading-6 ${navLinkClass('home')}`} onClick={handleLinkClick}>
              {t('navbar.home')}
            </Link>
            
            <Link href="/about" className={`text-sm font-semibold leading-6 ${navLinkClass('about')}`} onClick={handleLinkClick}>
              {t('navbar.about')}
            </Link>

            {/* Expertises Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                type="button"
                onClick={() => toggleDropdown('expertises')}
                className={`flex items-center gap-x-1 text-sm font-semibold leading-6 ${navLinkClass('')} ${openDropdown === 'expertises' ? 'text-blue-600' : ''}`}
                aria-expanded={openDropdown === 'expertises'}
              >
                {t('navbar.expertises')}
                <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'expertises' ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              <AnimatePresence>
                {openDropdown === 'expertises' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5"
                  >
                    <div className="p-4">
                      {expertisesLinks.map((item) => (
                        <div
                          key={item.label}
                          className="group relative flex items-center gap-x-4 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white text-blue-600">
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

            <Link href="/blog" className={`text-sm font-semibold leading-6 ${navLinkClass('blog')}`} onClick={handleLinkClick}>
              {t('navbar.blog')}
            </Link>
            
            <Link href="/contact" className={`text-sm font-semibold leading-6 ${navLinkClass('contact')}`} onClick={handleLinkClick}>
              {t('navbar.contact')}
            </Link>
          </div>
          
          {/* Desktop Right Actions */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1.5 rounded-md hover:bg-gray-100"
              aria-label={t('navbar.search')}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span className="text-xs text-gray-400">⌘K</span>
            </button>

            <Link
              href="/devis"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              onClick={handleLinkClick}
            >
              {t('navbar.requestQuote')}
            </Link>
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
                      <Link
                        href="/contact"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors"
                        onClick={handleLinkClick}
                      >
                        {t('navbar.contact')}
                      </Link>
                    </div>
                    <div className="py-6">
                      <Link
                        href="/devis"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-blue-50 text-blue-600 hover:bg-blue-100 text-center transition-colors"
                        onClick={handleLinkClick}
                      >
                        {t('navbar.requestQuote')}
                      </Link>
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
