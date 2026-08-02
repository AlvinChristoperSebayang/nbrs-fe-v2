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
    <section className="bg-white py-12 lg:py-0 text-black lg:pb-[94px]">
      <Container>
        <div className="relative flex flex-col lg:flex-row items-center">
          {/* Overlapping Glass Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className={`z-10 w-full lg:w-[50%] bg-white/80 backdrop-blur-md border border-[#FDFFEA] p-6 lg:p-10 max-lg:mb-6 shadow-sm ${
              reverse
                ? "lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
                : "lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2"
            }`}
          >
            <h3 className="font-heading text-3xl lg:text-4xl uppercase font-bold text-black leading-tight mb-4">
              {title}
            </h3>
            <div className="flex flex-col gap-4 text-base text-zinc-900 leading-relaxed font-sans">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Optional Action Button */}
            {buttonText && buttonHref && (
              <div className="mt-6">
                <Link
                  href={buttonHref}
                  className="group inline-flex items-center gap-2 rounded-[5px] border border-black px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
                >
                  <span>{buttonText}</span>
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

          {/* Feature Image */}
          <div
            data-aos="fade-up"
            data-aos-delay="250"
            className={`w-full lg:w-[68%] aspect-[16/10] overflow-hidden bg-zinc-100 ${
              reverse ? "lg:mr-auto" : "lg:ml-auto"
            }`}
          >
            <ResponsiveImage
              src={image}
              alt={imageAlt || title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
