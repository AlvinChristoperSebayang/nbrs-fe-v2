import Link from "next/link";
import { Container } from "@/components/ui/Container";

export type ProjectTableRow = {
  id: string;
  project: string;
  practices: string;
  status: string;
  href: string;
};

export function ProjectListTableSection({
  title = "LATEST PROJECTS",
  sectorHeaderLabel = "Sectors",
  rows,
}: {
  title?: string;
  sectorHeaderLabel?: string;
  rows: ProjectTableRow[];
}) {
  if (!rows || rows.length === 0) return null;

  return (
    <section className="bg-[#F1F1F1] py-16 lg:py-24 text-black">
      <Container>
        {/* Title */}
        {title && (
          <h2
            data-aos="fade-up"
            className="font-heading text-3xl sm:text-4xl uppercase font-bold text-black leading-none mb-8 lg:mb-10"
          >
            {title}
          </h2>
        )}

        {/* Table Header Labels */}
        <div
          data-aos="fade-up"
          className="hidden md:grid grid-cols-12 gap-4 px-6 pb-4 text-xs font-bold uppercase tracking-wider text-black"
        >
          <div className="col-span-4">Project</div>
          <div className="col-span-5">{sectorHeaderLabel}</div>
          <div className="col-span-3 flex justify-between pr-2">
            <span>Status</span>
          </div>
        </div>

        {/* Table Rows Container */}
        <div className="flex flex-col bg-white rounded-sm shadow-sm overflow-hidden divide-y divide-gray-200">
          {rows.map((row, index) => (
            <Link
              key={row.id || row.project}
              href={row.href}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-5 md:p-6 items-center hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              {/* Project Title */}
              <div className="md:col-span-4 font-sans text-base font-medium text-black">
                {row.project}
              </div>

              {/* Practices / Sectors */}
              <div className="md:col-span-5 font-sans text-base font-normal text-zinc-700">
                {row.practices}
              </div>

              {/* Status & Arrow */}
              <div className="md:col-span-3 flex items-center justify-between font-sans text-base font-normal text-black max-md:mt-2">
                <span>{row.status}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 text-black transition-transform duration-300 group-hover:translate-x-1.5"
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
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
