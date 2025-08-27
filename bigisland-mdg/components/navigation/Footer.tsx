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
    <footer className="bg-gray-900 text-gray-400">
      {/* Contenu principal */}
       <div className="mx-auto max-w-6xl px-2 md:px-3 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1 - Logo + Description */}
          <div>
            <Image
              src={logo}
              alt="BigIslandMDG Logo"
              width={180}
              height={80}
              className="mb-4 object-contain"
            />
            <p className="text-sm leading-6">
              {t(
                'footer.companyDescription',
                'Votre partenaire de confiance pour des solutions digitales innovantes et sur mesure.'
              )}
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="h-5 w-5 hover:text-blue-500 transition" />
              </a>
              <a
                href="https://linkedin.com/in/big-island-mdg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="h-5 w-5 hover:text-blue-400 transition" />
              </a>
              <a href="mailto:contact@bigislandmdg.com">
                <FaGoogle className="h-5 w-5 hover:text-red-500 transition" />
              </a>
            </div>
          </div>

          {/* Col 2 - Company */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">
              {t('footer.company')}
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="/blog" className="hover:text-white">
                  {t('navbar.blog')}
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white">
                  {t('footer.services')}
                </a>
              </li>
              <li>
                <a href="/testimony" className="hover:text-white">
                  {t('footer.testimonials')}
                </a>
              </li>
              <li>
                <a href="/projet" className="hover:text-white">
                  {t('footer.projects')}
                </a>
              </li>
              <li>
                <a href="/cgu" className="hover:text-white">
                  {t('footer.cgu')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 - Expertise */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">
              {t('footer.expertise')}
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="/services/it" className="hover:text-white">
                  {t('footer.itSolutions')}
                </a>
              </li>
              <li>
                <a href="/services/location" className="hover:text-white">
                  {t('footer.location')}
                </a>
              </li>
              <li>
                <a href="/services/call-center" className="hover:text-white">
                  {t('footer.callCenter')}
                </a>
              </li>
              <li>
                <a href="/services/fournisseurs" className="hover:text-white">
                  {t('footer.supplier')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 - Contact + Newsletter */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">
              {t('footer.contact')}
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-400" />
                <span>{t('footer.email')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhoneAlt className="text-blue-400" />
                <span>{t('footer.phone')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>{t('footer.address')}</span>
              </li>
            </ul>

            {/* Newsletter intégrée */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold leading-6 text-white">
                {t('footer.newsletter')}
              </h3>
              <form className="mt-4 sm:flex sm:max-w-md">
                <input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  required
                  className="flex-grow rounded-md border-0 bg-white/5 px-3 py-2 text-white shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
                <button
                  type="submit"
                  className="mt-3 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:mt-0 sm:w-auto"
                >
                  {t('footer.subscribe')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="mt-16 border-t border-gray-700 py-6">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row items-center justify-between px-6 text-sm text-gray-400">
          <div className="flex flex-wrap justify-center gap-6 order-2 md:order-1">
            <a href="/cookie" className="hover:text-white">
              {t('footer.cookiePolicy')}
            </a>
            <a href="/legal" className="hover:text-white">
              {t('footer.legalNotice')}
            </a>
            <a href="/privacy" className="hover:text-white">
              {t('footer.privacyPolicy')}
            </a>
          </div>

          <p className="order-1 md:order-2">
            © {new Date().getFullYear()} BigIslandMDG. {t('footer.rightsReserved')}
          </p>

          <div className="order-3 flex items-center">
            {t('footer.designedWith', 'Conçu avec')}
            <FaHeart className="mx-1 text-red-500" />
            {t('footer.byBigIsland', 'par BigIsland')}
          </div>
        </div>
      </div>
    </footer>
  );
}

