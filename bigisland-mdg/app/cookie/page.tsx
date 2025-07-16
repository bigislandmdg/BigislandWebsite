'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';
import CookieScreen from '@/components/screen/CookieScreen';

export default function CookiePage() {
  return (
    <>
      <Navbar />
      <main>
       <CookieScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
