import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type ProjectOverviewProps = {
  headline?: string | null;
  description?: string | null;
  image?: ImageSource | null;
  alt?: string;
};

export function ProjectOverviewSection({
  headline,
  description,
  image,
  alt = "Project feature image",
}: ProjectOverviewProps) {
  const displayHeadline =
    headline ||
    "SUPPORTING STUDENTS ACHIEVE THEIR ASPIRATIONAL GOALS, THROUGHOUT THEIR EDUCATIONAL JOURNEY AT A WORLD CLASS CAMPUS, IN A GROWING COMMUNITY.";

  const displayDescription =
    description ||
    "NBRS were engaged by the Department of Education to design and document a new integrational educational campus on a 6-hectare greenfield site in the rapidly growing residential housing estate, within the Northwestern Sydney region.";

  const displayImage: ImageSource = image || "/images/hero/hero1.png";

  return (
    <section className="relative w-full overflow-hidden bg-white mt-[100px]">
      {/* Grey top background box */}
      <div className="bg-[#EEEEEE] pt-16 pb-32 lg:pt-20 lg:pb-44">
        <Container>
          <div data-aos="fade-up" className="max-w-[786px]">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-normal uppercase leading-tight lg:leading-[1.1] text-black">
              {displayHeadline}
            </h2>
            <p className="mt-6 font-sans text-sm sm:text-base leading-relaxed text-black/80 max-w-[771px]">
              {displayDescription}
            </p>
          </div>
        </Container>
      </div>

      {/* Overlapping Hero Image */}
      <Container className="-mt-20 sm:-mt-28 lg:-mt-36 relative z-10 pb-16 lg:pb-24">
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="w-full max-w-[1170px] overflow-hidden"
        >
          <ResponsiveImage
            src={displayImage}
            alt={alt}
            title={alt}
            className="w-full h-auto max-h-[650px] object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
