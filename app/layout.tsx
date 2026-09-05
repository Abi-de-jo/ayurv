import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/lenis-provider";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ActiveOrderWidget from "@/components/layout/active-order-widget";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayurvya Wellness | Where Ayurveda Meets Luxury",
  description:
    "100% authentic Ayurvedic hair care. Premium Herbal Shikakai Powder with 40+ herbs and Herbal Hair Oil Elixir. Free of sulphates, parabens, and chemicals.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  keywords: [
    "Ayurvya",
    "Ayurvedic hair care",
    "Herbal Shikakai Powder",
    "Hair Oil Elixir",
    "Natural Shampoo",
    "Sulphate free hair cleanser",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-[#0A0A0A] text-[#F5F3EC] antialiased selection:bg-[#D4AF37] selection:text-[#0A0A0A] font-sans">
        <LenisProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <ActiveOrderWidget />
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
