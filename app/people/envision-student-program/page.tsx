import { createPageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { CareersHero } from "@/components/people/CareersHero";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CareersAccordionSection } from "@/components/people/CareersAccordionSection";
import { CtaSection } from "@/components/cta/CtaSection";
import { getEnvisionContent } from "@/lib/envision";

export const metadata = createPageMetadata({ pathname: "/people/envision-student-program", title: "Envision Student Program | Our People" });

export default async function EnvisionStudentProgramPage() {
  const page = await getEnvisionContent();

  return (
    <article className="bg-white text-black min-h-screen">
      {page.hero && <CareersHero title={page.hero.title} description={page.hero.description} imageSrc={page.hero.image} />}

      {page.research.length > 0 && (
        <section className="bg-white pt-20 pb-16 lg:pt-16 lg:pb-24">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {page.research.map((item, index) => (
                <div key={item.id || item.slug} data-aos="fade-up" data-aos-delay={index * 100}>
                  <ArticleCard item={item} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {page.faqs && <CareersAccordionSection {...page.faqs} />}

      {page.cta && <CtaSection content={page.cta} />}
    </article>
  );
}
