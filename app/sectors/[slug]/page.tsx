import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/ui/Hero";
import { SectorPrinciplesSection } from "@/components/sectors/SectorPrinciplesSection";
import { KeyProjectsSection } from "@/components/sectors/KeyProjectsSection";
import { ProjectListTableSection } from "@/components/sectors/ProjectListTableSection";
import { SectorQuoteSection } from "@/components/sectors/SectorQuoteSection";
import { SectorFeaturesSliderSection } from "@/components/sectors/SectorFeaturesSliderSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { SECTORS_DATA } from "@/lib/sectors-data";
import type { CtaContent } from "@/lib/types";

export function generateStaticParams() {
  return SECTORS_DATA.map((sector) => ({
    slug: sector.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const sector = SECTORS_DATA.find((s) => s.slug === resolvedParams.slug);
  if (!sector) return { title: "Sector Not Found" };

  return {
    title: sector.label,
    description: sector.heroSubtitle,
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

export default async function SingleSectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const sector = SECTORS_DATA.find((s) => s.slug === resolvedParams.slug);

  if (!sector) {
    notFound();
  }

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. Hero Section */}
      <Hero
        image={sector.heroImage}
        title={sector.label.toUpperCase()}
        description={sector.heroSubtitle}
      />

      {/* 2. Principles Section */}
      <SectorPrinciplesSection
        title={sector.principlesTitle}
        description={sector.principlesDescription}
        images={sector.principlesImages}
      />

      {/* 3. Features Section (SectorFeaturesSliderSection: Desktop Grid & Mobile Slider with Glass Card) */}
      <SectorFeaturesSliderSection
        title="FEATURES"
        items={sector.features}
        backgroundColor={sector.hoverColor}
      />

      {/* 4. Key Projects Section */}
      <KeyProjectsSection projects={sector.keyProjects} />

      {/* 5. Quote Section (Custom Sector Quote Layout with Solid Gray Box & White Quotes) */}
      {sector.quote && (
        <SectorQuoteSection
          image={sector.quote.image}
          quote={sector.quote.text}
          author={sector.quote.author}
        />
      )}

      {/* 6. Project List Table Section (Under Quote) */}
      <ProjectListTableSection rows={sector.tableProjects} />

      {/* 7. CTA Section */}
      <CtaSection content={cta[0]} />
    </article>
  );
}
