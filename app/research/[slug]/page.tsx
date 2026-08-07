import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta/CtaSection";
import { AtAGlanceSection } from "@/components/research/AtAGlanceSection";
import { RelatedResearchSection } from "@/components/research/RelatedResearchSection";
import { ResearchDetailHero } from "@/components/research/ResearchDetailHero";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { getResearchDetail } from "@/lib/research-detail";

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps<"/research/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const research = await getResearchDetail(slug);

  return {
    title: research?.seoTitle ?? research?.title ?? "Research",
    description: research?.seoDescription ?? undefined,
  };
}

function MetadataItem({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;

  return (
    <div className="flex flex-col">
      <span className="font-bold text-black">{label}</span>
      <span className="text-zinc-800">{value}</span>
    </div>
  );
}

export default async function ResearchDetailPage({ params }: PageProps<"/research/[slug]">) {
  const { slug } = await params;
  const research = await getResearchDetail(slug);
  if (!research) notFound();

  const taxonomy = [research.sectors.join(", "), research.practices.join(", ")].filter(Boolean).join(" / ");

  return (
    <article className="min-h-screen bg-white text-black">
      <ResearchDetailHero
        title={research.title}
        description={research.subheading ?? undefined}
        category={research.category ?? "RESEARCH"}
        bgColor={research.categoryColor ?? undefined}
        bgImage={research.hero}
      />

      <section className="relative z-20 overflow-hidden lg:-mt-10">
        <div className="container uncontainer-mobile mx-auto">
          <div className="flex flex-col gap-6 rounded-sm bg-[#E5E5E5] p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-col gap-1">
                <span className="font-heading text-sm font-bold tracking-wider text-black uppercase">Sector • Practice</span>
                {taxonomy && <span className="font-sans text-lg font-normal text-black">{taxonomy}</span>}
              </div>
              {research.articleType && <span className="font-sans text-lg font-normal text-black">{research.articleType}</span>}
            </div>

            <hr className="border-t border-zinc-400" />

            <div className="grid grid-cols-2 items-start gap-6 text-sm sm:grid-cols-3 lg:grid-cols-6">
              <MetadataItem label="Publication date:" value={research.publicationDate} />
              <MetadataItem label="Author:" value={research.author} />
              <MetadataItem label="Reviewed by:" value={research.reviewedBy} />
              <MetadataItem label="Sponsored by:" value={research.sponsoredBy} />
              <MetadataItem label="Read time:" value={research.readTime} />
            </div>
          </div>
        </div>
      </section>

      {(research.insightHtml || research.keyTakeawaysHtml || research.featureImage) && (
        <section className="bg-white pt-12 pb-6 lg:pt-20 lg:pb-5">
          <Container>
            <div className="flex flex-col-reverse items-start gap-12 lg:flex-row lg:gap-16">
              <div className="flex w-full flex-col gap-10 lg:w-1/2 lg:gap-12">
                {research.insightHtml && (
                  <div data-aos="fade-up" className="flex flex-col gap-4">
                    <h2 className="font-heading text-3xl leading-none font-bold text-black uppercase sm:text-4xl">Insight</h2>
                    <div
                      className="font-sans text-base leading-relaxed text-zinc-900 [&_a]:underline [&_a]:underline-offset-4 [&_p]:mb-5 [&_p:last-child]:mb-0"
                      dangerouslySetInnerHTML={{ __html: research.insightHtml }}
                    />
                  </div>
                )}

                {research.keyTakeawaysHtml && (
                  <div data-aos="fade-up" data-aos-delay="100" className="flex flex-col gap-6 pt-4">
                    <h2 className="font-heading text-3xl leading-none font-bold text-black uppercase sm:text-4xl">Key take-aways</h2>
                    <div
                      className="font-sans text-base leading-relaxed text-zinc-900 [&_a]:underline [&_a]:underline-offset-4 [&_h3]:mb-1 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:uppercase [&_h3:not(:first-child)]:mt-6 [&_li]:mb-2 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_ul]:list-disc"
                      dangerouslySetInnerHTML={{ __html: research.keyTakeawaysHtml }}
                    />
                  </div>
                )}
              </div>

              {research.featureImage && (
                <div data-aos="fade-up" data-aos-delay="200" className="flex w-full justify-start lg:w-1/2 lg:justify-end">
                  <div className="aspect-[570/587] w-full max-w-[570px] overflow-hidden rounded-xs bg-zinc-100 shadow-md">
                    <ResponsiveImage src={research.featureImage} alt={research.title} className="h-full w-full object-cover" />
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      <AtAGlanceSection items={research.atAGlance} />

      {research.resultsImplicationsHtml && (
        <section className="bg-white pt-12 pb-6 text-black lg:pt-20 lg:pb-24">
          <Container>
            <div className="flex flex-col gap-4 lg:max-w-[492px]">
              <h2 data-aos="fade-up" className="font-heading text-3xl leading-none font-bold text-black uppercase sm:text-4xl">
                Results and implications
              </h2>
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="font-sans text-base leading-relaxed text-zinc-900 [&_a]:underline [&_a]:underline-offset-4 [&_li]:mb-2 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-5 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_ul]:list-disc"
                dangerouslySetInnerHTML={{ __html: research.resultsImplicationsHtml }}
              />
            </div>
          </Container>
        </section>
      )}

      <CtaSection content={research.downloadCta ?? undefined} />
      <RelatedResearchSection items={research.related} />
    </article>
  );
}
