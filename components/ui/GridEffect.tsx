"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Container } from "@/components/ui/Container";
import type { GridEffectItem } from "@/lib/types";
import { formatCmsHtml, cleanCardTitle } from "@/lib/text";

export function GridEffect({
  items,
  title = "Features",
  description,
  viewAllLabel = "View all latest news",
  viewAllUrl = "/news",
  backgroundColor = "#FFFFFF",
  titleClassNameNonHover = "text-black",
  descriptionClassName = "",
  hasBlur = true,
  hasOverlay = false,
  showDescriptionOnMobile = false,
  showCardDescriptionOnMobile = false,
  stageClassName = "min-h-[500px] lg:min-h-[560px] xl:min-h-[620px] flex flex-col justify-center",
  imageClassName = "object-cover object-center",
  firstImageClassName,
  className = "",
}: {
  items: GridEffectItem[];
  title?: string;
  description?: string;
  viewAllLabel?: string;
  viewAllUrl?: string;
  backgroundColor?: string;
  titleClassNameNonHover?: string;
  descriptionClassName?: string;
  hasBlur?: boolean;
  hasOverlay?: boolean;
  showDescriptionOnMobile?: boolean;
  showCardDescriptionOnMobile?: boolean;
  stageClassName?: string;
  firstImageClassName?: string;
  imageClassName?: string | string[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const mobileActiveIndexRef = useRef(0);
  const cardRefs = useRef<(HTMLAnchorElement | HTMLDivElement | null)[]>([]);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const showViewAll = Boolean(viewAllLabel && viewAllUrl);

  // Mobile scroll-driven pinned timeline effect (< 1024px)
  useEffect(() => {
    let ticking = false;

    const updateMobile = () => {
      if (window.innerWidth >= 640) {
        ticking = false;
        return;
      }

      const el = mobileTrackRef.current;
      if (!el) {
        ticking = false;
        return;
      }

      const rect = el.getBoundingClientRect();
      const stickyEl = el.firstElementChild as HTMLElement | null;
      const stickyHeight = stickyEl?.offsetHeight || window.innerHeight;
      const totalScrollable = el.offsetHeight - stickyHeight;

      if (totalScrollable <= 0) {
        if (mobileActiveIndexRef.current !== 0) {
          mobileActiveIndexRef.current = 0;
          setMobileActiveIndex(0);
        }
        if (scrollThumbRef.current) {
          scrollThumbRef.current.style.transform = "translateY(0%)";
        }
        ticking = false;
        return;
      }

      // Distance scrolled inside the pinned track:
      // When rect.top is 0, scrolled = 0.
      // When rect.bottom is stickyHeight, scrolled = totalScrollable.
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      const count = items.length;
      if (count <= 1) {
        if (mobileActiveIndexRef.current !== 0) {
          mobileActiveIndexRef.current = 0;
          setMobileActiveIndex(0);
        }
        if (scrollThumbRef.current) {
          scrollThumbRef.current.style.transform = "translateY(0%)";
        }
        ticking = false;
        return;
      }

      // Live update scrollbar thumb position via direct hardware-accelerated transform (120 FPS, 0 React re-renders)
      if (scrollThumbRef.current) {
        const travelPercent = progress * (count - 1) * 100;
        scrollThumbRef.current.style.transform = `translateY(${travelPercent}%)`;
      }

      // Calculate target index with hysteresis (deadband buffer) to prevent flickering/jitter at boundaries
      const current = mobileActiveIndexRef.current;
      let nextIndex = current;

      if (progress <= 0.02) {
        nextIndex = 0;
      } else if (progress >= 0.98) {
        nextIndex = count - 1;
      } else {
        const segment = 1 / count;
        // Buffer is 15% of a segment or at most 0.04 to prevent index flapping
        const buffer = Math.min(segment * 0.15, 0.04);

        if (current < count - 1 && progress > (current + 1) * segment + buffer) {
          for (let i = current + 1; i < count; i++) {
            if (progress >= i * segment + buffer) {
              nextIndex = i;
            }
          }
        } else if (current > 0 && progress < current * segment - buffer) {
          for (let i = current - 1; i >= 0; i--) {
            if (progress <= (i + 1) * segment - buffer) {
              nextIndex = i;
            }
          }
        }
      }

      nextIndex = Math.max(0, Math.min(count - 1, nextIndex));

      if (nextIndex !== mobileActiveIndexRef.current) {
        mobileActiveIndexRef.current = nextIndex;
        setMobileActiveIndex(nextIndex);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateMobile);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateMobile();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [items.length]);

  if (!items || items.length === 0) return null;

  return (
    <>
      {/* MOBILE PINNED 100VH SCROLL VIEW (< 1024px) */}
      <div
        ref={mobileTrackRef}
        className={`relative w-full lg:hidden ${className}`}
        style={{
          height: items.length > 1 ? `${items.length * 100}svh` : "100svh",
          backgroundColor,
        }}
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden transform-gpu">
          {/* Full-bleed background images */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-[5]">
            {items.map((item, index) => {
              const mobileSrc = item.mobileImage ?? item.image ?? item.desktopImage;
              const desktopSrc = item.desktopImage ?? item.image ?? item.mobileImage;
              if (!mobileSrc && !desktopSrc) return null;

              const currentImageClassName =
                index === 0 && firstImageClassName
                  ? firstImageClassName
                  : Array.isArray(imageClassName)
                    ? (imageClassName[index] ?? imageClassName[0] ?? "object-cover object-center")
                    : (imageClassName || "object-cover object-center");

              return (
                <ResponsiveImage
                  key={`mobile-bg-${item.title}-${index}`}
                  src={mobileSrc || desktopSrc!}
                  desktopSrc={desktopSrc || mobileSrc!}
                  alt={item.title || "NBRS Architecture"}
                  title={item.title || "NBRS Architecture"}
                  priority={index === 0}
                  className={`absolute inset-0 h-full w-full transition-opacity duration-700 will-change-opacity transform-gpu ${currentImageClassName} ${
                    index === mobileActiveIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              );
            })}

            {/* Dark gradient overlay for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15 z-[6] pointer-events-none" />
            {hasOverlay && (
              <div className="absolute inset-0 bg-black/25 z-[7] pointer-events-none" />
            )}
          </div>

          {/* THEMATIC VERTICAL SCROLLBAR (< 1024px) */}
          {items.length > 1 && (
            <div
              className="absolute right-3.5 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none select-none"
              aria-hidden="true"
            >
              {/* Active Step Indicator */}
              <span className="font-heading text-xs font-bold tracking-widest text-white leading-none drop-shadow">
                0{mobileActiveIndex + 1}
              </span>

              {/* Scroll Track & Live Moving Thumb */}
              <div className="relative w-[3px] h-28 sm:h-36 bg-white/20 rounded-full overflow-hidden my-2 backdrop-blur-xs shadow-inner">
                <div
                  ref={scrollThumbRef}
                  className="absolute top-0 left-0 w-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)] will-change-transform transform-gpu"
                  style={{
                    height: `${100 / items.length}%`,
                    transform: "translateY(0%)",
                  }}
                />
              </div>

              {/* Total Steps */}
              <span className="font-heading text-[10px] font-semibold tracking-widest text-white/40 leading-none">
                0{items.length}
              </span>

              {/* Subtle SCROLL prompt */}
              <span className="[writing-mode:vertical-lr] font-heading text-[8px] sm:text-[9px] tracking-[0.22em] text-white/50 uppercase mt-2.5">
                SCROLL
              </span>
            </div>
          )}

          {/* Content overlay at bottom */}
          <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-8 sm:px-8 sm:pb-10 pr-10 sm:pr-14">
            {/* Upper text above card */}
            <div className="flex flex-col items-start gap-1 mb-4 sm:mb-5">
              {/* Segmented Step Indicator above title */}
              {items.length > 1 && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-heading text-[11px] sm:text-xs font-semibold tracking-wider text-white/80 uppercase">
                    0{mobileActiveIndex + 1} / 0{items.length}
                  </span>
                  <div className="flex items-center gap-1.5 ml-1">
                    {items.map((_, i) => (
                      <button
                        key={`mobile-step-${i}`}
                        type="button"
                        onClick={() => {
                          const el = mobileTrackRef.current;
                          if (!el) return;
                          const stickyEl = el.firstElementChild as HTMLElement | null;
                          const stickyHeight = stickyEl?.offsetHeight || window.innerHeight;
                          const totalScrollable = el.offsetHeight - stickyHeight;
                          const targetScrollY =
                            window.scrollY +
                            el.getBoundingClientRect().top +
                            (i / Math.max(1, items.length - 1)) * totalScrollable;
                          window.scrollTo({ top: targetScrollY, behavior: "smooth" });
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-[3px] rounded-full transition-all duration-300 cursor-pointer ${
                          i === mobileActiveIndex ? "w-6 bg-white" : "w-2 bg-white/35 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <h2 className="font-heading text-[28px] sm:text-[34px] font-bold uppercase text-white leading-tight">
                {title}
              </h2>
              {showDescriptionOnMobile && description && (
                <p className={`text-sm sm:text-base text-white/90 leading-relaxed ${descriptionClassName}`}>
                  {description}
                </p>
              )}
              {showViewAll && (
                <Link
                  href={viewAllUrl}
                  title={viewAllLabel}
                  aria-label={viewAllLabel}
                  className="group inline-flex items-center gap-2 font-heading text-sm uppercase text-white/95 hover:text-white mt-1"
                >
                  <span>{viewAllLabel}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 12h16m0 0l-6-6m6 6l-6 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              )}
            </div>

            {/* Card slot - vertical slide animation from bottom */}
            <div className="relative w-full overflow-hidden">
              <div className="relative grid grid-cols-1 items-stretch w-full">
                {items.map((item, index) => {
                  const isCurrent = index === mobileActiveIndex;
                  const isUpcoming = index > mobileActiveIndex;

                  const cardTransform = isCurrent
                    ? "translate-y-0 opacity-100 pointer-events-auto z-10"
                    : isUpcoming
                      ? "translate-y-[120%] opacity-0 pointer-events-none z-0"
                      : "-translate-y-[120%] opacity-0 pointer-events-none z-0";

                  const cardInner = (
                    <div className="group flex flex-col justify-between gap-3 min-h-[90px] sm:min-h-[105px] h-full w-full p-5 sm:p-6 bg-black/75 backdrop-blur-sm border-b-[4px] sm:border-b-[5px] border-white transition-colors duration-300">
                      <div className="flex flex-col gap-2 pr-2">
                        <h3 className="font-heading uppercase text-xl sm:text-2xl font-bold text-white tracking-wide leading-tight">
                          {cleanCardTitle(item.title)}
                        </h3>
                        {item.description && (
                          <div
                            className="text-sm sm:text-base text-white/90 leading-relaxed font-sans [&_p]:m-0 [&_p+p]:mt-1.5"
                            dangerouslySetInnerHTML={{ __html: formatCmsHtml(item.description) }}
                          />
                        )}
                      </div>
                      {item.href && (
                        <div className="flex justify-end pt-1">
                          <svg
                            className="transition-transform duration-300 group-hover:translate-x-1"
                            width="22"
                            height="22"
                            viewBox="0 0 23 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.0186 10.6218V13.3782L0 13.3782L2.45001e-07 10.6218L21.0186 10.6218Z"
                              fill="white"
                            />
                            <path
                              d="M23 12L10.7994 24L8.81794 22.0511L19.0371 12L8.81794 1.94886L10.7994 0L23 12Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  );

                  return (
                    <div
                      key={`mobile-card-${item.title}-${index}`}
                      className={`col-start-1 row-start-1 w-full h-full transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] transform-gpu ${cardTransform}`}
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          title={item.title}
                          aria-label={item.title}
                          className="block w-full h-full focus:outline-none"
                        >
                          {cardInner}
                        </Link>
                      ) : (
                        <div className="block w-full h-full">{cardInner}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW (>= 1024px) */}
      <section className={`hidden lg:block py-16 lg:py-20 xl:py-24 ${className}`} style={{ backgroundColor }}>
        <Container className="overflow-hidden">
          <div data-aos="fade-up" suppressHydrationWarning className="mb-6 flex items-start justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-[28px] lg:text-[24px] xl:text-[28px] uppercase text-black">
                {title}
              </h2>
              {description && (
                <p className="max-w-3xl text-sm lg:text-base text-black">{description}</p>
              )}
            </div>
            {showViewAll && (
              <Link
                href={viewAllUrl}
                title={viewAllLabel}
                aria-label={viewAllLabel}
                className="group items-center gap-2 font-heading text-lg lg:text-[20px] xl:text-[22px] uppercase text-black flex"
              >
                {viewAllLabel}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12h16m0 0l-6-6m6 6l-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}
          </div>

          <div className={`relative w-full ${stageClassName}`}>
            <div className="absolute w-full h-full overflow-hidden top-0 left-0 z-[5] uncontainer-mobile">
              {items.map((item, index) => {
                const mobileSrc = item.mobileImage ?? item.image ?? item.desktopImage;
                const desktopSrc = item.desktopImage ?? item.image ?? item.mobileImage;
                if (!mobileSrc || !desktopSrc) return null;

                const currentImageClassName =
                  index === 0 && firstImageClassName
                    ? firstImageClassName
                    : Array.isArray(imageClassName)
                      ? (imageClassName[index] ?? imageClassName[0] ?? "object-cover object-center")
                      : (imageClassName || "object-cover object-center");

                return (
                  <ResponsiveImage
                    key={item.title}
                    src={mobileSrc}
                    desktopSrc={desktopSrc}
                    alt={item.title || "NBRS Architecture"}
                    title={item.title || "NBRS Architecture"}
                    className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${currentImageClassName} ${
                      index === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                );
              })}
              {hasOverlay && (
                <div className="absolute inset-0 bg-black/25 z-[6] pointer-events-none" />
              )}
            </div>

            <div data-aos="fade-up" data-aos-delay="150" suppressHydrationWarning className="grid w-full grid-cols-12 gap-6 xl:gap-[30px] items-stretch pb-16 lg:py-16 xl:py-24 px-8 xl:px-12 relative z-10">
              {items.map((item, index) => {
                const isActive = index === activeIndex;
                const hasHref = Boolean(item.href);

                const cardClassName = `col-span-4 group flex h-64 flex-col justify-between gap-4 sm:gap-6 overflow-hidden p-5 transition-colors duration-300 lg:h-[245px] xl:h-[320px] lg:p-5 xl:p-8 ${
                  isActive
                    ? `bg-black/50 ${hasBlur ? "backdrop-blur-[5px]" : "backdrop-blur-none"} border-b-[5px] border-white`
                    : `bg-white/70 ${hasBlur ? "backdrop-blur-[0px]" : "backdrop-blur-none"} border-b-[5px] border-transparent`
                }`;

                const cardContent = (
                  <>
                    <div className="flex flex-col gap-2">
                      <h3
                        className={`font-heading uppercase leading-tight duration-300 max-w-[260px] ${
                          isActive
                            ? "text-white text-[20px] xl:text-[30px] 2xl:text-[34px]"
                            : `text-[17px] xl:text-[20px] ${titleClassNameNonHover}`
                        }`}
                      >
                        {cleanCardTitle(item.title)}
                      </h3>

                      {item.description && (
                        <p
                          className={`max-w-57.75 text-base text-white/90 transition-opacity duration-300 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                          dangerouslySetInnerHTML={{ __html: formatCmsHtml(item.description) }}
                        />
                      )}
                    </div>

                    {hasHref && (
                      <div
                        className={`flex flex-col gap-4 transition-opacity duration-300 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <svg
                          className="self-end"
                          width="23"
                          height="24"
                          viewBox="0 0 23 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.0186 10.6218V13.3782L0 13.3782L2.45001e-07 10.6218L21.0186 10.6218Z"
                            fill="white"
                          />
                          <path
                            d="M23 12L10.7994 24L8.81794 22.0511L19.0371 12L8.81794 1.94886L10.7994 0L23 12Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    )}
                  </>
                );

                if (hasHref) {
                  return (
                    <Link
                      key={item.title}
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      href={item.href!}
                      title={item.title}
                      aria-label={item.title}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cardClassName}
                    >
                      {cardContent}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.title}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cardClassName}
                  >
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
