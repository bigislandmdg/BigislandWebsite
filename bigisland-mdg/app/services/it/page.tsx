'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';
import ItScreen from '@/components/screen/ItScreen';

export default function ItPage() {
  return (
    <>
      <Navbar />
      <main>
       <ItScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
