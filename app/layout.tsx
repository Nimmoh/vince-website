import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vincevic Shades Interprises - Shades, Gazebos, Pagolas & Gates",
  description: "Kenya's premier destination for quality shades, gazebos, pagolas, and gates. Premium products, professional installation, exceptional service.",
  keywords: ["shades", "gazebos", "pagolas", "gates", "Kenya", "Nairobi", "car shades", "outdoor structures"],
  authors: [{ name: "Vincevic Shades Interprises" }],
  creator: "Vincevic Shades Interprises",
  publisher: "Vincevic Shades Interprises",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", type: "image/svg+xml", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://vincevicshades.co.ke",
    siteName: "Vincevic Shades Interprises",
    title: "Vincevic Shades Interprises - Premium Outdoor Structures",
    description: "Quality shades, gazebos, pagolas, and gates across Kenya. Professional installation and exceptional service.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Vincevic Shades Interprises - Premium Outdoor Structures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vincevic Shades Interprises",
    description: "Quality shades, gazebos, pagolas, and gates across Kenya",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
