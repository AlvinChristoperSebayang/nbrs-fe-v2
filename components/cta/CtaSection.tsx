import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Container } from "@/components/ui/Container";
import type { CtaContent } from "@/lib/types";

export type CtaSectionProps = {
  content?: CtaContent;
  cta?: CtaContent;
};

export function CtaSection({ content, cta }: CtaSectionProps) {
  const data = content || cta;

  if (!data) return null;

  return (
    <section className="relative overflow-hidden">
      <ResponsiveImage
        src={data.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        priority
      />
      <Container className="relative flex items-center justify-center py-24 sm:py-32 lg:py-[116px]">
        <div data-aos="fade-up" className="w-full border-t-[4px] border-white bg-black/35 px-[8px] py-10 text-center sm:px-[8px] sm:py-14 lg:py-[100px]">
          <h2 className="font-heading text-[28px] lg:text-2xl uppercase tracking-tight text-white sm:text-4xl lg:text-[40px]">
            {data.title}
          </h2>

          {data.description && (
            <p className="mx-auto mt-4 max-w-xl text-white/90">
              {data.description}
            </p>
          )}

          {data.buttonText && data.buttonHref && (
            <Link
              href={data.buttonHref}
              className="group mt-5 inline-flex items-center gap-2 rounded-full bg-white lg:px-[48px] p-[18px] lg:py-[26px] text-[14px] lg:text-xl text-[#B4521E] transition hover:bg-white/90 uppercase"
            >
              {data.buttonText}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
              className="group mt-3 inline-flex items-center gap-2 text-[14px] uppercase text-white transition-opacity hover:opacity-80"
            >
              {data.secondaryButtonText}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
      </Container>
    </section>
  );
}
