import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

type ProjectDetailLegacyBodyProps = {
  storyHtml: string | null;
  popupGallery: ImageSource[];
};

/** The pre-V2 editorial composition: Story followed by the header popup gallery. */
export function ProjectDetailLegacyBody({
  storyHtml,
  popupGallery,
}: ProjectDetailLegacyBodyProps) {
  if (!storyHtml && popupGallery.length === 0) return null;

  return (
    <section className="bg-white py-16 text-black lg:py-24">
      {storyHtml && (
        <Container>
          <div
            className="max-w-[770px] font-sans text-base leading-relaxed text-black [&_a]:underline [&_a]:underline-offset-4 [&_li]:mb-3 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-6 [&_p:last-child]:mb-0 [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: storyHtml }}
          />
        </Container>
      )}

      {popupGallery.length > 0 && (
        <Container className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {popupGallery.map((image, index) => (
              <ResponsiveImage
                key={index}
                src={image}
                alt=""
                className="aspect-[16/10] h-full w-full object-cover"
              />
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}
