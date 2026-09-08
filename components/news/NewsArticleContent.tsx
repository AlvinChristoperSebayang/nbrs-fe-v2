import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { MasonryGallery } from "@/components/ui/MasonryGallery";
import type { NewsContentBlock } from "@/lib/news-detail";
import { formatCmsHtml } from "@/lib/text";

export function NewsArticleContent({ blocks }: { blocks: NewsContentBlock[] }) {
  return (
    <div className="flex flex-col gap-8 font-sans text-base leading-relaxed text-zinc-600 lg:max-w-[670px]">
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <div
              key={index}
              className="[&_a]:underline [&_a]:underline-offset-4 [&_a]:text-black hover:[&_a]:text-zinc-600 [&_figure]:my-8 [&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:text-zinc-500 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-[3px] [&_p]:mb-5 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_strong]:text-black [&_b]:font-bold [&_b]:text-black [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:pl-1 [&_li]:leading-relaxed [&_h1]:font-heading [&_h1]:text-2xl [&_h1]:sm:text-3xl [&_h1]:uppercase [&_h1]:font-bold [&_h1]:text-black [&_h1]:my-6 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:uppercase [&_h2]:font-bold [&_h2]:text-black [&_h2]:my-5 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:my-4 [&_h4]:font-sans [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-black [&_h4]:my-3"
              dangerouslySetInnerHTML={{ __html: formatCmsHtml(block.html) }}
            />
          );
        }

        if (block.type === "image") {
          return <ResponsiveImage key={index} src={block.image} alt="News article image" title="News article image" className="h-auto w-full rounded-[3px] object-contain" />;
        }

        if (block.type === "gallery") {
          return (
            <MasonryGallery
              key={index}
              images={block.images}
              altPrefix="News article image"
            />
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={index} className="border-l-4 border-black pl-6 font-heading text-2xl leading-tight sm:text-3xl">
              <p>“{block.quote}”</p>
              {block.citation && <footer className="mt-4 font-sans text-sm leading-normal">— {block.citation}</footer>}
            </blockquote>
          );
        }

        return (
          <div
            key={index}
            className="aspect-video w-full [&_iframe]:h-full [&_iframe]:w-full"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        );
      })}
    </div>
  );
}
