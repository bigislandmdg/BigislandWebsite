'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Fonction pour fermer le menu après clic
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          BigIslandMDG
        </Link>

        {/* Burger menu button */}
        <button
          className="lg:hidden text-2xl text-gray-800 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          ☰
        </button>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex flex-1 justify-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">Accueil</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">À propos</Link>
          <a href="#services" className="text-gray-700 hover:text-blue-600">Expertises</a>
          <a href="#blog" className="text-gray-700 hover:text-blue-600">Blog</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
        </nav>

        {/* Bouton devis Desktop */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Demande un devis
          </a>
        </div>
      </div>

      {/* Menu Mobile animé */}
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
          <Link href="/" className="block text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>Accueil</Link>
          <Link href="/about" className="block text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>À propos</Link>
          <a href="#services" className="block text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>Expertises</a>
          <a href="#blog" className="block text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>Blog</a>
          <a href="#contact" className="block text-gray-700 hover:text-blue-600" onClick={handleLinkClick}>Contact</a>
          <a
            href="#contact"
            className="block bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleLinkClick}
          >
            Demande un devis
          </a>
        </div>
      </Transition>
    </header>
  );
}
