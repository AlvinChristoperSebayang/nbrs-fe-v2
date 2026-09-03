import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Container } from "@/components/ui/Container";
import type { Sector } from "@/lib/types";
import { normalizeNewlines, formatCmsHtml, cleanCardTitle } from "@/lib/text";

function getDesktopSectorsLines(heading: string): string[] {
  const normalized = normalizeNewlines(heading);
  if (normalized.includes("\n")) {
    return normalized.split("\n").map((l) => l.trim()).filter(Boolean);
  }

  const words = normalized.trim().split(/\s+/);
  if (words.length >= 6) {
    return [
      words[0],
      words[1],
      `${words[2]} ${words[3]}`,
      words.slice(4).join(" "),
    ];
  }
  if (words.length === 5) {
    return [
      words[0],
      words[1],
      `${words[2]} ${words[3]}`,
      words[4],
    ];
  }
  if (words.length >= 3) {
    return [
      words.slice(0, words.length - 2).join(" "),
      words[words.length - 2],
      words[words.length - 1],
    ];
  }
  return [normalized];
}

function getMobileSectorsLines(heading: string): string[] {
  const normalized = normalizeNewlines(heading);
  if (normalized.includes("\n")) {
    const raw = normalized.split("\n").map((l) => l.trim()).filter(Boolean);
    if (raw.length <= 2) return raw;
    const mid = Math.ceil(raw.length / 2);
    return [raw.slice(0, mid).join(" "), raw.slice(mid).join(" ")];
  }

  const words = normalized.trim().split(/\s+/);
  if (words.length <= 2) return words;

  if (words.length >= 4) {
    return [words.slice(0, 2).join(" "), words.slice(2).join(" ")];
  }
  return [words[0], words.slice(1).join(" ")];
}

function renderSectorsLines(lines: string[]) {
  if (lines.length === 1) {
    return (
      <span className="inline-block w-fit border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-black pb-1 sm:pb-2 leading-[1.05] whitespace-nowrap">
        {lines[0]}
      </span>
    );
  }

  const allExceptLast = lines.slice(0, -1);
  const lastLine = lines[lines.length - 1];

  return (
    <span className="inline-flex flex-col items-start w-fit">
      {allExceptLast.map((line, idx) => (
        <span key={idx} className="block leading-[1.05] whitespace-nowrap">
          {line}
        </span>
      ))}
      <span className="inline-block w-fit border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-black pb-1 sm:pb-2 leading-[1.05] mt-1 whitespace-nowrap">
        {lastLine}
      </span>
    </span>
  );
}

function renderSectorsHeading(heading: string) {
  const desktopLines = getDesktopSectorsLines(heading);
  const mobileLines = getMobileSectorsLines(heading);

  const isSame =
    desktopLines.length === mobileLines.length &&
    desktopLines.every((l, i) => l === mobileLines[i]);

  if (isSame) {
    return renderSectorsLines(desktopLines);
  }

  return (
    <>
      <span className="sm:hidden">{renderSectorsLines(mobileLines)}</span>
      <span className="hidden sm:inline">{renderSectorsLines(desktopLines)}</span>
    </>
  );
}

export type SectorsSectionProps = {
  sectors: Sector[];
  heading?: string;
};

export function SectorsSection({
  sectors,
  heading = "Designing spaces bespoke to their needs",
}: SectorsSectionProps) {
  return (
    <section className="bg-white py-8 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-x-[30px] lg:gap-y-[35px]">
          <div data-aos="fade-up" suppressHydrationWarning className="lg:col-span-4 flex flex-col justify-center">
            <h2 className="font-heading text-[28px] sm:text-[34px] md:text-[38px] lg:text-[36px] xl:text-[46px] 2xl:text-[56px] leading-[1.05] uppercase text-black flex flex-col items-start">
              {renderSectorsHeading(heading)}
            </h2>
          </div>

          {sectors.map((sector, index) => (
            <Link
              key={`${sector.label}-${index}`}
              href={sector.href}
              title={sector.label}
              aria-label={sector.label}
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
              suppressHydrationWarning
              className="group relative block aspect-[5/4] overflow-hidden rounded-[5px] lg:aspect-[37/30] lg:col-span-4"
            >
              <div
                className="absolute top-[-100%] group-hover:top-0 duration-300 z-10 opacity-100 w-full h-full"
                style={{ backgroundColor: sector.hoverColor }}
              >
                <div className="relative h-full w-full flex flex-col items-start justify-between gap-4 p-8">
                  <div className="flex flex-col gap-2 text-left">
                    <span className="font-heading text-[26px] lg:text-[30px] uppercase text-black">
                      {cleanCardTitle(sector.label)}
                    </span>
                    <span className="font-heading text-base uppercase text-black">
                      {cleanCardTitle(sector.description)}
                    </span>
                  </div>
                  <svg
                    className="self-end"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5349 11.0647V13.936L0 13.936L2.51019e-07 11.0647L21.5349 11.0647Z"
                      fill="black"
                    />
                    <path
                      d="M23.565 12.5003L11.0647 25.0007L9.03456 22.9705L19.5048 12.5003L9.03456 2.03011L11.0647 0L23.565 12.5003Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
              <ResponsiveImage
                src={sector.image}
                alt={sector.label}
                title={sector.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 z-[5]"
                width={1200}
                height={900}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5 z-[6]">
                <span className="font-heading text-2xl lg:text-[34px] uppercase text-white">
                  {sector.label}
                </span>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5349 11.0647V13.936L0 13.936L2.51019e-07 11.0647L21.5349 11.0647Z"
                    fill="white"
                  />
                  <path
                    d="M23.565 12.5003L11.0647 25.0007L9.03456 22.9705L19.5048 12.5003L9.03456 2.03011L11.0647 0L23.565 12.5003Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

