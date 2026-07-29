import { Container } from "@/components/ui/Container";

export function AboutSection({
  image_url,
  image_alt = "NBRS project — building exterior",
  background_color,
  heading = "Designing Environments That Shape Lives",
  description = "Working collaboratively with clients and communities to create enduring, human-centred places",
}: {
  image_url: string;
  image_alt?: string;
  background_color?: string;
  heading?: string;
  description?: string;
}) {
  return (
    <section className="section-about flex flex-col lg:flex-row lg:pb-[100px] pb-8 bg-[#FFFFFF] ">
      <div
        className={`w-full h-full bg-[#070F0F]`}
      >
        {background_color && <div className="h-3 w-full" style={{ backgroundColor: background_color }} />}
        <Container className="flex flex-col lg:flex-row relative">
          <div className="flex flex-col justify-center gap-6  pr-5 py-16 lg:w-2/5  lg:pt-24 lg:pb-60 lg:max-w-[315px]">
            <h2
              data-aos="fade-up"
              className="font-heading text-4xl leading-[1.05] uppercase text-white sm:text-[40px]"
            >
              {heading}
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-md text-white/70">
              {description}
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="lg:absolute relative image-about__wrapper lg:top-0 lg:right-[55px] 2xl:right-[135px] h-80 sm:h-96 lg:w-[65%] 2xl:w-[55%] image__wrapper"
          >
            <img
              src={image_url}
              alt={image_alt}
              className="absolute inset-0 h-full w-full object-cover image-about"
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
