import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { TeamListSection } from "@/components/people/TeamListSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Meet Our Leaders | Our People",
};

const cta: CtaContent = {
  image: "/images/contact-bg.png",
  title: "GET IN TOUCH",
  description: "Want to join our collective or collaborate on a project? Reach out to our leadership team.",
  buttonText: "CONTACT US",
  buttonHref: "/contact",
};

export default function TeamPage() {
  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero
        image="/images/hero/hero1.png"
        title="MEET OUR LEADERS"
        description="Behind every NBRS project is a multidisciplinary team driven by real insight and a shared purpose: creating environments that shape lives for good."
      />

      {/* 2. TEAM LIST SECTION WITH PRACTICE FILTER */}
      <TeamListSection />

      {/* 3. CTA SECTION */}
      <CtaSection content={cta} />
    </article>
  );
}
