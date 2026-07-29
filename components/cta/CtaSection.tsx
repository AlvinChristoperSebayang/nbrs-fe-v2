import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Container } from "@/components/ui/Container";
import type { CtaContent } from "@/lib/types";

export function CtaSection({ content }: { content: CtaContent }) {

  return (
    <section className="relative overflow-hidden">
      <ResponsiveImage
        src={content.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        priority
      />
      {/* <div className="absolute inset-0 bg-black/20" /> */}
      <Container className="relative flex items-center justify-center py-24 sm:py-32 lg:py-[116px]">
        <div className="w-full border-t-[4px] border-white bg-black/35 px-[8px] py-10 text-center sm:px-[8px] sm:py-14 lg:py-[100px]">
          <h2 className="font-heading text-[28px] lg:text-2xl uppercase tracking-tight text-white sm:text-4xl lg:text-[40px]">
            {content.title}
          </h2>

          {content.description && (
            <p className="mx-auto mt-4 max-w-xl text-white/90">
              {content.description}
            </p>
          )}

          {content.buttonText && content.buttonHref && (
            <Link
              href={content.buttonHref}
              className="group mt-5 inline-flex items-center gap-2 rounded-full bg-white lg:px-[48px] p-[18px] lg:py-[26px]  text-[14px] lg:text-xl text-[#B4521E] transition hover:bg-white/90 uppercase "
            >
              {content.buttonText}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 7.72388L0 7.72388M6.66725 14.7236L14 7.72388L6.66725 0.723633" stroke="#D18148" strokeWidth="2"/>
            </svg>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
