import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero, renderTitleWithUnderline } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { CtaSection } from "@/components/cta/CtaSection";
import { NewsArticleContent } from "@/components/news/NewsArticleContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getNewsDetail } from "@/lib/news-detail";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription || article.title,
    url: `${SITE_URL}/news/${slug}`,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "NBRS Architecture",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "NBRS Architecture",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo/logo-black-2.svg`,
      },
    },
  };

  const heroWidth = article.heroWidth || 16;
  const heroHeight = article.heroHeight || 9;
  const aspectRatio = `${heroWidth} / ${heroHeight}`;

  return (
    <article className="bg-white text-black min-h-screen">
      <JsonLd data={articleSchema} />
      <Hero
        image={article.hero ?? "/images/hero/hero6.png"}
        title={article.title}
        imageClassName="object-contain object-center"
        style={{ aspectRatio }}
        className="!h-auto min-h-[350px] sm:min-h-0 bg-[#181d33]"
        containerClassName="!pt-16 sm:!pt-20 md:!pt-24 lg:!pt-20 !pb-6 sm:!pb-8 lg:!pb-12"
        titleClassName="!text-[34px] sm:!text-[36px] lg:!text-[70px]"
        description={
          meta ? <p className="mt-2 font-sans text-xs sm:text-sm font-normal text-white/90 md:text-base">{meta}</p> : undefined
        }
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div data-aos="fade-up" className="hidden lg:block lg:col-span-5">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[28px] xl:text-[40px] uppercase font-bold leading-[1.08] text-black flex flex-col items-start">
                {renderTitleWithUnderline(article.title, true, "border-black")}
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
