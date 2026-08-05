import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareersHero } from "@/components/people/CareersHero";
import { SingleTeamBioSection } from "@/components/people/SingleTeamBioSection";
import { getPeopleDetail } from "@/lib/people-detail";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = await getPeopleDetail(slug);

  return {
    title: person?.seoTitle ?? (person ? `${person.name} | Our People` : "Team Member | Our People"),
    description: person?.seoDescription ?? undefined,
  };
}

export default async function SingleTeamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = await getPeopleDetail(slug);
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
