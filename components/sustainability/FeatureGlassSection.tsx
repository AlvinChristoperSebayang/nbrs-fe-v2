import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type FeatureGlassSectionProps = {
  title: string;
  paragraphs: string[];
  image: ImageSource;
  imageAlt?: string;
  reverse?: boolean;
  buttonText?: string;
  buttonHref?: string;
};

export function FeatureGlassSection({
  title,
  paragraphs,
  image,
  imageAlt = "",
  reverse = false,
  buttonText,
  buttonHref,
}: FeatureGlassSectionProps) {
  return (
    <section className="bg-white pb-12 lg:py-0 text-black lg:pb-24 xl:pb-[149px]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-0">
          {/* Overlapping Glass Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className={`z-10 w-full flex flex-col justify-between h-auto lg:h-[260px] xl:h-[310px] bg-white/40 backdrop-blur-[4px] border border-[#FDFFEA] pt-2 lg:pt-[28px] lg:pr-[20px] lg:pb-[32px] lg:pl-[28px] xl:pt-[28px] xl:pb-[32px] xl:pl-[32px] max-lg:mb-0 lg:row-start-1 lg:row-end-2 rounded-none ${
              reverse
                ? "order-1 lg:order-2 lg:col-start-7 lg:col-end-13"
                : "order-1 lg:order-1 lg:col-start-1 lg:col-end-7"
            }`}
          >
            {/* Div 1: Title & Description */}
            <div className="flex flex-col">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[24px] xl:text-[32px] uppercase font-bold text-black leading-none mb-3 lg:mb-2 xl:mb-3">
                {title}
              </h2>
              <div className="flex flex-col gap-3 lg:gap-2 xl:gap-3 text-sm sm:text-base lg:text-[12px] xl:text-base text-zinc-900 leading-relaxed font-sans">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Div 2: Optional Action Button */}
            {buttonText && buttonHref && (
              <div className="mt-5 lg:mt-3 xl:mt-0">
                <Link
                  href={buttonHref}
                  title={buttonText}
                  aria-label={buttonText}
                  className="group inline-flex items-center gap-2 rounded-[5px] border border-black px-4 py-1.5 text-xs lg:px-4 lg:py-1.5 lg:text-xs xl:px-5 xl:py-2.5 xl:text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
                >
                  <span>{buttonText}</span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 xl:w-4 xl:h-4 transition-transform group-hover:translate-x-1"
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

          {/* Feature Image */}
          <div
            data-aos="fade-up"
            data-aos-delay="250"
            className={`w-full aspect-[3/2] lg:aspect-[77/41] overflow-hidden bg-zinc-100 lg:row-start-1 lg:row-end-2 rounded-none ${
              reverse
                ? "order-2 lg:order-1 lg:col-start-1 lg:col-end-9"
                : "order-2 lg:order-2 lg:col-start-5 lg:col-end-13"
            }`}
          >
            <ResponsiveImage
              src={image}
              alt={imageAlt || title}
              title={imageAlt || title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
