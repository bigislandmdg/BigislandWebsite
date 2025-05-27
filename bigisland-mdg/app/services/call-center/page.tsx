'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';
import CallCenterScreen from '@/components/screen/CallCenterScreen';

export default function CallCenterPage() {
  return (
    <>
      <Navbar />
      <main>
       <CallCenterScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
