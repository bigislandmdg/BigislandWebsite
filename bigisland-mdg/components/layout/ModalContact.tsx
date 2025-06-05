'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useTranslation('common');
  const [file, setFile] = useState<File | null>(null);

  const projectTypes = [
    { value: 'web', label: t('modal.form.projectTypes.web') },
    { value: 'mobile', label: t('modal.form.projectTypes.mobile') },
    { value: 'design', label: t('modal.form.projectTypes.design') },
    { value: 'marketing', label: t('modal.form.projectTypes.marketing') },
    { value: 'other', label: t('modal.form.projectTypes.other') },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white shadow-xl flex flex-col max-h-[90vh]">
          <div className="flex justify-between items-start p-6 border-b">
            <Dialog.Title className="text-xl font-bold text-gray-800">
              {t('modal.form.title')} {/* Updated to use modal.form.title */}
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            <p className="text-gray-600 mb-6">{t('modal.form.description')}</p> {/* Added description */}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t('modal.form.name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder={t('modal.form.placeholderName')}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('modal.form.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
                  {t('modal.form.projectType')} *
                </label>
                <select
                  id="projectType"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">{t('modal.form.selectOption')}</option>
                  {projectTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  {t('modal.form.briefFile')}
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {file && (
                  <p className="mt-1 text-sm text-gray-600">
                    {t('modal.form.fileSelected')}: {file.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t('modal.form.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
            </form>
          </div>

          <div className="p-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {t('modal.form.cancel')}
            </button>
            <button
              type="submit"
              form="contact-form"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              {t('modal.form.submit')}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}