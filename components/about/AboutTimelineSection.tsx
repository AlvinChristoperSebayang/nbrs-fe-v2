import { Container } from "@/components/ui/Container";

type TimelineItem = {
  year: string;
  description: string;
};

const BORDER_COLORS = [
  "#FFD6CD",
  "#E0EFF4",
  "#FFD6CD",
  "#C9E5D2",
  "#E0E1DC",
  "#E0EFF4",
  "#C9E5D2",
];

export function AboutTimelineSection({
  label = "Founded in 1968",
  items = [
    {
      year: "1968",
      description:
        "Founded by Noel Bell and Ridley Smith. First project Anglicare St Johns Village Glebe.",
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
      description: "Convention Centre, Hillsong Church & Vista built.",
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
    <section className="bg-[#121212] py-10 lg:py-14">
      <Container>
        <p
          data-aos="fade-up"
          className="text-[26px] font-semibold uppercase text-white"
        >
          {label}
        </p>

        <div className="relative mt-6 lg:mt-10">
          <div className="scrollbar-hide flex overflow-x-auto">
            {items.map((item, index) => (
              <div
                key={item.year}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                style={{
                  borderLeftColor: BORDER_COLORS[index % BORDER_COLORS.length],
                }}
                className="w-[75vw] max-md:max-w-[288px] flex-shrink-0 border-l-1 pl-6 pr-6 lg:w-[260px]"
              >
                <div className="flex items-center gap-6">
                  <span className="font-heading text-2xl uppercase tracking-tight text-white lg:text-[28px]">
                    {item.year}
                  </span>
                 <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.69043 0.723633L8.02318 7.72388L0.69043 14.7236" stroke="white" strokeWidth="2"/>
                  </svg>

                </div>
                <p className="mt-2 text-[16px] text-white/70 max-md:max-w-[200px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />
        </div>
      </Container>
    </section>
  );
}
