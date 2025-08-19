'use client';

import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { Popover, Dialog } from '@headlessui/react';
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import { i18n } from 'next-i18next';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const { t } = useTranslation('common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

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

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinkClass = (id: string) =>
    `relative pb-1 transition-colors ${
      activeSection === id
        ? 'text-blue-600 after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-600'
        : 'text-gray-700 hover:text-blue-400'
    }`;

  const expertisesLinks = [
    { href: '/services/location', label: 'navbar.location' },
    { href: '/services/it', label: 'navbar.itSolutions' },
    { href: '/services/call-center', label: 'navbar.callCenter' },
    { href: '/services/fournisseur', label: 'navbar.supplier' },
  ];

  return (
    <header className="bg-white backdrop-blur-md fixed top-0 w-full z-50 border-b border-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600" onClick={handleLinkClick}>
          BigIslandMDG
        </Link>

        {/* Mobile buttons */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-gray-600 hover:text-blue-600"
            aria-label={t('navbar.search')}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>

          <button
            className="text-2xl text-gray-800 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t('navbar.openMenu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex flex-1 justify-center space-x-8">
          <Link href="/" className={navLinkClass('home')} onClick={handleLinkClick}>
            {t('navbar.home')}
          </Link>
          <Link href="/about" className={navLinkClass('about')} onClick={handleLinkClick}>
            {t('navbar.about')}
          </Link>

          {/* Expertises dropdown with motion */}
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`${navLinkClass('')} inline-flex items-center focus:outline-none`}
                  aria-expanded={open}
                >
                  {t('navbar.expertises')}
                  <ChevronDownIcon
                    className={`ml-1 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </Popover.Button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg"
                    >
                      <div className="py-1">
                        {expertisesLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors"
                            onClick={handleLinkClick}
                          >
                            {t(link.label)}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </Popover>

          <Link href="/blog" className={navLinkClass('blog')} onClick={handleLinkClick}>
            {t('navbar.blog')}
          </Link>
          <Link href="/contact" className={navLinkClass('contact')} onClick={handleLinkClick}>
            {t('navbar.contact')}
          </Link>
        </nav>

        {/* Desktop search + button */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label={t('navbar.search')}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>

          <Link
            href="/devis"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="lg:hidden origin-top bg-white shadow-lg"
          >
            <div className="px-4 py-3 space-y-3">
              <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>
                {t('navbar.home')}
              </Link>
              <Link href="/about" className="block py-2 text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>
                {t('navbar.about')}
              </Link>
              <details className="group">
                <summary className="flex items-center justify-between py-2 text-gray-700 cursor-pointer list-none">
                  <span>{t('navbar.expertises')}</span>
                  <ChevronDownIcon className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="ml-4 mt-1 space-y-2">
                  {expertisesLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-2 text-gray-600 hover:text-blue-600"
                      onClick={handleLinkClick}
                    >
                      {t(link.label)}
                    </Link>
                  ))}
                </div>
              </details>
              <Link href="/blog" className="block py-2 text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>
                {t('navbar.blog')}
              </Link>
              <Link href="/contact" className="block py-2 text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>
                {t('navbar.contact')}
              </Link>
              <Link
                href="/devis"
                className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-2"
                onClick={handleLinkClick}
              >
                {t('navbar.requestQuote')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search modal with motion */}
      <AnimatePresence>
        {searchOpen && (
          <Dialog onClose={() => setSearchOpen(false)} className="relative z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            />
            <div className="fixed inset-0 flex items-start justify-center p-4 pt-20">
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden"
              >
                <div className="relative">
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
                    aria-label={t('navbar.closeSearch')}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  <div className="p-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                      {t('navbar.searchTitle')}
                    </Dialog.Title>
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <div className="flex">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={t('navbar.searchPlaceholder')}
                          className="flex-1 border border-gray-300 rounded-md px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
                          aria-label={t('navbar.searchButton')}
                        >
                          <MagnifyingGlassIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </form>
                    <div className="mt-6">
                      {searchQuery && (
                        <>
                          <h3 className="font-medium text-gray-900 mb-2">
                            {t('navbar.searchResults')} ({searchResults.length})
                          </h3>
                          {searchResults.length > 0 ? (
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                              {searchResults.map((result, index) => (
                                <div
                                  key={index}
                                  className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  <div className="text-xs text-blue-600 mb-1">{result.category}</div>
                                  {result.href ? (
                                    <Link
                                      href={result.href}
                                      className="block"
                                      onClick={() => setSearchOpen(false)}
                                    >
                                      <div className="text-gray-800 hover:text-blue-600">
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
                            <p className="text-gray-500">
                              {t('navbar.noResults')} "{searchQuery}"
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
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
          <span key={i} className="bg-yellow-100">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}
