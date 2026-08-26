import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ProjectV2Block } from "@/lib/project-detail";

function RichText({ html, className = "" }: { html: string | null; className?: string }) {
  if (!html) return null;

  return (
    <div
      className={`font-sans text-base leading-relaxed text-black [&_a]:underline [&_a]:underline-offset-4 [&_li]:mb-3 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-5 [&_p:last-child]:mb-0 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function ProjectDetailV2Body({ blocks }: { blocks: ProjectV2Block[] }) {
  if (blocks.length === 0) return null;

  return (
    <section className="bg-white py-10 text-black lg:py-16">
      <div className="flex flex-col gap-10 lg:gap-16">
        {blocks.map((block, index) => {
          if (block.type === "intro") {
            return (
              <section key={index} className="bg-[#EEEEEE] pt-10 lg:pt-14">
                <Container>
                  <div className="max-w-[786px]">
                    {block.heading && (
                      <h2 className="font-heading text-2xl uppercase leading-[1.1] lg:text-[40px]">
                        {block.heading}
                      </h2>
                    )}
                    <RichText html={block.textHtml} className="mt-4 max-w-[771px]" />
                  </div>
                </Container>
                {block.image && (
                  <Container className="relative z-10 translate-y-8 lg:translate-y-12">
                    <ResponsiveImage src={block.image} alt={block.heading || "Project image"} title={block.heading || "Project image"} className="aspect-[1170/650] h-full w-full object-cover" />
                  </Container>
                )}
              </section>
            );
          }

          if (block.type === "copy") {
            return (
              <Container key={index} className={block.alignment === "right" ? "flex justify-end" : "flex justify-start"}>
                <div className="max-w-[838px] mt-0 lg:mt-4">
                  {block.heading && <h2 className="font-heading text-2xl md:text-3xl leading-[1.1] lg:text-[36px]">{block.heading}</h2>}
                  <RichText html={block.textHtml} className={block.heading ? "mt-4" : ""} />
                </div>
              </Container>
            );
          }

          if (block.type === "media") {
            if (!block.image) return null;
            const image = <ResponsiveImage src={block.image} alt="Project media" title="Project media" className="h-full w-full object-cover" />;
            return block.treatment === "fullBleed" ? (
              <div key={index} className="w-full">{image}</div>
            ) : (
              <Container key={index}>{image}</Container>
            );
          }

          const text = (
            <div className="flex flex-col justify-center">
              {block.heading && (
                <div className="relative pb-3 mb-2">
                  <h2 className="font-heading text-3xl uppercase leading-[1.1] lg:text-[32px]">
                    {block.heading}
                  </h2>
                  <div
                    className={`hidden lg:block absolute bottom-0 h-[3px] bg-stone-300 z-10 pointer-events-none ${
                      block.imagePosition === "left"
                        ? "left-[-40px] right-0"
                        : "left-0 right-[-40px]"
                    }`}
                  />
                </div>
              )}
              <RichText html={block.textHtml} className={block.heading ? "mt-4" : ""} />
            </div>
          );
          const image = block.image ? <ResponsiveImage src={block.image} alt={block.heading || "Project image"} title={block.heading || "Project image"} className="aspect-[570/300] h-full w-full object-cover" /> : null;

          return (
            <Container key={index}>
              <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
                {image && (
                  <div className={`order-1 ${block.imagePosition === "left" ? "lg:order-1" : "lg:order-2"}`}>
                    {image}
                  </div>
                )}
                <div className={`order-2 ${block.imagePosition === "left" ? "lg:order-2" : "lg:order-1"}`}>
                  {text}
                </div>
              </div>
            </Container>
          );
        })}
      </div>
    </section>
  );
}
