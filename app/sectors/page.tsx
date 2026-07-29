import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { SectorsSection } from "@/components/home/SectorsSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { SECTORS_DATA } from "@/lib/sectors-data";
import type { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Exploring Our Sectors",
};

const cta: CtaContent[] = [
  {
    image: "/images/contact-bg.png",
    title: "LET’S SHAPE WHAT’S NEXT-TOGETHER",
    description:
      "Whether it’s a place to gather, to heal, to learn or to live - we’re ready to collaborate. Let’s shape spaces that matter, together.",
    buttonText: "LET’S SHAPE WHAT’S NEXT-TOGETHER",
    buttonHref: "/contact",
  },
];

export default function SectorsPage() {
  return (
    <article className="bg-white text-black min-h-screen">
      <Hero
        image="/images/hero/hero4.png"
        title="EXPLORING OUR SECTORS"
        description="Identify how we can support your project through the breadth of our sector expertise."
      />

      <SectorsSection sectors={SECTORS_DATA} />

      <CtaSection content={cta[0]} />
    </article>
  );
}
