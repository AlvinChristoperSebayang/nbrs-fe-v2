import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type GreenStarSectionProps = {
  heading?: string;
  description?: string;
  image?: ImageSource;
};

function GreenStarBadge({ role, className }: { role: string; className: string }) {
  return (
    <div className={`bg-white p-5 sm:p-6 border border-gray-100 transition-transform hover:-translate-y-1 ${className}`}>
      <div className="flex items-center gap-3.5">
        <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <circle cx="50" cy="22" r="18" fill="#84BD00" />
          <circle cx="78" cy="50" r="18" fill="#84BD00" />
          <circle cx="50" cy="78" r="18" fill="#84BD00" />
          <circle cx="22" cy="50" r="18" fill="#84BD00" />
          <path d="M50 32L68 50L50 68L32 50Z" fill="white" />
        </svg>
        <div className="flex flex-col">
          <span className="font-bold text-xl sm:text-2xl text-black leading-none tracking-tight">
            green<span className="font-black">star</span>
          </span>
          <span className="text-[11px] sm:text-xs text-black/80 font-medium tracking-wide mt-1">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

export function GreenStarSection({
  heading = "Green Star Accredited Professionals",
  description = "Our multidisciplinary team embeds GBCA principles to realise sustainable, holistic design outcomes.",
  image,
}: GreenStarSectionProps) {
  return (
    <section className="bg-white pb-8 sm:pb-8 lg:pb-20 lg:pt-20 text-black overflow-hidden">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16 max-w-6xl mx-auto">
          {/* Text Column: 1st on Mobile, 2nd on Desktop */}
          <div
            data-aos="fade-up"
            className="w-full flex flex-col gap-4 text-left lg:w-1/2 lg:order-2"
          >
            <h2 className="font-heading text-3xl uppercase leading-[1.1] text-black sm:text-4xl lg:text-[44px]">
              {heading}
            </h2>
            <p className="text-base text-black/80 sm:text-lg leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          {/* Image Column: 2nd on Mobile (below text), 1st on Desktop (left column) */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="w-full flex justify-center lg:w-1/2 lg:justify-start lg:order-1"
          >
            {image ? (
              <ResponsiveImage
                src={image}
                alt={heading}
                title={heading}
                className="w-full max-w-[480px] sm:max-w-[540px] object-contain"
              />
            ) : (
              <div className="relative w-full max-w-[480px] h-[240px] sm:h-[280px] flex items-center justify-center my-2 sm:my-4">
                <GreenStarBadge
                  role="Accredited Professional"
                  className="absolute top-0 left-0 sm:left-2 z-10 w-[260px] sm:w-[320px]"
                />
                <GreenStarBadge
                  role="Associate"
                  className="absolute bottom-0 right-0 sm:right-2 z-20 w-[260px] sm:w-[320px]"
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

