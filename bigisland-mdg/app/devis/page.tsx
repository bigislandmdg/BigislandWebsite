'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';

import DevisScreen from '@/components/screen/DevisScreen';

export default function DevisPage() {
  return (
    <>
      <Navbar />
      <main>
       <DevisScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
