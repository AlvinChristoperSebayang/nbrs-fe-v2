import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { CtaSection } from "@/components/cta/CtaSection";
import { CtaContent } from "@/lib/types";
import { NEWS_DATA } from "@/lib/news-data";

export function generateStaticParams() {
  return NEWS_DATA.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const article = NEWS_DATA.find((item) => item.slug === resolvedParams.slug);

  return {
    title: article ? article.title : "News Article",
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const article =
    NEWS_DATA.find((item) => item.slug === resolvedParams.slug) || NEWS_DATA[0];

  const cta: CtaContent = {
    image: "/images/contact-bg.png",
    title: "GET IN TOUCH",
    buttonText: "CONTACT US",
    buttonHref: "/contact",
  };

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION WITH TITLE, DIVIDER, CATEGORY & DATE */}
      <Hero
        image={article.image}
        title={article.title}
        description={
          <p className="mt-2 font-sans text-sm sm:text-base text-white/90 font-normal">
            {article.category} • {article.date}
          </p>
        }
      />

      {/* 2. ARTICLE CONTENT SECTION (Hidden H2 Title on Mobile, Visible on Desktop) */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            {/* Left Column: Bold Article Title (Hidden on Mobile) */}
            <div data-aos="fade-up" className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] uppercase font-bold leading-tight text-black border-b-4 border-black pb-4">
                {article.title}
              </h2>
            </div>

            {/* Right Column: Article Paragraphs */}
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="lg:col-span-7 flex flex-col gap-6 font-sans text-base text-zinc-900 leading-relaxed lg:max-w-[370px]"
            >
              {article.paragraphs && article.paragraphs.length > 0 ? (
                article.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>{article.excerpt}</p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CTA SECTION */}
      <CtaSection content={cta} />
    </article>
  );
}