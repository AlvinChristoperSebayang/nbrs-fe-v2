import { Container } from "@/components/ui/Container";

type TimelineItem = {
  year: string;
  description: string;
};

const BORDER_COLORS = [
  "#E5A89B", // Soft peach pink
  "#E5E7EB", // Soft white
  "#E5A89B", // Soft peach pink
  "#C8E2D4", // Pale mint
  "#717784", // Muted grey
  "#E5A89B",
  "#C8E2D4",
];

export function AboutTimelineSection({
  label = "FOUNDED IN 1968",
  items = [
    {
      year: "1968",
      description:
        "Founded by Noel Bell and Ridley Smith. First project Anglicare St Johns Village Glebe",
    },
    {
      year: "1976",
      description: "St Andrew's House - First high rise school.",
    },
    {
      year: "1983",
      description:
        "NBRS receives Sulman Award for Parklea Correctional Centre.",
    },
    {
      year: "1998",
      description:
        "Olympic Upgrade - City of Sydney George Street & Circular Quay.",
    },
    {
      year: "2002",
      description: "Convention Centre Hillsong Church Vista built.",
    },
    {
      year: "2022",
      description: "Studios open in Melbourne, expanding NBRS nationally.",
    },
    {
      year: "2025",
      description: "Celebrating decades of designing for people, place and purpose.",
    },
  ],
}: {
  label?: string;
  items?: TimelineItem[];
}) {
  return (
    <section className="bg-[#131722] py-14 lg:py-20 text-white overflow-hidden">
      <Container>
        <h2
          data-aos="fade-up"
          className="font-heading text-lg sm:text-xl lg:text-2xl uppercase tracking-wider font-bold text-white mb-8 lg:mb-12"
        >
          {label}
        </h2>

        <div className="relative mt-4">
          <div className="scrollbar-hide flex overflow-x-auto gap-2 lg:gap-4 pb-4">
            {items.map((item, index) => (
              <div
                key={`${item.year}-${index}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                style={{
                  borderLeftColor: BORDER_COLORS[index % BORDER_COLORS.length],
                }}
                className="w-[230px] sm:w-[260px] lg:w-[280px] flex-shrink-0 border-l-[1.5px] pl-5 pr-3"
              >
                <div className="flex items-center gap-7">
                  <span className="font-heading text-3xl sm:text-4xl lg:text-[40px] uppercase tracking-tight text-white leading-none">
                    {item.year}
                  </span>
                  <svg
                    width="9"
                    height="15"
                    viewBox="0 0 9 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 text-white"
                  >
                    <path
                      d="M1 1L7.5 7.5L1 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-white/85 leading-relaxed font-sans max-w-[220px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Fade gradient mask on the right edge */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#131722] via-[#131722]/80 to-transparent" />
        </div>
      </Container>
    </section>
  );
}
