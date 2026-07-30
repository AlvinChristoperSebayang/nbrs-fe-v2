import { Container } from "@/components/ui/Container";

export type InitiativeItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
};

export const INITIATIVES_DATA: InitiativeItem[] = [
  {
    id: "wine-design",
    title: "Wine + Design",
    description:
      "A monthly gathering across Sydney and Melbourne where teams share concepts, critique ideas, and explore themes from sustainability to design for good. Sessions offer insight into emerging work and strengthen our collaborative design culture.",
    image: "/images/hero/hero1.png",
    reverse: false,
  },
  {
    id: "together-fridays",
    title: "Together Fridays",
    description:
      "A monthly studio ritual to connect, share business updates, welcome new colleagues, celebrate achievements, and highlight upcoming events.",
    image: "/images/hero/hero2.png",
    reverse: true,
  },
  {
    id: "social-club",
    title: "Social Club",
    description:
      "A vibrant program of social events focused on connection, great food, and fostering the inclusive NBRS spirit.",
    image: "/images/hero/hero3.png",
    reverse: false,
  },
  {
    id: "recognition",
    title: "Recognition",
    description:
      "At NBRS we love to recognise, acknowledge and celebrate the team's dedication to design. This helps our employees feel valued and motivated, boosting productivity and overall workplace engagement. On the 5, 10 and 25-year anniversary, team members receive service medals marking their considerable contributions to NBRS.",
    image: "/images/hero/hero4.png",
    reverse: true,
  },
  {
    id: "balance",
    title: "Balance - 9-Day Fortnight",
    description:
      "Every second Friday, the office closes to support wellbeing and create space for rest, connection, and personal time.",
    image: "/images/hero/hero5.png",
    reverse: false,
  },
  {
    id: "design-matters",
    title: "Design Matters",
    description:
      "Quarterly hands‑on workshops where each sector leads a topical brief, from reimagining civic spaces to shaping interior objects. These sessions celebrate experimentation, mentorship, and collective design thinking.",
    image: "/images/home/latest-news.png",
    reverse: true,
  },
];

export function InitiativesSection({
  title = "NBRS INITIATIVES",
  items = INITIATIVES_DATA,
}: {
  title?: string;
  items?: InitiativeItem[];
}) {
  return (
    <section className="bg-white py-16 lg:py-24 text-black overflow-hidden">
      <Container className="flex flex-col gap-12 lg:gap-20">
        {/* Section Title */}
        <h2
          data-aos="fade-up"
          className="font-heading text-4xl sm:text-5xl font-bold uppercase text-black tracking-wide leading-none"
        >
          {title}
        </h2>

        {/* Initiatives List */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {items.map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative"
            >
              {/* Text Column */}
              <div
                className={`lg:col-span-6 flex flex-col justify-center gap-4 order-2 ${
                  item.reverse ? "lg:order-last" : "lg:order-first"
                }`}
              >
                {/* Title Container with Overlapping Divider Line */}
                <div className="relative md:pb-3 md:mb-2">
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase md:tracking-wide text-black md:leading-snug">
                    {item.title}
                  </h3>

                  {/* Desktop Divider Line penetrating into adjacent image */}
                  <div
                    className={`hidden lg:block absolute bottom-0 h-[3px] bg-stone-300 z-20 pointer-events-none ${
                      item.reverse
                        ? "left-[-140px] right-0" // Extends left into image on reverse
                        : "left-0 right-[-140px]" // Extends right into image on normal
                    }`}
                  />

                  {/* Mobile Divider Line */}
                  {/* <div className="lg:hidden border-b-2 border-stone-300 w-full mt-2" /> */}
                </div>

                <p className="font-sans text-base sm:text-lg text-zinc-800 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Image Column */}
              <div
                className={`lg:col-span-6 shadow-md aspect-[570/300] relative bg-zinc-100 overflow-hidden ${
                  item.reverse ? "lg:order-first" : "lg:order-last"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
