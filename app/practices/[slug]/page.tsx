import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/ui/Hero";
import { PracticeIntroSection } from "@/components/practices/PracticeIntroSection";
import { ProjectListTableSection } from "@/components/sectors/ProjectListTableSection";
import { SectorsSection } from "@/components/home/SectorsSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { getPracticeDetailContent } from "@/lib/practice-detail";
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
  const practice = await getPracticeDetailContent((await params).slug);
  if (!practice) return { title: "Practice Detail" };

  return {
    title: practice.seoTitle,
    description: practice.seoDescription,
  };
}

export default async function PracticeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const practice = await getPracticeDetailContent((await params).slug);
  if (!practice) notFound();

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero
        image={practice.image}
        title={practice.title}
        description={practice.description}
      />

      {/* 2. INTRO FEATURE STAGE (Exact Specs: 770px Image + Overlapping 585px Glass Card) */}
      <PracticeIntroSection
        image={practice.introImage}
        quote={practice.introText}
        alt={practice.title}
      />

      {/* 3. LATEST PROJECTS TABLE SECTION */}
      <ProjectListTableSection
        title="LATEST PROJECTS"
        sectorHeaderLabel="Sectors"
        rows={practice.tableProjects}
      />

      {/* 4. SECTORS GRID SECTION */}
      <div className="py-8 md:py-0">
        <SectorsSection sectors={practice.sectors} />
      </div>

      {/* 5. CTA SECTION */}
      <CtaSection content={practice.cta} />
    </article>
  );
}
