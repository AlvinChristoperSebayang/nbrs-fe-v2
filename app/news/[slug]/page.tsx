import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/ui/Hero";
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

function renderNewsHeading(title: string) {
  let lines: string[];
  if (title.includes("\n")) {
    lines = title.split("\n").map((l) => l.trim()).filter(Boolean);
  } else {
    const words = title.trim().split(/\s+/);
    if (words.length >= 4) {
      const mid = Math.ceil(words.length / 2);
      lines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
    } else if (words.length >= 2) {
      lines = [words.slice(0, -1).join(" "), words[words.length - 1]];
    } else {
      lines = [title];
    }
  }

  if (lines.length <= 1) {
    return (
      <span className="inline-block w-fit border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-black pb-1 sm:pb-2 leading-[1.05]">
        {lines[0]}
      </span>
    );
  }

  const firstLines = lines.slice(0, -1);
  const lastLine = lines[lines.length - 1];

  return (
    <span className="flex flex-col items-start w-fit">
      {firstLines.map((line, idx) => (
        <span key={idx} className="block leading-[1.05]">
          {line}
        </span>
      ))}
      <span className="inline-block w-fit border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-black pb-1 sm:pb-2 leading-[1.05] mt-1">
        {lastLine}
      </span>
    </span>
  );
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

  return (
    <article className="bg-white text-black min-h-screen">
      <JsonLd data={articleSchema} />
      <Hero
        image={article.hero ?? "/images/hero/hero6.png"}
        title={article.title}
        imageClassName="object-cover object-center"
        className="lg:!h-auto lg:!min-h-0 lg:aspect-[1200/840]"
        description={
          meta ? <p className="mt-2 font-sans text-sm font-normal text-white/90 sm:text-base">{meta}</p> : undefined
        }
        // imageClassName="lg:object-contain lg:bg-[#121a2e]"
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div data-aos="fade-up" className="hidden lg:block lg:col-span-5">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] uppercase font-bold leading-tight text-black flex flex-col items-start">
                {renderNewsHeading(article.title)}
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
