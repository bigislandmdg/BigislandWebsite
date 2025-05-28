'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';

import Post1Screen from '@/components/screen/post/post1Screen';

export default function Post1Page() {
  return (
    <>
      <Navbar />
      <main>
       <Post1Screen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
