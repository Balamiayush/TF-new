import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";
import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine,
} from "geist/font/pixel";

import "./globals.css";

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
        className={`${GeistSans.variable} ${GeistPixelSquare.variable} ${GeistPixelGrid.variable} ${GeistPixelCircle.variable} ${GeistPixelTriangle.variable} ${GeistPixelLine.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
