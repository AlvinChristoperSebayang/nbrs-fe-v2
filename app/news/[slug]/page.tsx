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

function getNewsMobileLines(title: string): string[] | undefined {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 5) return undefined;

  function partitionIntoK(wordList: string[], k: number): string[] | null {
    const n = wordList.length;
    let best: string[] | null = null;
    let bestScore = Infinity;

    function search(wordIdx: number, currentLines: string[]) {
      const linesLeft = k - currentLines.length;
      const wordsLeft = n - wordIdx;
      if (wordsLeft < linesLeft) return;

      if (linesLeft === 1) {
        const lastLine = wordList.slice(wordIdx).join(" ");
        if (lastLine.length > 25) return;
        const all = [...currentLines, lastLine];
        const maxLen = Math.max(...all.map((l) => l.length));
        const singleWordPenalty = all.reduce((acc, l) => acc + (!l.includes(" ") ? 50 : 0), 0);
        const avgLen = all.reduce((a, b) => a + b.length, 0) / k;
        const variance = all.reduce((a, b) => a + Math.pow(b.length - avgLen, 2), 0);
        const score = maxLen * 10 + variance + singleWordPenalty;

        if (score < bestScore) {
          bestScore = score;
          best = all;
        }
        return;
      }

      for (let take = 1; take <= wordsLeft - linesLeft + 1; take++) {
        const line = wordList.slice(wordIdx, wordIdx + take).join(" ");
        if (line.length > 25) break;
        search(wordIdx + take, [...currentLines, line]);
      }
    }

    search(0, []);
    return best;
  }

  // If 6 or 7 words, try 3 lines first (if max line length <= 22 chars)
  if (words.length <= 7) {
    const lines3 = partitionIntoK(words, 3);
    if (lines3 && Math.max(...lines3.map((l) => l.length)) <= 22) {
      return lines3;
    }
  }

  // Otherwise target 4 lines
  const lines4 = partitionIntoK(words, 4);
  if (lines4) return lines4;

  const lines3 = partitionIntoK(words, 3);
  return lines3 || undefined;
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
  const mobileLines = getNewsMobileLines(article.title);

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
        mobileLines={mobileLines}
        imageClassName="object-cover object-bottom md:object-center"
        className="!h-auto aspect-[1200/840] min-h-[260px] sm:aspect-[16/10] lg:!h-auto lg:!min-h-0 lg:aspect-[1200/840]"
        containerClassName="!pt-14 sm:!pt-20 lg:!pt-20 !pb-4 sm:!pb-6 lg:!pb-12"
        titleClassName="!text-[28px] sm:!text-[36px] lg:!text-[70px]"
        description={
          meta ? <p className="mt-2 font-sans text-sm font-normal text-white/90 sm:text-base">{meta}</p> : undefined
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
