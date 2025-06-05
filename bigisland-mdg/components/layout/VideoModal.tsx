'use client';

import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
};

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  const { t } = useTranslation('common');

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl rounded-lg bg-white shadow-xl">
          <div className="flex justify-between items-start p-4">
            <Dialog.Title className="text-xl font-bold text-gray-800">
              {t('videoModal.title')}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={videoUrl}
                className="w-full h-[500px]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}