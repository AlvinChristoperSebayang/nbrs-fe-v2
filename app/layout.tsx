import type { Metadata } from "next";
import { roboto, tradeGothic } from "@/lib/fonts";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AosInit } from "@/components/layout/AosInit";
import { GlobalLoading } from "@/components/ui/GlobalLoading";
import { getFooter } from "@/lib/footer";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_SEO_DESCRIPTION,
  getRobotsMetadata,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";
import "./header.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NBRS Architecture | Multidisciplinary Design",
    template: "%s | NBRS",
  },
  description: DEFAULT_SEO_DESCRIPTION,
  robots: getRobotsMetadata(),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png", sizes: "32x32" }],
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "/",
    siteName: "NBRS Architecture",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE.url],
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
