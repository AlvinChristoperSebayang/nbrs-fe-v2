import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { PracticeIntroSection } from "@/components/practices/PracticeIntroSection";
import { ProjectListTableSection } from "@/components/sectors/ProjectListTableSection";
import { SectorsSection } from "@/components/home/SectorsSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { SECTORS_DATA } from "@/lib/sectors-data";
import { CtaContent } from "@/lib/types";
import { PRACTICES_DATA } from "@/lib/practices-data";

export function generateStaticParams() {
  return PRACTICES_DATA.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const item = PRACTICES_DATA.find((p) => p.slug === resolvedParams.slug);

  return {
    title: item ? item.title : "Practice Detail",
  };
}

export default async function PracticeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const item =
    PRACTICES_DATA.find((p) => p.slug === resolvedParams.slug) ||
    PRACTICES_DATA[0];

  const cta: CtaContent[] = [
    {
      image: "/images/contact-bg.png",
      title: "GET IN TOUCH",
      description: `Interested in our ${item.title.toLowerCase()} projects or have any questions?`,
      buttonText: "CONTACT US",
      buttonHref: "/contact",
    },
  ];

  const tableRows = item.tableProjects.map((tp) => ({
    id: tp.id,
    project: tp.title,
    practices: tp.sector,
    status: tp.status,
    href: tp.href,
  }));

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero
        image={item.heroImage}
        title={item.title}
        description={item.description}
      />

      {/* 2. INTRO FEATURE STAGE (Exact Specs: 770px Image + Overlapping 585px Glass Card) */}
      <PracticeIntroSection
        image={item.introImage}
        quote={item.introQuote}
        alt={item.title}
      />

      {/* 3. LATEST PROJECTS TABLE SECTION */}
      <ProjectListTableSection
        title="LATEST PROJECTS"
        sectorHeaderLabel="Sectors"
        rows={tableRows}
      />

      {/* 4. SECTORS GRID SECTION */}
      <SectorsSection sectors={SECTORS_DATA} />

      {/* 5. CTA SECTION */}
      <CtaSection content={cta[0]} />
    </article>
  );
}
