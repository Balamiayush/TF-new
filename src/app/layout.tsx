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
  title: "Third Factor | A Prixa Company",
  description:
    "AI-powered identity verification and identity intelligence system",
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
