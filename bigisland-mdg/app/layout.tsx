import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { languages } from '@/i18n/settings';
import ClientLayout from '@/components/layout/ClientLayout';

import './globals.css';
import CookieConsent from '@/components/utils/CookieConsent';
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BigIsland MDG',
  description: 'BigIslandMDG - Votre solution numérique pour la gestion intelligente',
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

function getDirection(lang: string): 'ltr' | 'rtl' {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} dir={getDirection(params.lang)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800`}
      >
        <ClientLayout>
           {/*<FloatingLanguageToggle />*/}
           <main className="pb-0 lg:pb-0 bg-white min-h-screen">{children}</main>
           <CookieConsent />
            <SpeedInsights />
        </ClientLayout>
        
      </body>
    </html>
  );
}
