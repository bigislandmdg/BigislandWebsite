'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';
import ContactScreen from '@/components/screen/ContactScreen';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
       <ContactScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
