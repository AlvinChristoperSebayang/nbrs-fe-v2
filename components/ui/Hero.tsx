import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";
import { Container } from "@/components/ui/Container";

export type HeroProps = {
  image: ImageSource;
  title: React.ReactNode;
  description?: React.ReactNode;
  button?: {
    text: string;
    href: string;
  };
  titleClassName?: string;
  descriptionClassName?: string;
  dividerClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  overlayClassName?: string;
  showDivider?: boolean;
  children?: React.ReactNode;
};

function getTitleLines(title: string): string[] {
  if (title.includes("\n")) {
    return title.split("\n").map((l) => l.trim()).filter(Boolean);
  }

  const words = title.trim().split(/\s+/);

  // Condition: If title has 3 words or fewer (<= 3 words, e.g. "A SUSTAINABLE FUTURE"), keep on ONE single line
  if (words.length <= 3) {
    return [title.trim()];
  }

  const totalLength = title.trim().length;
  const targetMid = totalLength / 2;

  let currentLine = "";
  const line1Words: string[] = [];
  const line2Words: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (line1Words.length === 0) {
      line1Words.push(word);
      currentLine = word;
    } else if (currentLine.length < targetMid && i < words.length - 1) {
      line1Words.push(word);
      currentLine += " " + word;
    } else {
      line2Words.push(word);
    }
  }

  if (line2Words.length === 0) {
    return [title];
  }

  return [line1Words.join(" "), line2Words.join(" ")];
}

export function renderTitleWithUnderline(title: React.ReactNode, showDivider: boolean = true) {
  if (typeof title !== "string") {
    return title;
  }

  if (title.trim().toUpperCase() === "LANDSCAPE ARCHITECTURE") {
    if (!showDivider) {
      return (
        <>
          <span className="sm:hidden inline-flex flex-col items-start">
            <span className="block leading-[1.05]">LANDSCAPE</span>
            <span className="block leading-[1.05]">ARCHITECTURE</span>
          </span>
          <span className="hidden sm:inline">LANDSCAPE ARCHITECTURE</span>
        </>
      );
    }

    return (
      <>
        <span className="sm:hidden inline-flex flex-col items-start">
          <span className="block leading-[1.05]">LANDSCAPE</span>
          <span className="inline-block max-w-full border-b-[4px] border-white pb-1 leading-none mt-1">
            ARCHITECTURE
          </span>
        </span>
        <span className="hidden sm:inline-block border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-white pb-1 sm:pb-2 leading-[1.05]">
          LANDSCAPE ARCHITECTURE
        </span>
      </>
    );
  }

  const lines = getTitleLines(title);

  if (!showDivider) {
    if (lines.length > 1) {
      return (
        <span className="inline-flex flex-col items-start">
          {lines.map((line, i) => (
            <span key={i} className="block leading-[1.05]">
              {line}
            </span>
          ))}
        </span>
      );
    }
    return title;
  }

  // Single line condition (3 words or fewer)
  if (lines.length === 1) {
    return (
      <span className="inline-block border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-white pb-1 sm:pb-2 leading-[1.05]">
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
              className="inline-block max-w-full border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] border-white pb-1 sm:pb-2 leading-none mt-1"
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

export function Hero({
  image,
  title,
  description,
  button,
  titleClassName = "",
  descriptionClassName = "",
  dividerClassName = "",
  containerClassName = "",
  contentClassName = "",
  overlayClassName = "bg-black/40",
  showDivider = true,
  children,
}: HeroProps) {
  const isShortTitle = typeof title === "string" && !title.includes("\n") && title.trim().split(/\s+/).length <= 3;
  const hasExplicitLines = typeof title === "string" && title.includes("\n");

  return (
    <section className="relative w-full flex flex-col justify-between h-[610px] lg:h-[85vh]">
      {/* Background Image Container */}
      <div className="absolute inset-0 overflow-hidden">
        <ResponsiveImage
          src={image}
          alt={typeof title === "string" ? title.replace(/\n/g, " ") : "NBRS Architecture"}
          title={typeof title === "string" ? title.replace(/\n/g, " ") : "NBRS Architecture"}
          className="h-full w-full object-cover"
          priority
        />
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      {/* Main Title & Content Container */}
      <Container
        className={`relative z-10 flex h-full flex-col justify-center my-auto pt-16 pb-8 lg:pt-20 lg:pb-12 ${containerClassName}`}
      >
        <div className={`flex flex-col items-start ${hasExplicitLines ? "max-w-[850px] lg:max-w-none" : "max-w-[650px] lg:max-w-none"} ${contentClassName}`}>
          {/* Title with Underline on Last Line matching exact text width of that line */}
          {typeof title === "string" ? (
            <h1
              data-aos="fade-up"
              className={`font-heading text-[36px] sm:text-[38px] uppercase leading-[1.05] text-white lg:text-[70px] ${
                isShortTitle
                  ? "max-w-none w-auto whitespace-nowrap"
                  : "max-w-2xl lg:max-w-none"
              } ${titleClassName}`}
            >
              {renderTitleWithUnderline(title, showDivider)}
            </h1>
          ) : (
            <div data-aos="fade-up" className={titleClassName}>
              {title}
            </div>
          )}

          {/* Description */}
          {description && (
            typeof description === "string" ? (
              <p
                data-aos="fade-up"
                data-aos-delay="200"
                suppressHydrationWarning
                className={`mt-6 text-white text-base ${descriptionClassName ? descriptionClassName : "max-w-xl"} ${descriptionClassName && !descriptionClassName.includes("max-w-") ? "max-w-xl" : ""}`}
              >
                {description}
              </p>
            ) : (
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                suppressHydrationWarning
                className={`${descriptionClassName ? descriptionClassName : "max-w-xl"} ${descriptionClassName && !descriptionClassName.includes("max-w-") ? "max-w-xl" : ""}`}
              >
                {description}
              </div>
            )
          )}

          {/* Optional Button */}
          {button && (
            <Link
              href={button.href}
              data-aos="fade-up"
              data-aos-delay="300"
              className="group mt-8 inline-flex items-center gap-2 rounded-[5px] bg-white/30 px-6 py-2 text-xs text-white transition sm:text-base"
            >
              {button.text}
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M14 7.72388L0 7.72388M6.66725 14.7236L14 7.72388L6.66725 0.723633"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </Link>
          )}
        </div>
      </Container>

      {/* Floating Overlay Children for Desktop */}
      {children && (
        <Container className="relative z-20 hidden lg:block lg:translate-y-1/2">
          <div data-aos="fade-up" data-aos-delay="150">
            {children}
          </div>
        </Container>
      )}
    </section>
  );
}
