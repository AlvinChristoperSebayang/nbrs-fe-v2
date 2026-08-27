import { Container } from "@/components/ui/Container";
import { Hero } from "@/components/ui/Hero";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { CtaSection } from "@/components/cta/CtaSection";
import type { RapPageData } from "@/lib/rap";

function PublicationDetails({ page }: { page: RapPageData }) {
  return (
    <section className="bg-[#efefed] px-6 py-8 sm:px-10 lg:px-14 lg:py-11" aria-label="Publication details">
      <p className="text-xl font-normal text-black sm:text-2xl">Reconciliation Action Plan</p>
      <div className="mt-4 h-px bg-black/20" />
      <dl className="mt-6 grid gap-7 text-sm sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <dt className="font-bold text-black">Publication Date:</dt>
          <dd className="mt-1 text-sm text-black">{page.publicationDate}</dd>
        </div>
        <div>
          <dt className="font-bold text-black">Author:</dt>
          <dd className="mt-1 max-w-[280px] text-sm text-black">{page.author}</dd>
        </div>
        <div>
          <dt className="font-bold text-black">Endorsed by:</dt>
          <dd className="mt-1 text-sm text-black">{page.endorsedBy}</dd>
        </div>
        <div>
          <dt className="font-bold text-black">Read time:</dt>
          <dd className="mt-1 text-sm text-black">{page.readTime}</dd>
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
        titleClassName="max-w-[900px] text-[38px] sm:text-[58px] lg:text-[70px] leading-[0.95]"
      />

      <div className="hidden lg:block relative z-20 mt-0 lg:-mt-16 container mx-auto">
        <PublicationDetails page={page} />
      </div>
      <div className="block lg:hidden relative z-20 mt-0 lg:-mt-16 uncontainer md:container md:mx-auto">
        <PublicationDetails page={page} />
      </div>

      <section className="bg-white py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-6 xl:grid-cols-12 xl:gap-20">
            <h2 className="order-1 font-heading text-[28px] uppercase leading-none xl:text-[40px] xl:hidden">Insight</h2>
            <div className="order-3 xl:order-0 xl:col-span-7" data-aos="fade-up">
              <h2 className="hidden font-heading text-[28px] uppercase leading-none xl:text-[40px] xl:block">Insight</h2>
              <div className="mt-8 max-w-160 space-y-5 font-sans text-base leading-[1.55] text-black/90 [&_a]:pb-4 [&_li]:pb-4 [&_p]:pb-4">
                <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
              </div>
            </div>
            <div className="order-2 xl:order-0 xl:col-span-5" data-aos="fade-up" data-aos-delay="150">
              <ResponsiveImage src={page.artwork} alt="Shared Waterways artwork" className="h-full w-full object-cover" />
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
