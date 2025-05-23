'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next'; // importe ton instance i18n

import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ClientSection from '@/components/ClientSection';
import TestimonySection from '@/components/TestimonySection';

interface PageProps {
  params: {
    lang: string;
  };
}

export default function Home({ params }: PageProps) {
  const { t } = useTranslation('common');

  useEffect(() => {
    if (i18n.language !== params.lang) {
      i18n.changeLanguage(params.lang);
    }
  }, [params.lang]);

  return (
    <>
      <Navbar />
      <main className="mt-20">
        <Hero />
         <AboutSection /> 
         <ServicesSection />
         <ClientSection/>
         <TestimonySection />
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
