'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';

import Post3Screen from '@/components/screen/post/post3Screen';

export default function Post3Page() {
  return (
    <>
      <Navbar />
      <main>
       <Post3Screen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
