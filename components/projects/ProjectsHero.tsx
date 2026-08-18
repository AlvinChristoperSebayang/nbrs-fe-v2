import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export function ProjectsHero({
  image,
  title,
}: {
  image?: ImageSource | null;
  title?: string | null;
  subheading?: string | null;
} = {}) {
  return (
    <section className="relative max-md:h-100 lg:h-[90vh] w-full overflow-hidden project-hero">
      <ResponsiveImage
        src={image || "/images/hero/hero3.png"}
        alt={title || "Projects"}
        title={title || "Projects"}
        className="absolute inset-0 h-full w-full object-cover lg:min-h-screen"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
      <Container className="relative flex h-full flex-col justify-center pb-12 lg:pb-16">
        <h1
          data-aos="fade-up"
          className="font-heading text-4xl uppercase tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title || "Projects"}
        </h1>
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-4 h-1 w-[140px] bg-white sm:w-[180px]"
        />
        {/* {subheading && (
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-4 max-w-xl text-white/90"
          >
            {subheading}
          </p>
        )} */}
      </Container>
    </section>
  );
}
