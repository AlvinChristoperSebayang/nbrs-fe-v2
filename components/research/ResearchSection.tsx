"use client";

import { useState } from "react";
import {
  SECTOR_OPTIONS,
  PRACTICE_OPTIONS,
  DUMMY_RESEARCH_ITEMS,
} from "@/lib/research-data";
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

export function ResearchSection() {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedPractices, setSelectedPractices] = useState<string[]>([]);

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

  const filteredItems = DUMMY_RESEARCH_ITEMS.filter((item) => {
    const matchesSector =
      selectedSectors.length === 0 || selectedSectors.includes(item.sectorSlug);
    const matchesPractice =
      selectedPractices.length === 0 || selectedPractices.includes(item.practiceSlug);
    return matchesSector && matchesPractice;
  });

  return (
    <div className="flex flex-col gap-7 bg-white text-black">
      {/* Header section */}
      <div className="flex flex-col gap-4 max-w-xl">
        <h2 className="font-heading text-4xl uppercase leading-none text-black lg:text-[40px]">
          ENVISION
        </h2>
        <p className="text-base text-zinc-800 leading-normal">
          In‑depth investigations into emerging industry themes, exploring the
          intersection of design, performance and community impact.
        </p>
      </div>

      <hr className="border-t border-zinc-200" />

      {/* Filter by Sector */}
      <div className="flex flex-col gap-3">
        <p className="text-base font-bold text-black">
          Filter by Sector
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {SECTOR_OPTIONS.map((sector) => {
            const isActive = selectedSectors.includes(sector.slug);
            return (
              <button
                key={sector.id}
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
          {PRACTICE_OPTIONS.map((practice) => {
            const isActive = selectedPractices.includes(practice.slug);
            return (
              <button
                key={practice.id}
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
      <div className="mt-6">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <ResearchCard key={item.id} item={item} />
            ))}
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
