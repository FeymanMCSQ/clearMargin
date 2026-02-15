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
  title: "Shopify Profit Calculator | ClearMargin",
  description: "Upload your Shopify export and instantly understand your real profit, best products, and hidden margin losses.",
  metadataBase: new URL('https://clearmargin.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Shopify Profit Calculator | ClearMargin",
    description: "Upload your Shopify export and instantly understand your real profit, best products, and hidden margin losses.",
    url: 'https://clearmargin.com',
    siteName: 'ClearMargin',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClearMargin - Shopify Profit Clarity',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
