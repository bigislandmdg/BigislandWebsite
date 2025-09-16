'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { CalendarDays, X } from 'lucide-react';

export default function ContactSection() {
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingLink, setMeetingLink] = useState('');

  const handleScheduleMeeting = () => {
    const meetLink = 'https://meet.google.com/new';
    setMeetingLink(meetLink);
    window.open(meetLink, '_blank');

    setTimeout(() => {
      setIsModalOpen(false);
      setMeetingLink('');
    }, 1000);
  };

  return (
    <section id="contact" className="relative bg-gray-50 py-2.5 sm:py-2.5">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          {/* Texte + CTA */}
          <motion.div
            className="lg:pr-8 lg:pt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('contact.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('contact.subtitle')}
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-white text-base font-medium shadow-md hover:bg-blue-700 transition active:scale-95"

              >
                <CalendarDays className="w-5 h-5" />
                {t('contact.scheduleMeeting')}
              </button>
            </div>
          </motion.div>

          {/* Carte Google Maps */}
          <motion.div
            className="relative overflow-hidden rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <iframe
              title="Localisation"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.715308399614!2d47.5516228!3d-18.9367256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07db98002fbc3%3A0x8908c61af0aa07e8!2sPharmacie%20Hasin%27ny%20Aina!5e0!3m2!1sfr!2smg!4v1693945000000!5m2!1sfr!2smg"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="h-[450px] w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>

      {/* Meeting Modal */}
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
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <CalendarDays className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t('contact.scheduleMeeting')}
                  </h3>
                </div>

                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.date')}
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.time')}
                    </label>
                    <input
                      type="time"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleScheduleMeeting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md hover:bg-blue-700 transition active:scale-95"
                  >
                    <CalendarDays className="w-4 h-4" />
                    {t('contact.confirmMeeting')}
                  </button>

                  {meetingLink && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                      <p>{t('contact.meetingCreated')}</p>
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

