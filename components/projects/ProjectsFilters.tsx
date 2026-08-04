"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProjectCategory } from "@/lib/projects-listing";

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

function ChipRow({
  label,
  options,
  selected,
  onToggle,
  aosDelay,
}: {
  label: string;
  options: ProjectCategory[];
  selected: string[];
  onToggle: (slug: string) => void;
  aosDelay?: number;
}) {
  if (options.length === 0) return null;

  return (
    <div data-aos="fade-up" data-aos-delay={aosDelay}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-black">{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isActive = selected.includes(option.slug);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggle(option.slug)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition cursor-pointer ${
                isActive
                  ? "border-black bg-black text-white"
                  : "border-black/20 text-black hover:border-black"
              }`}
            >
              <span>{option.title}</span>
              <ArrowIcon />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectsFilters({
  sectors,
  practices,
  selectedSectors,
  selectedPractices,
}: {
  sectors: ProjectCategory[];
  practices: ProjectCategory[];
  selectedSectors: string[];
  selectedPractices: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Exclude Heritage from practice list if present
  const filteredPractices = practices.filter(
    (p) => p.slug !== "heritage" && p.title.toLowerCase() !== "heritage"
  );

  const updateFilters = (newSectors: string[], newPractices: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (newSectors.length > 0) {
      params.set("sector", newSectors.join(","));
    } else {
      params.delete("sector");
    }

    if (newPractices.length > 0) {
      params.set("practice", newPractices.join(","));
    } else {
      params.delete("practice");
    }

    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(targetUrl, { scroll: false });
  };

  const toggleSector = (slug: string) => {
    const next = selectedSectors.includes(slug)
      ? selectedSectors.filter((s) => s !== slug)
      : [...selectedSectors, slug];
    updateFilters(next, selectedPractices);
  };

  const togglePractice = (slug: string) => {
    const next = selectedPractices.includes(slug)
      ? selectedPractices.filter((s) => s !== slug)
      : [...selectedPractices, slug];
    updateFilters(selectedSectors, next);
  };

  const resetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters =
    selectedSectors.length > 0 || selectedPractices.length > 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Top Bar with Reset Filters Button */}
      <div className="flex items-center justify-between gap-4">
        <ChipRow
          label="Sectors"
          options={sectors}
          selected={selectedSectors}
          onToggle={toggleSector}
        />
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-black px-5 py-2.5 text-sm font-sans text-black hover:bg-black hover:text-white transition-colors duration-300 ease-out cursor-pointer self-start sm:self-auto"
          >
            Reset Filters ({selectedSectors.length + selectedPractices.length})
          </button>
        )}
      </div>

      <ChipRow
        label="Practice"
        options={filteredPractices}
        selected={selectedPractices}
        onToggle={togglePractice}
        aosDelay={100}
      />
    </div>
  );
}
