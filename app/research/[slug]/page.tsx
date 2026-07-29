import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ResearchDetailHero } from "@/components/research/ResearchDetailHero";
import { AtAGlanceSection } from "@/components/research/AtAGlanceSection";
import { RelatedResearchSection } from "@/components/research/RelatedResearchSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { CtaContent } from "@/lib/types";
import { DUMMY_RESEARCH_ITEMS } from "@/lib/research-data";

export function generateStaticParams() {
  return DUMMY_RESEARCH_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const item = DUMMY_RESEARCH_ITEMS.find((r) => r.slug === resolvedParams.slug);

  return {
    title: item ? item.title : "Research Detail",
  };
}

const cta: CtaContent[] = [
  {
    image: "/images/contact-bg.png",
    title: "LET’S SHAPE WHAT’S NEXT-TOGETHER",
    description:
      "Whether it’s a place to gather, to heal, to learn or to live - we’re ready to collaborate. Let’s shape spaces that matter, together.",
    buttonText: "Contact Us",
    buttonHref: "/contact",
  },
];

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const item = DUMMY_RESEARCH_ITEMS.find((r) => r.slug === resolvedParams.slug) || {
    id: "r-2",
    slug: "the-happy-place-vol-3-designing-for-wellness",
    title: "The Happy Place Vol 3: Designing for a Wellness Environment",
    excerpt: "How colour, materiality and sensory design elevate healing experiences.",
    sectorName: "Wellness",
    practiceName: "Interior Design",
    image: "/images/hero/hero1.png",
  };

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. DEDICATED RESEARCH DETAIL HERO SECTION */}
      <ResearchDetailHero
        title={item.title.toUpperCase()}
        description={item.excerpt || "How flexible, nurturing, and connected workplaces drive wellbeing and productivity."}
        category={item.sectorName || "COMMUNITY"}
      />

      {/* 2. METADATA BANNER CARD */}
      <section className="mt-0 lg:-mt-10 relative overflow-hidden z-20">
        <div className="container uncontainer-mobile mx-auto">
          <div className="bg-[#E5E5E5] p-6 sm:p-8 lg:p-10 rounded-sm flex flex-col gap-6 shadow-sm">
            {/* Top Row: Sector / Practice & Tags */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-heading text-sm uppercase font-bold text-black tracking-wider">
                  Sector • PRACTICE
                </span>
                <span className="font-sans text-lg font-normal text-black">
                  {item.sectorName || "Wellness"} / {item.practiceName || "Interior Design"}
                </span>
              </div>
              <div>
                <span className="font-sans text-lg font-normal text-black">
                  Healthcare
                </span>
              </div>
            </div>

            <hr className="border-t border-zinc-400" />

            {/* Bottom Row: Publication Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-start text-sm">
              <div className="flex flex-col">
                <span className="font-bold text-black">Publication Date:</span>
                <span className="text-zinc-800">2024</span>
              </div>

              <div className="flex flex-col col-span-2 sm:col-span-1 lg:col-span-2">
                <span className="font-bold text-black">Author:</span>
                <span className="text-zinc-800">
                  Casie Ng, Mikaela Gifford, Sophie Miller
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-black">Reviewed by:</span>
                <span className="text-zinc-800">Sophie Orrock</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-black">Sponsored by:</span>
                <span className="text-zinc-800">Andrew Duffin</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-black">Read time:</span>
                <span className="text-zinc-800">8 mins</span>
              </div>
            </div>

            {/* Social Share Icon */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Share on LinkedIn"
                className="w-8 h-8 rounded-full border border-zinc-400 flex items-center justify-center text-zinc-600 hover:text-black hover:border-black transition"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT: INSIGHT & KEY TAKE-AWAYS */}
      <section className="bg-white py-12 lg:py-20">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left Content Column */}
            <div className="w-full lg:w-1/2 flex flex-col gap-10">
              {/* INSIGHT */}
              <div data-aos="fade-up" className="flex flex-col gap-4">
                <h2 className="font-heading text-3xl sm:text-4xl uppercase font-bold text-black leading-none">
                  INSIGHT
                </h2>
                <p className="font-sans text-base text-zinc-900 leading-relaxed">
                  Australian healthcare faces staffing pressure and rising patient expectations. Vol 3 demonstrates how evidence-based interior design choices - rooted in colour psychology, biophilic materiality and multi-sensory modulation - can measurably improve patient recovery, staff wellbeing and way-finding clarity.
                </p>
              </div>

              {/* KEY TAKE-AWAYS */}
              <div data-aos="fade-up" data-aos-delay="100" className="flex flex-col gap-6 pt-4">
                <h2 className="font-heading text-3xl sm:text-4xl uppercase font-bold text-black leading-none">
                  KEY TAKE-AWAYS
                </h2>

                <div className="flex flex-col gap-6">
                  {/* Take-away 1 */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading text-xl uppercase font-bold text-black">
                      COLOUR HEALS
                    </h3>
                    <p className="font-sans text-base text-zinc-900 leading-relaxed">
                      Blues lower heart rate while greens foster calm; strategic hues double as intuitive way-finding.
                    </p>
                  </div>

                  {/* Take-away 2 */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading text-xl uppercase font-bold text-black">
                      MATERIALITY MATTERS
                    </h3>
                    <p className="font-sans text-base text-zinc-900 leading-relaxed">
                      Natural timber, stone and soft textiles trigger measurable drops in cortical stress responses.
                    </p>
                  </div>

                  {/* Take-away 3 */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading text-xl uppercase font-bold text-black">
                      DESIGN FOR THE SENSES
                    </h3>
                    <p className="font-sans text-base text-zinc-900 leading-relaxed">
                      Access to daylight, acoustic control and low-VOC finishes combine to shorten perceived recovery time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Feature Graphic Column */}
            <div data-aos="fade-up" data-aos-delay="200" className="w-full lg:w-1/2 flex justify-end">
              <div className="aspect-[570/587] w-full max-w-[570px] overflow-hidden rounded-sm bg-zinc-100 shadow-md">
                <img
                  src={item.image || "/images/hero/hero1.png"}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. AT A GLANCE SECTION */}
      <AtAGlanceSection title="AT A GLANCE" />

      {/* 6. CTA SECTION */}
      <CtaSection content={cta[0]} />
      
      {/* 5. RELATED RESEARCH SECTION */}
      <RelatedResearchSection currentSlug={item.slug} />

    </article>
  );
}
