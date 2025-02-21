// import type { Metadata } from "next";
// import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Suspense } from "react";
import { NavbarLoading } from "@/components/navbar/NavbarLoading";
import { FooterLoading } from "@/components/footer/FooterLoading";
import { NavbarContainer } from "@/components/navbar/NavbarContainer";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import CartHeader from "@/components/CartHeader";

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
        <CartProvider>
          <CartHeader />

          <Suspense fallback={<NavbarLoading />}>
            <NavbarContainer />
          </Suspense>
          <main className="flex-grow">{children}</main>
          <Suspense fallback={<FooterLoading />}>
            <Footer />
          </Suspense>
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
