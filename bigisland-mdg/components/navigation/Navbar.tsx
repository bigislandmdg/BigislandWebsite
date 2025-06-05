'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Transition, Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleLinkClick = () => {
    setOpen(false);
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
        : 'text-gray-700 hover:text-blue-600'
    }`;

  const expertisesLinks = [
    { href: '/services/location', label: 'navbar.location' },
    { href: '/services/it', label: 'navbar.itSolutions' },
    { href: '/services/call-center', label: 'navbar.callCenter' },
    { href: '/services/fournisseur', label: 'navbar.supplier' }
  ];

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600" onClick={handleLinkClick}>
          BigIslandMDG
        </Link>

        <button
          className="lg:hidden text-2xl text-gray-800 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label={t('navbar.openMenu')}
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex flex-1 justify-center space-x-8">
          <Link href="/" className={navLinkClass('home')} onClick={handleLinkClick}>
            {t('navbar.home')}
          </Link>
          
          <Link href="/about" className={navLinkClass('about')} onClick={handleLinkClick}>
            {t('navbar.about')}
          </Link>

          {/* Expertises Dropdown */}
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`${navLinkClass('')} inline-flex items-center focus:outline-none`}
                  aria-expanded={open}
                >
                  {t('navbar.expertises')}
                  <ChevronDownIcon
                    className={`ml-1 h-4 w-4 transition-transform ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </Popover.Button>
                <Transition
                  enter="transition duration-150 ease-out"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition duration-100 ease-in"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
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
                  </Popover.Panel>
                </Transition>
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

        <div className="hidden lg:block">
          <Link
            href="/devis"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={handleLinkClick}
          >
            {t('navbar.requestQuote')}
          </Link>
        </div>
      </div>

      {/* Mobile navigation */}
      <Transition
        show={open}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="lg:hidden origin-top bg-white shadow-lg">
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
        </div>
      </Transition>
    </header>
  );
}
