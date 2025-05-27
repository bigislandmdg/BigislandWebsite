'use client';

import AboutSection from '@/components/section/AboutSection';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import AboutScreen from '@/components/screen/AboutScreen';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';

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
