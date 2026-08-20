import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";

import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine,
} from "geist/font/pixel";

import "./globals.css";

import MainNavigation from "@/shared/layouts/header/MainNavigation";
import Footer from "@/shared/layouts/footer/Footer";
import LenisContextProvider from "@/store/lenis-context";
import Template from "@/shared/ui/template";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Third Factor | A Prixa Company - AI Identity Verification & Identity Intelligence system",
  description:
    "Experience seamless AI-powered identity verification with ThirdFactor. Our advanced Identity Intelligence Solutions ensure compliance and fraud prevention.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${GeistSans.variable} ${GeistPixelSquare.variable} ${GeistPixelGrid.variable} ${GeistPixelCircle.variable} ${GeistPixelTriangle.variable} ${GeistPixelLine.variable} antialiased`}
      >
        <LenisContextProvider>
          <MainNavigation />
          <Template>{children}</Template>
          <Footer />
        </LenisContextProvider>
      </body>
    </html>
  );
}