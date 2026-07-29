import { Container } from "@/components/ui/Container";

export function OneLifeToLoveSection() {
  return (
    <section className="bg-white py-16 lg:py-24 text-black">
      <Container>
        <div className="relative flex flex-col lg:flex-row items-center">
          {/* Overlapping Glass Card */}
          <div className="z-10 w-full lg:w-[50%] lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 bg-white/70 backdrop-blur-md border border-white/80 p-6 sm:p-8 lg:p-10 shadow-sm max-lg:mb-6">
            <h3 className="font-heading text-3xl lg:text-4xl uppercase font-bold text-black leading-tight mb-4">
              One Life to Love
            </h3>
            <div className="flex flex-col gap-4 text-base text-zinc-900 leading-relaxed font-sans">
              <p>
                Through AWF, NBRS supports One Life to Love, a not‑for‑profit
                dedicated to the care and education of abandoned and at‑risk
                children in India.
              </p>
              <p>
                NBRS has designed a campus in Bangalore housing orphans,
                neglected families, a school and a skills centre. Construction is
                starting in 2026.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[68%] lg:ml-auto aspect-[16/10] overflow-hidden rounded-sm bg-zinc-100">
            <img
              src="/images/about/creative-partnership.jpg"
              alt="One Life to Love Campus Design"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
