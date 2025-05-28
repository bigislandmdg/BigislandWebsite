'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';
import CguScreen from '@/components/screen/CguScreen';

export default function CguPage() {
  return (
    <>
      <Navbar />
      <main>
       <CguScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
