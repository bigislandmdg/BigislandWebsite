'use client';

import {
  FaFacebookF,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGoogle,
  FaHeart,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import logo from '@/public/logos/bigIslandOffisial.png';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Section principale */}
      <div className="container mx-auto px-4 py-16">
        {/* Grille principale - 5 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Colonne 1 - Logo et description */}
          <div className="md:col-span-3">
            <div className="mb-6">
              <Image 
                src={logo}
                alt="BigIslandMDG Logo"
                width={180}
                height={80}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              {t('footer.companyDescription', "Votre partenaire de confiance pour des solutions digitales innovantes et sur mesure.")}
            </p>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-blue-400 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-blue-400">
              {t('footer.company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  {t('navbar.blog')}
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  {t('footer.services')}
                </a>
              </li>
              <li>
                <a href="/testimony" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  {t('footer.testimonials')}
                </a>
              </li>
              <li>
                <a href="/projet" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  {t('footer.projects')}
                </a>
              </li>
              <li>
                <a href="/cgu" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  {t('footer.cgu')}
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 - Expertise */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-blue-400 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-blue-400">
              {t('footer.expertise')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/services/it" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  {t('footer.itSolutions')}
                </a>
              </li>
              <li>
                <a href="/services/location" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  {t('footer.location')}
                </a>
              </li>
              <li>
                <a href="/services/call-center" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  {t('footer.callCenter')}
                </a>
              </li>
              <li>
                <a href="/services/fournisseurs" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  {t('footer.supplier')}
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-blue-400 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-blue-400">
              {t('footer.contact')}
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{t('footer.email')}</span>
              </div>
              <div className="flex items-start space-x-3">
                <FaPhoneAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{t('footer.phone')}</span>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{t('footer.address')}</span>
              </div>
            </div>
          </div>

          {/* Colonne 5 - Newsletter */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-6 text-blue-400 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-blue-400">
              {t('footer.newsletter')}
            </h3>
         
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                {t('footer.subscribe')}
              </button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-sm font-semibold mb-4 text-gray-300">{t('footer.followUs', "Suivez-nous")}</h4>
              <div className="flex space-x-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/in/big-island-mdg" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:contact@bigislandmdg.com" 
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Envoyer un email"
                >
                  <FaGoogle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Section des politiques - Centrée */}
            <div className="flex flex-wrap justify-center gap-6 text-sm order-2 md:order-1 flex-1">
              <a href="/cookie" className="text-gray-400 hover:text-blue-400 transition-colors">
                {t('footer.cookiePolicy')}
              </a>
              <a href="/legal" className="text-gray-400 hover:text-blue-400 transition-colors">
                {t('footer.legalNotice')}
              </a>
              <a href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                {t('footer.privacyPolicy')}
              </a>
            </div>

            {/* Copyright - Centré sur mobile, à gauche sur desktop */}
            <div className="text-gray-400 text-sm text-center md:text-left order-1 md:order-2">
              © {new Date().getFullYear()} BigIslandMDG. {t('footer.rightsReserved')}
            </div>

            {/* Section Développement - À droite */}
            <div className="flex items-center text-gray-400 text-sm order-3">
              <span className="flex items-center">
                {t('footer.designedWith', "Conçu avec")}
                <FaHeart className="text-red-500 mx-1" />
                {t('footer.byBigIsland', "par BigIsland")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
