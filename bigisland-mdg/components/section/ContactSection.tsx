'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaClock, FaTimes } from 'react-icons/fa';

export default function ContactSection() {
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingLink, setMeetingLink] = useState('');

  const handleScheduleMeeting = () => {
    // Créer un lien Google Meet
    const meetLink = 'https://meet.google.com/new';
    setMeetingLink(meetLink);
    
    // Ouvrir le lien dans un nouvel onglet
    window.open(meetLink, '_blank');
    
    // Fermer la modale après un délai
    setTimeout(() => {
      setIsModalOpen(false);
      setMeetingLink(''); // Réinitialiser le lien
    }, 1000);
  };

  return (
    <section id="contact" className="px-4 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Formulaire de contact */}
        <motion.div
          className="bg-white p-6 sm:p-11 rounded-xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            {t('contact.title')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('contact.subtitle')}
          </p>
          
          <form className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder={t('contact.placeholderName')}
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder={t('contact.placeholderEmail')}
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder={t('contact.placeholderMessage')}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                {t('contact.send')}
              </button>
              
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all shadow-md hover:shadow-lg active:scale-95"
                onClick={() => setIsModalOpen(true)}
              >
                <FaCalendarAlt />
                {t('contact.scheduleMeeting') || 'Planifier une réunion'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Carte Google Maps + Coordonnées */}
        <motion.div
          className="w-full h-full rounded-2xl overflow-hidden shadow-lg bg-white "
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="w-full h-80 sm:h-96 rounded-t-2xl overflow-hidden">
            <iframe
              title="Localisation"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.45238331398!2d47.478419643650146!3d-18.879190495558926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f0f6d05e66dbe3%3A0x30c9e6dbde3386!2sAntananarivo!5e0!3m2!1sfr!2smg!4v1698166242725!5m2!1sfr!2smg"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Nos coordonnées</h3>
            
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-600 mt-1 flex-shrink-0" />
                <span>Route vers Ambohimanambola, Ambohipo Sud, Antananarivo, Madagascar</span>
              </div>
              
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-600 flex-shrink-0" />
                <span>+261 34 12 345 67</span>
              </div>
              
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-600 flex-shrink-0" />
                <span>contact@bigisland.mg</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modale de réunion améliorée */}
        <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg absolute max-h-[100vh] overflow-y-auto"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition p-1 rounded-full hover:bg-gray-100"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes className="text-xl" />
              </button>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FaCalendarAlt className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Planifier une réunion</h3>
                </div>
                
                <form className="space-y-4">
                  {/* ... (les champs du formulaire restent inchangés) ... */}
                  
                  <button
                    type="button"
                    onClick={handleScheduleMeeting}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98] mt-4"
                  >
                    Confirmer la réunion
                  </button>

                  {meetingLink && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                      <p>Votre réunion Google Meet a été créée :</p>
                      <a 
                        href={meetingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 underline break-all"
                      >
                        {meetingLink}
                      </a>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}