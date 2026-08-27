import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import Link from "next/link";
import type { ImageSource } from "@/lib/types";

export type AboutSectionProps = {
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
  description_class_name?: string;
  single_line_heading?: boolean;
  image_height_class_name?: string;
  image_container_class_name?: string;
  image_class_name?: string;
};

function renderAboutHeading(heading: string, singleLine = false) {
  if (singleLine) {
    return <span className="block leading-[1.05] whitespace-nowrap">{heading}</span>;
  }

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
  const lines = words.length >= 4 ? [words[0], words[1], words.slice(2).join(" ")] : words;

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

function renderAboutDescription(description: string, className?: string) {
  const normalised = description.replace(/\\n/g, "\n").replace(/\r\n?/g, "\n");
  const isRichText = /<\/?[a-z][\s\S]*>/i.test(normalised);
  const baseClasses = className ? `text-white/90 ${className}` : "max-w-md text-white/90";
  const richClasses = `${baseClasses} [&_p]:mb-3 [&_p:last-child]:mb-0 [&_a]:underline [&_a]:underline-offset-2 [&_li]:ml-5 [&_ol]:list-decimal [&_ul]:list-disc`;

  if (isRichText) {
    return (
      <div
        data-aos="fade-up"
        data-aos-delay="150"
        className={richClasses}
        dangerouslySetInnerHTML={{ __html: normalised }}
      />
    );
  }

  const paragraphs = normalised.split(/\n\s*\n/).filter(Boolean);
  if (paragraphs.length > 1) {
    return (
      <div
        data-aos="fade-up"
        data-aos-delay="150"
        className={`${baseClasses} space-y-3`}
      >
        {paragraphs.map((p, idx) => (
          <p key={idx} className="leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    );
  }

  return (
    <p
      data-aos="fade-up"
      data-aos-delay="150"
      className={baseClasses}
    >
      {normalised}
    </p>
  );
}

export function AboutSection({
  image_url,
  image_alt = "NBRS project — building exterior",
  background_color,
  heading = "Designing Environments That Shape Lives",
  description = "Working collaboratively with clients and communities to create enduring, human-centred places",
  button,
  heading_size = "text-[28px] sm:text-[34px] xl:text-[40px]",
  description_class_name,
  single_line_heading = false,
  image_height_class_name,
  image_container_class_name,
  image_class_name,
}: AboutSectionProps) {
  const descriptionClassName = [
    "text-base leading-relaxed text-white/90",
    "[&_p]:m-0 [&_p+p]:mt-4",
    "[&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white",
    "[&_strong]:font-semibold",
    "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5",
    "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5",
    description_class_name ?? "max-w-md",
  ].join(" ");

  return (
    <section className="section-about bg-white pb-5 lg:pb-16 xl:pb-24">
      <div className="w-full bg-[#070F0F] relative">
        {background_color && <div className="h-3 w-full" style={{ backgroundColor: background_color }} />}
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 xl:gap-[30px] items-start pt-12 pb-0 lg:pt-16 xl:pt-24 lg:pb-20 xl:pb-28">
            <div className="lg:col-span-4 flex flex-col justify-center gap-6 text-white">
              <h2
                data-aos="fade-up"
                className={`font-heading ${heading_size} leading-[1.05] uppercase text-white`}
              >
                {renderAboutHeading(heading, single_line_heading)}
              </h2>
              {renderAboutDescription(description, description_class_name)}
              {button && (
                <div data-aos="fade-up" data-aos-delay="200" className="mt-1">
                  <Link
                    href={button.href}
                    title={button.text}
                    aria-label={button.text}
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
              className={`lg:col-span-8 relative w-[calc(100%+2.5rem)] sm:w-[calc(100%+3rem)] lg:w-full -mx-5 sm:-mx-6 lg:mx-0 ${
                image_height_class_name ?? "h-[320px] sm:h-[420px] lg:h-[440px] xl:h-[580px] lg:-mt-16 xl:-mt-24 lg:-mb-32 xl:-mb-48"
              } z-20 overflow-hidden ${image_container_class_name ?? ""}`}
            >
              <ResponsiveImage
                src={image_url}
                alt={image_alt}
                className={`h-full w-full object-cover ${image_class_name ?? ""}`}
                width={1200}
                height={1200}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
