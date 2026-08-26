"use client";

import { useState } from "react";
import type { ResearchCategory, ResearchListItem } from "@/lib/research-listing";
import type { ImageSource } from "@/lib/types";
import { ResearchCard } from "./ResearchCard";

export type ResearchSectionProps = {
  heading?: string | null;
  subheading?: string | null;
  sectors?: ResearchCategory[];
  practices?: ResearchCategory[];
  items?: ResearchListItem[];
};

type VisibleResearchItem = {
  id: string;
  slug: string;
  title: string;
  image: ImageSource;
  hoverColor: string;
  sectorSlugs: string[];
  practiceSlugs: string[];
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
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

export function ResearchSection({
  heading,
  subheading,
  sectors,
  practices,
  items,
}: ResearchSectionProps) {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedPractices, setSelectedPractices] = useState<string[]>([]);

  const visibleSectors = sectors ?? [];
  const visiblePractices = practices ?? [];

  const visibleItems: VisibleResearchItem[] = (items ?? []).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    image: item.thumbnailUrl ?? "/images/home/sector2.png",
    hoverColor: item.sectors[0]?.accentColor ?? "#E7E7E7",
    sectorSlugs: item.sectors.map((sector) => sector.slug),
    practiceSlugs: item.practices.map((practice) => practice.slug),
  }));

  const filteredItems = visibleItems.filter((item) => {
    const matchesSector =
      selectedSectors.length === 0 ||
      item.sectorSlugs.some((slug) => selectedSectors.includes(slug));
    const matchesPractice =
      selectedPractices.length === 0 ||
      item.practiceSlugs.some((slug) => selectedPractices.includes(slug));
    return matchesSector && matchesPractice;
  });

  const toggleSector = (slug: string) => {
    setSelectedSectors((current) =>
      current.includes(slug) ? current.filter((value) => value !== slug) : [...current, slug]
    );
  };

  const togglePractice = (slug: string) => {
    setSelectedPractices((current) =>
      current.includes(slug) ? current.filter((value) => value !== slug) : [...current, slug]
    );
  };

  const resetAllFilters = () => {
    setSelectedSectors([]);
    setSelectedPractices([]);
  };

  return (
    <div className="flex flex-col gap-7 bg-white text-black">
      <div data-aos="fade-up" className="flex max-w-xl flex-col gap-4">
        <h2 className="font-heading uppercase leading-none text-black text-[40px]">
          {heading || "ENVISION"}
        </h2>
        <p className="text-base leading-normal text-zinc-800 max-w-[393px]">
          {subheading ||
            "In-depth investigations into emerging industry themes, exploring the intersection of design, performance and community impact."}
        </p>
      </div>

      <hr className="border-t border-zinc-200" />

      {visibleSectors.length > 0 && (
        <div data-aos="fade-up" data-aos-delay="100" className="flex flex-col gap-3">
          <p className="text-base font-bold text-black">Filter by Sector</p>
          <div className="flex flex-wrap items-center gap-3">
            {visibleSectors.map((sector) => {
              const isActive = selectedSectors.includes(sector.slug);
              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => toggleSector(sector.slug)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-1.75 text-base transition cursor-pointer ${
                    isActive ? "bg-black text-white" : "bg-[#F5F5F5] text-black hover:bg-zinc-200"
                  }`}
                >
                  <span>{sector.title}</span>
                  <ArrowIcon />
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setSelectedSectors([])}
              className="inline-flex items-center rounded-full border border-[#DBDBDB] px-6 py-1.75 text-sm text-black transition hover:border-black cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {visiblePractices.length > 0 && (
        <div data-aos="fade-up" data-aos-delay="150" className="flex flex-col gap-3">
          <p className="text-base font-bold text-black">Filter by Practice</p>
          <div className="flex flex-wrap items-center gap-3">
            {visiblePractices.map((practice) => {
              const isActive = selectedPractices.includes(practice.slug);
              return (
                <button
                  key={practice.id}
                  type="button"
                  onClick={() => togglePractice(practice.slug)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-1.75 text-base transition cursor-pointer ${
                    isActive ? "bg-black text-white" : "bg-[#F5F5F5] text-black hover:bg-zinc-200"
                  }`}
                >
                  <span>{practice.title}</span>
                  <ArrowIcon />
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setSelectedPractices([])}
              className="inline-flex items-center rounded-full border border-[#DBDBDB] px-6 py-1.75 text-sm text-black transition hover:border-black cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      <div data-aos="fade-up" data-aos-delay="200" className="mt-6">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <ResearchCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-zinc-600">No research items match the selected filters.</p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="mt-4 inline-flex items-center rounded-full border border-black px-6 py-1.75 text-sm text-black transition hover:bg-black hover:text-white cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

