import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title:
    "Third Factor | A Prixa Company - AI Identity Verification & Identity Intelligence system",
  description:
    "Experience seamless AI-powered identity verification with ThirdFactor. Our advanced Identity Intelligence Solutions ensure compliance and fraud prevention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
