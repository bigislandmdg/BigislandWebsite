'use client';

import {
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Globe,
  Heart,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import logo from '@/public/logos/bigIslandOffisial.png';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-blue-50 text-gray-600 border-t border-gray-200">
      {/* Contenu principal */}
      <div className="mx-auto max-w-6xl px-5 md:px-2 py-7">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Col 1 - Logo + Description */}
          <div>
            <Image
              src={logo}
              alt="BigIslandMDG Logo"
              width={180}
              height={60}
              className="mb-0 object-contain"
            />
            <p className="text-sm leading-6 text-gray-600">
              {t(
                'footer.companyDescription',
                'Votre partenaire de confiance pour des solutions digitales innovantes et sur mesure.'
              )}
            </p>
          </div>

          {/* Col 2 - Company */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              {t('footer.company')}
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="/blog" className="hover:text-blue-600 transition">
                  {t('navbar.blog')}
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-blue-600 transition">
                  {t('footer.services')}
                </a>
              </li>
              <li>
                <a href="/testimony" className="hover:text-blue-600 transition">
                  {t('footer.testimonials')}
                </a>
              </li>
              <li>
                <a href="/projet" className="hover:text-blue-600 transition">
                  {t('footer.projects')}
                </a>
              </li>
              <li>
                <a href="/cgu" className="hover:text-blue-600 transition">
                  {t('footer.cgu')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 - Expertise */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              {t('footer.expertise')}
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="/services/it" className="hover:text-blue-600 transition">
                  {t('footer.itSolutions')}
                </a>
              </li>
              <li>
                <a href="/services/location" className="hover:text-blue-600 transition">
                  {t('footer.location')}
                </a>
              </li>
              <li>
                <a href="/services/call-center" className="hover:text-blue-600 transition">
                  {t('footer.callCenter')}
                </a>
              </li>
              <li>
                <a href="/services/fournisseurs" className="hover:text-blue-600 transition">
                  {t('footer.supplier')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 - Contact */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              {t('footer.contact')}
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>{t('footer.email')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>{t('footer.phone')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                <span>{t('footer.address')}</span>
              </li>
            </ul>
          </div>

          {/* Col 5 - Newsletter */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              {t('footer.newsletter')}
            </h3>
            <form className="mt-6 flex flex-col sm:flex-row sm:items-center sm:max-w-md gap-3">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                required
                className="flex-grow w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition"
              >
                {t('footer.subscribe')}
              </button>
            </form>
            <div className="mt-6 flex space-x-4 text-gray-600">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 hover:text-blue-600 transition" />
              </a>
              <a
                href="https://linkedin.com/in/big-island-mdg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5 hover:text-blue-600 transition" />
              </a>
              <a href="mailto:contact@bigislandmdg.com">
                <Globe className="h-5 w-5 hover:text-blue-600 transition" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="mt-10 border-t border-gray-200 py-6">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row items-center justify-between px-6 text-sm text-gray-500">
          <div className="flex flex-wrap justify-center gap-6 order-2 md:order-1">
            <a href="/cookie" className="hover:text-blue-600 transition">
              {t('footer.cookiePolicy')}
            </a>
            <a href="/legal" className="hover:text-blue-600 transition">
              {t('footer.legalNotice')}
            </a>
            <a href="/privacy" className="hover:text-blue-600 transition">
              {t('footer.privacyPolicy')}
            </a>
          </div>

          <p className="order-1 md:order-2">
            © {new Date().getFullYear()} BigIslandMDG. {t('footer.rightsReserved')}
          </p>

          <div className="order-3 flex items-center text-gray-700">
            {t('footer.designedWith', 'Conçu avec')}
            <Heart className="mx-1 h-4 w-4 text-red-500" />
            {t('footer.byBigIsland', 'par BigIsland')}
          </div>
        </div>
      </div>
    </footer>
  );
}

