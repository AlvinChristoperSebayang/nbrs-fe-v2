import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { normalizeNewlines, formatCmsHtml } from "@/lib/text";

export type HeroProps = {
  image: ImageSource;
  title: React.ReactNode;
  description?: React.ReactNode;
  button?: {
    text: string;
    href: string;
  };
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dividerClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  overlayClassName?: string;
  imageClassName?: string;
  showDivider?: boolean;
  singleLine?: boolean;
  mobileLines?: string[];
  desktopLines?: string[];
  children?: React.ReactNode;
};

export { renderTitleWithUnderline, UnderlineHeading } from "@/components/ui/UnderlineHeading";
import { renderTitleWithUnderline } from "@/components/ui/UnderlineHeading";

export function Hero({
  image,
  title,
  description,
  button,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  dividerClassName = "",
  containerClassName = "",
  contentClassName = "",
  overlayClassName = "bg-black/40",
  imageClassName = "",
  showDivider = true,
  singleLine = false,
  mobileLines,
  desktopLines,
  children,
}: HeroProps) {
  const isShortTitle = typeof title === "string" && !title.includes("\n") && title.trim().split(/\s+/).length <= 3;
  const hasExplicitLines = typeof title === "string" && title.includes("\n");

  return (
    <section className={`relative w-full flex flex-col justify-between h-152.5 xl:min-h-[85vh] xl:h-227.5 ${className}`}>
      {/* Background Image Container */}
      <div className="absolute inset-0 overflow-hidden">
        <ResponsiveImage
          src={image}
          alt={typeof title === "string" ? title.replace(/\n/g, " ") : "NBRS Architecture"}
          title={typeof title === "string" ? title.replace(/\n/g, " ") : "NBRS Architecture"}
          className={`h-full w-full object-cover ${imageClassName}`}
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
              suppressHydrationWarning
              className={`font-heading text-[36px] sm:text-[38px] uppercase leading-[1.05] text-white lg:text-[70px] ${
                isShortTitle || singleLine
                  ? "max-w-none w-auto whitespace-nowrap"
                  : "max-w-2xl lg:max-w-none"
              } ${titleClassName}`}
            >
              {renderTitleWithUnderline(title, showDivider, "border-white", singleLine, mobileLines, desktopLines)}
            </h1>
          ) : (
            <h1
              data-aos="fade-up"
              suppressHydrationWarning
              className={`font-heading text-[36px] sm:text-[38px] uppercase leading-[1.05] text-white lg:text-[70px] max-w-2xl lg:max-w-none ${titleClassName}`}
            >
              {title}
            </h1>
          )}

          {/* Description */}
          {description && (
            typeof description === "string" ? (
              <p
                data-aos="fade-up"
                data-aos-delay="200"
                suppressHydrationWarning
                className={`mt-6 text-white text-base ${descriptionClassName ? descriptionClassName : "max-w-xl"} ${descriptionClassName && !descriptionClassName.includes("max-w-") ? "max-w-xl" : ""}`}
                dangerouslySetInnerHTML={{ __html: formatCmsHtml(description) }}
              />
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
              title={button.text}
              aria-label={button.text}
              data-aos="fade-up"
              data-aos-delay="300"
              className="group mt-8 inline-flex items-center gap-2 rounded-[5px] bg-white/30 px-6 py-2 text-xs text-white transition sm:text-base font-medium"
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
