'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';

import Post2Screen from '@/components/screen/post/post2Screen';

export default function Post2Page() {
  return (
    <>
      <Navbar />
      <main>
       <Post2Screen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
