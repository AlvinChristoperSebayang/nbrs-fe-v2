import { Container } from "@/components/ui/Container";

export type SingleTeamBioProps = {
  name: string;
  bioHtml: string | null;
  quote?: string;
};

export function SingleTeamBioSection({ name, bioHtml, quote }: SingleTeamBioProps) {
  const nameParts = name.split(" ");
  const firstName = nameParts[0] || name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <section className="bg-white pt-6 pb-16 lg:pt-10 lg:pb-24 text-black">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Light Gray Watermark Name & Divider */}
          <div data-aos="fade-up" className="lg:col-span-5 lg:sticky lg:top-28 hidden md:block lg:pr-6">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-[60px] font-bold uppercase text-zinc-200/90 leading-none tracking-wide">
              {lastName ? (
                <span className="inline-flex flex-col items-start">
                  <span className="block">{firstName}</span>
                  <span className="inline-block border-b-4 border-zinc-200/90 pb-2 mt-1">
                    {lastName}
                  </span>
                </span>
              ) : (
                <span className="inline-block border-b-4 border-zinc-200/90 pb-2">
                  {firstName}
                </span>
              )}
            </h2>
          </div>

          {/* Right Column: Bio Paragraphs & Rose Quote Section */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="lg:col-span-7 flex flex-col gap-10 lg:gap-14"
          >
            {/* Top Bio Text Paragraphs */}
            {bioHtml && (
              <div
                className="font-sans text-base sm:text-lg text-zinc-800 leading-relaxed max-w-3xl [&_a]:underline [&_a]:underline-offset-4 [&_p]:mb-5 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: bioHtml }}
              />
            )}

            {/* Bottom Pull Quote Stage with Rose Quote Marks */}
            {quote && (
              <div className="relative flex flex-col gap-3 pt-6 max-w-3xl">
                {/* Top Left Rose Quote SVG */}
                <div className="text-[#F0C7BD] w-14 h-10 flex items-center justify-start">
                  <svg
                    width="44"
                    height="32"
                    viewBox="0 0 44 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 32V18.2857L9.42857 0H18.8571L11.7857 16H18.8571V32H0ZM25.1429 32V18.2857L34.5714 0H44L36.9286 16H44V32H25.1429Z"
                      fill="#F0C7BD"
                    />
                  </svg>
                </div>

                {/* Quote Text */}
                <blockquote className="font-sans italic text-2xl sm:text-3xl lg:text-[32px] text-black leading-snug font-normal py-2">
                  {quote}
                </blockquote>

                {/* Bottom Right Rose Quote SVG */}
                <div className="text-[#F0C7BD] w-14 h-10 flex items-center justify-end self-end">
                  <svg
                    width="44"
                    height="32"
                    viewBox="0 0 44 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M44 0V13.7143L34.5714 32H25.1429L32.2143 16H25.1429V0H44ZM18.8571 0V13.7143L9.42857 32H0L7.07143 16H0V0H18.8571Z"
                      fill="#F0C7BD"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
