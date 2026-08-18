import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type DesignApproachProjectSectionProps = {
  heading: string;
  description: string;
  image: ImageSource;
  buttonText?: string;
  buttonHref?: string;
};

export function DesignApproachProjectSection({
  heading,
  description,
  image,
  buttonText,
  buttonHref,
}: DesignApproachProjectSectionProps) {
  return (
    <section className="relative w-full overflow-hidden py-16 lg:py-24 bg-white text-black lg:pb-[94px]">
      {/* Mobile Overlay Background Image (< lg) */}
      <div className="absolute inset-0 lg:hidden">
        <ResponsiveImage
          src={image}
          alt={heading || "Design Approach"}
          title={heading || "Design Approach"}
          className="h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      <Container className="relative z-10">
        {/* Mobile Layout (< lg) */}
        <div data-aos="fade-up" className="flex flex-col items-start text-white py-6 lg:hidden">
          <h2 className="font-heading text-3xl sm:text-4xl uppercase font-bold text-white leading-tight mb-4">
            {heading}
          </h2>
          <p className="text-sm sm:text-base text-white/90 font-sans leading-relaxed mb-6 max-w-xl">
            {description}
          </p>
          {buttonText && buttonHref && (
            <Link
              href={buttonHref}
              title={buttonText}
              aria-label={buttonText}
              className="group inline-flex items-center gap-2 rounded-[5px] bg-white/30 backdrop-blur-md border border-white/30 px-6 py-2.5 text-sm font-sans font-medium text-white transition hover:bg-white/40"
            >
              <span>{buttonText}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M14 7.72388L0 7.72388M6.66725 14.7236L14 7.72388L6.66725 0.723633"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* Desktop Layout (>= lg) */}
        <div className="hidden lg:flex relative items-center">
          {/* Overlapping Glass Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="z-10 w-[50%] bg-white/80 backdrop-blur-md border border-[#FDFFEA] p-10 absolute left-0 top-1/2 -translate-y-1/2"
          >
            <h2 className="font-heading text-3xl lg:text-[32px] uppercase font-bold text-black leading-tight mb-4">
              {heading}
            </h2>
            <p className="text-base text-zinc-900 leading-relaxed font-sans mb-6">
              {description}
            </p>
            {buttonText && buttonHref && (
              <Link
                href={buttonHref}
                title={buttonText}
                aria-label={buttonText}
                className="group inline-flex items-center gap-2 rounded-[5px] border border-black bg-white px-6 py-2.5 text-base font-sans font-medium text-black transition hover:bg-black hover:text-white"
              >
                <span>{buttonText}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M14 7.72388L0 7.72388M6.66725 14.7236L14 7.72388L6.66725 0.723633"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            )}
          </div>

          {/* Desktop Image Banner (max-h 410px) */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="w-[65%] ml-auto overflow-hidden h-[410px] max-h-[410px]"
          >
            <ResponsiveImage
              src={image}
              alt={heading || "Design Approach"}
              title={heading || "Design Approach"}
              className="h-[410px] max-h-[410px] w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
