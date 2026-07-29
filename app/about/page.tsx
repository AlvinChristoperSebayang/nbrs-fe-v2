import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { AboutPracticeSection } from "@/components/about/AboutPracticeSection";
import { AboutTimelineSection } from "@/components/about/AboutTimelineSection";
import { AboutSection } from "@/components/home/AboutSection";
import { GridEffect } from "@/components/ui/GridEffect";
import { CtaSection } from "@/components/cta/CtaSection";
import { getPageCta } from "@/lib/cta";
import type { NewsItem, CtaContent } from "@/lib/types";


export const metadata: Metadata = {
  title: "About Us",
};


export default async function AboutPage() {
  const latestNews: NewsItem[] = [
    {
      title: "SOCIAL ARCHITECTURE",
      image: "/images/hero/about-hero.png",
      description: "People and community at the core."
    },
    {
      title: "REAL INSIGHT",
      image: "/images/about/real-insight.jpg",
      description: "We design for the people who will use the spaces we create."
    },
    {
      title: "CREATIVE PARTNERSHIPS",
      image: "/images/about/creative-partnership.jpg",
      description: "We collaborate with clients, communities and stakeholders to create spaces that matter."
    },
  ];
  const cta: CtaContent[] = [
    {
      image: "/images/contact-bg.png",
      title: "Let’s Shape What’s Next-Together",
      description: "Whether it’s a place to gather, to heal, to learn or to live - we’re ready to collaborate. Let’s shape spaces that matter, together.",
      buttonText: "Let’s Shape What’s Next-Together",
      buttonHref: "/contact",
    },
  ];
  return (
    <article>
      <Hero
        image="/images/hero/about-hero.png"
        title="Designing Environments That Influence Society"
        description="NBRS approaches architecture and design as a social art, uplifting people, connecting communities, and shaping how we live."
      />
      <div className="lg:pb-32">
        <AboutSection
          image_url="/images/about-us-about.png"
          background_color="#FDD4B6"
          heading="People‑centred design for good"
          description="We create environments that foster wellbeing, belonging and transformation. Design that responds directly to human needs."
      />
      </div>
      <GridEffect title="What We Do" items={latestNews} backgroundColor="#EDEDED" />
      <AboutPracticeSection
        heading="A Practice Built on Care, Joy and Collaboration"
        description="Integrated design studios across Sydney and Melbourne, including architecture, interior design, landscape architecture and heritage advice. United by a mission to design for people, place and purpose."
        mainImage="/images/about/practice1.jpg"
        galleryImages={[
          "/images/about/practice2.jpg",
          "/images/about/practice3.jpg",
          "/images/about/practice4.jpg",
        ]}
      />
      <AboutTimelineSection />
      <CtaSection content={await getPageCta("aboutUs", cta[0]).catch(() => cta[0])} />
    </article>
  );
}
