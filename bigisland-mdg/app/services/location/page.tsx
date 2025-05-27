'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';
import LocationScreen from '@/components/screen/LocationScreen';

export default function LocationPage() {
  return (
    <>
      <Navbar />
      <main>
       <LocationScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
