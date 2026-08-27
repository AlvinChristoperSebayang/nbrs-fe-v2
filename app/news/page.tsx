import { createPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { NewsInfiniteGrid } from "@/components/news/NewsInfiniteGrid";
import { getNewsListing, NEWS_PAGE_SIZE } from "@/lib/news-listing";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getNewsListing({ limit: NEWS_PAGE_SIZE });
  return createPageMetadata({
    pathname: "/news",
    title: page.pageHeading || "Latest News",
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription,
    image: page.seoImage ?? page.pageHeroImage,
  });
}

export default async function NewsPage() {
  const listing = await getNewsListing({ limit: NEWS_PAGE_SIZE });

  return (
    <article className="bg-white text-black min-h-screen">
      <Hero
        image={listing.pageHeroImage ?? "/images/hero/hero6.png"}
        title={listing.pageHeading ?? "Latest News"}
      />

      <section className="bg-white py-16 lg:py-22">
        <Container>
          <NewsInfiniteGrid initialItems={listing.articles} total={listing.total} />
        </Container>
      </section>
    </article>
  );
}
