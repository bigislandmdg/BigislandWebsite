'use client';

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGoogle,
  FaInstagram,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gray-800 text-white py-12 mt-10">
      <div className="container mx-auto px-4 md:px-10 lg:px-20">
        {/* Nouvelle section Logo + Réseaux sociaux */}
       

        {/* Contenu existant inchangé */}
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
                <a href="/services/it" className="hover:text-blue-400 transition-colors">
                  {t('footer.itSolutions')}
                </a>
              </li>
              <li>
                <a href="/services/location" className="hover:text-blue-400 transition-colors">
                  {t('footer.location')}
                </a>
              </li>
              <li>
                <a href="/services/call-center" className="hover:text-blue-400 transition-colors">
                  {t('footer.callCenter')}
                </a>
              </li>
              <li>
                <a href="/services/fournisseurs" className="hover:text-blue-400 transition-colors">
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
                <a href="/blog" className="hover:text-blue-400 transition-colors">
                  {t('navbar.blog')}
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-blue-400 transition-colors">
                  {t('footer.services')}
                </a>
              </li>
              <li>
                <a href="/testimony" className="hover:text-blue-400 transition-colors">
                  {t('footer.testimonials')}
                </a>
              </li>
              <li>
                <a href="/projet" className="hover:text-blue-400 transition-colors">
                  {t('footer.projects')}
                </a>
              </li>
              <li>
                <a href="/cgu" className="hover:text-blue-400 transition-colors">
                  {t('footer.cgu')}
                </a>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">{t('footer.newsletter')}</h3>
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
  <div className="relative flex-1">
    <input
      type="email"
      placeholder={t('footer.emailPlaceholder')}
      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 transition-all"
      required
    />
  </div>
  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors shadow-md hover:shadow-lg active:scale-[0.98]"
  >
    {t('footer.subscribe')}
  </button>
</form>
               
          
          <div className="mb-5 mt-4 flex flex-row items-center space-x-2" >
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              <FaFacebookF className="w-6 h-6 space-x-5" />
            </a>
            
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
              <FaLinkedinIn className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>

          <div className="mb-5 mt-4 flex flex-row items-center space-x-2">
            <Image 
              src="/logo.png" // Remplacez par le chemin de votre logo
              alt="BigIslandMDG Logo"
              width={150}
              height={50}
              className="object-contain"
            />
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
