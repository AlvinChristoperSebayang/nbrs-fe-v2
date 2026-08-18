import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import Link from "next/link";
import type { ImageSource } from "@/lib/types";

function renderAboutHeading(heading: string) {
  if (heading.includes("\n")) {
    const lines = heading.split("\n").map((l) => l.trim()).filter(Boolean);
    return (
      <span className="inline-flex flex-col items-start">
        {lines.map((line, idx) => (
          <span key={idx} className="block leading-[1.05]">
            {line}
          </span>
        ))}
      </span>
    );
  }

  const words = heading.trim().split(/\s+/);
  let lines: string[] = [];

  if (words.length >= 4) {
    lines = [words[0], words[1], words.slice(2).join(" ")];
  } else {
    lines = words;
  }

  return (
    <span className="inline-flex flex-col items-start">
      {lines.map((line, idx) => (
        <span key={idx} className="block leading-[1.05]">
          {line}
        </span>
      ))}
    </span>
  );
}

export function AboutSection({
  image_url,
  image_alt = "NBRS project — building exterior",
  background_color,
  heading = "Designing Environments That Shape Lives",
  description = "Working collaboratively with clients and communities to create enduring, human-centred places",
  button,
  heading_size = "text-[28px] sm:text-[40px]",
}: {
  image_url: ImageSource;
  image_alt?: string;
  background_color?: string;
  heading?: string;
  description?: string;
  button?: {
    text: string;
    href: string;
  };
  heading_size?: string;
}) {
  return (
    <section className="section-about bg-white pb-0 lg:pb-24">
      <div className="w-full bg-[#070F0F] relative">
        {background_color && <div className="h-3 w-full" style={{ backgroundColor: background_color }} />}
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-[30px] items-start pt-12 pb-0 lg:pt-24 lg:pb-28">
            <div className="lg:col-span-4 flex flex-col justify-center gap-6 text-white">
              <h2
                data-aos="fade-up"
                className={`font-heading ${heading_size} leading-[1.05] uppercase text-white`}
              >
                {renderAboutHeading(heading)}
              </h2>
              <p data-aos="fade-up" data-aos-delay="150" className="max-w-md text-white/90">
                {description}
              </p>
              {button && (
                <div data-aos="fade-up" data-aos-delay="200" className="mt-1">
                  <Link
                    href={button.href}
                    className="group inline-flex items-center gap-2.5 rounded-[5px] bg-[#454B4B] hover:bg-[#575E5E] px-5 py-3 text-sm font-medium text-white transition-colors"
                  >
                    <span>{button.text}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M1 8H15M15 8L8 1M15 8L8 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="lg:col-span-8 relative w-[calc(100%+2.5rem)] sm:w-[calc(100%+3rem)] lg:w-full -mx-5 sm:-mx-6 lg:mx-0 h-[320px] sm:h-[420px] lg:h-[580px] lg:-mt-24 lg:-mb-36 z-20 overflow-hidden"
            >
              <ResponsiveImage
                src={image_url}
                alt={image_alt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
