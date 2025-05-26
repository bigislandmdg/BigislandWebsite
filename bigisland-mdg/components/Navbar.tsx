'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleLinkClick = () => {
    setOpen(false);
    setShowServices(false);
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

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-10 py-5 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          BigIslandMDG
        </Link>

        <button
          className="lg:hidden text-2xl text-gray-800 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label={t('navbar.openMenu', 'Ouvrir le menu')}
        >
          ☰
        </button>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex flex-1 justify-center space-x-6">
          <a href="/" className={navLinkClass('home')}>{t('navbar.home')}</a>
          <a href="/about" className={navLinkClass('about')}>{t('navbar.about')}</a>

          {/* Dropdown Expertises */}
          <div className="relative group">
            <button
              className="text-gray-700 hover:text-blue-600"
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
            >
              {t('navbar.expertises')}
            </button>
            <div
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
              className={`absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg transition-opacity duration-300 ${
                showServices ? 'block' : 'hidden'
              }`}
            >
              <Link href="/services/location" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">{t('navbar.location')}</Link>
              <Link href="/services/it" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">{t('navbar.itSolutions')}</Link>
              <Link href="/services/call-center" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">{t('navbar.callCenter')}</Link>
              <Link href="/services/fournisseur" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">{t('navbar.supplier')}</Link>
            </div>
          </div>

          <a href="/blog" className={navLinkClass('blog')}>{t('navbar.blog')}</a>
          <a href="/contact" className={navLinkClass('contact')}>{t('navbar.contact')}</a>
        </nav>

        <div className="hidden lg:block">
          <a
            href="/contact"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {t('navbar.requestQuote')}
          </a>
        </div>
      </div>

      {/* Mobile navigation */}
      <Transition
        show={open}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-y-0 opacity-0"
        enterTo="transform scale-y-100 opacity-100"
        leave="transition duration-200 ease-in"
        leaveFrom="transform scale-y-100 opacity-100"
        leaveTo="transform scale-y-0 opacity-0"
      >
        <div className="lg:hidden origin-top bg-white shadow-md px-4 py-4 space-y-2">
          <a href="#home" className="block text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>{t('navbar.home')}</a>
          <a href="#about" className="block text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>{t('navbar.about')}</a>

          <div className="space-y-1">
            <p className="text-gray-700 font-semibold">{t('navbar.expertises')}</p>
            <Link href="/services/location" className="block ml-4 text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>{t('navbar.location')}</Link>
            <Link href="/services/it" className="block ml-4 text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>{t('navbar.itSolutions')}</Link>
            <Link href="/services/call-center" className="block ml-4 text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>{t('navbar.callCenter')}</Link>
            <Link href="/services/fournisseur" className="block ml-4 text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>{t('navbar.supplier')}</Link>
          </div>

          <a href="#blog" className="block text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>{t('navbar.blog')}</a>
          <a href="#contact" className="block text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>{t('navbar.contact')}</a>
          <a
            href="#contact"
            className="block bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleLinkClick}
          >
            {t('navbar.requestQuote')}
          </a>
        </div>
      </Transition>
    </header>
  );
}
