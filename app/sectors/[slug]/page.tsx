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

export function generateStaticParams() {
  return SECTORS_DATA.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const sector = await getSectorDetailContent((await params).slug);
  if (!sector) return { title: "Sector Not Found" };

  return { title: sector.seoTitle, description: sector.seoDescription };
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
      <Hero image={sector.image} title={sector.title.toUpperCase()} description={sector.description} />
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
