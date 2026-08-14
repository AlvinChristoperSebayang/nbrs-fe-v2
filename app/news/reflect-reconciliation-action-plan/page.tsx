import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Hero } from "@/components/ui/Hero";
import { getRapPage } from "@/lib/rap";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Reflect Reconciliation Action Plan",
  description: "NBRS Reflect Reconciliation Action Plan",
};

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M14 7.724H0M6.667 14.724 14 7.724 6.667.724" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default async function ReflectRapPage() {
  const page = await getRapPage();

  return (
    <article className="min-h-screen bg-white text-black">
      <Hero
        image={page.hero}
        title={page.title}
        titleClassName="max-w-[900px] text-[38px] sm:text-[58px] lg:text-[70px] leading-[0.95]"
      />

      <div className="hidden lg:block relative z-20 mt-0 lg:-mt-16 container mx-auto">
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
      </div>
      <div className="block lg:hidden relative z-20 mt-0 lg:-mt-16 uncontainer md:container md:mx-auto">
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
      </div>

      <section className="bg-white py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7" data-aos="fade-up">
              <h2 className="font-heading text-[28px] uppercase leading-none md:text-[40px]">Insight</h2>
              <div className="mt-8 max-w-[640px] space-y-5 font-sans text-base leading-[1.55] text-black/90 [&_a]:pb-4 [&_li]:pb-4 [&_p]:pb-4">
                <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
              </div>
            </div>
            <div className="lg:col-span-5" data-aos="fade-up" data-aos-delay="150">
              <ResponsiveImage
                src={page.artwork}
                alt="Shared Waterways artwork"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden">
        <ResponsiveImage
          src={page.cta.background}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#a34218]/35" />
        <Container className="relative py-20 sm:py-28 lg:py-36">
          <div className="border-t-[4px] border-white bg-[#71351f]/45 px-6 py-14 text-center text-white sm:px-12 lg:py-24" data-aos="fade-up">
            <h2 className="font-heading text-4xl leading-none sm:text-5xl lg:text-[64px]">{page.cta.heading}</h2>
            {page.cta.description && <p className="mx-auto mt-5 max-w-xl text-base text-white/90 sm:text-lg">{page.cta.description}</p>}
            {page.cta.buttonLabel && page.cta.buttonUrl && (
            <a
              href={page.cta.buttonUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-base uppercase text-[#D18148] transition hover:bg-white/90 sm:px-10 sm:py-5 sm:text-[20px]"
            >
              {page.cta.buttonLabel}
              <Arrow />
            </a>
            )}
          </div>
        </Container>
      </section>
    </article>
  );
}
