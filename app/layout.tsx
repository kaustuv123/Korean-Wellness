import type { Metadata } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
