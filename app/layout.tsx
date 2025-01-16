// import type { Metadata } from "next";
// import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { NavbarLoading } from "@/components/NavbarLoading";
import { FooterLoading } from "@/components/FooterLoading";
import { NavbarContainer } from "@/components/NavbarContainer";
import { Toaster } from "react-hot-toast";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({x
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const quickSand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "700"], // Add desired weights here
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quickSand.variable} ${quickSand.variable} antialiased`}
      >
        <Suspense fallback={<NavbarLoading />}>
          <NavbarContainer />
        </Suspense>
        {children}
        <Suspense fallback={<FooterLoading />}>
          <Footer />
        </Suspense>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
