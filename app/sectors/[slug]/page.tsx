import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta/CtaSection";
import { HeritageServicesSection } from "@/components/sectors/HeritageServicesSection";
import { KeyProjectsSection } from "@/components/sectors/KeyProjectsSection";
import { ProjectListTableSection } from "@/components/sectors/ProjectListTableSection";
import { SectorFeaturesSliderSection } from "@/components/sectors/SectorFeaturesSliderSection";
import { SectorPrinciplesSection } from "@/components/sectors/SectorPrinciplesSection";
import { SectorQuoteSection } from "@/components/sectors/SectorQuoteSection";
import { Hero } from "@/components/ui/Hero";
import { getSectorDetailContent } from "@/lib/sector-detail";
import { SECTORS_DATA } from "@/lib/sectors-data";
import { createPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return SECTORS_DATA.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = await getSectorDetailContent(slug);
  if (!sector) {
    return createPageMetadata({
      pathname: `/sectors/${slug}`,
      title: "Sector Not Found",
      noIndex: true,
    });
  }

  return createPageMetadata({
    pathname: `/sectors/${slug}`,
    title: sector.title,
    cmsTitle: sector.cmsSeoTitle,
    description: sector.seoDescription,
    image: sector.seoImage ?? sector.image,
    imageAlt: sector.title,
  });
}

export default async function SingleSectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const sector = await getSectorDetailContent((await params).slug);
  if (!sector) notFound();

  return (
    <article className="min-h-screen bg-white text-black">
      <Hero image={sector.image} title={sector.title.toUpperCase()} description={sector.description} descriptionClassName="max-w-[334px]"/>
      <SectorPrinciplesSection title={sector.principlesTitle} description={sector.principlesDescription} images={sector.principlesImages} />
      {sector.heritageServices ? (
        <HeritageServicesSection
          intro={sector.heritageServices.intro}
          advisoryServices={sector.heritageServices.advisory}
          conservationServices={sector.heritageServices.conservation}
        />
      ) : (
        <SectorFeaturesSliderSection title="FEATURES" items={sector.features} backgroundColor={sector.backgroundColor} />
      )}
      <KeyProjectsSection projects={sector.keyProjects} />
      {sector.quote && <SectorQuoteSection image={sector.quote.image} quote={sector.quote.text} author={sector.quote.author} />}
      <ProjectListTableSection title="" rows={sector.tableProjects} />
      <CtaSection content={sector.cta} titleUppercase={false} />
    </article>
  );
}
