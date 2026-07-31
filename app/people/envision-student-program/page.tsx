import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CareersHero } from "@/components/people/CareersHero";
import { ArticleCard, ArticleCardProps } from "@/components/ui/ArticleCard";
import {
  CareersAccordionSection,
  AccordionItem,
} from "@/components/people/CareersAccordionSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { CtaContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Envision Student Program | Our People",
};

// 3 Article Cards Data
const articleCardsData: ArticleCardProps[] = [
  {
    id: "emerge",
    slug: "emerge",
    title: "eMerge: A trauma informed mental health hub for young people",
    image: "/images/hero/hero1.png",
    hoverColor: "#F0C7BD",
    href: "/research/emerge",
  },
  {
    id: "happy-place",
    slug: "the-happy-place-vol-1-balance-and-productivity",
    title: "The happy place Vol 1: Bringing balance and productivity back into the workplace",
    image: "/images/hero/hero2.png",
    hoverColor: "#FDD4B6",
    href: "/research/the-happy-place-vol-2-balance-and-productivity",
  },
  {
    id: "care",
    slug: "care-community-alliance-for-regional-education",
    title: "CARE: Community Alliance for Regional Education - Early Childhood",
    image: "/images/hero/hero3.png",
    hoverColor: "#EDE3F0",
    href: "/research/care-community-alliance-for-regional-education",
  },
];

// 6 FAQ Accordion Items Data
const envisionFaqItems: AccordionItem[] = [
  {
    id: "previous-students",
    title: "WHAT HAVE PREVIOUS STUDENTS SAID ABOUT THE PROGRAM?",
    content:
      "Previous students highlight hands-on exposure to live architectural projects, one-on-one mentorship from experienced studio leaders, and invaluable career guidance toward professional registration.",
  },
  {
    id: "learning-outcomes",
    title: "LEARNING OUTCOMES",
    content:
      "Participants gain practical experience in spatial design, technical drafting, client presentations, material selection, site inspections, and collaborative studio workflows.",
  },
  {
    id: "program-experience",
    title: "PROGRAM EXPERIENCE",
    content:
      "Envision offers an immersive studio experience where students participate in design charrettes, team rituals, CPD learning sessions, and social events.",
  },
  {
    id: "program-structure",
    title: "PROGRAM STRUCTURE",
    content:
      "The program runs across university terms with flexible scheduling to balance academic studies and studio hours under dedicated mentor guidance.",
  },
  {
    id: "eligibility",
    title: "ELIGIBILITY",
    content:
      "Envision is open to current undergraduate and postgraduate students enrolled in Architecture, Interior Architecture, Landscape Architecture, and related spatial design disciplines.",
  },
  {
    id: "application-process",
    title: "APPLICATION PROCESS",
    content:
      "Applications open annually. Interested candidates should submit their CV, portfolio, and a brief statement of intent to careers@nbrs.com.au.",
  },
];

const cta = {
    image: "/images/hero/hero5.png",
    title: "INTERESTED IN ENVISION STUDENT PROGRAM?",
    description: "Connect with our studio team to learn more about upcoming student intakes.",
    buttonText: "CAREERS@NBRS.COM.AU",
    buttonHref: "mailto:careers@nbrs.com.au",
  }


export default function EnvisionStudentProgramPage() {
  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. REUSABLE HERO WITH DESCRIPTION */}
      <CareersHero
        title={
          <>
            ENVISION
            <br />
            STUDENT
            <br />
            PROGRAM
          </>
        }
        description="A mentoring pathway giving architecture and design students hands-on project experience, industry guidance, and real studio collaboration."
        imageSrc="/images/hero/hero5.png"
      />

      {/* 2. 3-ARTICLE CARD GRID SECTION */}
      <section className="bg-white pt-20 pb-16 lg:pt-16 lg:pb-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {articleCardsData.map((item, index) => (
              <div key={item.id || index} data-aos="fade-up" data-aos-delay={index * 100}>
                <ArticleCard item={item} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. FREQUENTLY ASKED QUESTIONS ACCORDION SECTION */}
      <CareersAccordionSection
        title={
          <>
            FREQUENTLY
            <br />
            ASKED
            <br />
            QUESTIONS
          </>
        }
        items={envisionFaqItems}
        introParagraphs={null}
      />

      {/* 4. CTA SECTION */}
      <CtaSection content={cta} />
    </article>
  );
}
