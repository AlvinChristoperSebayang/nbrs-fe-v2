import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CareersHero } from "@/components/people/CareersHero";
import { SingleTeamBioSection } from "@/components/people/SingleTeamBioSection";
import { ArticleCard, ArticleCardProps } from "@/components/ui/ArticleCard";
import { CtaSection } from "@/components/cta/CtaSection";
import { CtaContent } from "@/lib/types";

export type FullTeamMember = {
  slug: string;
  name: string;
  role: string;
  location: string;
  registration?: string;
  practice: string;
  image: string;
  bio: string[];
  quote?: string;
  featuredProjects?: ArticleCardProps[];
};

export const TEAM_MEMBERS_DETAIL: FullTeamMember[] = [
  {
    slug: "samantha-polkinghorne",
    name: "Samantha Polkinghorne",
    role: "Chair | Heritage Lead",
    location: "Sydney Studio",
    practice: "Heritage",
    image: "/images/hero/hero3.png",
    bio: [
      "Samantha is a built heritage expert and the Head of Heritage at NBRS. She has overseen and built up the NBRS Heritage team to become one of the most experienced and highly regarded team of heritage specialists in Australia. Samantha is experienced in the management of a wide range of heritage issues associated with the care and conservation of culturally significant sites, specifically in the context of a fast changing urban environment. She specialises in heritage assessment, documentation and implementation of conservation works, and heritage based design advice.",
      "As a registered architect and heritage expert, Samantha has a comprehensive and holistic background. This varied skill set allows her to take on complex briefs and develop them into design solutions that reflect a considered simplicity.",
      "Samantha works in a collaborative manner and has been closely involved during the construction phase, guiding decisions relating to conservation, interpretation and restoration.",
      "In conserving and unlocking the potential for successful adaptive re-use, Samantha believes NBRS delivers projects with an enduring value for clients alongside supporting the historic identity of the wider community.",
    ],
    quote:
      "Reinvigorating old buildings through their successful adaptation offers opportunities to create more subtly layered environments.",
    featuredProjects: [
      {
        id: "emerge",
        slug: "emerge",
        title: "eMerge: A trauma informed mental health hub for young people",
        image: "/images/hero/hero1.png",
        hoverColor: "#EDE3F0",
        href: "/research/emerge",
      },
      {
        id: "happy-place",
        slug: "the-happy-place-vol-1-balance-and-productivity",
        title: "The happy place Vol 1: Bringing balance and productivity back into the workplace",
        image: "/images/hero/hero2.png",
        hoverColor: "#F0C7BD",
        href: "/research/the-happy-place-vol-2-balance-and-productivity",
      },
      {
        id: "care",
        slug: "care-community-alliance-for-regional-education",
        title: "CARE: Community Alliance for Regional Education - Early Childhood",
        image: "/images/hero/hero3.png",
        hoverColor: "#FDD4B6",
        href: "/research/care-community-alliance-for-regional-education",
      },
    ],
  },
  {
    slug: "james-ward",
    name: "James Ward",
    role: "Managing Director | FAICD",
    location: "Sydney Studio",
    practice: "Architecture",
    image: "/images/hero/hero2.png",
    bio: [
      "James directs the strategic vision and studio management of NBRS, spearheading major master planning and educational infrastructure projects across New South Wales and Victoria.",
      "With a focus on community-centric design, he fosters collaborative environments that connect client vision with high-performance, sustainable architectural outcomes.",
    ],
    quote:
      "Architecture should elevate human connections, fostering communities that flourish across generations.",
  },
  {
    slug: "andrew-duffin",
    name: "Andrew Duffin",
    role: "Director | Design Lead",
    location: "Sydney Studio",
    registration: "Architect NSW 5602",
    practice: "Architecture",
    image: "/images/hero/hero4.png",
    bio: [
      "Andrew leads the design ethos across NBRS architecture practice, guiding teams in creating transformative spaces for learning, culture, and community.",
      "His design philosophy centres on human experience, biophilic integration, and contextually sensitive architecture.",
    ],
    quote:
      "Thoughtful design balances functional rigor with an inspiring physical atmosphere.",
  },
  {
    slug: "gillian-redman",
    name: "Gillian Redman",
    role: "Director | Landscape Lead",
    location: "Melbourne Studio",
    practice: "Landscape Architecture",
    image: "/images/hero/hero5.png",
    bio: [
      "Gillian heads the landscape architecture discipline at NBRS, creating ecological, resilient, and inclusive outdoor environments for schools, universities, and public realms.",
      "Her work integrates biodiversity, water-sensitive design, and play leadership into harmonious landscapes.",
    ],
    quote:
      "Landscape architecture connects people with nature, enriching daily life through living environments.",
  },
  {
    slug: "sarah-chapman",
    name: "Sarah Chapman",
    role: "Principal | Interior Lead",
    location: "Sydney Studio",
    practice: "Interior Design",
    image: "/images/hero/hero1.png",
    bio: [
      "Sarah leads the interior design team, crafting intuitive, wellness-focused interior spaces that inspire collaboration, warmth, and brand identity.",
      "Her practice spans corporate workplaces, specialized education facilities, and heritage interiors.",
    ],
    quote:
      "Interiors should nurture wellbeing, providing intuitive spaces where people feel truly connected.",
  },
  {
    slug: "marcus-brown",
    name: "Marcus Brown",
    role: "Principal | Heritage & Architecture",
    location: "Brisbane Studio",
    registration: "Architect NSW 7120",
    practice: "Heritage",
    image: "/images/home/latest-news.png",
    bio: [
      "Marcus specializes in complex heritage assessments, conservation planning, and sympathetic architectural additions to heritage-listed buildings.",
    ],
    quote:
      "Preserving history while designing for contemporary needs creates a meaningful dialogue between past and future.",
  },
];

export function generateStaticParams() {
  return TEAM_MEMBERS_DETAIL.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = TEAM_MEMBERS_DETAIL.find((m) => m.slug === slug);

  if (!member) {
    return { title: "Team Member | Our People" };
  }

  return {
    title: `${member.name} | Our People`,
    description: `${member.name} - ${member.role} at NBRS (${member.location}).`,
  };
}

export default async function SingleTeamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = TEAM_MEMBERS_DETAIL.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  const cta: CtaContent[] = [
    {
      image: member.image,
      title: `CONNECT WITH ${member.name.toUpperCase()}`,
      description: `Get in touch regarding ${member.practice} projects and design inquiries.`,
      buttonText: "CONTACT NBRS",
      buttonHref: "mailto:careers@nbrs.com.au",
    },
  ];

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. SINGLE TEAM MEMBER HERO WITH ATTRIBUTES */}
      <CareersHero
        title={member.name.toUpperCase()}
        role={member.role}
        location={member.location}
        registration={member.registration}
        imageSrc={member.image}
      />

      {/* 2. SINGLE TEAM BIO & QUOTE SECTION */}
      <SingleTeamBioSection
        name={member.name}
        bio={member.bio}
        quote={member.quote}
      />

      {/* 3. FEATURED PROJECTS / RESEARCH WORK GRID (IF ANY) */}
      {/* {member.featuredProjects && member.featuredProjects.length > 0 && (
        <section className="bg-zinc-50 py-16 lg:py-24 border-t border-zinc-200">
          <Container className="flex flex-col gap-10">
            <h3
              data-aos="fade-up"
              className="font-heading text-3xl sm:text-4xl font-bold uppercase text-black tracking-wide"
            >
              FEATURED PROJECTS & RESEARCH
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {member.featuredProjects.map((item, index) => (
                <div key={item.id || index} data-aos="fade-up" data-aos-delay={index * 100}>
                  <ArticleCard item={item} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )} */}

      {/* 4. CTA SECTION */}
      <CtaSection cta={cta} />
    </article>
  );
}
