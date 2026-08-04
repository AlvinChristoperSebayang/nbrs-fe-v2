import type { Metadata } from "next";
import { roboto, tradeGothic } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AosInit } from "@/components/layout/AosInit";
import "./globals.css";
import "./header.css";

export const metadata: Metadata = {
  title: "NBRS",
  description: "NBRS - Your trusted partner in real estate",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable} ${tradeGothic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <AosInit />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
