import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Container } from "@/components/ui/Container";
import type { CtaContent } from "@/lib/types";

export type CtaSectionProps = {
  content?: CtaContent;
  cta?: CtaContent;
  titleUppercase?: boolean;
};

export function CtaSection({ content, cta, titleUppercase = true }: CtaSectionProps) {
  const data = content || cta;

  if (!data) return null;

  const descriptionText = data.description
    ? data.description.replace(/Let\?\?\?s/gi, "Let's").replace(/\?\?\?/g, "'")
    : null;

  return (
    <section className="relative overflow-hidden">
      <ResponsiveImage
        src={data.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        priority
      />
      <Container className="relative flex items-center justify-center py-24 sm:py-32 lg:py-[116px]">
        <div data-aos="fade-up" className="w-full border-t-[4px] border-white bg-black/35 px-4 py-10 text-center sm:px-8 sm:py-14 lg:py-[100px]">
          <h2 className={`font-heading text-[28px] lg:text-2xl tracking-tight text-white sm:text-4xl lg:text-[40px] ${titleUppercase ? "uppercase" : ""}`}>
            {data.title}
          </h2>

          {descriptionText && (
            <p className="mx-auto mt-3 max-w-xl text-white/90 text-sm sm:text-base">
              {descriptionText}
            </p>
          )}

          <div className="flex flex-col items-center justify-center gap-4 mt-6">
            {data.buttonText && data.buttonHref && (
              <Link
                target={data.buttonHref.startsWith("http") ? "_blank" : undefined}
                href={data.buttonHref}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 sm:px-10 sm:py-4 text-base sm:text-[20px] font-semibold text-[#D18148] transition hover:bg-white/90 uppercase"
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