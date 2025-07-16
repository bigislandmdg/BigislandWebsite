'use client';

import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';

import PrivacyPolicyScreen from '@/components/screen/PrivacyPolicyScreen';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
       <PrivacyPolicyScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
