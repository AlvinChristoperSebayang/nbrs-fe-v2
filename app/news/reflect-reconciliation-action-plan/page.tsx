import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
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
      <section className="relative flex min-h-[620px] h-[80vh] w-full items-end overflow-hidden lg:h-[85vh]">
        <div className="absolute inset-0">
          <ResponsiveImage
            src={page.hero}
            alt=""
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <Container className="relative z-10 pb-12 lg:pb-20">
          <div className="max-w-[980px]" data-aos="fade-up">
            <h1 className="max-w-[900px] font-heading text-[42px] uppercase leading-[0.95] text-white sm:text-[58px] lg:text-[82px]">
              {page.title}
            </h1>
            <div className="mt-6 h-1 w-full bg-white lg:mt-8 lg:h-2" />
          </div>
        </Container>
      </section>

      <Container className="relative z-20 -mt-1 lg:-mt-16">
        <section className="bg-[#efefed] px-6 py-8 sm:px-10 lg:px-14 lg:py-11" aria-label="Publication details">
          <p className="font-heading text-2xl uppercase leading-none sm:text-3xl">Reconciliation Action Plan</p>
          <div className="mt-6 h-px bg-black/25" />
          <dl className="mt-7 grid gap-7 text-sm sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div>
              <dt className="uppercase text-black/55">Publication Date</dt>
              <dd className="mt-1 text-base">{page.publicationDate}</dd>
            </div>
            <div>
              <dt className="uppercase text-black/55">Author</dt>
              <dd className="mt-1 max-w-[270px] text-base">{page.author}</dd>
            </div>
            <div>
              <dt className="uppercase text-black/55">Endorsed by</dt>
              <dd className="mt-1 text-base">{page.endorsedBy}</dd>
            </div>
            <div>
              <dt className="uppercase text-black/55">Read time</dt>
              <dd className="mt-1 text-base">{page.readTime}</dd>
            </div>
          </dl>
        </section>
      </Container>

      <section className="bg-white py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7" data-aos="fade-up">
              <h2 className="font-heading text-4xl uppercase leading-none sm:text-5xl lg:text-[64px]">Insight</h2>
              <div className="mt-8 max-w-[640px] space-y-5 font-sans text-base leading-[1.55] text-black/90 sm:text-lg">
                <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
              </div>
            </div>
            <div className="lg:col-span-5" data-aos="fade-up" data-aos-delay="150">
              <ResponsiveImage
                src={page.artwork}
                alt="Shared Waterways artwork"
                className="h-auto w-full object-cover"
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
          <div className="border border-white/75 bg-[#71351f]/45 px-6 py-14 text-center text-white sm:px-12 lg:py-24" data-aos="fade-up">
            <h2 className="font-heading text-4xl uppercase leading-none sm:text-5xl lg:text-[64px]">{page.cta.heading}</h2>
            {page.cta.description && <p className="mx-auto mt-5 max-w-xl text-base text-white/90 sm:text-lg">{page.cta.description}</p>}
            {page.cta.buttonLabel && page.cta.buttonUrl && (
            <a
              href={page.cta.buttonUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm uppercase text-[#b4521e] transition hover:bg-white/90 sm:px-10 sm:py-5 sm:text-base"
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
