import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { CtaSection } from "@/components/cta/CtaSection";
import { NewsArticleContent } from "@/components/news/NewsArticleContent";
import { getNewsDetail } from "@/lib/news-detail";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsDetail(slug);

  return createPageMetadata({
    pathname: `/news/${slug}`,
    title: article?.title ?? "News Article",
    cmsTitle: article?.seoTitle,
    description: article?.seoDescription,
    image: article?.seoImage ?? article?.hero,
    imageAlt: article?.title,
    type: "article",
    noIndex: !article,
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsDetail(slug);
  if (!article) notFound();

  const meta = [article.category, article.date].filter(Boolean).join(" • ");

  return (
    <article className="bg-white text-black min-h-screen">
      <Hero
        image={article.hero ?? "/images/hero/hero6.png"}
        title={article.title}
        description={
          meta ? <p className="mt-2 font-sans text-sm font-normal text-white/90 sm:text-base">{meta}</p> : undefined
        }
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div data-aos="fade-up" className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] uppercase font-bold leading-tight text-black border-b-4 border-black pb-4">
                {article.title}
              </h2>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="lg:col-span-7"
            >
              <NewsArticleContent blocks={article.content} />
            </div>
          </div>
        </Container>
      </section>

      <CtaSection content={article.cta} />
    </article>
  );
}
