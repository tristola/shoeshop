import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { CartSidebar } from "@/components/CartSidebar";
import { ApolloWrapper } from "@/components/ApolloWrapper";

import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShoeShop | Premium Footwear",
  description: "Explore our premium footwear collection and performance running shoes.",
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/favicon.ico" },
    ],
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ApolloWrapper>
          <LanguageProvider>
            <CartProvider>
              <Navbar />
              <CartSidebar />
              <div className="pt-16">
                {children}
              </div>
            </CartProvider>
          </LanguageProvider>
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
