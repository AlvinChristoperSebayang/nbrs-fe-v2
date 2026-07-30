import { Container } from "@/components/ui/Container";

export type CareersHeroProps = {
  title?: React.ReactNode;
  role?: string;
  location?: string;
  registration?: string;
  description?: React.ReactNode;
  imageSrc?: string;
};

export function CareersHero({
  title = (
    <>
      CAREERS
      <br />
      AT NBRS
    </>
  ),
  role,
  location,
  registration,
  description,
  imageSrc = "/images/hero/hero4.png",
}: CareersHeroProps) {
  return (
    <section className="relative bg-[#0B131F] text-white h-full lg:h-[650px] mb-0 lg:mb-32 overflow-visible">
      {/* Background Dimmed Image on Right Side */}
      <div className="absolute top-0 right-0 w-full lg:w-[948px] h-full lg:h-[650px] overflow-hidden pointer-events-none z-0 hidden lg:block">
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover filter brightness-[0.35] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B131F] via-[#0B131F]/80 to-transparent" />
      </div>

      <Container className="relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[520px] lg:h-[650px] relative">
          {/* Left Column: Title, White Bar, Attributes & Optional Description */}
          <div
            data-aos="fade-up"
            className="lg:col-span-5 flex flex-col items-start gap-4 lg:gap-6 pt-24 pb-4 lg:pt-0 lg:pb-0"
          >
            <div className="inline-block border-b-4 border-white pb-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[64px] font-bold uppercase tracking-wide leading-none text-white">
                {title}
              </h1>
            </div>

            {/* Additional Attributes: Jabatan, Location/Tempat, Registration */}
            {(role || location || registration) && (
              <div className="flex flex-col gap-2 font-sans text-white/90">
                {role && (
                  <span className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-rose-200">
                    {role}
                  </span>
                )}
                {location && (
                  <div className="flex items-center gap-2 text-base sm:text-lg text-white/80 font-medium">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-rose-300"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{location}</span>
                  </div>
                )}
                {registration && (
                  <span className="text-xs sm:text-sm text-white/70 italic mt-0.5">
                    {registration}
                  </span>
                )}
              </div>
            )}

            {description && (
              <div className="font-sans text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
                {description}
              </div>
            )}
          </div>

          {/* Right Column: Main Sharp Image Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="lg:col-span-7 flex justify-end w-full"
          >
            <div className="relative w-[calc(100%+1rem)] sm:w-[calc(100%+1.5rem)] lg:w-[770px] min-h-[440px] h-[440px] sm:h-[500px] lg:h-[570px] rounded-[3px] overflow-hidden z-30 transform lg:translate-y-28 border border-white/10 -mr-6 lg:mr-0">
              <img
                src={imageSrc}
                alt="NBRS Featured Hero"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>

      <div className="md:hidden">
        <div className="bg-white py-14 absolute w-full bottom-0"></div>
      </div>
    </section>
  );
}
