import type { Metadata } from "next";
import { roboto, tradeGothic } from "@/lib/fonts";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AosInit } from "@/components/layout/AosInit";
import { GlobalLoading } from "@/components/ui/GlobalLoading";
import { getFooter } from "@/lib/footer";
import "./globals.css";
import "./header.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nbrs.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NBRS Architecture | Multidisciplinary Design",
    template: "%s | NBRS",
  },
  description:
    "NBRS is a multidisciplinary design practice uniting architecture, landscape, interior design, and heritage to create life-changing environments.",
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: "NBRS Architecture",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footer = await getFooter();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable} ${tradeGothic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <AosInit />
        <Suspense fallback={null}>
          <GlobalLoading />
        </Suspense>
        <Header />
        {children}
        <Footer content={footer} />
      </body>
    </html>
  );
}
