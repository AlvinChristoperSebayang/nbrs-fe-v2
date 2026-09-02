import { Container } from "@/components/ui/Container";
import { MasonryGallery } from "@/components/ui/MasonryGallery";
import type { ImageSource } from "@/lib/types";
import { formatCmsHtml } from "@/lib/text";

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
    <section className="bg-white py-10 text-black lg:py-16">
      {storyHtml && (
        <Container>
          <div
            className="max-w-[770px] font-sans text-base sm:text-lg leading-relaxed text-black/90 [&_a]:underline [&_a]:underline-offset-4 [&_h1]:font-heading [&_h1]:text-2xl [&_h1]:sm:text-3xl [&_h1]:uppercase [&_h1]:font-bold [&_h1]:my-4 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:uppercase [&_h2]:font-bold [&_h2]:my-4 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:uppercase [&_h3]:font-bold [&_h3]:my-3 [&_h4]:font-sans [&_h4]:text-base [&_h4]:font-bold [&_h4]:my-2 [&_li]:mb-2 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_strong]:text-black [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: formatCmsHtml(storyHtml) }}
          />
        </Container>
      )}

      {popupGallery.length > 0 && (
        <Container className="mt-10 lg:mt-14">
          <MasonryGallery
            images={popupGallery}
            altPrefix="Project gallery image"
          />
        </Container>
      )}
    </section>
  );
}
