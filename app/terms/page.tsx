import { Hero } from "@/components/ui/Hero";
import { Container } from "@/components/ui/Container";
import { CtaSection } from "@/components/cta/CtaSection";
import { getTermsPageContent } from "@/lib/terms";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getTermsPageContent();
  return createPageMetadata({ pathname: "/terms", title: page.title, cmsTitle: page.cmsSeoTitle, description: page.seoDescription, image: page.seoImage ?? page.hero });
}

export default async function TermsAndConditionsPage() {
  const page = await getTermsPageContent();

  return (
    <article className="bg-white text-black min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero
        image={page.hero}
        title={page.title}
        description={page.description}
      />

      {/* 2. CONTENT SECTION */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            {/* Left Sticky Sidebar (Desktop) */}
            <div data-aos="fade-up" className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28">
              <h2 className="font-heading text-3xl lg:text-[40px] uppercase font-bold leading-none text-black border-b-4 border-black pb-4">
                {page.sidebarTitle}
              </h2>
              <p className="font-sans text-sm text-zinc-500 mt-4">
                Last updated: {page.lastUpdated}
              </p>
            </div>

            {/* Right Content Area */}
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="lg:col-span-8 font-sans text-base leading-relaxed text-zinc-800 [&_a]:font-semibold [&_a]:text-black [&_a]:underline [&_a]:underline-offset-4 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:uppercase [&_h3]:text-black [&_h3:not(:first-child)]:mt-8 [&_li]:mb-2 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-black [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-zinc-700"
              dangerouslySetInnerHTML={{ __html: page.contentHtml }}
            />
          </div>
        </Container>
      </section>

      {/* 3. CTA SECTION */}
      <CtaSection content={page.cta} />
    </article>
  );
}
