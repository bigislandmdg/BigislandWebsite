'use client';

import AboutSection from '@/components/AboutSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutScreen from '@/components/AboutScreen';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
       <AboutScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
