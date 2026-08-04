import { Container } from "@/components/ui/Container";

export function ProjectStorySection() {
  return (
    <section className="relative w-full bg-white text-black py-0 flex flex-col gap-16 lg:gap-24">
      {/* 1. Top Right Aligned Method Text */}
      <Container>
        <div data-aos="fade-up" className="flex justify-end">
          <div className="max-w-[470px] flex flex-col gap-4 font-sans text-sm sm:text-base leading-relaxed text-black/90">
            <p className="font-bold text-black">
              As part of the creative thought process, the NBRS team wanted to
              provide students with a sense of orientation and a strong
              connection to Country. This is achieved via 3 methods:
            </p>
            <ul className="flex flex-col gap-2.5 list-disc pl-5 text-black/80">
              <li>
                The design is a perimeter model broken down into a series of
                blocks and pods reflecting the seed pods found in the local
                bushland
              </li>
              <li>
                The courtyard play space is orientated towards the open space
                and bushland setting
              </li>
              <li>
                Clear sightlines from all circulation routes provide excellent
                views of the Blue Mountains and beyond.
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* 2. Full-Width Image */}
      <div data-aos="fade-up" className="w-full overflow-hidden">
        <img
          src="/images/about/creative-partnership.jpg"
          alt="Melonba Campus Exterior"
          width={1440}
          height={779}
          className="w-full h-auto max-h-[779px] object-cover"
        />
      </div>

      {/* 3. Text Paragraph below Full-Width Image */}
      <Container>
        <div data-aos="fade-up" className="max-w-[570px]">
          <p className="font-sans text-sm sm:text-base leading-relaxed text-black/80">
            Students will be encouraged to pursue their dreams and aspirations
            with all new state-of-the-art modern flexible classrooms and
            facilities including: science labs, wood and metal workshop rooms,
            specialist support classrooms, hospitality and vocational education
            deck kitchens, spaces to grow food gardens, PE fitness lab, Indoor
            basketball/gym hall, Outdoor Basketball Courts, Big outdoor Oval,
            lecture/performing arts hall and Library.
          </p>
        </div>
      </Container>

      {/* 4. Large Image inside Container */}
      <Container>
        <div data-aos="fade-up" className="w-full max-w-[1168px] overflow-hidden">
          <img
            src="/images/about/practice1.jpg"
            alt="Melonba Aerial View"
            width={1168}
            height={650}
            className="w-full h-auto max-h-[650px] object-cover"
          />
        </div>
      </Container>

      {/* 5. Bottom Headline & Sub-paragraph */}
      <Container>
        <div data-aos="fade-up" className="flex flex-col gap-4 max-w-[838px]">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-normal uppercase leading-tight lg:leading-[1.1] text-black">
            Melonba has been designed to be mindful of different learning stages
            and provide a supportive learning experience suited to a range of
            learning styles.
          </h2>
          <p className="font-sans text-sm sm:text-base leading-relaxed text-black/80 max-w-[770px]">
            The design which features a 1000 primary, and 2000 high school space
            is based on the standard hub format, embodying the Modern Method of
            Construction (MMoC) principles:
          </p>
        </div>
      </Container>
    </section>
  );
}
