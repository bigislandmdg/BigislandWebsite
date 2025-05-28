'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';
import ProjetScreen from '@/components/screen/ProjetScreen';

export default function ProjetPage() {
  return (
    <>
      <Navbar />
      <main>
       <ProjetScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
