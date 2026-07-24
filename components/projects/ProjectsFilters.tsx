import Link from "next/link";
import type { ProjectCategory } from "@/lib/projects-listing";

function toggleSlug(list: string[], slug: string) {
  return list.includes(slug)
    ? list.filter((s) => s !== slug)
    : [...list, slug];
}

function buildHref(sectorSlugs: string[], practiceSlugs: string[]) {
  const search = new URLSearchParams();
  if (sectorSlugs.length) search.set("sector", sectorSlugs.join(","));
  if (practiceSlugs.length) search.set("practice", practiceSlugs.join(","));
  const qs = search.toString();
  return qs ? `/projects?${qs}` : "/projects";
}

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
  buildTargetHref,
  aosDelay,
}: {
  label: string;
  options: ProjectCategory[];
  selected: string[];
  buildTargetHref: (slug: string) => string;
  aosDelay?: number;
}) {
  if (options.length === 0) return null;

  return (
    <div data-aos="fade-up" data-aos-delay={aosDelay}>
      <p className="mb-3 text-sm font-semibold text-black">{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isActive = selected.includes(option.slug);
          return (
            <Link
              key={option.id}
              href={buildTargetHref(option.slug)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition ${
                isActive
                  ? "border-black bg-black text-white"
                  : "border-black/20 text-black hover:border-black"
              }`}
            >
              {option.title}
              <ArrowIcon />
            </Link>
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
  const hasActiveFilters =
    selectedSectors.length > 0 || selectedPractices.length > 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <ChipRow
          label="Sectors"
          options={sectors}
          selected={selectedSectors}
          buildTargetHref={(slug) =>
            buildHref(toggleSlug(selectedSectors, slug), selectedPractices)
          }
        />
        {hasActiveFilters && (
          <Link
            href="/projects"
            className="inline-flex shrink-0 items-center rounded-full border border-black/20 px-5 py-2.5 text-sm text-black transition hover:border-black"
          >
            Reset Filters
          </Link>
        )}
      </div>

      <ChipRow
        label="Practice"
        options={practices}
        selected={selectedPractices}
        buildTargetHref={(slug) =>
          buildHref(selectedSectors, toggleSlug(selectedPractices, slug))
        }
        aosDelay={100}
      />
    </div>
  );
}
