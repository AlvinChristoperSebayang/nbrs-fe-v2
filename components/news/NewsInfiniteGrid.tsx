"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArticleCard } from "@/components/ui/ArticleCard";
import type { NewsListItem } from "@/lib/news-listing";

type NewsBatchResponse = {
  articles: NewsListItem[];
  total: number;
  nextOffset: number | null;
};

export function NewsInfiniteGrid({
  initialItems,
  total: initialTotal,
}: {
  initialItems: NewsListItem[];
  total: number;
}) {
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [isExhausted, setIsExhausted] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const hasMore = !isExhausted && items.length < total;

  const loadMore = useCallback(async () => {
    if (loadingRef.current || items.length >= total) return;

    loadingRef.current = true;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/news?offset=${items.length}`);
      if (!response.ok) throw new Error("News batch request failed");

      const batch = (await response.json()) as NewsBatchResponse;
      setTotal(
        batch.nextOffset === null
          ? Math.min(batch.total, items.length + batch.articles.length)
          : batch.total
      );
      setItems((currentItems) => {
        const knownIds = new Set(currentItems.map((item) => item.id));
        return [
          ...currentItems,
          ...batch.articles.filter((item) => !knownIds.has(item.id)),
        ];
      });
    } catch {
      setIsExhausted(true);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [items.length, total]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore();
      },
      { rootMargin: "800px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <>
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {items.map((article, index) => (
          <div
            key={article.id}
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 100}
            className="flex"
          >
            <ArticleCard item={article} hrefPrefix="news" />
          </div>
        ))}
      </div>

      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      <div className="mt-8 min-h-8 text-center" aria-live="polite">
        {isLoading && <p className="text-sm text-zinc-600">Load more data ....</p>}
      </div>
    </>
  );
}
