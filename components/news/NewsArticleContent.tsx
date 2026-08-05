import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { NewsContentBlock } from "@/lib/news-detail";

export function NewsArticleContent({ blocks }: { blocks: NewsContentBlock[] }) {
  return (
    <div className="flex flex-col gap-8 font-sans text-base leading-relaxed text-zinc-900 lg:max-w-[670px]">
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <div
              key={index}
              className="[&_a]:underline [&_a]:underline-offset-4 [&_figure]:my-8 [&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:text-zinc-600 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-[3px] [&_p]:mb-5 [&_p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          );
        }

        if (block.type === "image") {
          return <ResponsiveImage key={index} src={block.image} alt="" className="h-auto w-full rounded-[3px]" />;
        }

        if (block.type === "gallery") {
          return (
            <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {block.images.map((image, imageIndex) => (
                <ResponsiveImage key={imageIndex} src={image} alt="" className="h-full w-full rounded-[3px] object-cover" />
              ))}
            </div>
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
