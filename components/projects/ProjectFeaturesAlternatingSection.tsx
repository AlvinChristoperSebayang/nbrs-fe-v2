import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type ProjectFeatureAlternatingItem = {
  id: string;
  title: string;
  description: string;
  image: ImageSource;
  reverse?: boolean;
};

export const PROJECT_FEATURES_DUMMY_DATA: ProjectFeatureAlternatingItem[] = [
  {
    id: "feature-1",
    title: "FLEXIBLE LEARNING HUBS",
    description:
      "Designed to adapt to evolving pedagogies, modern learning hubs combine open collaborative spaces with quiet study nooks, fostering both team interaction and individual concentration.",
    image: "/images/hero/hero1.png",
    reverse: false,
  },
  {
    id: "feature-2",
    title: "BIOPHILIC & OUTDOOR CONNECTIVITY",
    description:
      "Deep integration with the surrounding natural bushland. Extensive glazing, natural timber materiality, and outdoor learning decks ensure students maintain a continuous connection to Country.",
    image: "/images/hero/hero2.png",
    reverse: true,
  },
  {
    id: "feature-3",
    title: "SUSTAINABLE EMBODIED CARBON STRATEGY",
    description:
      "Incorporating passive solar orientation, high-performance thermal envelopes, and rooftop solar arrays, reducing operational carbon while setting new benchmarks for educational architecture.",
    image: "/images/hero/hero3.png",
    reverse: false,
  },
  {
    id: "feature-4",
    title: "COMMUNITY & CIVIC INTEGRATION",
    description:
      "Shared aquatic, performing arts, and sports facilities accessible to the wider community during off-school hours, creating a vibrant civic landmark for the growing region.",
    image: "/images/hero/hero4.png",
    reverse: true,
  },
];

export function ProjectFeaturesAlternatingSection({
  items = PROJECT_FEATURES_DUMMY_DATA,
}: {
  items?: ProjectFeatureAlternatingItem[];
}) {
  return (
    <section className="bg-white py-12 lg:py-20 text-black overflow-hidden">
      <Container className="flex flex-col gap-16 lg:gap-24">
        {/* Alternating Features List (Without NBRS INITIATIVES Title) */}
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
                        ? "left-[-140px] right-0"
                        : "left-0 right-[-140px]"
                    }`}
                  />
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
                <ResponsiveImage
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
