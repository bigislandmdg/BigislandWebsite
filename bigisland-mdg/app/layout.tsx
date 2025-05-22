import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "'BigIslandMDG",
  description: "BigIslandMDG - Votre solution numérique pour la gestion intelligente",
  icons: {

  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800`}
      >

                {/* Application padding to prevent overlap with fixed navbar */}
        <main className="pb-0 lg:pb-0 bg-gray-50 min-h-screen">
          {children}
        </main>

      </body>
    </html>
  );
}
