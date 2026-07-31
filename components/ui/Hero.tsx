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
  return (
    <section
      className="relative w-full flex flex-col justify-between h-[610px] lg:h-[85vh]"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 overflow-hidden">
        <ResponsiveImage
          src={image}
          alt=""
          className="h-full w-full object-cover"
          priority
        />
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      {/* Main Title & Content Container */}
      <Container
        className={`relative z-10 flex h-full flex-col justify-center my-auto pt-16 pb-8 lg:pt-20 lg:pb-12 ${containerClassName}`}
      >
        <div className={`flex flex-col items-start max-w-[650px] ${contentClassName}`}>
          {/* Title */}
          {typeof title === "string" ? (
            <h1
              data-aos="fade-up"
              className={`font-heading max-w-2xl text-3xl uppercase leading-[1.05] text-white sm:text-5xl lg:text-[70px] ${titleClassName}`}
            >
              {title}
            </h1>
          ) : (
            <div data-aos="fade-up" className={titleClassName}>
              {title}
            </div>
          )}

          {/* Divider Line */}
          {showDivider && (
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className={`mt-4 lg:h-2 h-1 w-full origin-left bg-white ${dividerClassName}`}
            />
          )}

          {/* Description */}
          {description && (
            typeof description === "string" ? (
              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className={`mt-6 text-sm text-white sm:text-base ${descriptionClassName}`}
              >
                {description}
              </p>
            ) : (
              <div data-aos="fade-up" data-aos-delay="200" className={descriptionClassName}>
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
