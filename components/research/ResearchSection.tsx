"use client";

import { useState, useEffect, useCallback } from "react";
import {
  SECTOR_OPTIONS,
  PRACTICE_OPTIONS,
  DUMMY_RESEARCH_ITEMS,
  ResearchItem,
  CategoryOption,
} from "@/lib/research-data";
import {
  fetchResearchListing,
  GraphQLCategoryNode,
  GraphQLResearchEntry,
} from "@/lib/graphql-research";
import { ResearchCard } from "./ResearchCard";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M5 12h14m0 0l-6-6m6 6l-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Fallback color palette if accentColor is missing in GraphQL node
const CATEGORY_COLORS: Record<string, string> = {
  education: "#EDE3F0",
  community: "#F2E8D8",
  wellness: "#DEE1F2",
  heritage: "#F0C7BD",
  "secure-spaces": "#FDD4B6",
};

export function ResearchSection() {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedPractices, setSelectedPractices] = useState<string[]>([]);

  const [sectorOptions, setSectorOptions] =
    useState<CategoryOption[]>(SECTOR_OPTIONS);
  const [practiceOptions, setPracticeOptions] =
    useState<CategoryOption[]>(PRACTICE_OPTIONS);

  const [researchItems, setResearchItems] =
    useState<ResearchItem[]>(DUMMY_RESEARCH_ITEMS);
  const [totalCount, setTotalCount] = useState<number>(DUMMY_RESEARCH_ITEMS.length);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const [heading, setHeading] = useState<string>("ENVISION");
  const [subheading, setSubheading] = useState<string>(
    "In‑depth investigations into emerging industry themes, exploring the intersection of design, performance and community impact."
  );

  const mapGraphQLCategory = (cat: GraphQLCategoryNode): CategoryOption => ({
    id: cat.id,
    label: cat.title,
    slug: cat.slug,
    hoverColor: cat.accentColor || CATEGORY_COLORS[cat.slug] || "#EDE3F0",
  });

  const mapGraphQLResearchEntry = (entry: GraphQLResearchEntry): ResearchItem => {
    const sector = entry.catSector?.[0];
    const discipline = entry.catDiscipline?.[0];

    const sectorSlug = sector?.slug || "general";
    const sectorName = sector?.title || "Research";
    const practiceSlug = discipline?.slug || "architecture";
    const practiceName = discipline?.title || "Architecture";

    const hoverColor =
      sector?.accentColor ||
      discipline?.accentColor ||
      CATEGORY_COLORS[sectorSlug] ||
      "#EDE3F0";

    const imageUrl =
      entry.thumbnail?.[0]?.url2 ||
      entry.thumbnail?.[0]?.url ||
      "/images/home/sector2.png";

    return {
      id: entry.id,
      slug: entry.slug,
      title: entry.artHdrHeading || entry.title,
      excerpt: "",
      sectorSlug,
      sectorName,
      practiceSlug,
      practiceName,
      image: imageUrl,
      hoverColor,
    };
  };

  // Perform GraphQL Query for initial page / filter change
  const loadData = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchResearchListing({
      limit: 9,
      offset: 0,
      selectedSectors,
      selectedPractices,
    });

    if (data) {
      // Update banner heading
      if (data.page?.[0]?.pageHeading) {
        setHeading(data.page[0].pageHeading);
      }
      if (data.page?.[0]?.pageSubheading) {
        setSubheading(data.page[0].pageSubheading);
      }

      // Update category chips if returned
      if (data.sectors && data.sectors.length > 0) {
        setSectorOptions(data.sectors.map(mapGraphQLCategory));
      }
      if (data.practices && data.practices.length > 0) {
        setPracticeOptions(data.practices.map(mapGraphQLCategory));
      }

      // Update research cards & total
      if (data.research) {
        setResearchItems(data.research.map(mapGraphQLResearchEntry));
      }
      if (typeof data.total === "number") {
        setTotalCount(data.total);
      }
    } else {
      // Fallback local filtering if GraphQL endpoint offline
      const filtered = DUMMY_RESEARCH_ITEMS.filter((item) => {
        const matchesSector =
          selectedSectors.length === 0 || selectedSectors.includes(item.sectorSlug);
        const matchesPractice =
          selectedPractices.length === 0 || selectedPractices.includes(item.practiceSlug);
        return matchesSector && matchesPractice;
      });
      setResearchItems(filtered);
      setTotalCount(filtered.length);
    }
    setIsLoading(false);
  }, [selectedSectors, selectedPractices]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Load More Next Page
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const nextOffset = researchItems.length;

    const data = await fetchResearchListing({
      limit: 9,
      offset: nextOffset,
      selectedSectors,
      selectedPractices,
    });

    if (data && data.research) {
      const newItems = data.research.map(mapGraphQLResearchEntry);
      setResearchItems((prev) => [...prev, ...newItems]);
      if (typeof data.total === "number") {
        setTotalCount(data.total);
      }
    }
    setIsLoadingMore(false);
  };

  const toggleSector = (slug: string) => {
    setSelectedSectors((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const togglePractice = (slug: string) => {
    setSelectedPractices((prev) =>
      prev.includes(slug) ? prev.filter((p) => p !== slug) : [...prev, slug]
    );
  };

  const resetSectorFilters = () => setSelectedSectors([]);
  const resetPracticeFilters = () => setSelectedPractices([]);
  const resetAllFilters = () => {
    setSelectedSectors([]);
    setSelectedPractices([]);
  };

  const hasMore = researchItems.length < totalCount;

  return (
    <div className="flex flex-col gap-7 bg-white text-black">
      {/* Header section */}
      <div className="flex flex-col gap-4 max-w-xl">
        <h2 className="font-heading text-4xl uppercase leading-none text-black lg:text-[40px]">
          {heading}
        </h2>
        <p className="text-base text-zinc-800 leading-normal">
          {subheading}
        </p>
      </div>

      <hr className="border-t border-zinc-200" />

      {/* Filter by Sector */}
      <div className="flex flex-col gap-3">
        <p className="text-base font-bold text-black">
          Filter by Sector
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {sectorOptions.map((sector) => {
            const isActive = selectedSectors.includes(sector.slug);
            return (
              <button
                key={sector.id || sector.slug}
                type="button"
                onClick={() => toggleSector(sector.slug)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-[#F5F5F5] text-black hover:bg-zinc-200"
                }`}
              >
                <span>{sector.label}</span>
                <ArrowIcon />
              </button>
            );
          })}

          {selectedSectors.length > 0 && (
            <button
              type="button"
              onClick={resetSectorFilters}
              className="inline-flex items-center rounded-full border border-[#DBDBDB] px-6 py-2.5 text-sm text-black transition hover:border-black"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Filter by Practice */}
      <div className="flex flex-col gap-3">
        <p className="text-base font-bold text-black">
          Filter by Practice
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {practiceOptions.map((practice) => {
            const isActive = selectedPractices.includes(practice.slug);
            return (
              <button
                key={practice.id || practice.slug}
                type="button"
                onClick={() => togglePractice(practice.slug)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-[#F5F5F5] text-black hover:bg-zinc-200"
                }`}
              >
                <span>{practice.label}</span>
                <ArrowIcon />
              </button>
            );
          })}

          {selectedPractices.length > 0 && (
            <button
              type="button"
              onClick={resetPracticeFilters}
              className="inline-flex items-center rounded-full border border-[#DBDBDB] px-6 py-2.5 text-sm text-black transition hover:border-black"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Research Cards */}
      <div className="mt-6 relative min-h-[300px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <span className="text-sm font-bold uppercase tracking-wider text-black animate-pulse">
              Loading Research...
            </span>
          </div>
        )}

        {researchItems.length > 0 ? (
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {researchItems.map((item) => (
                <ResearchCard key={item.id || item.slug} item={item} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="inline-flex items-center gap-3 rounded-full bg-black text-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 transition disabled:opacity-50"
                >
                  {isLoadingMore ? "Loading..." : "Load More Research"}
                  <ArrowIcon />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-zinc-600">
              No research items match the selected filters.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="mt-4 inline-flex items-center rounded-full border border-black px-6 py-2.5 text-sm text-black transition hover:bg-black hover:text-white"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
