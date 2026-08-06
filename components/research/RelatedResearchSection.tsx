import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { DUMMY_RESEARCH_ITEMS, ResearchItem } from "@/lib/research-data";

export function RelatedResearchSection({
  currentSlug,
  items,
}: {
  currentSlug?: string;
  items?: ResearchItem[];
}) {
  const displayItems =
    items && items.length > 0
      ? items
      : DUMMY_RESEARCH_ITEMS.filter((item) => item.slug !== currentSlug).slice(0, 3);

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 lg:py-24 text-black">
      {/* Top Left Gray Accent Block */}
      <div className="absolute left-0 top-0 w-full lg:w-[45%] h-56 lg:h-64 md:bg-[#E2E2E2] z-0 pointer-events-none" />

      <Container className="relative z-10">
        {/* Title */}
        <h2
          data-aos="fade-up"
          className="font-heading text-3xl sm:text-4xl uppercase font-bold text-black leading-none mb-10 lg:mb-12"
        >
          RELATED RESEARCH
        </h2>

        {/* 3 Related Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayItems.map((rel, index) => (
            <Link
              key={rel.id || index}
              href={`/research/${rel.slug}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group flex flex-col w-full overflow-hidden bg-black transition-all duration-300 shadow-md hover:-translate-y-1.5"
            >
              {/* Card Image */}
              <div className="relative aspect-[370/200] w-full overflow-hidden bg-zinc-800">
                <Image
                  src={rel.image || "/images/hero/hero1.png"}
                  alt={rel.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Content Box */}
              <div className="flex flex-col justify-between p-6 sm:p-7 min-h-[220px] bg-black text-white transition-colors duration-300 group-hover:bg-zinc-900">
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-sm text-[#F0C7BD]">
                    {rel.sectorName || "Sector"} • {rel.practiceName || "Discipline"}
                  </span>
                  <h3 className="font-sans text-lg font-bold text-white leading-snug line-clamp-3">
                    {rel.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-6 text-sm font-normal text-white">
                  <span>Read more</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
