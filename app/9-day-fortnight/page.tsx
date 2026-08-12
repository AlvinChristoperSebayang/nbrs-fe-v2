import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { getNineDayFortnightPageContent } from "@/lib/nine-day-fortnight";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getNineDayFortnightPageContent();
  return { title: page.seoTitle, description: page.seoDescription };
}

export default async function NineDayFortnightPage() {
  const page = await getNineDayFortnightPageContent();

  return (
    <article className="min-h-screen bg-white pt-28 text-black lg:pt-36">
      <Container>
        <div className="mx-auto max-w-4xl">
          <header data-aos="fade-up" className="border-b-4 border-black pb-8">
            <h1 className="font-heading text-4xl font-bold uppercase leading-none sm:text-5xl lg:text-6xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-zinc-600 lg:text-xl">
              {page.description}
            </p>
          </header>

          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="py-12 font-sans text-base leading-relaxed text-zinc-800 lg:py-16 lg:text-lg [&_a]:font-semibold [&_a]:text-black [&_a]:underline [&_a]:underline-offset-4 [&_figure]:my-8 [&_figure_img]:h-auto [&_figure_img]:w-full [&_figure_img]:border [&_figure_img]:border-zinc-200 [&_figure_img]:object-contain [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:uppercase [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:uppercase [&_li]:mb-2 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mb-5 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: page.contentHtml }}
          />
        </div>
      </Container>
    </article>
  );
}
