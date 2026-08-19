"use client";

import { useId, useState, type CSSProperties } from "react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import type { HeroSlide } from "@/lib/hero";
import type { ImageSource } from "@/lib/types";
import { Container } from "@/components/ui/Container";

const swiperVars = {
  "--swiper-pagination-color": "#FFFFFF",
  "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
  "--swiper-pagination-bullet-inactive-opacity": "0.3",
} as CSSProperties;

function imageSource(image: ImageSource): ImageSource {
  if (typeof image !== "string") return image;
  return image.startsWith("http") || image.startsWith("/") ? image : `/images/hero/${image}`;
}

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const paginationId = `hero-pagination-${uid}`;
  const prevId = `hero-prev-${uid}`;
  const nextId = `hero-next-${uid}`;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  const handleSlideChange = (swiper: SwiperInstance) => {
    setActiveIndex(swiper.realIndex);
  };

  const isLastSlide = activeIndex === slides.length - 1;
  const TitleTag = "h1";

  return (
    <section className="relative overflow-hidden hero-slider">
      {slides.map((slide, index) => (
        <ResponsiveImage
          key={slide.title}
          src={imageSource(slide.image)}
          alt={slide.title || "NBRS Architecture"}
          title={slide.title || "NBRS Architecture"}
          className={`absolute inset-0 z-10 h-full w-full scale-110 object-cover transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          priority
        />
      ))}
      <div className="absolute inset-0 top-0 left-0 z-20 h-full w-full bg-black/30" />
      <Container className="relative z-30 pt-40 pb-10 lg:py-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-[30px] items-center relative">
          <div
            key={activeIndex}
            className="lg:col-span-4 z-20 flex flex-col justify-center gap-3 w-full pointer-events-none"
          >
            <TitleTag
              style={{ animation: "hero-fade-up 0.7s ease-out both" }}
              className={`font-heading font-bold uppercase text-white ${
                isLastSlide
                  ? "text-[130px] lg:text-[264px] leading-[0.85] tracking-tighter whitespace-nowrap"
                  : "text-[50px] lg:text-[132px] leading-none tracking-tight"
              }`}
            >
              <span
                className={
                  isLastSlide
                    ? "inline-block whitespace-nowrap relative"
                    : "inline-block border-b-[4px] sm:border-b-[6px] lg:border-b-[10px] border-white pb-1 sm:pb-2 lg:pb-3 leading-none"
                }
              >
                {activeSlide.title}
                {isLastSlide && (
                  <span className="inline-block shrink-0 w-[0.22em] h-[0.22em] rounded-full bg-[#A0A0A0] ml-2 lg:ml-3 align-top mt-[0.06em]" />
                )}
              </span>
            </TitleTag>
            {!isLastSlide && activeSlide.headline && (
              <p
                style={{ animation: "hero-fade-up 0.7s ease-out 0.2s both" }}
                className="font-gothic font-trade-gothic text-lg uppercase tracking-[0%] text-white/90 sm:text-[40px] mt-2"
              >
                {activeSlide.headline}
              </p>
            )}
          </div>

          <div className="lg:col-span-8 relative z-10 w-[calc(100%+1.25rem)] sm:w-[calc(100%+1.5rem)] -mr-5 sm:-mr-6 lg:mr-0 lg:w-full max-w-none lg:max-w-full overflow-hidden slider-area">
            <Swiper
              modules={[Autoplay, EffectFade, Navigation, Pagination, A11y]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={900}
              loop
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
              pagination={{ el: `#${paginationId}`, clickable: true }}
              onSlideChange={handleSlideChange}
              className="h-64 w-full max-w-full overflow-hidden shadow-2xl ring-1 ring-white sm:h-96 lg:h-130 xl:h-160"
            >
              {slides.map((slide) => {
                const src = imageSource(slide.image);

                return (
                  <SwiperSlide key={slide.title} className="relative">
                    <ResponsiveImage
                      src={src}
                      alt={slide.title || "NBRS Architecture"}
                      title={slide.title || "NBRS Architecture"}
                      className="h-full w-full object-cover"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div style={swiperVars} className="mt-4 flex items-center justify-center md:justify-end gap-4 swipe-controls">
              <button
                id={prevId}
                type="button"
                aria-label="Previous slide"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-900 transition hover:bg-zinc-900/10 cursor-pointer"
              >
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.41406 8.70703L16.4141 8.70703" stroke="white" strokeWidth="2"/>
                  <path d="M9.41406 16.707L1.41406 8.70703L9.41406 0.707031" stroke="white" strokeWidth="2"/>
                </svg>
              </button>
              <div id={paginationId} className="flex items-center gap-2 swipe-paginate" />
              <button
                id={nextId}
                type="button"
                aria-label="Next slide"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-900 transition hover:bg-zinc-900/10 cursor-pointer"
              >
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.4141 8.70703L7.70703 17.4141L6.29297 16L12.5859 9.70703H0V7.70703H12.5859L6.29297 1.41406L7.70703 0L16.4141 8.70703Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
