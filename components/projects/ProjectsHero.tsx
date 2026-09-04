import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type ProjectsHeroProps = {
  image?: ImageSource | null;
  title?: string | null;
};

export function ProjectsHero({
  image,
  title,
}: ProjectsHeroProps = {}) {
  const headingText = title || "Projects";

  return (
    <section className="relative w-full flex flex-col justify-between min-h-[580px] sm:min-h-[620px] lg:min-h-[85vh] xl:min-h-[90vh] xl:h-[910px] 2xl:h-[1200px] overflow-hidden project-hero">
      <div className="absolute inset-0 overflow-hidden">
        <ResponsiveImage
          src={image || "/images/hero/hero3.png"}
          alt={headingText}
          title={headingText}
          className="h-full w-full object-cover lg:object-top"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <Container className="relative z-10 flex h-full flex-col justify-center my-auto pt-20 pb-12 lg:pt-28 lg:pb-16">
        <div className="flex flex-col items-start max-w-[650px] lg:max-w-none">
          <h1
            data-aos="fade-up"
            suppressHydrationWarning
            className="font-heading text-[36px] sm:text-[44px] uppercase leading-[1.05] text-white lg:text-[70px]"
          >
            <span className="inline-block border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-white pb-1 sm:pb-2 leading-[1.05]">
              {headingText}
            </span>
          </h1>
        </div>
      </Container>
    </section>
  );
}

