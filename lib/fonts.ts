import { Roboto } from "next/font/google";
import localFont from "next/font/local";

export const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const tradeGothic = localFont({
  src: "../public/Trade Gothic W02 Bold Cn 20/Web Fonts/578ebf91174f9ab5683a66c2609ab000.woff2",
  weight: "700",
  style: "normal",
  variable: "--font-trade-gothic",
  display: "swap",
});
