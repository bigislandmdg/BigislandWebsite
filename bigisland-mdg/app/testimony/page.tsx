'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';
import TestimonyScreen from '@/components/screen/TestimonyScreen';

export default function TestimonyPage() {
  return (
    <>
      <Navbar />
      <main>
       <TestimonyScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
