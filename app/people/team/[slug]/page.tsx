import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareersHero } from "@/components/people/CareersHero";
import { SingleTeamBioSection } from "@/components/people/SingleTeamBioSection";
import { getPeopleDetail } from "@/lib/people-detail";
import { craftPreviewFromSearchParams } from "@/lib/craft-preview";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = await getPeopleDetail(slug, craftPreviewFromSearchParams(await searchParams));

  return createPageMetadata({
    pathname: `/people/team/${slug}`,
    title: person ? `${person.name} | Our People` : "Team Member | Our People",
    cmsTitle: person?.seoTitle,
    description: person?.seoDescription,
    image: person?.seoImage ?? person?.hero,
    imageAlt: person?.name,
    noIndex: !person,
  });
}

export default async function SingleTeamPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const person = await getPeopleDetail(slug, craftPreviewFromSearchParams(await searchParams));
  if (!person) notFound();

  return (
    <article className="min-h-screen bg-white text-black">
      <CareersHero
        title={person.name.toUpperCase()}
        role={person.role ?? undefined}
        location={person.location ?? undefined}
        registration={person.registration ?? undefined}
        imageSrc={person.hero ?? undefined}
      />

      <SingleTeamBioSection
        name={person.name}
        bioHtml={person.biographyHtml}
        quote={person.quote ?? undefined}
      />
    </article>
  );
}
