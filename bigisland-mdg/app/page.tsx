import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Metadata } from "next";
import "./globals.css";


export default function Home() {
  return (
     <>
        <Navbar />
           <main className="mt-20">
        <Hero />
        {/* Ton contenu principal peut continuer ici */}
      </main>

      {/* Ajoute le bouton ici, en dehors du <main> */}
      <ScrollToTopButton />

      {/* Tu peux aussi remettre le footer si nécessaire */}
      <Footer />
     </>

    
  );
}
