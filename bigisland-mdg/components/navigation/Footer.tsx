'use client';

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGoogle,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gray-800 text-white py-10 mt-10">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">{t('footer.contact')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-400" />
                <span>{t('footer.email')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-blue-400" />
                <span>{t('footer.phone')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>{t('footer.address')}</span>
              </div>
            </div>
          </div>

          {/* EXPERTISE */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">{t('footer.expertise')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/services/solutions-it" className="hover:text-blue-400">
                  {t('footer.itSolutions')}
                </a>
              </li>
              <li>
                <a href="/services/location-voitures" className="hover:text-blue-400">
                  {t('footer.location')}
                </a>
              </li>
              <li>
                <a href="/services/call-center" className="hover:text-blue-400">
                  {t('footer.callCenter')}
                </a>
              </li>
              <li>
                <a href="/services/fournisseurs" className="hover:text-blue-400">
                  {t('footer.supplier')}
                </a>
              </li>
            </ul>
          </div>

          {/* ENTREPRISE */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/blog" className="hover:text-blue-400">
                  {t('navbar.blog')}
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-blue-400">
                  {t('footer.services')}
                </a>
              </li>
              <li>
                <a href="/testimony" className="hover:text-blue-400">
                  {t('footer.testimonials')}
                </a>
              </li>
              <li>
                <a href="/projet" className="hover:text-blue-400">
                  {t('footer.projects')}
                </a>
              </li>
              <li>
                <a href="/cgu" className="hover:text-blue-400">
                  {t('footer.cgu')}
                </a>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">{t('footer.newsletter')}</h3>
            <form className="flex flex-row items-center space-x-2">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="p-1 rounded-md text-gray-800 flex-1 w-40"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm whitespace-nowrap"
              >
                {t('footer.subscribe')}
              </button>
            </form>

            <div className="flex justify-start space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="https://gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400"
                aria-label="Google"
              >
                <FaGoogle className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="text-center mt-10 text-sm text-gray-400 border-t pt-4 border-gray-600">
          © {new Date().getFullYear()} BigIslandMDG. {t('footer.rightsReserved')}
        </div>
      </div>
    </footer>
  );
}
