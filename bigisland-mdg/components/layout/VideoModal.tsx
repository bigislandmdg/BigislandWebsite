'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useTranslation } from 'next-i18next';

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
};

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  const { t } = useTranslation('common');

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 transition-opacity duration-300" />
        
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
          <Dialog.Content className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl">
            <div className="flex justify-between items-start p-3"> {/* Padding réduit */}
              <Dialog.Title className="text-lg font-bold text-gray-800"> {/* Taille de texte réduite */}
                {t('videoModal.title')}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="text-gray-500 hover:text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <X className="h-5 w-5" /> {/* Icône plus petite */}
                  <span className="sr-only">Close</span>
                </button>
              </Dialog.Close>
            </div>

            <div className="p-2"> {/* Padding réduit */}
              <div className="aspect-w-16 aspect-h-7">
                <iframe
                  src={videoUrl}
                  className="w-full h-[400px] rounded-md"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
