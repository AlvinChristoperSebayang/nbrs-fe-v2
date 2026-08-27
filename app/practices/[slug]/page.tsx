import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/ui/Hero";
import { PracticeIntroSection } from "@/components/practices/PracticeIntroSection";
import { ProjectListTableSection } from "@/components/sectors/ProjectListTableSection";
import { SectorsSection } from "@/components/home/SectorsSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { getPracticeDetailContent } from "@/lib/practice-detail";
import { PRACTICES_DATA } from "@/lib/practices-data";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 60;

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
  const { slug } = await params;
  const practice = await getPracticeDetailContent(slug);
  if (!practice) {
    return createPageMetadata({
      pathname: `/practices/${slug}`,
      title: "Practice Detail",
      noIndex: true,
    });
  }

  return createPageMetadata({
    pathname: `/practices/${slug}`,
    title: practice.title,
    cmsTitle: practice.cmsSeoTitle,
    description: practice.seoDescription,
    image: practice.seoImage ?? practice.image,
    imageAlt: practice.title,
  });
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
      <Hero
        image={practice.image}
        title={practice.title}
        description={practice.description}
      />

      <PracticeIntroSection
        image={practice.introImage}
        quote={practice.introText}
        alt={practice.title}
      />

      <ProjectListTableSection
        title="LATEST PROJECTS"
        sectorHeaderLabel="Sectors"
        showMobileProjectLabel={false}
        rows={practice.tableProjects}
      />

      <div className="py-8 md:py-0">
        <SectorsSection sectors={practice.sectors} />
      </div>

      <CtaSection content={practice.cta} />
    </article>
  );
}
