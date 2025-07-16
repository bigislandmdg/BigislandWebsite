'use client';

import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';

import LegalNoticeScreen from '@/components/screen/LegalNoticeScreen';

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main>
       <LegalNoticeScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
