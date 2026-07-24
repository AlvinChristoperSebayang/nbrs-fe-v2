import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { CtaContent } from "@/lib/types";

export function CtaSection({ cta }: { cta: CtaContent[] }) {
  const [content] = cta;

  return (
    <section className="relative overflow-hidden">
      <img
        src={content.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* <div className="absolute inset-0 bg-black/20" /> */}
      <Container className="relative flex items-center justify-center py-24 sm:py-32 lg:py-[116px]">
        <div className="w-full border-t-[4px] border-white bg-black/35 px-6 py-10 text-center sm:px-12 sm:py-14 lg:py-[100px]">
          <h2 className="font-heading text-lg lg:text-2xl uppercase tracking-tight text-white sm:text-4xl lg:text-[40px]">
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
              className="group mt-5 inline-flex items-center gap-2 rounded-full bg-white px-[48px] py-[26px]  text-sm lg:text-xl text-[#B4521E] transition hover:bg-white/90 uppercase "
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
