'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';
import FournisseurScreen from '@/components/screen/FournisseurScreen';

export default function FournisseurPage() {
  return (
    <>
      <Navbar />
      <main>
       <FournisseurScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
