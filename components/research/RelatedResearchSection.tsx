import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { RelatedResearchItem } from "@/lib/research-detail";

export function RelatedResearchSection({ items }: { items: RelatedResearchItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 text-black lg:py-24">
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-56 w-full bg-[#E2E2E2] lg:h-64 lg:w-[45%]" />

      <Container className="relative z-10">
        <h2 data-aos="fade-up" className="mb-10 font-heading text-3xl font-bold leading-none text-black uppercase sm:text-4xl lg:mb-12">
          RELATED RESEARCH
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item, index) => (
            <Link
              key={item.id}
              href={`/research/${item.slug}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group flex w-full flex-col overflow-hidden bg-black shadow-md transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[370/200] w-full overflow-hidden bg-zinc-800">
                {item.image ? (
                  <ResponsiveImage src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full bg-zinc-800" />
                )}
              </div>

              <div className="flex min-h-[220px] flex-col justify-between bg-black p-6 text-white transition-colors duration-300 group-hover:bg-zinc-900 sm:p-7">
                <div className="flex flex-col gap-2">
                  {(item.sector || item.practice) && <span className="font-sans text-sm text-[#F0C7BD]">{[item.sector, item.practice].filter(Boolean).join(" • ")}</span>}
                  <h3 className="line-clamp-3 font-sans text-lg leading-snug font-bold text-white">{item.title}</h3>
                </div>

                <div className="flex items-center justify-between pt-6 text-sm font-normal text-white">
                  <span>Read more</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
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
