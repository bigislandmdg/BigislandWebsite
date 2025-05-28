'use client';


import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTopButton from '@/components/utils/ScrollToTopButton';
import BlogScreen from '@/components/screen/BlogScreen';

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
       <BlogScreen/> 
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
