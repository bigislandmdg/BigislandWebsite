'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function ContactSection() {
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contact" className="px-4 py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start py-8">
        {/* Formulaire de contact */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t('contact.title')}
          </h2>
            <p className="text-gray-600 mb-6">
                {t('contact.subtitle')}
               </p> 
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('contact.placeholderName')}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-900 focus:border-blue-500"
                placeholder={t('contact.placeholderEmail')}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder={t('contact.placeholderMessage')}
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {t('contact.send')}
              </button>
               <button
                 type="button"
                 className="bg-transparent text-blue-600 px-6 py-2 rounded-md border border-blue-600 hover:bg-blue-50 transition"
                 onClick={() => setIsModalOpen(true)}
                >
                {t('contact.scheduleMeeting') || 'Planifier une réunion'}
               </button>

            </div>
          </form>
        </motion.div>

        {/* Carte Google Maps + Coordonnées */}
        <motion.div
          className="w-full h-full rounded-xl overflow-hidden shadow-md bg-white p-3"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="w-full h-72 rounded-md overflow-hidden mb-4">
            <iframe
              title="Localisation"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.45238331398!2d47.478419643650146!3d-18.879190495558926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f0f6d05e66dbe3%3A0x30c9e6dbde3386!2sAntananarivo!5e0!3m2!1sfr!2smg!4v1698166242725!5m2!1sfr!2smg"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="space-y-2 text-gray-700">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>Route vers Ambohimanambola, Ambohipo Sud, Antananarivo, Madagascar</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-blue-600" />
              <span>+261 34 12 345 67</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              <span>contact@bigisland.mg</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modale de réunion */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Planifier une réunion</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nom complet"
                className="w-full border-gray-300 rounded-md shadow-sm p-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border-gray-300 rounded-md shadow-sm p-2"
              />
              <input
                type="datetime-local"
                className="w-full border-gray-300 rounded-md shadow-sm p-2"
              />
              <textarea
                rows={3}
                placeholder="Message ou objectif de la réunion"
                className="w-full border-gray-300 rounded-md shadow-sm p-2"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Confirmer
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
