"use client";

import { useCallback, useRef, useState } from "react";
import type { ProjectListItem } from "@/lib/projects-listing";
import { ProjectsGrid } from "./ProjectsGrid";

type ProjectsBatchResponse = {
  projects: ProjectListItem[];
  total: number;
  nextOffset: number | null;
};

type ProjectsLoadMoreProps = {
  initialProjects: ProjectListItem[];
  total: number;
  sectorSlugs: string[];
  practiceSlugs: string[];
};

export function ProjectsLoadMore({
  initialProjects,
  total: initialTotal,
  sectorSlugs,
  practiceSlugs,
}: ProjectsLoadMoreProps) {
  const [items, setItems] = useState(initialProjects);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [isExhausted, setIsExhausted] = useState(false);
  const loadingRef = useRef(false);

  const hasMore = !isExhausted && items.length < total;

  const loadMore = useCallback(async () => {
    if (loadingRef.current || items.length >= total) return;

    loadingRef.current = true;
    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.set("offset", String(items.length));
      if (sectorSlugs.length) params.set("sector", sectorSlugs.join(","));
      if (practiceSlugs.length) params.set("practice", practiceSlugs.join(","));

      const response = await fetch(`/api/projects?${params.toString()}`);
      if (!response.ok) throw new Error("Projects batch request failed");

      const batch = (await response.json()) as ProjectsBatchResponse;
      if (!Array.isArray(batch.projects) || batch.projects.length === 0) {
        if (typeof batch.total === "number" && batch.total <= items.length) {
          setIsExhausted(true);
        }
        return;
      }
      setTotal(
        batch.nextOffset === null
          ? Math.min(batch.total, items.length + batch.projects.length)
          : batch.total
      );
      setItems((currentItems) => {
        const knownIds = new Set(currentItems.map((item) => item.id));
        return [
          ...currentItems,
          ...batch.projects.filter((item) => !knownIds.has(item.id)),
        ];
      });
    } catch {
      setIsExhausted(true);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [items.length, practiceSlugs, sectorSlugs, total]);

  return (
    <>
      <div className="mt-12">
        <ProjectsGrid projects={items} />
      </div>

      <div className="mt-12 min-h-12 text-center" aria-live="polite">
        {isLoading && (
          <p className="mb-4 text-sm text-zinc-600">Load more data ....</p>
        )}
        {hasMore && (
          <button
            type="button"
            onClick={() => void loadMore()}
            disabled={isLoading}
            title="Load more projects"
            aria-label="Load more projects"
            className="inline-flex items-center rounded-full border border-black px-8 py-3 text-sm uppercase text-black transition hover:bg-black hover:text-white disabled:cursor-wait disabled:opacity-60"
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
}
