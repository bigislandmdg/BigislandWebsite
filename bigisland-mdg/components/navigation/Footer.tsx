'use client';

import {
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  Send // Icône pour le bouton subscribe
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import logo from '@/public/logos/bigIslandOffisial.png';
import { motion } from 'framer-motion';

export default function Footer() {
  const { t } = useTranslation('common');

  // Animation iOS Pointer pour les liens
  const linkHover = {
    scale: 1.05,
    y: -2,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  };

  const linkTap = {
    scale: 0.95,
    y: 0,
  };

  return (
    <footer className="bg-blue-100 border-t border-blue-50">
      {/* Section principale */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="xl:grid xl:grid-cols-5 xl:gap-8">

          {/* Colonne 1 - Logo et description */}
          <div className="space-y-1 xl:col-span-1">
            <Image
              src={logo}
              alt="BigIslandMDG Logo"
              width={180}
              height={50}
              className="h-auto w-auto object-contain"
            />
            <p className="text-gray-700 text-base leading-6">
              {t('footer.companyDescription')}
            </p>
          </div>

          {/* Colonne 2 - Entreprise */}
          <div className="mt-12 md:mt-0 xl:mt-0">
            <h3 className="text-sm font-semibold text-blue-600 tracking-wider uppercase">
              {t('footer.company')}
            </h3>
            <ul className="mt-4 space-y-4">
              {[
                { label: t('navbar.blog'), href: '/blog' },
                { label: t('footer.services'), href: '/services' },
                { label: t('footer.testimonials'), href: '/testimony' },
                { label: t('footer.projects'), href: '/projet' },
              
              ].map((item, idx) => (
                <motion.li key={idx}>
                  <motion.a
                    href={item.href}
                    className="text-base font-medium text-gray-700 hover:text-blue-900 flex items-center gap-2"
                    whileHover={linkHover}
                    whileTap={linkTap}
                  >
                    {item.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Expertise */}
          <div className="mt-12 md:mt-0 xl:mt-0">
            <h3 className="text-sm font-semibold text-blue-600 tracking-wider uppercase">
              {t('footer.expertise')}
            </h3>
            <ul className="mt-4 space-y-4">
              {[
                { label: t('footer.itSolutions'), href: '/services/it' },
                //{ label: t('footer.location'), href: '/services/location' },
               // { label: t('footer.callCenter'), href: '/services/call-center' },
                { label: t('footer.supplier'), href: '/services/fournisseurs' },
              ].map((item, idx) => (
                <motion.li key={idx}>
                  <motion.a
                    href={item.href}
                    className="text-base font-medium text-gray-700 hover:text-blue-600 flex items-center gap-2"
                    whileHover={linkHover}
                    whileTap={linkTap}
                  >
                    {item.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div className="mt-12 md:mt-0 xl:mt-0">
            <h3 className="text-sm font-semibold text-blue-600 tracking-wider uppercase">
              {t('footer.contact')}
            </h3>
            <ul className="mt-4 space-y-4">
              {[
                { icon: Mail, text: t('footer.email') },
                { icon: Phone, text: t('footer.phone') },
                { icon: MapPin, text: t('footer.address') },
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex space-x-3 text-gray-700 hover:text-blue-600 items-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <item.icon className="h-5 w-5 text-gray-700" />
                  <span className="text-base">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Colonne 5 - Légal */}
          <div className="mt-12 md:mt-0 xl:mt-0">
            <h3 className="text-sm font-semibold text-blue-600 tracking-wider uppercase">
              {t('footer.legal')}
            </h3>
            <ul className="mt-4 space-y-4">
              {[
                { label: t('footer.cookiePolicy'), href: '/cookie' },
                { label: t('footer.privacyPolicy'), href: '/privacy' },
                { label: t('footer.legalNotice'), href: '/legal' },
                { label: t('footer.cgu'), href: '/cgu' },
              ].map((item, idx) => (
                <motion.li key={idx}>
                  <motion.a
                    href={item.href}
                    className="text-base text-gray-700 hover:text-blue-600 flex items-center gap-2"
                    whileHover={linkHover}
                    whileTap={linkTap}
                  >
                    {item.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-blue-100">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-4">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {t('footer.newsletterTitle')}
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                {t('footer.newsletterDescription')}
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  {t('footer.emailPlaceholder')}
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-5 py-3 text-base text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:max-w-xs"
                  placeholder={t('footer.emailPlaceholder')}
                />
                <motion.div
                  className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    {t('footer.subscribe')}
                    <Send className="h-4 w-4" />
                  </button>
                </motion.div>
              </form>
              <p className="mt-3 text-sm text-gray-500">
                {t('footer.newsletterPrivacy')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t bg-blue-100 border-blue-100 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-center text-base text-gray-500">
                © {new Date().getFullYear()} BigIslandMDG. {t('footer.rightsReserved')}
              </p>
              <div className="flex items-center text-gray-500">
                {t('footer.designedWith')}
                <Heart className="mx-1 h-4 w-4 text-red-500" />
                {t('footer.byBigIsland')}
              </div>
            </div>

            <div className="flex space-x-6">
              {[{
                icon: Facebook, href: 'https://facebook.com', label: 'Facebook'
              }, {
                icon: Linkedin, href: 'https://linkedin.com/in/big-island-mdg', label: 'LinkedIn'
              }, {
                icon: Mail, href: 'mailto:contact@bigislandmdg.com', label: 'Email'
              }].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{social.label}</span>
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

