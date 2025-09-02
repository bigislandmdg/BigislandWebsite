'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { 
  X, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  ClipboardList, 
  MessageSquare, 
  XCircle, 
  CalendarCheck 
} from 'lucide-react';
import { useTranslation } from 'next-i18next';

type AppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const { t } = useTranslation('common');

  const services = [
    { id: 'car-rental', label: t('appointment.services.carRental') },
    { id: 'call-center', label: t('appointment.services.callCenter') },
    { id: 'it-solutions', label: t('appointment.services.itSolutions') },
    { id: 'product-supply', label: t('appointment.services.productSupply') },
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-fadeIn" />

        {/* Panel */}
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 
                     rounded-2xl bg-white shadow-2xl focus:outline-none 
                     data-[state=open]:animate-slideUp data-[state=closed]:animate-slideDown"
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-200 flex justify-between items-center">
            <Dialog.Title className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              {t('appointment.title')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
                aria-label={t('appointment.form.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Form */}
          <div className="overflow-y-auto px-6 py-4 max-h-[70vh]">
            <form className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="h-4 w-4 text-gray-500" />
                  {t('appointment.form.name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 
                             shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail className="h-4 w-4 text-gray-500" />
                  {t('appointment.form.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 
                             shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Phone className="h-4 w-4 text-gray-500" />
                  {t('appointment.form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 
                             shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Services */}
              <div>
                <label htmlFor="service" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <ClipboardList className="h-4 w-4 text-gray-500" />
                  {t('appointment.form.service')} *
                </label>
                <select
                  id="service"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 
                             shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">{t('appointment.form.selectService')}</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {t('appointment.form.date')} *
                </label>
                <input
                  type="date"
                  id="date"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 
                             shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  {t('appointment.form.message')}
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="mt-1 block w-full rounded-lg border border-gray-300 py-2 px-3 
                             shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                <XCircle className="h-4 w-4" />
                {t('appointment.form.cancel')}
              </button>
            </Dialog.Close>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              <CalendarCheck className="h-4 w-4" />
              {t('appointment.form.submit')}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

