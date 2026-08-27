import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Container } from "@/components/ui/Container";
import type { CtaContent } from "@/lib/types";

export type CtaSectionProps = {
  content?: CtaContent;
  cta?: CtaContent;
  titleUppercase?: boolean;
  descriptionClassName?: string;
  imageClassName?: string;
  /** CTA sections are normally below the fold; opt in only when it is an LCP image. */
  priority?: boolean;
};

export function CtaSection({
  content,
  cta,
  titleUppercase = true,
  descriptionClassName,
  imageClassName,
  priority = false,
}: CtaSectionProps) {
  const data = content || cta;

  if (!data) return null;

  const descriptionText = data.description
    ? data.description.replace(/Let\?\?\?s/gi, "Let's").replace(/\?\?\?/g, "'")
    : null;

  return (
    <section className="relative overflow-hidden">
      <ResponsiveImage
        src={data.image}
        alt={data.title || "NBRS Call to Action"}
        title={data.title || "NBRS Call to Action"}
        className={`absolute inset-0 h-full w-full object-cover ${imageClassName ?? ""}`}
        priority={priority}
        width={2400}
        height={1000}
      />
      <Container className="relative flex min-h-[588px] items-center justify-center py-10 sm:min-h-0 sm:py-20 lg:py-24">
        <div
          data-aos="fade-up"
          suppressHydrationWarning
          className="w-full min-h-[340px] flex flex-col items-center justify-center border-t-[4px] border-white bg-black/35 px-4 py-8 sm:px-8 md:px-12 text-center rounded-[5px] backdrop-blur-[2px]"
        >
          <h2 className={`font-heading text-[28px] sm:text-3xl lg:text-[40px] tracking-tight text-white ${titleUppercase ? "uppercase" : ""}`}>
            {data.title}
          </h2>

          {descriptionText && (
            <p className={`mx-auto mt-2 max-w-xl text-white/90 text-sm sm:text-base ${descriptionClassName ?? ""}`}>
              {descriptionText}
            </p>
          )}

          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
            {data.buttonText && data.buttonHref && (
              <Link
                target={data.buttonHref.startsWith("http") ? "_blank" : undefined}
                href={data.buttonHref}
                title={data.buttonText}
                aria-label={data.buttonText}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-3 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-[20px] font-normal text-[#D18148] transition hover:bg-white/90 uppercase"
              >
                <span>{data.buttonText}</span>
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
                    stroke="#D18148"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            )}

            {data.secondaryButtonText && data.secondaryButtonHref && (
              <Link
                href={data.secondaryButtonHref}
                title={data.secondaryButtonText}
                aria-label={data.secondaryButtonText}
                className="group inline-flex items-center justify-center gap-2 text-xs sm:text-[20px] uppercase tracking-wider text-white/90 transition-opacity hover:opacity-100 font-medium mt-1"
              >
                <span>{data.secondaryButtonText}</span>
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
        </div>
      </Container>
    </section>
  );
}
