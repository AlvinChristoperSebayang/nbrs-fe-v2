import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type ProjectDetailHeroProps = {
  title: string;
  subheading?: string | null;
  sectorLabel?: string | null;
  practiceLabel?: string | null;
  image?: ImageSource | null;
  location?: string | null;
  client?: string | null;
  collaborators?: string | null;
};

function getProjectTitleLines(title: string): string[] {
  if (title.includes("\n")) {
    return title.split("\n").map((l) => l.trim()).filter(Boolean);
  }

  const words = title.trim().split(/\s+/);
  if (words.length <= 3) {
    return [title.trim()];
  }

  if (words.length <= 5) {
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  }

  return [
    words.slice(0, 2).join(" "),
    words.slice(2, 4).join(" "),
    words.slice(4).join(" "),
  ];
}

function renderProjectTitle(title: string) {
  const lines = getProjectTitleLines(title);

  if (lines.length <= 1) {
    return (
      <span className="inline-block w-fit border-b-[4px] sm:border-b-[6px] lg:border-b-[8px] border-white pb-1 sm:pb-2 leading-none">
        {lines[0]}
      </span>
    );
  }

  const firstLines = lines.slice(0, -1);
  const lastLine = lines[lines.length - 1];

  return (
    <span className="inline-flex flex-col items-start w-fit">
      {firstLines.map((line, idx) => (
        <span key={idx} className="block leading-[1.05]">
          {line}
        </span>
      ))}
      <span className="inline-block w-fit border-b-[4px] sm:border-b-[6px] lg:border-b-[8px] border-white pb-1 sm:pb-2 leading-none mt-1">
        {lastLine}
      </span>
    </span>
  );
}

export function ProjectDetailHero({
  title,
  subheading,
  sectorLabel,
  practiceLabel,
  image,
  location,
  client,
  collaborators,
}: ProjectDetailHeroProps) {
  return (
    <section>
      <div className="bg-black text-white pt-16 sm:pt-0 lg:pt-[140px]">
        <Container className="pt-4 sm:pt-8 pb-12 sm:pb-24 lg:pb-28">
          <div className="flex flex-col w-fit">
            <h1
              data-aos="fade-up"
              className="font-heading mt-6 sm:mt-12 text-[38px] uppercase tracking-tight sm:text-[38px] lg:text-[70px] leading-[1]"
            >
              {renderProjectTitle(title)}
            </h1>
          </div>
          {subheading && (
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-5 lg:text-[20px] text-[16px] font-semibold"
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

      <Container className="lg:-mt-[60px] overflow-hidden">
        {image && (
          <figure
            
            className="uncontainer-mobile overflow-hidden"
          >
            <ResponsiveImage
              src={image}
              alt={title}
              title={title}
              className="lg:aspect-[16/10] max-md:min-h-[438px] w-full object-cover"
            />
          </figure>
        )}

        {(location || client || collaborators) && (
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
            {location && (
              <div data-aos="fade-up" data-aos-delay="100" className="lg:pr-6">
                <p className="font-heading text-[16px] lg:text-[30px] uppercase">Location:</p>
                <p className="mt-1 text-black text-[16px] lg:text-[22px]">{location}</p>
              </div>
            )}
            <div className="hidden h-[81px] w-[1px] bg-[#A7A7A7] lg:block" />
            {client && (
              <div data-aos="fade-up" data-aos-delay="200" className="lg:px-6">
                <p className="font-heading text-[16px] lg:text-[30px] uppercase">Client:</p>
                <p className="mt-1 text-black text-[16px] lg:text-[22px]">{client}</p>
              </div>
            )}
            <div className="hidden h-[81px] w-[1px] bg-[#A7A7A7] lg:block" />

            {collaborators && (
              <div data-aos="fade-up" data-aos-delay="300" className="lg:pl-6">
                <p className="font-heading text-[16px] lg:text-[30px] uppercase">Collaborators:</p>
                <p className="mt-1 text-black text-[16px] lg:text-[22px]">{collaborators}</p>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
