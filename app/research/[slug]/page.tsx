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

const cta: CtaContent = {
  image: "/images/contact-bg.png",
  title: "LET’S SHAPE WHAT’S NEXT-TOGETHER",
  description:
    "Whether it’s a place to gather, to heal, to learn or to live - we’re ready to collaborate. Let’s shape spaces that matter, together.",
  buttonText: "Contact Us",
  buttonHref: "/contact",
};

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
    image: "/images/hero/hero-research.png",
  };

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. DEDICATED RESEARCH DETAIL HERO SECTION */}
      <ResearchDetailHero
        image={item.image || "/images/hero/hero-research.png"}
        title={item.title.toUpperCase()}
        description={item.excerpt || "How flexible, nurturing, and connected workplaces drive wellbeing and productivity."}
        category={item.sectorName || "COMMUNITY"}
      />

      {/* 2A. METADATA BANNER CARD - MOBILE & TABLET (100% FULL WIDTH EDGE-TO-EDGE) */}
      <section className="relative z-20 w-full bg-[#E5E5E5] px-5 py-6 sm:px-8 sm:py-8 lg:hidden">
        <div className="flex flex-col gap-6 w-full">
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
          <div className="flex flex-col gap-6 text-sm sm:grid sm:grid-cols-3">
            <div className="flex flex-col">
              <span className="font-bold text-black">Publication Date:</span>
              <span className="text-zinc-800">2024</span>
            </div>

            <div className="flex flex-col">
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

          {/* Social Share Icons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              aria-label="Share article"
              className="flex items-center justify-center transition hover:opacity-80 cursor-pointer"
            >
              <svg width="26" height="26" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.4547 10.7396C15.6193 10.5986 15.7015 10.528 15.7317 10.4441C15.7581 10.3705 15.7581 10.2899 15.7317 10.2163C15.7015 10.1324 15.6193 10.0619 15.4547 9.92083L9.74571 5.02738C9.46249 4.78462 9.32088 4.66323 9.20098 4.66026C9.09679 4.65768 8.99726 4.70345 8.93141 4.78425C8.85564 4.87721 8.85564 5.06372 8.85564 5.43675V8.33163C7.41693 8.58333 6.10017 9.31235 5.12164 10.407C4.05482 11.6003 3.4647 13.1447 3.46387 14.7454V15.1578C4.17109 14.3059 5.05411 13.6168 6.05243 13.1379C6.9326 12.7157 7.88405 12.4656 8.85564 12.3997V15.2237C8.85564 15.5967 8.85564 15.7832 8.93141 15.8762C8.99726 15.957 9.09679 16.0027 9.20098 16.0002C9.32088 15.9972 9.46249 15.8758 9.74571 15.633L15.4547 10.7396Z" stroke="#AEAEAE" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Share on LinkedIn"
              className="flex items-center justify-center transition hover:opacity-80"
            >
              <svg width="26" height="26" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.56543 0H22.5811C24.5502 0 26.1465 1.5963 26.1465 3.56543V22.5811C26.1465 24.5502 24.5502 26.1465 22.5811 26.1465H3.56543C1.5963 26.1465 0 24.5502 0 22.5811V3.56543C0 1.5963 1.5963 0 3.56543 0ZM8.75256 21.0809C8.85596 20.9772 8.91386 20.8366 8.91346 20.6902V10.8437C8.91347 10.539 8.66694 10.2918 8.36231 10.291H6.01358C5.70837 10.291 5.46094 10.5384 5.46094 10.8437V20.6902C5.46054 20.8369 5.51864 20.9777 5.62237 21.0814C5.72609 21.1851 5.86689 21.2432 6.01358 21.2428H8.36231C8.50874 21.2428 8.64916 21.1846 8.75256 21.0809ZM7.18738 9.35913C5.95667 9.35913 4.95898 8.36145 4.95898 7.13074C4.95898 5.90003 5.95667 4.90234 7.18738 4.90234C8.41809 4.90234 9.41577 5.90003 9.41577 7.13074C9.41577 8.36145 8.41809 9.35913 7.18738 9.35913ZM21.0419 21.0879C21.1373 20.9925 21.1907 20.863 21.1903 20.7282L21.1873 15.9683L21.1873 15.9277C21.1875 13.8485 21.1878 10.127 17.1762 10.127C15.3534 10.127 14.4992 10.7925 13.9228 11.6586V10.7999C13.9228 10.5193 13.6953 10.2919 13.4147 10.2919H10.9753C10.8407 10.2919 10.7116 10.3454 10.6166 10.4408C10.5216 10.5361 10.4684 10.6653 10.4688 10.7999V20.7341C10.4684 20.8687 10.5216 20.998 10.6166 21.0933C10.7116 21.1886 10.8407 21.2422 10.9753 21.2422H13.4147C13.6924 21.2381 13.9154 21.0118 13.9153 20.7341V15.4068C13.9777 14.6907 14.2942 13.0967 15.8466 13.0967C17.7031 13.0967 17.6664 15.0957 17.651 15.9381C17.6497 16.005 17.6486 16.0646 17.6486 16.1154V20.7282C17.6482 20.863 17.7016 20.9925 17.797 21.0879C17.8924 21.1832 18.0218 21.2366 18.1567 21.2362H20.6822C20.8171 21.2366 20.9466 21.1832 21.0419 21.0879Z" fill="#AEAEAE"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 2B. METADATA BANNER CARD - DESKTOP (CONTAINED & OVERLAPPING HERO) */}
      <section className="relative z-20 -mt-10 hidden lg:block">
        <Container>
          <div className="bg-[#E5E5E5] p-10 rounded-sm flex flex-col gap-6 shadow-sm">
            {/* Top Row: Sector / Practice & Tags */}
            <div className="flex items-center justify-between gap-4">
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
            <div className="grid grid-cols-6 gap-6 items-start text-sm">
              <div className="flex flex-col">
                <span className="font-bold text-black">Publication Date:</span>
                <span className="text-zinc-800">2024</span>
              </div>

              <div className="flex flex-col col-span-2">
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

            {/* Social Share Icons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                aria-label="Share article"
                className="flex items-center justify-center transition hover:opacity-80 cursor-pointer"
              >
                <svg width="26" height="26" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.4547 10.7396C15.6193 10.5986 15.7015 10.528 15.7317 10.4441C15.7581 10.3705 15.7581 10.2899 15.7317 10.2163C15.7015 10.1324 15.6193 10.0619 15.4547 9.92083L9.74571 5.02738C9.46249 4.78462 9.32088 4.66323 9.20098 4.66026C9.09679 4.65768 8.99726 4.70345 8.93141 4.78425C8.85564 4.87721 8.85564 5.06372 8.85564 5.43675V8.33163C7.41693 8.58333 6.10017 9.31235 5.12164 10.407C4.05482 11.6003 3.4647 13.1447 3.46387 14.7454V15.1578C4.17109 14.3059 5.05411 13.6168 6.05243 13.1379C6.9326 12.7157 7.88405 12.4656 8.85564 12.3997V15.2237C8.85564 15.5967 8.85564 15.7832 8.93141 15.8762C8.99726 15.957 9.09679 16.0027 9.20098 16.0002C9.32088 15.9972 9.46249 15.8758 9.74571 15.633L15.4547 10.7396Z" stroke="#AEAEAE" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Share on LinkedIn"
                className="flex items-center justify-center transition hover:opacity-80"
              >
                <svg width="26" height="26" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.56543 0H22.5811C24.5502 0 26.1465 1.5963 26.1465 3.56543V22.5811C26.1465 24.5502 24.5502 26.1465 22.5811 26.1465H3.56543C1.5963 26.1465 0 24.5502 0 22.5811V3.56543C0 1.5963 1.5963 0 3.56543 0ZM8.75256 21.0809C8.85596 20.9772 8.91386 20.8366 8.91346 20.6902V10.8437C8.91347 10.539 8.66694 10.2918 8.36231 10.291H6.01358C5.70837 10.291 5.46094 10.5384 5.46094 10.8437V20.6902C5.46054 20.8369 5.51864 20.9777 5.62237 21.0814C5.72609 21.1851 5.86689 21.2432 6.01358 21.2428H8.36231C8.50874 21.2428 8.64916 21.1846 8.75256 21.0809ZM7.18738 9.35913C5.95667 9.35913 4.95898 8.36145 4.95898 7.13074C4.95898 5.90003 5.95667 4.90234 7.18738 4.90234C8.41809 4.90234 9.41577 5.90003 9.41577 7.13074C9.41577 8.36145 8.41809 9.35913 7.18738 9.35913ZM21.0419 21.0879C21.1373 20.9925 21.1907 20.863 21.1903 20.7282L21.1873 15.9683L21.1873 15.9277C21.1875 13.8485 21.1878 10.127 17.1762 10.127C15.3534 10.127 14.4992 10.7925 13.9228 11.6586V10.7999C13.9228 10.5193 13.6953 10.2919 13.4147 10.2919H10.9753C10.8407 10.2919 10.7116 10.3454 10.6166 10.4408C10.5216 10.5361 10.4684 10.6653 10.4688 10.7999V20.7341C10.4684 20.8687 10.5216 20.998 10.6166 21.0933C10.7116 21.1886 10.8407 21.2422 10.9753 21.2422H13.4147C13.6924 21.2381 13.9154 21.0118 13.9153 20.7341V15.4068C13.9777 14.6907 14.2942 13.0967 15.8466 13.0967C17.7031 13.0967 17.6664 15.0957 17.651 15.9381C17.6497 16.005 17.6486 16.0646 17.6486 16.1154V20.7282C17.6482 20.863 17.7016 20.9925 17.797 21.0879C17.8924 21.1832 18.0218 21.2366 18.1567 21.2362H20.6822C20.8171 21.2366 20.9466 21.1832 21.0419 21.0879Z" fill="#AEAEAE"/>
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. MAIN CONTENT: INSIGHT & KEY TAKE-AWAYS */}
      <section className="bg-white py-12 lg:py-20">
        <Container>
          <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-start">
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
      <CtaSection content={cta} />
      
      {/* 5. RELATED RESEARCH SECTION */}
      <RelatedResearchSection currentSlug={item.slug} />

    </article>
  );
}
