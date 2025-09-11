'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next'; // importe ton instance i18n

import Hero from '@/components/section/HeroSection';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';
import AboutSection from '@/components/section/AboutSection';
import ServicesSection from '@/components/section/ServicesSection';
import ClientSection from '@/components/section/ClientSection';
import TestimonySection from '@/components/section/TestimonySection';
import TeamSection from '@/components/section/TeamSection';
import BlogSection from '@/components/section/BlogSection';
import ContactSection from '@/components/section/ContactSection';

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
      <main className="mt-17 bg-white min-h-screen">
        <Hero />
         <AboutSection /> 
          <ClientSection/>
         <ServicesSection />     
         <TestimonySection />
         <TeamSection />
         <BlogSection />
         <ContactSection />
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
