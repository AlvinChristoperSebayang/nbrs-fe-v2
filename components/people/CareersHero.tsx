import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type CareersHeroProps = {
  title?: React.ReactNode;
  role?: string;
  location?: string;
  registration?: string;
  description?: React.ReactNode;
  imageSrc?: ImageSource;
  imagePosition?: string;
  imageClassName?: string;
  imageContainerClassName?: string;
  titleColumnClassName?: string;
  titleClassName?: string;
  singleLine?: boolean;
};

function cleanTitleString(title: string): string {
  return title.split("|")[0].trim();
}

function getDesktopTitleLines(title: string): string[] {
  const cleaned = cleanTitleString(title);
  if (cleaned.includes("\n")) {
    return cleaned.split("\n").map((l) => l.trim()).filter(Boolean);
  }

  const words = cleaned.split(/\s+/);
  if (words.length <= 2) {
    return words;
  }

  if (words.length === 3) {
    return [words[0], words.slice(1).join(" ")];
  }

  return words;
}

function getMobileTitleLines(title: string): string[] {
  const cleaned = cleanTitleString(title);
  if (cleaned.includes("\n")) {
    const rawLines = cleaned.split("\n").map((l) => l.trim()).filter(Boolean);
    if (rawLines.length <= 3) return rawLines;
    return [rawLines.slice(0, 2).join(" "), ...rawLines.slice(2)];
  }

  const words = cleaned.split(/\s+/);
  if (words.length <= 3) {
    return getDesktopTitleLines(cleaned);
  }

  return [
    words.slice(0, words.length - 2).join(" "),
    words[words.length - 2],
    words[words.length - 1],
  ];
}

function renderTitleLines(lines: string[]) {
  if (lines.length === 1) {
    return (
      <span className="inline-block border-b-4 border-white pb-2 leading-none">
        {lines[0]}
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col items-start">
      {lines.map((line, idx) => {
        const isLast = idx === lines.length - 1;
        if (isLast) {
          return (
            <span
              key={idx}
              className="inline-block border-b-4 border-white pb-2 leading-none mt-1"
            >
              {line}
            </span>
          );
        }
        return (
          <span key={idx} className="block leading-[1.05]">
            {line}
          </span>
        );
      })}
    </span>
  );
}

export function renderCareersTitle(title: React.ReactNode, singleLine = false) {
  if (typeof title !== "string") {
    return (
      <span className="inline-block border-b-4 border-white pb-2 leading-none">
        {title}
      </span>
    );
  }

  if (singleLine) {
    return (
      <span className="inline-block border-b-4 border-white pb-2 leading-none whitespace-nowrap">
        {title}
      </span>
    );
  }

  const desktopLines = getDesktopTitleLines(title);
  const mobileLines = getMobileTitleLines(title);

  const isSame =
    desktopLines.length === mobileLines.length &&
    desktopLines.every((l, i) => l === mobileLines[i]);

  if (isSame) {
    return renderTitleLines(desktopLines);
  }

  return (
    <>
      <span className="lg:hidden">{renderTitleLines(mobileLines)}</span>
      <span className="hidden lg:inline">{renderTitleLines(desktopLines)}</span>
    </>
  );
}

export function CareersHero({
  title = "CAREERS\nAT NBRS",
  role,
  location,
  registration,
  description,
  imageSrc = "/images/hero/hero4.png",
  imagePosition = "object-center",
  imageClassName = "",
  imageContainerClassName = "",
  titleColumnClassName,
  titleClassName,
  singleLine = false,
}: CareersHeroProps) {
  const altTitle = typeof title === "string" ? title : "NBRS Careers";

  return (
    <section className="relative bg-[#0B131F] text-white h-full lg:h-[520px] xl:h-[660px] mb-8 sm:mb-12 lg:mb-20 xl:mb-28 overflow-visible">
      {/* Background Dimmed Image on Right Side */}
      <div className="absolute top-0 right-0 w-full lg:w-[800px] xl:w-[948px] h-full lg:h-[520px] xl:h-[660px] overflow-hidden pointer-events-none z-0 hidden lg:block">
        <ResponsiveImage
          src={imageSrc}
          alt={altTitle}
          title={altTitle}
          className={`h-full w-full object-cover ${imagePosition} filter brightness-[0.35] contrast-[1.1]`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B131F] via-[#0B131F]/80 to-transparent" />
      </div>

      <Container className="relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-12 items-center lg:items-start min-h-[480px] lg:h-full relative lg:pt-24 xl:pt-28">
          {/* Left Column: Title, White Bar, Attributes & Optional Description */}
          <div
            data-aos="fade-up"
            className={`lg:col-span-4 flex flex-col items-start gap-4 lg:gap-4 xl:gap-6 pt-24 pb-4 ${titleColumnClassName ?? "lg:pt-24 xl:pt-20"} lg:pb-0`}
          >
            <h1 className={`font-heading whitespace-pre-line ${titleClassName ?? "text-4xl sm:text-5xl lg:text-[38px] xl:text-[58px] 2xl:text-[70px]"} font-bold uppercase tracking-wide leading-none text-white`}>
              {renderCareersTitle(title, singleLine)}
            </h1>

            {/* Additional Attributes: Jabatan, Location/Tempat, Registration */}
            {(role || location || registration) && (
              <div className="flex flex-col gap-y-3 font-sans text-[#C9E5D2]">
                {role && (
                  <span className="text-lg sm:text-xl lg:text-lg xl:text-xl font-bold tracking-wide">
                    {role}
                  </span>
                )}
             
                {registration && (
                  <span className="text-xs sm:text-sm lg:text-sm xl:text-base mt-0.5">
                    Registration: {registration}
                  </span>
                )}

                {location && (
                  <div className="flex items-center gap-2 text-sm sm:text-base lg:text-sm xl:text-base text-white/80 font-medium">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{location}</span>
                  </div>
                )}
              </div>
            )}

            {description && (
              <div className="font-sans whitespace-pre-line text-base lg:text-[13.5px] xl:text-[16px] 2xl:text-lg text-white/90 leading-relaxed max-w-xl">
                {description}
              </div>
            )}
          </div>

          {/* Right Column: Main Sharp Image Card */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="lg:col-span-8 flex justify-start w-full"
          >
            <div className={`relative w-[calc(100%+1rem)] sm:w-[calc(100%+1.5rem)] lg:w-full min-h-[380px] sm:min-h-[440px] h-[380px] sm:h-[480px] lg:h-[460px] xl:h-[580px] overflow-hidden z-30 transform lg:transform-none border border-white/10 -mr-6 lg:mr-0 ${imageContainerClassName}`}>
              <ResponsiveImage
                src={imageSrc}
                alt="NBRS Featured Hero"
                title="NBRS Featured Hero"
                className={`h-full w-full object-cover ${imagePosition} ${imageClassName}`}
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
