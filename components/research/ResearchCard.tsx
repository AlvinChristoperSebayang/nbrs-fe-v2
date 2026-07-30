import { ArticleCard } from "@/components/ui/ArticleCard";
import type { ResearchItem } from "@/lib/research-data";

export function ResearchCard({ item }: { item: ResearchItem }) {
  return <ArticleCard item={item} hrefPrefix="research" />;
}
