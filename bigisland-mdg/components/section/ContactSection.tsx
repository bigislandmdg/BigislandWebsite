'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  CalendarDays,
  Clock,
  X,
  Send,
} from 'lucide-react';

export default function ContactSection() {
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [formStatus, setFormStatus] = useState({ success: false, message: '' });

  const handleScheduleMeeting = () => {
    const meetLink = 'https://meet.google.com/new';
    setMeetingLink(meetLink);
    window.open(meetLink, '_blank');

    setTimeout(() => {
      setIsModalOpen(false);
      setMeetingLink('');
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { name, email, message } = Object.fromEntries(formData.entries());

    try {
      const subject = encodeURIComponent(`Nouveau message de ${name}`);
      const body = encodeURIComponent(
        `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:contact@bigisland.mg?subject=${subject}&body=${body}`;

      setFormStatus({
        success: true,
        message: t('contact.successMessage'),
      });

      e.currentTarget.reset();

      setTimeout(() => {
        setFormStatus({ success: false, message: '' });
      }, 5000);
    } catch (error) {
      setFormStatus({
        success: false,
        message: t('contact.errorMessage'),
      });
    }
  };

  return (
    <section id="contact" className="bg-gray-50 py-20 sm:py-28 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <motion.div
          className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-gray-600 mb-8">{t('contact.subtitle')}</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t('contact.placeholderName')}
                required
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t('contact.placeholderEmail')}
                required
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t('contact.placeholderMessage')}
                required
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {formStatus.message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  formStatus.success
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {formStatus.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition active:scale-95"
              >
                <Send className="w-4 h-4" />
                {t('contact.send')}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 bg-white px-6 py-3 text-blue-600 shadow-md hover:bg-blue-50 hover:shadow-lg transition active:scale-95"
              >
                <CalendarDays className="w-4 h-4" />
                {t('contact.scheduleMeeting')}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="h-80 sm:h-96">
            <iframe
  title="Localisation"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.715308399614!2d47.5516228!3d-18.9367256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07db98002fbc3%3A0x8908c61af0aa07e8!2sPharmacie%20Hasin%27ny%20Aina!5e0!3m2!1sfr!2smg!4v1693945000000!5m2!1sfr!2smg"
  width="100%"
  height="100%"
  allowFullScreen
  loading="lazy"
  className="border-0"
  referrerPolicy="no-referrer-when-downgrade"
/>

          </div>

          <div className="p-8 space-y-5">
            <h3 className="text-xl font-semibold text-gray-900">
              {t('footer.ourContact')}
            </h3>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <span>{t('footer.address')}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>{t('footer.phone')}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>{t('footer.email')}</span>
              </div>
            </div>
          </div>
        </motion.div>
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
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition active:scale-95"
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

