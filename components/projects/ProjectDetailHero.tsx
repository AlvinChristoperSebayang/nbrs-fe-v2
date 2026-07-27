import { Container } from "@/components/ui/Container";

export function ProjectDetailHero({
  title,
  subheading,
  sectorLabel,
  practiceLabel,
  image,
  location,
  client,
  collaborators,
}: {
  title: string;
  subheading?: string | null;
  sectorLabel?: string | null;
  practiceLabel?: string | null;
  image?: string | null;
  location?: string | null;
  client?: string | null;
  collaborators?: string | null;
}) {
  return (
    <section>
      <div className="bg-black text-white lg:pt-[160px]">
        <Container className="pt-8 pb-40 sm:pb-48 lg:pb-56">
          <div className="flex flex-col w-fit">
            <h1
              data-aos="fade-up"
              className="font-heading mt-16 text-[38px] uppercase tracking-tight sm:text-[38px] lg:text-[70px] lg:leading-[0.7] leading-[1]"
            >
              {title}
            </h1>
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="mt-4 lg:h-2 h-1 w-full origin-left bg-white"
            />
          </div>
          {subheading && (
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-6 lg:text-[20px] text-[16px] font-semibold"
            >
              {subheading}
            </p>
          )}

          {(sectorLabel || practiceLabel) && (
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-2 text-[16px] text-[#FFD6CD]"
            >
              {[sectorLabel, practiceLabel].filter(Boolean).join(" | ")}
            </p>
          )}
        </Container>
      </div>

      <Container className="lg:-mt-[104px] overflow-hidden">
        {image && (
          <figure
            
            className="uncontainer-mobile overflow-hidden"
          >
            <img
              src={image}
              alt={title}
              data-aos="zoom-out"
              data-aos-delay="150"
              className="lg:aspect-[16/10] max-md:min-h-[438px] w-full object-cover"
            />
          </figure>
        )}

        {(location || client || collaborators) && (
          <div className="mt-8 flex items-start justify-between max-md:gap-5 lg:flex-row flex-col ">
            {location && (
              <div data-aos="fade-up" data-aos-delay="100" className="sm:pr-6">
                <p className="font-heading lg:text-[30px] text-[16px] uppercase">Location:</p>
                <p className="mt-1 text-black lg:text-[22px] text-[16px]">{location}</p>
              </div>
            )}
            <div className="w-[1px] h-[81px] bg-[#A7A7A7] lg:flex hidden"/>
            {client && (
              <div data-aos="fade-up" data-aos-delay="200" className="sm:px-6">
                <p className="font-heading lg:text-[30px] text-[16px] uppercase">Client:</p>
                <p className="mt-1 text-black lg:text-[22px] text-[16px]">{client}</p>
              </div>
            )}
            <div className="w-[1px] h-[81px] bg-[#A7A7A7] lg:flex hidden"/>

            {collaborators && (
              <div data-aos="fade-up" data-aos-delay="300" className="sm:pl-6">
                <p className="font-heading lg:text-[30px] text-[16px] uppercase">Collaborators:</p>
                <p className="mt-1 text-black lg:text-[22px] text-[16px]">{collaborators}</p>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
