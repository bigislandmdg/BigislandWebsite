'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
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
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 transition-opacity duration-300" />
        
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center md:items-center md:p-0">
            <Dialog.Content className="relative transform overflow-hidden rounded-lg bg-white px-3 pb-3 pt-4 text-left shadow-xl transition-all sm:my-4 sm:w-full sm:max-w-lg sm:max-h-[120vh] sm:p-4">
              <div className="absolute right-0 top-0 hidden pr-3 pt-3 md:block">
                <Dialog.Close className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" aria-hidden="true" />
                </Dialog.Close>
              </div>
              
              <div>
                <div className="text-center md:text-left">
                  <Dialog.Title className="text-sm font-semibold leading-5 text-gray-900">
                    {t('modal.form.title')}
                  </Dialog.Title>
                  
                  <div className="mt-1">
                    <p className="text-xs text-gray-500">
                      {t('modal.form.description')}
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="mt-3 space-y-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-700">
                    {t('modal.form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder={t('modal.form.placeholderName')}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-1 px-2 text-xs shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                    {t('modal.form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 py-1 px-2 text-xs shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-xs font-medium text-gray-700">
                    {t('modal.form.projectType')} *
                  </label>
                  <select
                    id="projectType"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 py-1 px-2 text-xs shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                  <label htmlFor="file" className="block text-xs font-medium text-gray-700">
                    {t('modal.form.briefFile')}
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="mt-1 block w-full text-xs text-gray-500
                      file:mr-2 file:py-1 file:px-2
                      file:rounded-md file:border-0
                      file:text-xs file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  {file && (
                    <p className="mt-1 text-xs text-gray-600">
                      {t('modal.form.fileSelected')}: {file.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-700">
                    {t('modal.form.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={2}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-1 px-2 text-xs shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="mt-3 sm:mt-2 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-2 sm:w-auto"
                  >
                    {t('modal.form.submit')}
                  </button>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="mt-1 inline-flex w-full justify-center rounded-md bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      {t('modal.form.cancel')}
                    </button>
                  </Dialog.Close>
                </div>
              </form>
            </Dialog.Content>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
