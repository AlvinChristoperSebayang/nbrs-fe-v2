import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { getNineDayFortnightPageContent } from "@/lib/nine-day-fortnight";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getNineDayFortnightPageContent();
  return createPageMetadata({
    pathname: "/9-day-fortnight",
    title: page.title,
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription,
    image: page.seoImage,
    imageAlt: page.title,
  });
}

function renderNineDayFortnightSubtitle(description: string) {
  const normalized = description.trim();
  if (!normalized) return null;

  // Split lines jika terdapat newlines dari CMS, atau bagi kata secara seimbang untuk 2 baris mobile
  let mobileLines: [string, string];
  if (normalized.includes("\n")) {
    const raw = normalized.split("\n").map((l) => l.trim()).filter(Boolean);
    if (raw.length >= 2) {
      mobileLines = [raw[0], raw.slice(1).join(" ")];
    } else {
      const words = raw[0].split(/\s+/).filter(Boolean);
      const mid = Math.ceil(words.length / 2);
      mobileLines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
    }
  } else {
    const words = normalized.split(/\s+/).filter(Boolean);
    if (words.length >= 4) {
      const mid = Math.ceil(words.length / 2);
      mobileLines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
    } else if (words.length >= 2) {
      mobileLines = [words[0], words.slice(1).join(" ")];
    } else {
      mobileLines = [normalized, ""];
    }
  }

  const desktopText = normalized.replace(/\s+/g, " ");

  return (
    <div className="mt-5">
      {/* Mobile (< md): Dibuat 2 baris dan underline mengikuti panjang kalimat yang di bawah */}
      <p className="flex flex-col items-start font-sans text-lg text-zinc-600 md:hidden">
        <span className="block leading-relaxed">{mobileLines[0]}</span>
        {mobileLines[1] && (
          <span className="mt-1 inline-block border-b-[4px] border-black pb-1.5 leading-relaxed">
            {mobileLines[1]}
          </span>
        )}
      </p>

      {/* Desktop (md ke atas): Dibuat 1 baris saja dengan underline mengikuti panjang teks p */}
      <p className="hidden font-sans text-lg text-zinc-600 md:inline-block lg:text-xl">
        <span className="inline-block border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-black pb-2 sm:pb-2.5 whitespace-nowrap leading-relaxed">
          {desktopText}
        </span>
      </p>
    </div>
  );
}

export default async function NineDayFortnightPage() {
  const page = await getNineDayFortnightPageContent();

  return (
    <article className="min-h-screen bg-white pt-28 text-black lg:pt-36">
      <Container>
        <div className="">
          <header data-aos="fade-up" className="pb-4">
            <h1 className="font-heading text-4xl font-bold uppercase leading-none sm:text-5xl lg:text-6xl">
              {page.title}
            </h1>
            {renderNineDayFortnightSubtitle(page.description)}
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
