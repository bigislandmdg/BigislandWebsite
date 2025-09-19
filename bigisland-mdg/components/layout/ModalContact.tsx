'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Send, XCircle } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';

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
        {/* Overlay avec animation */}
        <AnimatePresence>
          {isOpen && (
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </Dialog.Overlay>
          )}
        </AnimatePresence>

        {/* Contenu centré avec animation */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <AnimatePresence>
            {isOpen && (
              <Dialog.Content asChild>
                <motion.div
                  className="relative w-full max-w-lg transform overflow-hidden bg-white px-5 pb-4 pt-5 shadow-xl"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* Close button (top right) */}
                  <div className="absolute right-3 top-3">
                    <Dialog.Close className="bg-white text-zinc-400 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-2 ">
                      <span className="sr-only">Close</span>
                      <X className="h-5 w-5" aria-hidden="true" />
                    </Dialog.Close>
                  </div>

                  {/* Header */}
                  <div className="text-center md:text-left">
                    <Dialog.Title className="text-base font-semibold text-zinc-900">
                      {t('modal.form.title')}
                    </Dialog.Title>
                    <p className="mt-1 text-sm text-gray-500">
                      {t('modal.form.description')}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-gray-700">
                        {t('modal.form.name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder={t('modal.form.placeholderName')}
                        className="mt-1 block w-full  border border-zinc-300 py-1 px-2 text-sm shadow-sm focus:border-sky-700 focus:ring-sky-700"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-zinc-700">
                        {t('modal.form.email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="mt-1 block w-full border border-zinc-300 py-1 px-2 text-sm shadow-sm focus:border-sky-700 focus:ring-sky-700"
                      />
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block text-xs font-medium text-zinc-700">
                        {t('modal.form.projectType')} *
                      </label>
                      <select
                        id="projectType"
                        required
                        className="mt-1 block w-full border border-zinc-300 py-1 px-2 text-sm shadow-sm focus:border-sky-700 focus:ring-sky-700"
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
                        className="mt-1 block w-full text-xs text-zinc-700
                          file:mr-2 file:py-1 file:px-2
                          file:border-0 
                          file:text-xs file:font-semibold
                          file:bg-sky-50 file:text-sky-700
                          hover:file:bg-sky-100"
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
                        rows={3}
                        className="mt-1 block w-full  border border-zinc-300 py-1 px-2 text-sm shadow-sm focus:border-sky-700 focus:ring-sky-700"
                      ></textarea>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex justify-end gap-2">
                      <Dialog.Close asChild>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-1  bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50"
                        >
                          <XCircle className="h-4 w-4" />
                          {t('modal.form.cancel')}
                        </motion.button>
                      </Dialog.Close>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-1 bg-sky-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-800"
                      >
                        <Send className="h-4 w-4" />
                        {t('modal.form.submit')}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              </Dialog.Content>
            )}
          </AnimatePresence>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

