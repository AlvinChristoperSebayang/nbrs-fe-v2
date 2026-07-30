import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CtaSection } from "@/components/cta/CtaSection";
import { NEWS_DATA } from "@/lib/news-data";
import { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "News",
};

const cta: CtaContent[] = [
  {
    image: "/images/contact-bg.png",
    title: "GET IN TOUCH",
    description: "Interested in our latest news or have press inquiries? Get in touch with our team.",
    buttonText: "CONTACT US",
    buttonHref: "/contact",
  },
];

export default function NewsPage() {
  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION (ONLY TITLE) */}
      <Hero
        image="/images/hero/hero6.png"
        title="NEWS"
      />

      {/* 2. NEWS LIST GRID SECTION */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {NEWS_DATA.map((article, index) => (
              <div
                key={article.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="flex"
              >
                <ArticleCard item={article} hrefPrefix="news" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. CTA SECTION */}
      <CtaSection cta={cta} />
    </article>
  );
}
