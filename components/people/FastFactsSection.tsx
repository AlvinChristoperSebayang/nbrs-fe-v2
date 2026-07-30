import { Container } from "@/components/ui/Container";

export type FastFact = {
  number: string;
  label: string;
};

const FAST_FACTS: FastFact[] = [
  { number: "90", label: "Team members" },
  { number: "3", label: "Practices" },
  { number: "5", label: "Sectors" },
  { number: "2", label: "Studios" },
  { number: "57+", label: "Years" },
];

export function FastFactsSection({
  title = "FAST FACTS",
  facts = FAST_FACTS,
}: {
  title?: string;
  facts?: FastFact[];
}) {
  return (
    <section className="bg-zinc-100 py-12 lg:py-24 text-black">
      <Container>
        <div className="flex flex-col items-center lg:items-start gap-22 lg:gap-14 py-10 md:py-0">
          {/* Section Title */}
          <h2
            data-aos="fade-up"
            className="font-heading text-3xl sm:text-4xl lg:text-[40px] uppercase font-bold text-black leading-none text-center lg:text-left"
          >
            {title}
          </h2>

          {/* Stats Counters Grid */}
          <div className="w-full flex flex-col md:flex-row gap-14 sm:gap-0 items-center justify-around text-center">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="flex flex-col items-center justify-center gap-1 sm:gap-2"
              >
                <span className="font-sans text-5xl lg:text-[40px] font-bold text-stone-800 leading-none">
                  {fact.number}
                </span>
                <span className="font-sans text-[28px] text-stone-700 font-normal">
                  {fact.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
