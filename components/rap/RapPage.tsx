import { Container } from "@/components/ui/Container";
import { Hero } from "@/components/ui/Hero";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { CtaSection } from "@/components/cta/CtaSection";
import type { RapPageData } from "@/lib/rap";

function PublicationDetails({ page }: { page: RapPageData }) {
  return (
    <section className="bg-[#efefed] px-6 py-8 sm:px-8 lg:px-10 xl:px-14 lg:py-8 xl:py-11" aria-label="Publication details">
      <p className="text-lg sm:text-xl xl:text-2xl font-normal text-black">Reconciliation Action Plan</p>
      <div className="mt-4 h-px bg-black/20" />
      <dl className="mt-6 grid gap-6 text-sm sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8">
        <div>
          <dt className="font-bold text-black text-xs sm:text-sm">Publication Date:</dt>
          <dd className="mt-1 text-xs sm:text-sm text-black">{page.publicationDate}</dd>
        </div>
        <div>
          <dt className="font-bold text-black text-xs sm:text-sm">Author:</dt>
          <dd className="mt-1 max-w-[280px] text-xs sm:text-sm text-black">{page.author}</dd>
        </div>
        <div>
          <dt className="font-bold text-black text-xs sm:text-sm">Endorsed by:</dt>
          <dd className="mt-1 text-xs sm:text-sm text-black">{page.endorsedBy}</dd>
        </div>
        <div>
          <dt className="font-bold text-black text-xs sm:text-sm">Read time:</dt>
          <dd className="mt-1 text-xs sm:text-sm text-black">{page.readTime}</dd>
        </div>
      </dl>
    </section>
  );
}

export function RapPage({ page }: { page: RapPageData }) {
  return (
    <article className="min-h-screen bg-white text-black">
      <Hero
        image={page.hero}
        title={page.title}
        titleClassName="max-w-[900px] text-[38px] sm:text-[54px] lg:text-[62px] xl:text-[70px] leading-[0.95]"
      />

      <div className="hidden lg:block relative z-20 mt-0 lg:-mt-16 container mx-auto">
        <PublicationDetails page={page} />
      </div>
      <div className="block lg:hidden relative z-20 mt-0 lg:-mt-16 uncontainer md:container md:mx-auto">
        <PublicationDetails page={page} />
      </div>

      <section className="bg-white py-14 sm:py-20 lg:py-24 xl:py-32">
        <Container>
          {/* Top Heading */}
          <h2
            data-aos="fade-up"
            className="font-heading text-3xl sm:text-4xl lg:text-[36px] xl:text-[42px] uppercase leading-none font-bold text-black mb-6 lg:mb-8"
          >
            Insight
          </h2>

          {/* 2-Column Content: Left Description, Right Artwork */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
            {/* Left Column: Description Paragraphs */}
            <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col items-start" data-aos="fade-up">
              <div className="space-y-4 font-sans text-sm sm:text-base lg:text-[14.5px] xl:text-[15.5px] leading-[1.65] text-black max-w-xl [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0">
                <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
              </div>
            </div>

            {/* Right Column: Square Artwork (Aligned side-by-side with description) */}
            <div className="order-1 lg:order-2 lg:col-span-6 flex justify-end w-full" data-aos="fade-up" data-aos-delay="150">
              <div className="w-full aspect-square overflow-hidden">
                <ResponsiveImage
                  src={page.artwork}
                  alt="Shared Waterways artwork"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection
        content={{
          image: page.cta.background,
          title: page.cta.heading,
          description: page.cta.description,
          buttonText: page.cta.buttonLabel,
          buttonHref: page.cta.buttonUrl,
        }}
        titleUppercase={false}
      />
    </article>
  );
}
