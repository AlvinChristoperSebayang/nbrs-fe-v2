import { ArticleCard } from "@/components/ui/ArticleCard";
import type { NewsArticle } from "@/lib/news-data";

export function NewsCard({ item }: { item: NewsArticle }) {
  return <ArticleCard item={item} hrefPrefix="news" />;
}
